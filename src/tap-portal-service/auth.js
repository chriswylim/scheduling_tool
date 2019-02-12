'use strict';
const AWS = require('aws-sdk');
const rand = require('csprng');
const sjcl = require('sjcl');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

// @TODO: logout
const poolData = {
    UserPoolId: process.env.AWS_USERPOOL_ID,
    ClientId: process.env.AWS_CLIENT_ID
};

const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'ap-southeast-1'});
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
const cognitoIDP = new AWS.CognitoIdentityServiceProvider();

const generateSessionCookie = () => {
    const cookie = rand(160, 36)
    const hashedCookie = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(cookie))
    return { cookie, hashedCookie }
}

const isSessionValid = async (username, sessionToken) => {
    const params = {
        TableName: process.env.AWS_DYNAMODB_TABLE,
        Key: { 'pK': username, 'sK': 'SESSION' }
    }
    const hashedCookie = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(sessionToken))

    // Checks if session exists
    const result = await dynamodb.get(params).promise();
    if (result.Item !== undefined && result.Item !== null) {
        return hashedCookie === result.Item.sessionToken
    }
    return false
}

const getRefreshToken = async (username) => {
    try {
        const params = {
            TableName: process.env.AWS_DYNAMODB_TABLE,
            Key: { 'pK': username, 'sK': 'SESSION' }
        }
        const result = await dynamodb.get(params).promise();
        return result.Item.refreshToken
    } catch (err) {
        throw err
    }
}

const logOut = async (username) => {
    try {
        const params = {
            TableName: process.env.AWS_DYNAMODB_TABLE,
            Key: { 'pK': username, 'sK': 'SESSION' }
        }
        const result = await dynamodb.delete(params).promise();
        return result
    } catch (err) {
        console.log(err)
        throw err
    }
}

const confirmForgotPassword = (username, confirmationCode, newPassword) => {
    return new Promise((resolve, reject) => {
        const params = {
            ClientId: process.env.AWS_CLIENT_ID,
            ConfirmationCode: confirmationCode,
            Username: username,
            Password: newPassword
        }
        cognitoIDP.confirmForgotPassword(params, (err, data) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            resolve(data)
        });
    });
}


const forgotPassword = (username) => {
    return new Promise((resolve, reject) => {
        const params = {
            ClientId: process.env.AWS_CLIENT_ID,
            Username: username
        }
        cognitoIDP.forgotPassword(params, (err, data) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            resolve(data)
        });
    });
}

const changeEmail = async (username, newEmail) => {
    const refreshToken = await getRefreshToken(username);

    return new Promise((resolve, reject) => {
        const params = {
            UserAttributes: [
                {
                    Name: 'email',
                    Value: newEmail
                },
                {
                    Name: 'email_verified',
                    Value: 'true'
                },
            ],
            UserPoolId: process.env.AWS_USERPOOL_ID,
            Username: username
        }
        cognitoIDP.adminUpdateUserAttributes(params, (err, data) => {
            if (err) reject(err);
            resolve(data)
        });
    });
}

const changePassword = async (username, oldPassword, newPassword) => {
    const refreshToken = await getRefreshToken(username);

    return new Promise((resolve, reject) => {
        let params = {}
        cognitoIDP.adminInitiateAuth({
            AuthFlow: 'REFRESH_TOKEN',
            ClientId: process.env.AWS_CLIENT_ID,
            UserPoolId: process.env.AWS_USERPOOL_ID,
            AuthParameters: {
                'REFRESH_TOKEN': refreshToken
            },
        }, (err, data) => {
            if(err){
                reject(err)
            } else {
                // Now authenticated as user, change the password
                const accessToken = data['AuthenticationResult']['AccessToken']
                params = {
                    AccessToken: accessToken, /* required */
                    PreviousPassword: oldPassword, /* required */
                    ProposedPassword: newPassword /* required */
                }
                cognitoIDP.changePassword(params, (changePasswordErr, changePasswordData) => {
                    if (err) reject(changePasswordErr)
                    resolve(changePasswordData)
                });
            }
        });
    });
}

const authorize = async (username, sessionToken) => {
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: username,
        Pool: userPool
    });

    const params = {
        TableName: process.env.AWS_DYNAMODB_TABLE,
        Key: { 'pK': username, 'sK': 'SESSION' }
    };

    const result = await dynamodb.get(params).promise();
    const refreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({RefreshToken: result.Item.refreshToken})
    const sessionIsValid = await isSessionValid(username, sessionToken)

    if (sessionIsValid) {
        return new Promise((resolve, reject) => {
            cognitoUser.refreshSession(refreshToken, async (err, session) => {
                if (err) {
                    console.log(err)
                    reject(err);
                }

                if (session) {
                    const expires = Number(Math.floor(Date.now() / 1000) + Number(process.env.SESSION_TTL));
                    const params = {
                        TableName: process.env.AWS_DYNAMODB_TABLE,
                        Item:
                        {
                            'pK': username,
                            'sK': 'SESSION',
                            'sessionToken': result.Item.sessionToken,
                            'refreshToken': session.getRefreshToken().getToken(),
                            'ttl': expires
                        }
                    };
                    await dynamodb.put(params).promise()
                }

                resolve({
                    idToken: session.getIdToken().getJwtToken(),
                });
            })
        });
    }
    throw new Error('INVALID_SESSION');
}

const adminCreateUser = (username) => {

    const params = {
        UserPoolId: process.env.AWS_USERPOOL_ID,
        Username: username,
        ForceAliasCreation: false,
        UserAttributes: [
            {
                Name: 'email',
                Value: `${username}@astro.com.my`
            },
            {
                Name: 'email_verified',
                Value: 'true'
            },
        ]
    };
    cognitoIDP.adminCreateUser(params, (err, data) => {
        if (err) {
            console.log(err)
            return err
        }
        console.log(data)
        return data
    })
}

const logIn = (username, password) => {
    console.log(`${username}, ${password}`)
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: username,
        Pool: userPool
    });

    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password
    });

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: async (result) => {
                const { cookie, hashedCookie } = generateSessionCookie();
                const expires = Number(Math.floor(Date.now() / 1000) + Number(process.env.SESSION_TTL));
                const params = {
                    TableName: process.env.AWS_DYNAMODB_TABLE,
                    Item:
                    {
                        'pK': username,
                        'sK': 'SESSION',
                        'sessionToken': hashedCookie,
                        'refreshToken': result.getRefreshToken().getToken(),
                        'ttl': expires
                    }
                };

                try {
                    await dynamodb.put(params).promise()
                    const idToken = result.getIdToken().getJwtToken();
                    resolve({'sessionToken': cookie, 'idToken': idToken})
                } catch (err) {
                    console.log(err)
                    reject(err)
                }
            },

            onFailure: async (err) => {
                console.log(err)
                reject(err)
            },

            newPasswordRequired: async (userAttributes, requiredAttributes) => {
                delete userAttributes.email_verified;

                // unsure about this field, but I don't send this back
                delete userAttributes.phone_number_verified;

                // Get these details and call
                cognitoUser.completeNewPasswordChallenge(password, userAttributes, {
                    onSuccess: async (result) => {
                        const idToken = result.getIdToken().getJwtToken();
                        resolve(idToken)
                    },

                    onFailure: async (err) => {
                        console.log(err)
                        reject(err)
                    }
                });
            }
        });
    });
}

module.exports.Auth = {
    adminCreateUser,
    logIn,
    logOut,
    authorize,
    changePassword,
    changeEmail,
    forgotPassword,
    confirmForgotPassword
}


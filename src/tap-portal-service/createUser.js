const AWS = require('aws-sdk');
const { Auth } = require('./auth');

const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'ap-southeast-1'});

module.exports.handler = async (event, context, callback) => {
    const data = JSON.parse(event.body)
    let res = {}

    try {
        data.forEach(async (user) => {
            // Create user in Cognito User Pool
            Auth.adminCreateUser(user.pK)

            const params = {
                TableName: process.env.AWS_DYNAMODB_TABLE,
                Item: user
            };
            await dynamodb.put(params).promise()
        });

        res = {
            statusCode: 200,
            body: JSON.stringify({
                msg: 'Users successfully added'
            })
        }
        callback(null, res)
    } catch(err) {
        res = {
            statusCode: 400,
            body: JSON.stringify(err)
        }
        callback(res)
    }
};

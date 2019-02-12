global.fetch = require('node-fetch')
const AWS = require('aws-sdk');


const { Auth } = require('./auth');
const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'ap-southeast-1'});

module.exports.handler = async (event, context, callback) => {
    const data = JSON.parse(event.body)
    const { username, password } = data

    let res = {}

    try {
        token = await Auth.signIn(username, password);
        res = {
            statusCode: 200,
            body: JSON.stringify({
                msg: 'Users successfully login',
                response: token
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

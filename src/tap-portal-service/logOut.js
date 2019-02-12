global.fetch = require('node-fetch')
const AWS = require('aws-sdk');


const { Auth } = require('./auth');
const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'ap-southeast-1'});

module.exports.handler = async (event, context, callback) => {
    const data = JSON.parse(event.body)
    const { username } = data

    let res = {}

    try {
        const result = await Auth.logOut(username);
        res = {
            statusCode: 200,
            body: JSON.stringify({
                msg: 'Users successfully logout',
                response: result
            })
        }
        callback(null, res)
    } catch(err) {
        console.log(err)
        res = {
            statusCode: 400,
            body: JSON.stringify(err)
        }
        callback(res)
    }
};

global.fetch = require('node-fetch')
const AWS = require('aws-sdk');


const { Auth } = require('./auth');

module.exports.handler = async (event, context, callback) => {
    const data = JSON.parse(event.body)
    const { username, sessionToken } = data

    let res = {}

    try {
        const token = await Auth.authorize(username, sessionToken)

        res = {
            statusCode: 200,
            body: JSON.stringify({
                msg: 'User is authorized',
                response: token
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

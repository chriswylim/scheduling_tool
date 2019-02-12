global.fetch = require('node-fetch')
const AWS = require('aws-sdk');


const { Auth } = require('./auth');

module.exports.handler = async (event, context, callback) => {
    const data = JSON.parse(event.body)
    const { username, confirmationCode, newPassword } = data

    let res = {}

    try {
        const result = await Auth.confirmForgotPassword(username, confirmationCode, newPassword)

        res = {
            statusCode: 200,
            body: JSON.stringify({
                msg: `Your password has been reset`,
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

global.fetch = require('node-fetch')
const AWS = require('aws-sdk');


const { Auth } = require('./auth');

module.exports.handler = async (event, context, callback) => {
    const data = JSON.parse(event.body)
    console.log(data)
    const { username, oldPassword, newPassword } = data

    let res = {}

    try {
        const result = await Auth.changePassword(username, oldPassword, newPassword)

        res = {
            statusCode: 200,
            body: JSON.stringify({
                msg: 'Password is changed',
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

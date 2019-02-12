const AWS = require('aws-sdk');

const lambda = new AWS.Lambda({region: 'ap-southeast-1'});

module.exports.handler = async (event, context, callback) => {
    const data = JSON.parse(event.body)
    const params = {
        FunctionName: process.env.SCHEDULE_LAMBDA,
        InvocationType: 'Event',
        Payload: JSON.stringify(data)
    }
    let res = {}
    try {
        let invokedRes = await lambda.invoke(params).promise()
        res = {
            statusCode: 200,
            body: JSON.stringify({
                msg: 'Request to generate schedule has been received',
                result: invokedRes
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

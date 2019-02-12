'use strict';
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'ap-southeast-1'});

module.exports.handler = (event, context, callback) => {
    const { scheduleId } = event.queryStringParameters
    const params = {
        TableName: process.env.AWS_DYNAMODB_TABLE,
        Key: { pK: scheduleId, sK: 'SCHEDULE' }
    }

    dynamodb.get(params, (err, data) => {
        let res = {}
        if (err) {
            console.log(err)
            res = {
                statusCode: 400,
                error: JSON.stringify(err)
            }
            callback(res)
        } else {
            res = {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Schedule fetched successfully',
                    schedule: data['Item']
                })
            }
            callback(null, res)
        }
    });
};

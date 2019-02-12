'use strict';
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'ap-southeast-1'});

module.exports.handler = (event, context, callback) => {
    const { userId } = event.pathParameters
    const params = {
        TableName: process.env.AWS_DYNAMODB_TABLE,
        Key: { pK: userId, sK: 'USER' }
    }

    dynamodb.get(params, (err, data) => {
        let res = {}
        if (err) {
            console.log(err)
            res = {
                statusCode: 400,
                body: JSON.stringify(err)
            }
            callback(res)
        } else {
            res = {
                statusCode: 200,
                body: JSON.stringify({
                    message: `User ${userId} fetched successfully`
                })
            }
            callback(null, res)
        }
    });
};

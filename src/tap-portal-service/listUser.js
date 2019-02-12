'use strict';
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'ap-southeast-1'});

module.exports.handler = (event, context, callback) => {
    const params = {
        TableName: process.env.AWS_DYNAMODB_TABLE,
        IndexName: 'sK-data-index',
        KeyConditionExpression:"#sK = :sKValue",
        ExpressionAttributeNames: {
            "#sK":"sK",
        },
        ExpressionAttributeValues: {
            ":sKValue": 'USER',
        }
    }

    dynamodb.query(params, (err, data) => {
        let res = {}
        if (err) {
            console.log(err)
            res = {
                statusCode: 400,
                body: err
            }
            callback(res)
        } else {
            res = {
                statusCode: 200,
                body: JSON.stringify({
                    msg: 'All users fetched successfully',
                    rotations: data['Items']
                })
            }
            callback(null, res)
        }
    });
};

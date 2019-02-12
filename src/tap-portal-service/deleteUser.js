const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'ap-southeast-1'});

module.exports.handler = async (event, context, callback) => {
    const { userId } = event.pathParameters
    const params = {
        TableName: process.env.AWS_DYNAMODB_TABLE,
        Key: { pK: userId, sK: 'USER' }
    }
    console.log(event.path)
    console.log(params)
    let res = {}

    try {
        await dynamodb.delete(params).promise()
        res = {
            statusCode: 200,
            body: JSON.stringify({
                msg: `User ${userId} successfully deleted`
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

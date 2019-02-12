const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'ap-southeast-1'});

module.exports.handler = async (event, context, callback) => {
    const data = JSON.parse(event.body)
    data['data'] = data['category']
    let res = {}

    const params = {
        TableName: process.env.AWS_DYNAMODB_TABLE,
        Item: data
    };

    try {
        await dynamodb.put(params).promise()
        res = {
            statusCode: 200,
            body: JSON.stringify({
                msg: `Rotation config for: ${data.name} successfully updated`
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

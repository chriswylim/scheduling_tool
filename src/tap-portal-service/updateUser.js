const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'ap-southeast-1'});

module.exports.handler = async (event, context, callback) => {
    const { userId } = event.pathParameters
    const data = JSON.parse(event.body)
    data['pK'] = userId
    data['sK'] = 'USER'
    data['data'] = `${data['status']}#${data['joinDate']}`
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
                msg: `User data for: ${data.displayName} successfully updated`
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

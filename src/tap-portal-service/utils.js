const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'ap-southeast-1'});

// Perform DynamoDB batch insert of items
const batchWrite = async (seed) => {
    const params = {
        RequestItems: {}
    };

    const formattedSeed = seed.map(item => {
        return {PutRequest: { Item: item}}
    });
    params.RequestItems[process.env.AWS_DYNAMODB_TABLE] = formattedSeed

    return dynamodb.batchWrite(params).promise()
}

module.exports = { batchWrite }

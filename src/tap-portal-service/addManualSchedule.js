const { batchWrite } = require('./utils')

module.exports.handler = async (event, context, callback) => {
    const data = JSON.parse(event.body)
    let res = {}

    try {
        await batchWrite(data);
        res = {
            statusCode: 200,
            body: JSON.stringify({
                msg: 'Schedules successfully added'
            })
        }
        callback(null, res)
    } catch(err) {
        res = {
            statusCode: 400,
            body: JSON.stringify(err)
        }
        callback(res)
    }
};

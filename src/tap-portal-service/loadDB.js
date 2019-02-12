const { batchWrite } = require('./utils')

const userSeed = require('./seed/userSeed');
const rotationSeed = require('./seed/rotationSeed');
const scheduleSeed = require('./seed/scheduleSeed');


module.exports.handler = async (event, context) => {
    try {
        // await batchWrite(rotationSeed)
        await batchWrite(userSeed)

        return {
            statusCode: 200,
            message: 'Data successfully loaded'
        }
    } catch(err) {
        return {
            statusCode: 400,
            error: err
        }
    }
};

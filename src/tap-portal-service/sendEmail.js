'use strict';
const AWS = require('aws-sdk');
const ses = new AWS.SES({region: process.env.SES_REGION})

module.exports.handler = (event, context, callback) => {
    let res = {}
    const { displayName, rotationName, startDate, endDate, mentor } = event.body

    const emailParams = {
        Source: process.env.SRC_EMAIL,
        Destination: {
          ToAddresses: [process.env.DST_EMAIL], // 
        },
        Message: {
          Body: {
            Text: {
              Charset: "UTF-8",
              Data: `Hi ${mentor}\n\nPlease be informed that our protege, ${displayName}, will be joining ${rotationName} from ${startDate} to ${endDate}.\nPlease kindly connect with ${displayName}`
            }
          },
          Subject: {
            Charset: "UTF-8",
            Data: `TAP Protege - ${displayName} joining ${rotationName} on ${startDate}`
          }
        }
    };

    ses.sendEmail(emailParams, (err, data) => {
        if (err) {
            console.log(err)
            res = {
                statusCode: 402,
                body: JSON.stringify({
                    message: 'Email failed to be sent !',
                    error: err
                }),
            }
            callback(err)
        } else {
            console.log("Success")
            res = {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Email sent succesfully !'
                }),
            }
            callback(null, res)
        }
    });
};

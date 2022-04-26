const request = require('request'),
    config = require(`${__dirname}/config/config`);

function sendMessage(senderPsid, response) {
    // Construct the message body
    let requestBody = {
        "recipient": {
            "id": senderPsid
        },
        "message": {
            "text": response
        }
    };

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": config.accessToken },
        "method": "POST",
        "json": requestBody
    }, (err, res, body) => {
        if (!err) {
            console.log('Message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

module.exports = sendMessage
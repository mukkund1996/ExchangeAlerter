const https = require("https"),
    url = require("url"),
    sendMessage = require(`${__dirname}/message`),
    config = require(`${__dirname}/config/config`);

function createExchangeAlerts(from, to) {
    let dataJson;
    const params = {
        "from": from,
        "to": to
    }
    const requestUrl = url.parse(url.format({
        "protocol": "https",
        "hostname": config.exchangeApiUri,
        "pathname": '/convert',
        "query": params,
    }));

    https.get({
        hostname: requestUrl.hostname,
        path: requestUrl.path,
    }, res => {
        let data = '';
        res.on('data', chunk => {
            data += chunk;
        });
        res.on('end', () => {
            dataJson = JSON.parse(data);
            let exchangeRate = dataJson.result;
            if (exchangeRate != null && exchangeRate >= config.rateThreshold) {
                console.log("Exchange threshold met, sending message...");
                let message = `The exchange rate is currently ${exchangeRate} when converting from ${config.fromCurrency} to ${config.toCurrency}.`;
                sendMessage(config.senderID, message);
            }
        });
    }).on('error', error => {
        console.error(error);
    });
}

module.exports = createExchangeAlerts;
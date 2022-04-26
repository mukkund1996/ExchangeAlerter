config = {
    "accessToken": process.env.ACCESS_TOKEN,
    "webhookToken": process.env.WEBHOOK_TOKEN,
    "exchangeApiUri": process.env.EXCHANGE_API_URL,
    "checkingInterval": parseFloat(process.env.CHECKING_INTERVAL),
    "rateThreshold": parseFloat(process.env.RATE_THRESHOLD),
    "senderID": process.env.SENDER_ID,
    "fromCurrency": process.env.FROM_CURRENCY,
    "toCurrency": process.env.TO_CURRENCY
};

module.exports = config;

// Checks for undeclared variables
"use strict";

// Imports dependencies and set up http server
const
    express = require('express'),
    bodyParser = require('body-parser'),
    webhookRouter = require(`${__dirname}/routes/webhook`),
    createExchangeAlerts = require(`${__dirname}/exchange`),
    config = require(`${__dirname}/config/config`),
    app = express().use(bodyParser.json()); // creates express http server

app.use("/", webhookRouter);

// Checking rates in the defined interval
console.log(`Interval set at ${config.checkingInterval} hour(s).`);
var interval = config.checkingInterval * 60 * 60 * 1000;
setInterval(function () {
    createExchangeAlerts(config.fromCurrency, config.toCurrency);
}, interval);

// Sets server port and logs message on success
app.listen(process.env.PORT || 8000, () => console.log('ExchangeAlerter is listening'));


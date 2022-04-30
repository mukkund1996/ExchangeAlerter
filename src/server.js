// Checks for undeclared variables
"use strict";

const sendMessage = require("./message");

// Imports dependencies and set up http server
const express = require("express"),
  bodyParser = require("body-parser"),
  webhookRouter = require(`${__dirname}/routes/webhook`),
  createExchangeAlerts = require(`${__dirname}/exchange`),
  config = require(`${__dirname}/config/config`),
  app = express().use(bodyParser.json()); // creates express http server

app.use("/", webhookRouter);

function checkThreshold(exchangeRate, senderID) {
  if (exchangeRate != null && exchangeRate >= config.rateThreshold) {
    console.log("Exchange threshold met, sending message...");
    let message = `The exchange rate is currently ${exchangeRate} when converting from ${config.fromCurrency} to ${config.toCurrency}.`;
    sendMessage(senderID, message);
  }
}

// Checking rates in the defined interval
console.log(`Interval set at ${config.checkingInterval} hour(s).`);
var interval = config.checkingInterval * 60 * 60 * 1000;
setInterval(function () {
  createExchangeAlerts(checkThreshold, config.senderID);
}, interval);

// Sets server port and logs message on success
app.listen(process.env.PORT || 8000, () =>
  console.log("ExchangeAlerter is listening")
);

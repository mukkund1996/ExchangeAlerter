const express = require("express"),
  sendMessage = require("../message"),
  config = require("../config/config"),
  createExchangeAlerts = require("../exchange"),
  webhookRouter = express.Router();

function checkRate(exchangeRate, senderID) {
  if (exchangeRate != null) {
    console.log("Checking and reporting the exchange rate.");
    let message = `Exchange rate report:\nIt is currently ${exchangeRate} when converting from ${config.fromCurrency} to ${config.toCurrency}.`;
    sendMessage(senderID, message);
  }
}

// Creates the endpoint for our webhook
webhookRouter.post("/webhook", (req, res) => {
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === "page") {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      let webhookEvent = entry.messaging[0];
      if (webhookEvent.message && webhookEvent.message.text) {
        let recipientMessage = webhookEvent.message.text;
        const matchPattern = new RegExp(config.responsePattern);
        if (matchPattern.test(recipientMessage)) {
          createExchangeAlerts(checkRate, webhookEvent.sender.id);
        } else {
          let responseText =
            "This is a forex bot. Send 'Check rate' to see the rates";
          sendMessage(webhookEvent.sender.id, responseText);
        }
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

// Adds support for GET requests to our webhook
webhookRouter.get("/webhook", (req, res) => {
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === config.webhookToken) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

webhookRouter.get("/", (req, res) => {
  res.send("Hello world!");
});

module.exports = webhookRouter;

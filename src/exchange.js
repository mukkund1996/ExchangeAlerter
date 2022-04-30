const https = require("https"),
  url = require("url"),
  sendMessage = require(`${__dirname}/message`),
  config = require(`${__dirname}/config/config`);

function createExchangeAlerts(callbackFunc, senderID) {
  let dataJson;
  const params = {
    from: config.fromCurrency,
    to: config.toCurrency,
  };
  const requestUrl = url.parse(
    url.format({
      protocol: "https",
      hostname: config.exchangeApiUri,
      pathname: "/convert",
      query: params,
    })
  );

  https
    .get(
      {
        hostname: requestUrl.hostname,
        path: requestUrl.path,
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          dataJson = JSON.parse(data);
          let exchangeRate = dataJson.result;
          callbackFunc(exchangeRate, senderID);
        });
      }
    )
    .on("error", (error) => {
      console.error(error);
    });
}

module.exports = createExchangeAlerts;

# ExchangeAlerter
Simple NodeJS bot that sends you alerts over facebook messages when the specified rate between two currencies is reached or exceeded. 

## Usage
### Environment Variables
The following parameters need to be specified through environment variables:

- `ACCESS_TOKEN`: Meta developer access token required to be generated for the page.
  
- `WEBHOOK_TOKEN`: Webhook verification message needed to be set to authenticate with the webserver. *(Optional)*
  
- `EXCHANGE_API_URL`: Currency exchange API used. *Recommended API: `api.exchangerate.host/latest`*
  
- `CHECKING_INTERVAL`: Interval of checking the currency exchange rates. 
  
- `RATE_THRESHOLD`: The threshold above which a facebook message is sent to the user.
   
- `SENDER_ID`: The ID of the recipient.
  
- `FROM_CURRENCY`: Currency keyword *(Refer API documentation)*
  
- `TO_CURRENCY`: Currency keyword *(Refer API documentation)*

### Run the program
Use the command:
```bash
npm start
```
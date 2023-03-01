

const fetch = require("node-fetch");
const twilio = require("twilio");

// const handler = async function (event) {
//   try {
//     const accountSid = process.env.TWILIO_ACCOUNT_SID;
//     const authToken = process.env.TWILIO_AUTH_TOKEN;
//     const client = twilio(accountSid, authToken);

//     console.log("Account SID:", accountSid);
//     console.log("Auth token:", authToken);

//     const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         From: process.env.TWILIO_PHONE_NUMBER,
//         To: event.body.to,
//         Body: event.body.body,
//       }),
//       auth: `${accountSid}:${authToken}`,
//     });
//     if (!response.ok) {
//       NOT res.status >= 200 && res.status < 300
//       return { statusCode: response.status, body: response.statusText };
//     }
//     const data = await response.json();
//     console.log(data);

//       client.messages.create({
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: event.body.to,
//       body: event.body.body
//     });

//     return {
//       statusCode: 200,
//       body: JSON.stringify({ success: true }),
//     };
//   } catch (error) {
//     output to netlify function log
//     console.log(error);
//     return {
//       statusCode: 500,
//       Could be a custom message or object i.e. JSON.stringify(err)
//       body: JSON.stringify({ success: false, error: error.message }),
//     };
//   }
// };

// module.exports = { handler };
const handler = async function (event) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);
  try {
    

    // get the phone number and message body from event data
    const { to, body } = JSON.parse(event.body);
    console.log("THIS IS MY ENV", accountSid);

    // make a fetch request to Twilio API
    const response = await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
      body
    });

    // log the response for debugging purposes
    console.log(response);

    // return a success status code and data
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    // log the error for debugging purposes
    console.error(error);

    // return an error status code and data
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};

module.exports = { handler };

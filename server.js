const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
require('dotenv').config();
const client = require("twilio")(
  process.env.REACT_APP_TWILIO_ACCOUNT_SID,
  process.env.REACT_APP_TWILIO_AUTH_TOKEN
); 

const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post(url, (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: process.env.REACT_APP_TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body
    })
    .then(() => {
      console.log("Response:", JSON.stringify({ success: true }));
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () =>
  console.log(`Express server is running on port ${port}`)
);
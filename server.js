const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
require('dotenv').config();
const client = require("twilio")(
  process.env.REACT_APP_TWILIO_ACCOUNT_SID,
  process.env.REACT_APP_TWILIO_AUTH_TOKEN
); 
const accountSid = process.env.REACT_APP_TWILIO_ACCOUNT_SID;
const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: process.env.REACT_APP_TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body
    })
    .then(() => {
      console.log(client.messages)
      res.send(JSON.stringify({ success: true }));
      console.log(res)
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

const port = process.env.PORT || 3001;
app.listen(port, () =>
  console.log(`Express server is running on port ${port}`)
);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
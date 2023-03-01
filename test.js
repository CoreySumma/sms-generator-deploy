var RequestClient = require('twilio/lib/base/RequestClient');

var client = new RequestClient();
client.request({
    method: 'GET',
    uri: 'https://api.twilio.com:8443'
}).
then(function(response){
  console.log(response.body);
});

const twilio = require('twilio');
const { toJson } = require('../');

const client = twilio();

client.messages.list({ limit: 1 }).then(([el]) => {
  console.log(toJson(el));
});

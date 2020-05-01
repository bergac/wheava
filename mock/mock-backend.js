const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const auth = require('./auth');
app.post('/oauth/token**', auth.getToken);
app.get('/', function (req, res) {
  res.send(req.params);
});

const port = process.env.PORT || 8081;
app.listen(port, function () {
  console.log('Listening on ' + port);
});

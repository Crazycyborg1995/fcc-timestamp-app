const express = require('express');

const app = express();

const port = process.env.PORT || 3000;
// enable cors
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));

function timeStamp(date) {
  let unix = date.getTime();
  let utc = date.toUTCString();
  return { unix, utc };
}

// http://expressjs.com/en/starter/static-files.html
// this enables css
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/:date_string', (req, res) => {
  let date = new Date(req.params.date_string);
  
  res.status(200).send(timeStamp(date));
});

app.get('/api/timestamp/', (req, res) => {
  let date = new Date();
  res.status(200).send(timeStamp(date));
});

app.listen(port, () => {
  console.log(`Server started on port : ${port}`);
});

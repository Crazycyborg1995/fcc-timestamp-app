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
  let dateString = req.params.date_string;
  let date;
  if (dateString.includes('-')) {
    date = new Date(dateString);
  } else {
    date = new Date(parseInt(dateString));
  }
  if (date == 'Invalid Date') {
    return res.status(200).json({ error: 'Invalid Date' });
  }
  res.status(200).json(timeStamp(date));
});

app.get('/api/timestamp/', (req, res) => {
  let date = new Date();
  res.status(200).json(timeStamp(date));
});

app.listen(port, () => {
  console.log(`Server started on port : ${port}`);
});

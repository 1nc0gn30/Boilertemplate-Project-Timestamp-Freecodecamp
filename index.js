// index.js
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

// Basic endpoint to serve the index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Hello API endpoint
app.get("/api/hello", (req, res) => {
  res.json({ greeting: 'hello API' });
});

// Date API endpoint
app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  let inputDate;
  if (!date) {
    inputDate = new Date();
  } else {
    // Check if date is a valid timestamp or a date string
    if (/^\d+$/.test(date)) {
      inputDate = new Date(parseInt(date));
    } else {
      inputDate = new Date(date);
    }
  }

  // Check if inputDate is a valid date
  if (isNaN(inputDate.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: inputDate.getTime(),
      utc: inputDate.toUTCString()
    });
  }
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

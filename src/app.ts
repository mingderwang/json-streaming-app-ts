import express, { Response } from 'express';
import { ServerResponse } from 'http';

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function generateJSONData() {
  return {
    message: 'This is a JSON data stream',
    timestamp: new Date().toLocaleString(),
  };
}

app.get('/stream-json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.write('[');
  let firstData = true;
  const interval = setInterval(() => {
    if (!firstData) {
      res.write(',');
    }
    firstData = false;
    const jsonData = generateJSONData();
    res.write(JSON.stringify(jsonData));
    res.write('\n');
    // Send the response immediately
    (res as Response).flushHeaders();
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);
    res.write(']');
    res.end();
  }, 10000);
});


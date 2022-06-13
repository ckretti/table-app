const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 4000;

const db = require('./queries');

app.use(cors({
  origin: '*'
}));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.post('/records', db.getRecords);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

const { config } = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');

const Books = require('./routes/Books');

config();

const {
  BODY_LIMIT,
  PORT,
} = process.env;

const app = express();

app.disable('x-powered-by');

/* Express utilities */
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.json({
  limit: BODY_LIMIT,
}));

app.get(['/', '/status'], (req, res) => {
  res.send('ok');
});

app.use('/books', Books);

app.all('*', (req, res) => {
  res.status(404).send({
    success: false,
    message: 'Not found.',
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

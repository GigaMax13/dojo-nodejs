import { config } from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';

import Authors from './routes/Authors';

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

app.use('/authors', Authors);

app.all('*', (req, res) => {
  res.status(404).send({
    success: false,
    message: 'Not found.',
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}`);
});

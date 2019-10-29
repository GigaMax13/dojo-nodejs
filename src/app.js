import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';

import Environment from './config/Environment';
import Authors from './routes/Authors';

const {
  BODY_LIMIT,
  PORT,
} = Environment;

const app = express();

app.disable('x-powered-by');

/* Express utilities */
/*
* Helmet helps you secure your Express apps by setting various HTTP headers.
* */
app.use(helmet());

/*
* CORS is a node.js package for providing a Connect/Express middleware that can
* be used to enable CORS with various options.
* */
app.use(cors());

/*
*  Node.js compression middleware.
* */
app.use(compression());

/*
* Node.js body parsing middleware.
*
* Parse incoming request bodies in a middleware before your handlers,
* available under the req.body property.
* */
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

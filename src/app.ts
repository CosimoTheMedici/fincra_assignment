import 'reflect-metadata';
import express from 'express';
import * as bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import methodOverride from 'method-override';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import {appEnv} from './config';
import corsOptions from './config/corsOptions';

const app = express();
app.use(cors(corsOptions));



app.use(bodyParser.json());

app.set('port', process.env.PORT);

app.set('env', appEnv);

app.use(
  compression({
    filter: (req: express.Request, res: express.Response) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    },
  }),
);

app.use(bodyParser.json());

app.use(helmet());
app.disable('x-powered-by');

app.use(methodOverride());

const router = express.Router();

router.use(routes);
app.use(router);

export default app;

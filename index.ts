import dotenv from 'dotenv';
dotenv.config();
import app from './src/app';
import { Logger } from './src/utils/Logger';

import mongoose from 'mongoose';

import { seedBaseData } from './src/seed-config/seedConfig';


(async () => {
  mongoose.connect(`${process.env.MONGODB_URI}`, { autoCreate: true }).then(async () => {
    Logger.Info('DB Connected successfully!');

    seedBaseData().then(() => {

      // Start express server
      app.listen(process.env.PORT || 3000, () => {
        const port = app.get('port');

        Logger.Info(`Application Started at http://localhost:${port}`);
      });

    }).catch(error => {
      Logger.Error('DB Seeding not successful  : ', error);
    });
  }).catch(error => Logger.Error('MongoDB did not Connect :' + error));
})();

import express, { Request, Response, NextFunction } from "express";
import config from './config/config'
import logger from "./config/logger";
import bodyParser from "body-parser";
import userRoutes from './routs/users'
import moviesRoutes from './routs/movies'
import middleware from "./controllers/middleware";
import mongoose, {Mongoose} from "mongoose";

const app = express();

mongoose.connect(`mongodb+srv://${config.mongo.username}:${config.mongo.password}@${config.mongo.host}`)  
.then(    (result: Mongoose) => {      logger.info('mongo is connected');    })  
.catch((error) => {    logger.error(error.message, error);  }  )

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`METHOD: [${req.method}] - IP: [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    logger.info(`METHOD: [${req.method}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`)
  });
  next();
});

//TODO ADD valid routs here
app.use('/api', userRoutes);
app.use('/api', middleware.verifiedToken, moviesRoutes);

app.use((_: Request, res: Response) => {
  const error = new Error('NotFound');
  logger.error(error.message);
  res.status(404).json({ message: error.message });
});

app.listen(parseInt(config.server.port), () => {
  logger.info(`API is running in ${config.server.hostname} on port: ${config.server.port}`)
});

logger.error("Error");

logger.info("Info");

import express from 'express';
import webpack from 'webpack';
import redis from 'redis';
import { isDebug } from '../config/app';
import initExpress from './init/express';
import initRoutes from './init/routes';
import renderMiddleware from './render/middleware';

const app = express();

if (isDebug) {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack/webpack.config');

  const devBrowserConfig = webpackConfig('browser');
  const compiler = webpack(devBrowserConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: devBrowserConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

initExpress(app);
const redisClient = redis.createClient();
initRoutes(app, redisClient);

app.get('*', renderMiddleware);

app.listen(app.get('port'));

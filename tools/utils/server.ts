const steam = require('bilious-steam-adventure');
import * as connectLivereload from 'connect-livereload';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as minilrFn from 'mini-lr';
import * as openResource from 'open';
import * as serveStatic from 'serve-static';
import {resolve} from 'path';
import {APP_BASE, LIVE_RELOAD_PORT, PATH, PORT, ENV} from '../config';

let minilr = minilrFn();


export function serveSPA() {
  let server = express();
  server.use(bodyParser.json());
  minilr.listen(LIVE_RELOAD_PORT);

  const api = express.Router();

  api.get('/search', function(req, res) {
    steam.storeSearch(req.query.term)
    .spread(function(r, body) {
      res.send(body);
    });
  });


  // https://steamdb.info/api/GetPriceHistory/?appid=378850\&cc=us
  server.use('/api', api);

  server.use(
    APP_BASE,
    connectLivereload({ port: LIVE_RELOAD_PORT }),
    serveStatic(resolve(process.cwd(), PATH.dest[ENV].all))
  );

  server.all(APP_BASE + '*', (req, res) =>
    res.sendFile(resolve(process.cwd(), PATH.dest[ENV].all, 'index.html'))
  );

  server.listen(PORT, () =>
    openResource('http://localhost:' + PORT + APP_BASE)
  );
}

export function notifyLiveReload(e) {
  let fileName = e.path;
  minilr.changed({
    body: { files: [fileName] }
  });
}

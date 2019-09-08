import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import App from '../common/App.js'

const PORT = process.env.PORT || 3006;
const app = express();


app.use('/auth/jquery',express.static('node_modules/jquery/dist'));
app.use('/auth/bootstrap',express.static('node_modules/bootstrap/dist'));
app.use('/auth/app',express.static('dist/web'));

app.get('/*', (req, res) => {
  const app = ReactDOMServer.renderToString(<App />);

  const indexFile = path.resolve('./public/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Request error.', err);
      return res.status(500).send('Request error');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port.. ${PORT}`);
});

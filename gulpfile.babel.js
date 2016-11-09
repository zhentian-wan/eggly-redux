'use strict';

import gulp     from 'gulp';
import webpack  from 'webpack';
import path     from 'path';
import sync     from 'run-sequence';
import serve    from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const root = 'client';

// helper method for resolving paths
const resolveToApp = (glob) => {
  glob = glob || '';
  return path.join(root, 'app', glob); // app/{glob}
};

// map of all paths
const paths = {
  js: resolveToApp('**/*!(.spec.js).js'), // exclude spec files
  css: resolveToApp('**/*.css'), // stylesheets
  html: [
    resolveToApp('**/*.html'),
    path.join(root, 'index.html')
  ],
  output: path.resolve(__dirname, root)
};

gulp.task('serve', () => {
  let config = require('./webpack.config');
  const compiler = webpack(config);

  serve({
    port: 3333,
    open: false,
    server: { baseDir: root },
    middleware: [
      webpackDevMiddleware(compiler, {
        stats: {
          modules: false,
          chunks: false
        }
      }),
      webpackHotMiddleware(compiler)
    ]
  });
});

gulp.task('default', (done) => {
  sync('serve', done);
});

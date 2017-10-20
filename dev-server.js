var path = require('path');
var opn = require('opn')
var express = require('express');
var webpack = require('webpack');
var proxyMiddleware = require('http-proxy-middleware');
var webpackConfig = require('./webpack.config.js');

var port = process.env.PORT || 3001;
var server = express();
var compiler = webpack(webpackConfig);
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    stats: {
        colors: true,
        chunks: false
    }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})

server.use(require('connect-history-api-fallback')())
server.use(devMiddleware)
server.use(hotMiddleware)
server.use(express.static('build'), express.static('demo'))

server.listen(port, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    var uri = 'http://localhost:' + port;
    console.log('Listening at ' + uri + '\n')
    opn(uri);
})
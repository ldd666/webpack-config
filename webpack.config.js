const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const es3ifyPlugin = require('es3ify-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

if (!process.env.NODE_ENV) {
	throw 'error～～～请检查参数！'
}

const uglifyOpt = {
    ie8: false,
    compress: {
        properties: false,
        warnings: false
    },
    output: {
        beautify: true,
        quote_keys: true
    },
    mangle: false
};

let config = {
	context: __dirname,
	entry: {
		'main': `./src/${process.env.NODE_ENV}/index.js`
	},
	output: {
		path: path.join(__dirname, './dist', process.env.NODE_ENV),
		filename: '[name].js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: ['node_modules', path.join(__dirname, './src/module/livecloud.js')],
			loader: 'babel-loader',
			options: {
				presets: ['es2015']
			}
		}, {
			test: /\.css$/,
			exclude: ['node_modules'],
			use: ['style-loader', 'css-loader']
		}]
	},
	resolve: {
		extensions: ['.js']
	},
	devtool:'source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: `./src/${process.env.NODE_ENV}/index.html`
		}),
        new es3ifyPlugin(),
        new ParallelUglifyPlugin({
      		uglifyJS: uglifyOpt
    	})

	]
};



module.exports = config;
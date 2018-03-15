const webpack 	= require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const isProd = process.env.NODE_ENV !== 'development';
const folder = isProd ? 'dist' : 'build';

module.exports = {
   entry : {
   	'app' : ['./src/css/app.css']
   },
   output : {
      filename : `${folder}/css/[name].css`
   },
   module: {
     rules : [
     	{
	    test  : /\.css$/,
	    use   : ExtractTextPlugin.extract({
	       fallback  : 'style-loader',
	       use       : [
		        {
		        	loader   : 'css-loader',
		        	options  : {
			        	minimize : isProd 
		        	}
		        }
	        ]
	    })
	},
	{
	    test  : /\.(png|jpg|gif)$/,
	    use   : [
	       {
	          loader   : 'file-loader',
			  options  : {
			     name  : '../../assets/img/[name].[ext]',	           
	             // publicPath : '/assets/media/',
	             emitFile : false
			  }
	       }
	    ]
	}
     ]
   },
   watch   : !isProd,
   plugins : [
      new ExtractTextPlugin({filename : `./${folder}/css/[name].css`}),

      new BrowserSyncPlugin({
      	port  : 9090,
      	host  : 'localhost',
      	open  : true   
      })
   ]
}

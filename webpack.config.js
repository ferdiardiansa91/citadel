const webpack 	= require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log(process.env.NODE_ENV)

module.exports = {
   entry : {
   	'app' : ['./dist/css/app.css']
   },
   output : {
      filename : ((!process.env.NODE_ENV) ? 'build' : 'dist') + '/css/[name].css'
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
			        	minimize : !process.env.NODE_ENV 
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
   plugins : [
      new ExtractTextPlugin({filename : './build/css/[name].css'})
   ]
}

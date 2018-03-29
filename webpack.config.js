const webpack 	= require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path      = require('path');

const isProd = process.env.NODE_ENV !== 'development';
const folder = isProd ? 'dist' : 'build';

module.exports = {
   entry : {
    'app'    : ['./src/js/app.js'],
   	// 'map'    : ['./src/js/map.js'],
    'vendor' : [
              'jquery',
              './src/js/slick/slick.min.js', 
              './src/js/datepicker/datepicker.js',
              'bootstrap',
              'lightgallery'
    ]
   },
   output : {
      // path          :  path.resolve(__dirname, folder),
      filename      : isProd ? `${folder}/js/[name].min.js` : `${folder}/js/[name].js`,
      chunkFilename : isProd ? `${folder}/js/[name].min.js` : `${folder}/js/[name].js`
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
          test     : /\.js$/,
          exclude  : /node_modules/ 
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
  		},
  		{
          test: /\.(eot|ttf|woff|woff2)$/,
          loader: 'file-loader',
          options : {
          	name : '../../assets/fonts/AvenirNext/[name].[ext]',
          	emitFile : false,
          	// useRelativePath : true
          }
      },
      {
          test: require.resolve('jquery'),
          use: [{
              loader: 'expose-loader',
              options: 'jQuery'
          },{
              loader: 'expose-loader',
              options: '$'
          }]
      }
    ]
   },
   watch   : !isProd,
   plugins : [
      new ExtractTextPlugin({filename : (isProd) ? `${folder}/css/[name].min.css` : `${folder}/css/[name].css`}),

      // Bundle vendor
      new webpack.ProvidePlugin({
        $      : 'jquery',
        jQuery : 'jquery',
        jquery : 'jquery',
        'window.jQuery': 'jquery'
      }),
      new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: (isProd) ? `${folder}/js/vendor.min.js` : `${folder}/js/vendor.js`}),


      // Ugligfy JS File
      new webpack.optimize.UglifyJsPlugin({
        include : /\.min\.js$/,
        minimize: isProd
      }),

      new BrowserSyncPlugin({
      	port  : 9090,
      	host  : 'localhost',
      	open  : true   
      })
   ]
}

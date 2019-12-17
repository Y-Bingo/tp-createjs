/**
 * 开发环境配置
 */
const utils = require( "./utils" );

const webpack = require( 'webpack' );
const merge = require( 'webpack-merge' );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );

const comConfig = require( './webpack.com' );

const dev = {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './bin-debug',
        open: true,
        port: 9645,
        hot: true,
        compress: true
    },
    optimization: {
        usedExports: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin( {
            gameName: 'Dev',
            template: utils.resolve( "temp/index.html" ),
            inject: true
        } )
    ]
};

module.exports = merge( comConfig, dev );

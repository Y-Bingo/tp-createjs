/**
 * 发布环境配置
 */
const utils = require( "./utils" );
const comConfig = require( './webpack.com' );

const webpack = require( 'webpack' );
const merge = require( 'webpack-merge' );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );

const { CleanWebpackPlugin } = require( "clean-webpack-plugin" );

const prod = {
    mode: 'production',
    // devtool: 'cheap-module-source-map',
    output: {
        path: utils.resolve( "bin-release/" ),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                            importLoaders: 1
                        }
                    }
                ]

                // [
                // MiniCssExtractPlugin.loader,
                // "css-loader"

                // ]
            },
            // {
            //     test: /\.(jpg|png|gif)$/,
            //     loader: 'url-loader',
            //     options: {
            //         // placeholder 占位符
            //         limit: 10240,
            //         name: '[name].[hash:7].[.ext]',
            //         outputPath: 'images/'
            //     }
            // },
            // {
            //     test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
            //     loader: "file-loader",
            //     options: {
            //         name: "[name].[hash:7].[.ext]",
            //         outputPath: "fonts/"
            //     }
            // }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                createJS: {
                    test: /[\\/]createjs[\\/]/,
                    chunks: "all"
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin( {} ),
        // new ExtractTextWebpackPlugin( { //样式文件单独打包
        //     filename: "[name].min.css",  //指定生成的文件名称
        //     disable: false,  //是否禁用此插件
        //     allChunks: true
        // } ),
        new HtmlWebpackPlugin( {
            gameName: 'My CreateJS Game',
            template: utils.resolve( "temp/index.html" ),
            // showErrors: true,
            // inject: true,
            hash: true,//是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值
            inject: true,
        } )
    ]
};

module.exports = merge( comConfig, prod );

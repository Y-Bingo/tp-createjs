/**
 * 公共环境配置
 */
const utils = require( "./utils" );

const webpack = require( "webpack" );
const CopyWebpackPlugin = require( "copy-webpack-plugin" );

// 辅助插件
const SimpleProgressPlugin = require( "webpack-simple-progress-plugin" );       // 控制台编译进度插件

module.exports = {
    entry: [ utils.resolve( "src/main.ts" ) ],
    resolve: {
        extensions: [ '.ts', '.tsx', '.js', "json" ],
        alias: {
            "@libs": utils.resolve( "/libs" )
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                // include: utils.resolve( '/src' ),
                loader: 'ts-loader'
            },
            {
                test: /(easeljs|preloadjs|tweenjs|soundjs|createjs)\.min\.js$/,
                loader: 'imports-loader?this=>window!exports-loader?window.createjs',
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    // placeholder 占位符
                    limit: 10240,
                    name: '[name].[hash:7].[.ext]',
                    outputPath: 'image/'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[hash:7].[.ext]",
                    outputPath: "fonts/"
                }
            }
        ]
    },
    plugins: [
        new SimpleProgressPlugin(),
        new CopyWebpackPlugin( [
            {
                from: utils.resolve( 'temp' ),
                to: "./",
            },
            {
                from: utils.resolve( 'resource' ),
                to: './resource',
            }
        ] )
    ]
};

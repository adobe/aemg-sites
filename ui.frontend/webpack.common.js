'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const SOURCE_ROOT = __dirname + '/src/main/webpack';

const resolve = {
    extensions: ['.js', '.ts'],
    plugins: [new TSConfigPathsPlugin({
        configFile: './tsconfig.json'
    })]
};

module.exports = {
    resolve: resolve,
    entry: {
        site: SOURCE_ROOT + '/site/main.ts',
        automotive_global: SOURCE_ROOT + '/clientlibs/automotive/global/main.ts',
        automoitve_toc: SOURCE_ROOT + '/clientlibs/automotive/toc/main.ts',
        'automotive_topic-body': SOURCE_ROOT + '/clientlibs/automotive/topic-body/main.ts',

        //fsi
        'fsi_topic-body':  SOURCE_ROOT + '/clientlibs/fsi/topic-body/main.ts',
        'fsi_global':  SOURCE_ROOT + '/clientlibs/fsi/global/main.ts',
        'fsi_toc' : SOURCE_ROOT + '/clientlibs/fsi/toc/main.ts',
        'fsi_mini-toc' : SOURCE_ROOT + '/clientlibs/fsi/mini-toc/main.ts',
        'fsi-landing-banner' : SOURCE_ROOT + '/clientlibs/fsi/fsi-landing-banner/main.ts',
        
        // hi-tech
        'hi-tech_topic-body' : SOURCE_ROOT + '/clientlibs/hi-tech/topic-body/main.ts',
        'hi-tech_global' : SOURCE_ROOT + '/clientlibs/hi-tech/global/main.ts',
        'hi-tech_toc' :  SOURCE_ROOT + '/clientlibs/hi-tech/toc/main.ts',

        //common
        'guides-footer': SOURCE_ROOT + '/clientlibs/guides-footer/main.ts',
        'guides-header' : SOURCE_ROOT + '/clientlibs/guides-header/main.ts',


    },
    output: {
        filename: (chunkData) => {
            let chunkName = chunkData.chunk.name
            return `clientlib-${chunkName}/[name].js`;
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    },
                    {
                        loader: 'glob-import-loader',
                        options: {
                            resolve: resolve
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins() {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                    },
                    {
                        loader: 'glob-import-loader',
                        options: {
                            resolve: resolve
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ESLintPlugin({
            extensions: ['js', 'ts', 'tsx']
        }),
        new MiniCssExtractPlugin({
            filename: 'clientlib-[name]/[name].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, SOURCE_ROOT + '/resources'), to: './clientlib-site/' }
            ]
        })
    ],
    stats: {
        assetsSort: 'chunks',
        builtAt: true,
        children: false,
        chunkGroups: true,
        chunkOrigins: true,
        colors: false,
        errors: true,
        errorDetails: true,
        env: true,
        modules: false,
        performance: true,
        providedExports: false,
        source: false,
        warnings: true
    }
};

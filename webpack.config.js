var webpack = require('webpack');
var path = require('path');
var rootPath = path.resolve(__dirname);//项目根目录
var SRC = path.join(rootPath, 'app'); //开发源码目录
TEM_PATH = path.resolve(SRC, 'templates');
var HtmlWebpackPlugin = require('html-webpack-plugin');
process.env.NODE_ENV = 'production';
env = process.env.NODE_ENV.trim();
var isProduction = process.env.NODE_ENV === 'production';
module.exports = {
    //enable dev source map
    devtool: 'inline-source-map',
    entry: {
        index: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            'react-hot-loader/patch',
            path.join(SRC, 'views/index.js')
        ],
        login:[
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            'react-hot-loader/patch',
            path.join(SRC, 'views/index.js')
        ]
    },
    output: {
        path: path.join(__dirname, './dist/'), //图片和js会放在这里
        filename: '[name].js',
        publicPath: '/', //访问内存中的路径 实现热更新的必要(包括生成图片的地址)
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            // ================================
            // 自定义路径别名
            // ================================
            ASSET: path.join(SRC, 'assets'),
            COMPONENT: path.join(SRC, 'components'),
            ACTION: path.join(SRC, 'redux/actions'),
            REDUCER: path.join(SRC, 'redux/reducers'),
            STORE: path.join(SRC, 'redux/store'),
            ROUTE: path.join(SRC, 'routes'),
            // SERVICE: path.join(SRC, 'services'),
            UTIL: path.join(SRC, 'utils'),
            // LOGIN: path.join(SRC,'components/login')
            // HOC: path.join(SRC, 'utils/HoC'),
            // MIXIN: path.join(SRC, 'utils/mixins'),
            // VIEW: path.join(SRC, 'views')
        }
    },
    resolveLoader: {
        root: path.join(rootPath, 'node_modules')
    },
    module: {
        loaders: [
            {
                test: require.resolve('jquery'),
                loader: 'expose?jQuery!expose?$'
            },
            {
                // edit this for additional asset file types
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=819200'
            },
            {
                test: /\.jsx?$/,
                // excluding some local linked packages.
                // for normal use cases only node_modules is needed.
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?sourceMap'
            },
            {
                test: /\.scss$/,
                loader: "style!css!sass?sourceMap"
            },
            {
                test: /\.less?$/,
                loaders : [
                    'style-loader',
                    'css-loader',
                    'less-loader?{"sourceMap":true}'
                ],
                include: __dirname
            },
            // {
            //     test: /\.(woff|svg|eot|ttf)\??.*$/,
            //     loader: 'url-loader?limit=50000&name=[path][name].[ext]',
            //     exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//
            // }
            { test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/, loader: 'file' }
        ]
    },
    // example: if you wish to apply custom babel options
    // instead of using vue-loader's default:
    // babel: {
    //     presets: ['es2015', 'stage-0', 'react'],
    //     plugins: ['transform-runtime', ["antd", {"style": "css"}]]
    // },
    plugins: [
        // webpack gives your modules and chunks ids to identify them. Webpack can vary the
        // distribution of the ids to get the smallest id length for often used ids with
        // this plugin
        new HtmlWebpackPlugin({
            template: path.join(TEM_PATH, 'index.tpl.html'),
            inject: 'body',
            filename: 'index.html',
            chunks:['index',]
        }),
        new HtmlWebpackPlugin({
            template: path.join(TEM_PATH, 'login.tpl.html'),
            inject: 'body',
            filename: 'login.html',
            chunks: ['login',]
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            React: "react",
            ReactDom: "react-dom"
        }),
        new webpack.IgnorePlugin((/\.\/index.js$/))
        // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js', Infinity) // 这是第三方库打包生成的文件
    ],
    //配置eslint
    // eslint: {
    //     configFile: '.eslintrc',
    //     failOnWarning: false,
    //     failOnError: false
    // },

};
// if (process.env.NODE_ENV !== 'production') {
//     module.exports.plugins = [
//         new webpack.DefinePlugin({
//             'process.env': {
//                 NODE_ENV: JSON.stringify('production')
//             }
//         }),
//         new webpack.optimize.UglifyJsPlugin({
//             compress: {
//                 warnings: false
//             }
//         }),
//         new webpack.optimize.OccurenceOrderPlugin()
//     ]
// } else {
//     module.exports.devtool = '#source-map'
// }
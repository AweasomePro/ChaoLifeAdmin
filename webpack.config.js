var webpack = require('webpack');
var path = require('path');
var rootPath = path.resolve(__dirname);//项目根目录
var src = path.join(rootPath,'app'); //开发源码目录
TEM_PATH = path.resolve(rootPath,'templates')
var HtmlWebpackPlugin = require('html-webpack-plugin');
process.env.NODE_ENV = 'production';
env = process.env.NODE_ENV.trim();

module.exports = {
    //enable dev source map
    devtool: 'eval-source-map',
    // entry: {
    //     main: './src/main.js',
    //     vendors: ['react','jquery']
    // },
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.join(__dirname, 'app/index.js')
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            // ================================
            // 自定义路径别名
            // ================================
            ASSET: path.join(src, 'assets'),
            COMPONENT: path.join(src, 'components'),
            ACTION: path.join(src, 'redux/actions'),
            REDUCER: path.join(src, 'redux/reducers'),
            STORE: path.join(src, 'redux/store'),
            ROUTE: path.join(src, 'routes'),
            // SERVICE: path.join(src, 'services'),
            UTIL: path.join(src, 'utils'),
            // LOGIN: path.join(src,'components/login')
            // HOC: path.join(src, 'utils/HoC'),
            // MIXIN: path.join(src, 'utils/mixins'),
            // VIEW: path.join(src, 'views')
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
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            }
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
        new webpack.optimize.OccurenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: 'app/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
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
        // new HtmlwebpackPlugin({
        //     title: 'Hello World app',
        //     template: path.resolve(TEM_PATH, 'index.html'),
        //     filename: 'index.html',
        //     //chunks这个参数告诉插件要引用entry里面的哪几个入口
        //     chunks: ['main', 'vendors'],
        //     //要把script插入到标签里
        //     inject: 'body'
        // })

        // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js', Infinity) // 这是第三方库打包生成的文件
    ],
    //配置eslint
    // eslint: {
    //     configFile: '.eslintrc',
    //     failOnWarning: false,
    //     failOnError: false
    // },

    //enable dev server
    // devServer: {
    //     historyApiFallback: true,
    //     hot: true,
    //     inline: true,
    //     progress: true,
    //     proxy: {
    //         '/api/*': {
    //             target: 'http://114.55.144.169/',
    //             secure: false
    //         }
    //     }
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
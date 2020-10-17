const path = require('path')
const webpack =require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin =require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin= require('terser-webpack-plugin')
module.exports = {
    mode: 'none',
    entry: ['babel-polyfill','./src/main.js'],  //入口文件
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    // resolve:{
    //     extensions:['.js','.vue','.json'],
    //     alias:{
    //         'assets':resolve('src/assets'),
    //     }
    // },
    optimization:{
        minimizer:[
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    },
    devServer:{
        hot:true
    },
    module: {
        rules: [
            {
               test:/\.js$/,
               exclude:/node_modules/,
               use:[
                   {
                       loader:'babel-loader',
                       options:{
                        presets:['@babel/preset-env'] //转码规则
                       }
                   } ,    
                   {
                    loader:'eslint-loader',
                   
                } ,    
                   
                ],
            //    enforce:'pre'//设置loader优先级
            },
            {
                test: /\.less$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },{
                test: /\.css$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: 'file-loader',
                        options:{
                            esModule:false,
                        }
                    }
                   
                ],
               
            }, {
                test: /\.vue$/,
                loader: 'vue-loader'
            },{
                test:/\.html$/,
                loader:'html-loader',
                exclude:path.join(__dirname, './public/index.html'),
                options:{
                    attributes:{
                        list: [
                            // All default supported tags and attributes
                            {
                              tag: 'img',
                              attribute: 'data-src',
                              type: 'src',
                            }
                          ],
                    }
                }
            }
        ]
    },
    plugins: [
        
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        //生成index.html,一个实例对象对应一个页面
            
        new HtmlWebpackPlugin({
            title:'webpack vue plugin',
            meta:{
                viewport:'width=device-width'
            },
            template:'./public/index.html', 
             minify: {
				html5: true,
				collapseWhitespace: true,
				preserveLineBreaks: false,
			    minifyCSS: true,
				minifyJS: true,
				removeComments: false
			}
        }),
        new webpack.DefinePlugin({
            // BASE_URL
            // BASE_URL:JSON.stringify('https//:app.example.com/')
            BASE_URL: '"https://app.example.com/"'
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash:8].bundle.min.css'
        }),
        new webpack.HotModuleReplacementPlugin()
        // new OptimizeCssAssetsWebpackPlugin()
        // new CopyWebpackPlugin(['public']), 
    ]
}
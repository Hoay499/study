 1. 安装 webpack  webpack-cli --dev
 2. webpack配置文件
 3. 定义入口和出口
 4. 使用插件完成文件的加载编译转换压缩
   loder 
   1。js文件
     babel-loader babel/reset-env 完成加载语法转换
     eslint-loader 完成语法的校验

    2.less文件   less-loader css-loader 完成less 的转换和加载
    3.图片文件
      file-laoder  完成图片的加载
      需要配置禁用esmodule，不然img:src的加载会有问题
    4. vue文件
      vue-loder 完成vue文件的加载
    plugin 
   使用  new CleanWebpackPlugin()实例完成每次编译前文件的清理
    使用  new VueLoaderPlugin()实例配合完成vue文件加载
    使用  HtmlWebpackPlugin()实例 完成模板html的生成输出文件
使用 new webpack.DefinePlugin()实例完成全局的注入
    使用 new MiniCssExtractPlugin()实例完成css文件的压缩

使用配置
  optimization:{
        minimizer:[
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    },
当生成环境时会自动开启minize属性，完成js和css文件的压缩
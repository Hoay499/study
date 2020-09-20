尝试使用gulp完成项目的自动化构建   提交说明文档，要求思路流程清晰
 
使用gulp对一个项目进行自动化构建

1. 根目录下创建gulpfile.js 入口文件

2.安装gulp

3.载入gulp文件操作API
  const {src,dest} = require('gulp')

4.导入gulp插件自动加载插件
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins() 


5.安装插件定义任务
    5.1. 文件清除任务 
        5.1.1  安装del ： yarn add del
        5.1.2  引入del：  const del = require('del')
        5.1.3  定义任务：
                        const clean = () => {
                           return del(['dist', 'temp'])
                        }


    5.2  对项目中的scss 文件转换成css,暂存到temp目录中
    5.2.1 使用gulp插件sass
    5.2.2  定义任务：
    const style = () => {
        return src('src/assets/styles/*.scss', { base: 'src' }) //以base为基准路径
            .pipe(plugins.sass({ outputStyle: 'expanded' }))//完全展开括号
            .pipe(dest('temp'))//编译到temp目录下
    }  

    5.3  对项目中的 js 文件进行编译,暂存到temp目录中
    5.3.1 使用gulp插件babel ，同时要安装 @babel/core @babel/preset-env
    yarn add @babel/core @babel/preset-env --dev
    5.3.3  定义任务：
    const script = () => {
         return src('src/assets/scripts/*.js', { base: 'src' })//以base为基准路径
                .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
                .pipe(dest('temp'))//编译到temp目录下
                
    }   
    5.4  对项目中的 html 文件进行编译,暂存到temp目录中
    5.4.1 使用gulp swig模板插件 
    5.4.2  定义任务：
                const page = () => {
                        return src('src/*.html', { base: 'src' })
                            .pipe(plugins.swig({ data, defaults: { cache: false } })) 
                            // 防止模板缓存导致页面不能及时更新
                            .pipe(dest('temp')) 
            }
    5.5  对项目中的 图片文件进行压缩，可以直接放到dist目录下
    5.5.1 使用gulp imagemin模板插件 
    5.5.2 定义任务：
                const image = () => {
                        return src('src/assets/images/**', { base: 'src' })
                            .pipe(plugins.imagemin())
                            .pipe(dest('dist'))
                }
    5.6  对项目中的 字体文件进行压缩，可以直接放到dist目录下
    5.6.1 使用gulp imagemin模板插件 
    5.6.2 定义任务：
            const font = () => {
                    return src('src/assets/fonts/**', { base: 'src' })
                        .pipe(plugins.imagemin())
                        .pipe(dest('dist'))
            }
    5.7  对项目中的 无需编译的文件直接复制到dist目录下
    5.7.1 使用gulp  src,dest  api
    5.7.2 定义任务：
            const extra = () => {
                return src('public/**', { base: 'public' })
                    .pipe(dest('dist'))
            }

    5.8 将刚才编译到temp目录的文件进行压缩，放到dist目录下,判断不同的文件类型使用不同的插件
    5.8.1 使用gulp useref插件gulp-if
    5.8.2 定义任务：
                const useref = () => {
                        return src('temp/*.html', { base: 'temp' })
                            .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
                            // html js css
                            .pipe(plugins.if(/\.js$/, plugins.uglify()))
                            .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
                            .pipe(plugins.if(/\.html$/, plugins.htmlmin({
                            collapseWhitespace: true,
                            minifyCSS: true,
                            minifyJS: true
                            })))
                            .pipe(dest('dist'))
                }

6 将刚才定义的任务进行组合
    6.1 使用gulp  parallel, series api
    6.2 定义任务：
            //异步任务，同时启动这三个任务，对项目进行编译
            const compile = parallel(style, script, page)

            // 上线之前执行的任务
            const build =  series(
                clean,
                parallel(
                    series(compile, useref),//同步任务，先进行编译在压缩
                    image,
                    font,
                    extra
                )
            )

 7.导出任务
module.exports = {
  clean,
  build 
}

8.添加 scripts package.json
 "scripts": {
    "build": "gulp build"
  },
9.执行 npm run build
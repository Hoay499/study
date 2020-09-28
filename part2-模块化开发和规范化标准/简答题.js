 /*第一题
  Webpack的构建流程主要有哪些环节？请详细描述Webpack打包的整个过程

  1.webpack  的构建流程
     1.安装webpack模块
     2.在项目根目录下初始化webpack配置文件
     3.根据需求使用插件和模块定义构建配置
     4.运行打包任务
  2. Webpack 的打包过程
     在项目中运行webpack打包任务,解析webpack配置文件 读取配置entry的值作为项目打包的入口，对项目资源文件使用
     webpack配置中的loader和plugin 对对应类型文件资源进行编译转换,  并根据output配置或者分包配置输出
   
   
*/


/*第二题
   Loader 和Plugin 有哪些不同？请描述一下开发Loader和Plugin的思路
    Loader 主要完成资源的加载，plugin完成资源的其他自动化过程，功能更多
 1 . loader运行在打包文件之前（loader为在模块加载时的预处理文件）
 2.  plugins在整个编译周期都起作用。

   Loader 开发思路：
    获取对应资源文件的内容，将最终结果转为JavaScript commjs的规范返回

    plugin开发思路：
    webpack 要求插件必须是一个函数或者是一个包含apply方法的对象，apply方法会在webpack启动时自动调用
    通过传入compiler对象获取包含此次构建的所有配置信息，
    根据任务需求， 在生命周期的钩子中挂载函数实现扩展 
    在函数中实现相应任务
 */
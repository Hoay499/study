1. 新建文件夹
2. 初始化yarn init
3.定义入口文件cli.js
4.yarn link  到全局 ：如果报找不到的话看一下yarn的环境变量是否配置

5.导入

const path =require('path');  //路径插件
 const inquirer = require('inquirer'); //进行命令行的交互
 const ejs = require('ejs');  //使用ejs 模板动态数据
 const fs = require('fs');    //文件操作插件
const { resolve } = require('path');


6 进行命令行的交互获取用户输入的信息
 inquirer.prompt([
    {
        type:'input',
        name:'name',
        message:'project name ?'
    }
 
 ])

 7.通过.then获取用户输入并执行相应的任务

 8.将自定义的模板文件复制到对应目录下
 8.1 从根目录开始递归遍历文件，是否是文件，如果是文件进行复制操作，如果是目录，去判断目标文件夹下是否有该目录，没有则创建

#!/usr/bin/env node

const path =require('path');
 const inquirer = require('inquirer');
 const ejs = require('ejs')
 const fs = require('fs');
const { resolve } = require('path');
 
 inquirer.prompt([
    {
        type:'input',
        name:'name',
        message:'project name ?'
    }
 
 ])
 .then(answers =>{
     console.log(answers);
     //模板目录：项目当前目录下的templates
     const tmplDir = path.join( __dirname,'templates')
     //目标目录 命令行在哪个目录下执行就是哪个目录
     const destDir =process.cwd()
     //判断路径是否存在
     const  getStat =(path)=>{
         return new Promise((resolve,reject)=>{
             fs.stat(path,(err,stats)=>{
                 console.log('-----',path,'该路径是否存在？',err,stats)
                 err?reject(err.message):resolve(stats);
             })
         })
     }
     //创建文件夹
     const creatdir =(path)=>{
         console.log('开始创建文件',path);
         return new Promise((resolve,reject)=>{
             fs.mkdir(path,err=>{
                 err?resolve(false):resolve(true);
             })
         })
     }
     const isdirexist = async (tmpath)=>{//模板目录下当前文件的路径
        let s2 = tmpath.replace(tmplDir,"");//相对文件路径
        // let s ="fsafefs"
        // console.log(s,'--》字符串 替换测试',s.replace("s",""))
        console.log('处理过后的地址',s2);
        let targerpath =path.join(destDir,s2);//当前执行目录下对应文件路径
        console.log('目标文件生成路径',targerpath);
        // console.log('处理过后的地址',s2);
        try {
            let isexist = await getStat(targerpath);//是否存在
            console.log('isexist:',isexist);
            if(isexist&&isexist.isDirectory()){//存在文件夹
                   return true
            }else if(isexist){
                return false
            }
           
        } catch (error) {
            console.log('不存在',error);
           
            await  creatdir(targerpath);
        }
      
     
       
     }
     const rederFiles =(tmpath,file)=>{
            //file 为文件相对路径
             //通过模板引擎渲染文件
            //  ejs.renderFile(path.join(tmplDir,file),answers,(err,result)=>{
            //      if(err) throw err
            //      console.log(result);
            //      //将结果写入目标目录
            //      fs.writeFileSync(path.join(destDir,file),result)
            //  })
            // console.log(tmpath,file);
            // console.log(typeof tmpath);
            // console.log(__dirname,typeof __dirname);
            let s2 = tmpath.replace(tmplDir,"");
            // let s ="fsafefs"
            // console.log(s,'--》字符串 替换测试',s.replace("s",""))
            // console.log('处理过后的地址',s2);
            // console.log('处理过后的地址',s2);
            console.log('开始渲染文件',tmpath,s2);
              ejs.renderFile(tmpath,answers,(err,result)=>{
                 if(err) throw err
                //  console.log(result);
                 //将结果写入目标目录
                 fs.writeFileSync(path.join(destDir,s2),result)
             })
     }
     //将模板下的文件输出到目标目录下
     const readFiles =(tmplDir)=>{
        fs.readdir(tmplDir,(err,files)=>{
            if(err) throw err
            files.forEach(file=>{
                // console.log(file);
                let fcPath = path.join(tmplDir,file);
                fs.stat(fcPath,(err,stat)=>{
                    // console.log(stat.isFile());
                    if(stat.isFile()){
                        rederFiles(fcPath,file)
                    }else{
                        isdirexist(fcPath);
                        readFiles(fcPath);
                    }
                   
                })
               
            })
        })
     }

     readFiles(tmplDir);
     
 })
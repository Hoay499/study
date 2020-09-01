/*
   1.Promise 就是一个类，在执行这个类的时候，需要传递一个执行器进去，执行器会立即执行
   2.promise有三种状态 pending，fullfilled，rejected
       一旦状态确定，不可更改
   3.resolve和reject函数用来更改状态
   4.then函数对当前状态进行判断，并调用成功或失败回调，then方法是定义在原型对象中的
   5.then成功回调函数有一个参数，表示成功之后的值，then失败回调函数的参数表示失败的原因
   6.处理异步，then中的存储成功和失败的回调函数，在resolve中进行判断,如果回调函数存在则调用
   7.promise then 的多次调用 异步：使用数组存储，弹出回调函数
   8.promise 的链式调用：then方法返回一个新的promise对象
   9.链式调用then的传值，在then方法返回新promise对象时，将当前对象成功回调的值传入新对象的resolve
     在resolve和reject方法中也返回，异步回调的链式调用
   10.识别promise对象自返回：判断如果返回的promise对象和当前对象相同，则报错，在返回的
      promise对象中使用setTimeout异步获取当前对象
      typeof instanceof  constructor toString 
   11.捕获执行器错误，trycatch;
   12.then方法的错误，要在下一个promise的then方法中获取,异步情况下的处理，then中对应修改
   13.将then方法的参数变成可选参数，参数的传递，传到有回调函数的then:如果没有传递参数的话将值返回传递即可
   14.all 方法：多个promise对象成功才成功，有一个失败即失败。
   15.catch方法：
   16.race方法：
   17.resolve方法：
   18.finally方法：
   */
  const PENDING ='pending';
  const FULLFILLED ='fullfilled';
  const REJECTED ='rejected';
  class  myPromise{
  
      
      constructor(executor){
      try {
          executor(this.resolve,this.reject);
      } catch (error) {
          this.reject(error);
      }
     
      }
      status = PENDING;
      reason = undefined;
      value = undefined;
      successcallback = [];
      failcallback =[];
      resolve = (value)=> {
       if(this.status !== PENDING) return;
           this.status =FULLFILLED;
           this.value=value;
  
           while(this.successcallback.length) {
              // let res = this.successcallback.shift();
              // let x = res(this.value);
              this.successcallback.shift()();
              // resolvePromise(x,res,this.failcallback.shift());
           }
           
      //   this.successcallback&&this.successcallback(this.value);
      }
      reject = (reason)=>{
       if(this.status!==PENDING) return;
             this.status= REJECTED;
             this.reason = reason;
          while(this.failcallback.length){
              // let rej = this.failcallback.shift();
              // let x = rej(this.reason);
              this.failcallback.shift()();
              // resolvePromise(x,this.successcallback.shift(),rej);   
          }
          // this.failcallback&&this.failcallback(this.reason);
      }
      //resolve 方法判断传入对象是普通值还是promise对象，返回一个promise对象
  static resolve =function(value){
      // console.log(value)
      if(value instanceof myPromise){
          return value;
      }else{
          // return new myPromise(resolve=>resolve(value))
          return new myPromise((resolve)=>{
              resolve(value);
             // console.log();
          })
      }
  }
  static all = function(array){
      let result =[];
      let index=0;
     console.log('all--result');
      return new myPromise((resolve,reject)=>{
          function addData(key,value){
              index++;
              result[key] = value;
              if(index===array.length){
                  resolve(result);
              }
          }
          for(let i=0; i<array.length;i++){
              let current =array[i];
              if(current instanceof myPromise){
                  current.then((value)=>{
                      // console.log(value);
                    addData(i,value);
                  },(reason)=>{
                      reject(reason);
                  })
              }else{
                  addData(i,current);
              }
  
          }
      })
  }
  //finally 方法 
   finally(callback){
      //  console.log('fds');
      // console.log(this);
      // this.then(value=>{},reason=>{console.log(reason)})
      return this.then(value=>{
         // callback();
         // return value;
         return myPromise.resolve(callback()).then(()=>value)
      },reason=>{
          //callback();
          //throw reason;
          // console.log(reason);
          // console.log('reject');
          return myPromise.resolve(callback()).then(undefined,()=>{
              // throw new Error(reason) 
              console.log('qwer');
              console.log('reason',reason);
              throw reason;
              // reason;
             
          })
      })
      
  }
  //catch方法
  catch(failcallback){
      return this.then(undefined,failcallback)
  }
      then(successcallback,failcallback){
         successcallback= successcallback ? successcallback: value=>value;
         failcallback= failcallback ? failcallback: value=>value;
          // console.log(successcallback);
          // console.log('successcallback',successcallback());
          // console.log(failcallback)
          // console.log('22222222222222');
          let temppromise = new myPromise((resolve,reject)=>{
              // console.log(this);
              if(this.status===FULLFILLED){
                  // console.log('suscc');
                  setTimeout(()=>{
                      // console.log(successcallback);
                      try {
                          let x= successcallback(this.value);
                          resolvePromise(temppromise,x,resolve,reject);
                      } catch (error) {
                          // console.log(error.message);
                          reject(error);
                      }
                     
                  },0)
                 
              //    resolve(x);
              }else if(this.status===REJECTED){
                  // failcallback(this.reason);
                  // console.log('this.reason',this.reason);
                  let reas = this.reason;
                  setTimeout(function(){
                      try {
                          // console.log(this.reas);
                          // let x= failcallback(this.reason);
                          let x= failcallback(reas);
                          // console.log('x',x);
                          resolvePromise(temppromise,x,resolve,reject);
                      } catch (error) {
                          // console.log(error.message);
                          reject(error);
                      }
  
                  },0)
                 
                  // resolvePromise(x,resolve,reject);
              }else{
                  // this.failcallback.push(failcallback);
                  // this.successcallback.push(successcallback);
                  this.successcallback.push(()=>{
                      // todo
                      setTimeout(() => {
                          try {
                              let x = successcallback(this.value)
                              resolvePromise(temppromise, x, resolve, reject)
                          } catch (err) { // 中间任何一个环节报错都要走reject()
                              reject(err)
                          }
                      }, 0) // 同步无法使用promise2，所以借用setiTimeout异步的方式
                  });
              // }
                  this.failcallback.push(() => {
                      // todo
                      setTimeout(() => {
                          try {
                              let x = failcallback(this.reason)
                              resolvePromise(temppromise, x, resolve, reject)
                          } catch (err) { // 中间任何一个环节报错都要走reject()
                              reject(err)
                          }
                      }, 0);
                  // resolvePromise(x,resolve,reject);
              })
              }
          })
         return temppromise;
      }
  }
  
  function resolvePromise(temppromise,x,resolve,reject){
      if(temppromise === x) return reject(new TypeError('Changing cycle detected for promise #<Promise>'));
      if(x instanceof myPromise){
          x.then(resolve,reject)
          // <=>x.then(value=>resolve(value),reason=>reject(reason))
      }else{
          resolve(x)
   
      }
  }
  //module.exports=myPromise;
  
  let promise =new myPromise((resolve,reject)=>{
      // throw new Error('执行器错误');
      // setTimeout(function(){resolve('----成功')},2000)
      resolve('成功');
  })
  
  function other(){
      return new myPromise((resolve,reject)=>{
          resolve('other');
      })
  }
  //可选参数测试
  // promise.then()
  //         .then((value)=>{console.log(value)})
  function p1(){
      return new myPromise((resolve,reject)=>{
          setTimeout(()=>{
              // resolve('成功p1');
              reject('失败');
          },100)
      })
  }
  
  function p2(){
      return new myPromise((resolve,reject)=>{
          // resolve('成功p2');
          reject('失败p2');
      })
  }
  
  //all方法测试
  
  // myPromise.all([p1(),p2()]).then(function(result){
  //     console.log(result);
      
  // })
  //resolve方法测试
  // myPromise.resolve(100).then(value=>console.log(value));
  // myPromise.resolve(p1()).then(value=>console.log(value))
  //finally 方法测试
  // console.log(p2().finally(()=>{
  //     return p2();
  // }).then((value)=>{
  //     console.log('res');
  //     console.log(value);
     
  // },(reason)=>{
  //     console.log('re')
  //     console.log(reason);
  // })) 
  p2().finally(()=>{
      console.log('finally');
      return p2();
  }).then((value)=>{
      console.log('res');
      console.log(value);
  },(reason)=>{
      console.log('re')
      console.log(reason);
  })
  
  
  // function p2(){
  //     return new Promise((resolve,reject)=>{
  //         // resolve('成功p2');
  //         reject('失败p2');
  //     })
  // }
  
  // p2().finally(()=>p2()).then(value=>{
  //     console.log(value);
  // },reason=>{
  //     console.log(reason);
  // })
          // promise.then((value)=>{
          //     console.log(value);
          //     // throw new Error('执行器错误');
          //     throw new Error('then error');
          //     // return other();
          //     // return 10;
          // },(reason)=>{
          //     console.log('2');
          //     console.log(reason);
          // }).then((value)=>{
          //     console.log('1');
          //     console.log(value);
          // },(reason)=>{
          //     console.log('1');
          //     console.log(reason);
          // })
  
  
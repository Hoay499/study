/*
  题目
  将下面异步代码使用Promise的方式改进
  setTimeout(function(){
      var a = 'hello';
      setTimeout(function(){
          var b = 'lagou';
          setTimeout(function(){
              var c='i love u';
              console.log(a+b+c);
          },10)
      },10)
  },10)

*/
/*
   还未解决的问题？
   promise 之后的then中如何获取前面then中的定义的变量？
*/

var promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve();
    }, 10);

})

console.log(promise);

promise.then(function (data) {
    var obj = {};
    obj.a = 'hello';
    return obj;
}).then(function (data) {
    data.b = 'lagou';
    return data;
}).then(function (data) {
    data.c = 'I LOVE U'
    console.log(data.a + data.b + data.c);
})
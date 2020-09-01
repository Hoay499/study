//1.练习1:使用fp.add(x,y)和fp.map(f,x)
//创建一个能让functor里的值增加的函数ex1

//app.js
const fp = require('lodash/fp');
const {Container,Maybe}=require('./support.js');

let maybe =Maybe.of([5,6,1]);
let ex1=(arr)=>{
    return fp.map(function(data){
       return fp.add(data,1);
    },arr)
}
console.log(maybe.map(ex1));

//练习2.实现一个函数ex2，能够使用fp.first获取列表的第一个元素

let xs =Container.of(['do','ray','mi','fa','so','la','ti','do']);
let ex2=()=>{
    return xs.map(fp.first)._value;
    // return  fp.first(arr);
    //........
}
// console.log(xs.map(ex2)._value);
console.log(ex2());


//练习3.实现一个函数ex3，使用safeProp和fp.first找到user的名字的首字母
//app.js

let safeProp=fp.curry(function(x,o){
    return Maybe.of(o[x]);
})
let user = {
    id:2,
    name:'Albert'
}
let ex3=()=>{
    return  safeProp('name',user)
                              .map(fp.first)
                              ._value;
    //........
}
console.log(ex3())

//练习4.使用Maybe 重写ex4 不要有if语句
let ex4= function(n){

    return Maybe.of(n)
                .map(parseInt)
                ._value;
    // if(n){
    //     return parseInt(n); 
    // }
}
console.log(ex4('12'))
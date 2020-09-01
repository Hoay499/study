const fp = require('lodash/fp');
const _ = require('lodash');

const cars =[
    {
        name:'Ferrari FF',
        horsepower:660,
        dollar_value:70000000,
        in_stock:true
    },{
        name:'Spyker C12 zagouto',
        horsepower:650,
        dollar_value:64800000,
        in_stock:false
    },{
        name:'Jaguar XKR-S',
        horsepower:550,
        dollar_value:132000,
        in_stock:false
    },{
        name:'Audi R8',
        horsepower:525,
        dollar_value:114200,
        in_stock:false
    },{
        name:'Aston Martin One-77',
        horsepower:750,
        dollar_value:1850000,
        in_stock:true
    },{
        name:'Pagani Huayra',
        horsepower:700,
        dollar_value:130000,
        in_stock:false
    }
]
/*
  题目 基于以上代码完成下面的四个练习
*/

/* 1.使用函数组合fp.flowRight，重新实现下面的这个函数
let isLastInstock = function (cars){
    //获取最后一条数据数据
    let last_car =fp.last(cars);
    //获取最后一条数据的in_stock属性值
    return fp.prop('in_stock',last_cars);
}
*/
//解:
function getattr(attr){
    return function (obj){
          return fp.prop(attr,obj);
    }
}
let getInStock = getattr('in_stock');
let isLastStock =fp.flowRight([getInStock,fp.last]);
console.log(isLastStock(cars));

//2.使用fp.flowRight,fp.prop,fp.first获取第一个car的name

//解
let getname = getattr('name');
let isFirstName =fp.flowRight([getname,fp.first]);
console.log(isFirstName(cars));


//3.使用帮助函数_average重构averageDollarValue,使用函数组合的方式实现
let _average = function(xs){
    return fp.reduce(fp.add,0,xs)/
    xs.length
}
let averageDollarValue = function(cars){
   let dollar_values = fp.map(function(car){
       return car.dollar_value;
   },cars);
   return _average(dollar_values)
   
}
let dollarValues = function(cars){
    let dollar_values = fp.map(function(car){
        return car.dollar_value;
    },cars);
    return dollar_values;
}

let averageDollarValue2 = fp.flowRight([_average,dollarValues]);

console.log(averageDollarValue2(cars));
//4.使用flowRight 写一个sanitizeNames()函数，返回一个下划线连接的小写字符串把数组中的name转换为这种形式，例如
   //sanitizeNames(['Hello World']) 
   //=>  ['hello_world']
   

let _underscore = fp.replace(/\W+/g,'_')
console.log(typeof _underscore);

function con(a){
   console.log(a);
   return a;
}
let sanitizeNames = fp.flowRight(con,_underscore,_.toLower);


function tt(arr){
    return _.map(arr,function(data){
       return sanitizeNames(data);
    }) 
}
console.log(tt(['Hello World']));

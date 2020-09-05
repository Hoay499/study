/*第一题
请说出下列最终的执行结果，并解释为什么。

var a =[];
for(var i = 0; i < 10; i++){
     a[i] = function(){
         console.log(i);
     }
}
a[6]();

结果==> 输出 10

原因：输出的i是for循环结束的i;循环时并没有记录下来当时的值，
*/

/*第二题
请说出下列最终执行结果，并解释为什么
var tmp  = 123;
if(true) {
    console.log(tmp);
    let tmp;
}
结果====》 报错  tmp 未初始化
原因：let 没有变量提升;在作用域内如果要使用该变量，要放到使用之前；不然会报错
*/ 

/*第三题
结合ES6新语法，用最简单的方式找出数组中的最小值
var arr =[12,34,32,89,4]

==> var min =  Math.min(...arr);

*/ 

/*第四题
请详细说明 var,let,const 三种声明变量的方式之间的具体差别
  

   差别一：作用域
    var没有块级作用域,在块作用域外还能访问，let 和const有块级作用域
   差别二:变量提升
     var 有变量提升， let和const 没有
    差别三 ： 可修改
    var 和 let 定义后可以修改变量的值；const 不可修改
*/ 

/*第五题
请说出下列代码最终的输出结果，并解释为什么

var a = 10;
var obj = {
    a : 20,
    fn(){
        setTimeout(()=>{
            console.log(this.a)
        })
    }
}

obj.fn()

===> 输出 20
原因  ： 箭头函数 this 指向最外层对象 obj
（闭包函数）函数内部默认指向全局对象
setTimeout 中函数指向？
*/ 

/*第六题
  简述Symbol 类型的用途
  Symbol 类型由于创建出来的变量是独一无二的
  适合用于   对象中私有属性的声明，并解决对象属性名的重复问题
*/ 

/*第七题
说说什么是浅拷贝，什么是深拷贝
浅拷贝： 拷贝变量地址的引用，如果 B复制了A，如果A改变那么B也会改变 obj.assign
深拷贝： 拷贝了新的一个变量在内存中， 改变A后B的值不会改变
*/ 

/*第八题
请简述TypeScript与JavaScript之间的关系
 
TypeScript 可以用于大型应用的开发，TypeScript是JavaScript的扩展，可以使用JavaScript中的所有语法和概念，
也增加了静态类型，类，模块，接口，类型注解，
TypeScript可以和JavaScript一同工作，TypeScript可以编译
成JavaScript，
*/ 

/*第九题
 请谈谈你所认为的TypeScript的优缺点
 优点：增加了类型注解，静态类型，能够写出更健壮的代码，在编码期间检测类型错误；便于开发维护，
 缺点：TypeScript需要被编译，相比于JavaScript，灵活性较低
*/ 

/*第十题
 描述引用计数的工作原理和优缺点
 工作原理：
 从根出发对可达对象添加引用数，在引用关系修改时修改引用数，如果为0 则及时回收
 优点：及时回收垃圾，能够最大程度减少程序暂停
 缺点：资源消耗大，且不能够回收循环引用对象

*/ 

/*第十一题
 描述标记整理算法的工作流程
  
 1.从根出发对可达对象进行标记
 2.移动对象在内存中的位置，整理内存空间，避免空间碎片化
 3.清理垃圾
*/ 

/*第十二题
描述V8中新生代存储区垃圾回收的流程
新生代的内存空间分 from(使用空间)和to(空闲空间)两个等大小空间
回收过程采用复制算法+标记整理

标记整理后将活动对象拷贝至to
    from与to交换空间完成释放
*/ 

/*第十三题
描述增量标记算法在何时使用及工作原理
在需要进行实时回收垃圾的运行环境下
分阶段方式去完成垃圾标记，清理工作
*/ 
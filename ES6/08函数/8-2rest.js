function add(...valuse) {
 let sum = 0;
 for (var val of values) {
  sum += val;
 }

 return sum;
}

add(2, 5, 4);//10

//下面是一个rest参数代替arguments变量的例子
//arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

//rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();

//rest改写数组push方法
function push(array, ...items) {
  items.forEach(function(item)) {
    array.push(item);
    console.log(item):
  }
}
var a = [];
push(a,1,2,3)

// 3 扩展运算符
console.log(...[1, 2, 3])//1 2 3 
console.log(1,...[2, 3, 4], 5)//1 2 3 4 5
[...document.querySelectorAll('div')]// [<div>, <div>, <div>]

function push(array, ...items) {
  array.push(...items);
}

function add(x, y) {
  return x + y ;
}
var numbers = [4, 49];
add(...numbers)//53

//扩展运算符与正常的函数参数结合使用
function f(v, w, x, y, z){}
var args = [0, 1];
f(-1, ...args, 2, ...[3]);



function f(x, y, z) {}
var args = [0, 1, 2];

f.apply(null, args);//ES5的写法
f(...arigs);//ES6的写法

//ES5的写法
Math.max.apply(null, [14, 3, 88]);
//ES6的写法
Math.max(...[14, 3, 88]);
//等同于
Math.max(14, 3, 88);

var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1,arr2);//ES5
arr1.push(...arr2);//ES6


//数组合并
//es5
[1, 2].concat(more);
arr1.concat(arr2,arr3);
//ES6
[1, 2, ...more];
[...arr1, ...arr2, ...arr3];

//与解构赋值
//
const [first, ...rest] = [1,2,3,4,5];
first//1
rest//[2,3,4,5]

const [fitst, ...rest] = ["foo"];
first//"foo"
rest //[]

//函数的返回值
var dateFields = readDateFields(database);
var d = new Date(...dateFields);

[...'hello']//["h", "e", "l", "l", "o"]

'x\uD83D\uDE80y'.length//4

[...'x\uD83D\uDE80y'].length;

//正确返回字符串长度的函数
 function length(str) {
  return [...str].length;
 }

let str = 'x\uD83D\uDE80y';
str.split('').reverse().join('')
// 'y\uDE80\uD83Dx'

[...str].reverse().join('')
// 'y\uD83D\uDE80x'
// 

var nodeList = document.querySelectorAll('div');
var array = [...nodeList];

let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
])

//Generator函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。
var go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] // [1, 2, 3]


function doSomething(value = 070) {
  'use strict';
  return value;
}

const doSomething = (function () {
  'use strict';
  return function(value = 42) {
    return value;
  };
}())
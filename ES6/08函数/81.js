//ES6之前的变通方法
function log(x,y) {
  y = y || 'World';
  console.log(x,y);
}
//ES6-参数设置默认值
function log(x, y = 'World'){
  //...
}

//参数默认值是惰性求值的
let x = 99 ;
function foo(p = x + 1) {
  console.log(p);
}
foo();//100
x = 100 ;
foo();//101

//与结构赋值默认值结合使用
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined, 5
foo({x: 1}) // 1, 5
foo({x: 1, y: 2}) // 1, 2
foo() // TypeError: Cannot read property 'x' of undefined

//双重默认值
function fetch(url, { method = 'GET' } = {}) {
  console.log(method);
}

fetch('http://example.com')
// "GET"


//作用域 
let x = 1;
function f(y = x) {
  let x = 2;
 console.log("x:"+x);
  console.log(y);
}
f()
//x:2
//1

//如果全局变量x不存在，就会报错
var x = 1;
function foo(x = x ){
  //...
}
foo()// ReferenceError: x is not defined

//如果的默认值时一个函数
function bar(func = () => foo){
  let foo = "inner";
  console.log(func());
}
bar()// ReferenceError: foo is not defined

//作用域更复杂的例子
var x = 1;
function foo2(x) {
  var x = 3;
  console.log(x);
}
foo2()

function throwIfMissing() {
  throw new Error('Missing parameter');
}
function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}
foo()// Error: Missing parameter
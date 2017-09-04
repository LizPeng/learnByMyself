//像下面这样直接调用自身的方法或函数，是递归函数
var recursiveFunction = function(someParam){
  recursiveFunction(someParam);
}

//能够像下面这样简洁调用自身的函数，也是递归函数

var recursiveFunction1 = function(ele) {
  recursiveFunction2(ele)
}

var recursiveFunction2 = function(ele) {
  recursiveFunction1(ele)
}

// 每个浏览器都有自己的上线，用以下代码测试
var i = 0;
function recursiveFn(){
  i++;
  recursiveFn();
}
try{
  recursiveFn()
} catch (ex) {
  alert('i = '+i+ ' error: ' +ex)
}

//斐波那契数
function fibonacci(num) {
  if(num === 1 || num === 2){
    return 1
  }
  return fibonacci(num - 1) + fibonacci(num - 2)
}
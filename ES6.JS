/*
*Promise()
Promise对象用于一个异步操作的最终完成（或失败）及其结果值的显示。
简单点说就是处理异步请求
*/

//语法
new Promise(
  /*executor*/
  function(resolve, reject){
    //codes 
  }
)
/*executor
executor是一个带有resolve和reject两个参数的函数。
executor函数在Promise构造函数执行时同步执行，被传递

 */
var promise = new Promise(function(resolve, reject) {
  //..some code
  if( tr /* 异步操作成功 */){
    resolve(value);
  }else {
    reject(error)
  }
})

//Promise实例生成以后，可以用then方法分别制定Resolved状态和Reject状态的回调函数。
promise.then(function(value) {
  //success
}, function(error) {
  //failure
})

//下面是一个Promise简单例子
function timetout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  })
}

timeout(100).then((value) => {
  console.log(value);
})
//上面代码中，timeout方法返回一个Promise实例，表示一段时间以后才会发生的结果。过了指定的时间(ms参数)以后，Promise实例的状态变为Resolved，就会触发then方法绑定的回调函数


//Promise新建后就会立即执行

let promise = new Promise(function(resolve, reject){
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('Resolved');
})

console.log('Hi!')
// Promise
// Hi!
// Resolved
//上面代码中，Promise新建后立即执行，所以输出Promise。
//然后then方法指定回调函数，将在当前脚本所有同步任务执行完后才会执行
//所以Resolved最后输出

//下面是异步加载图片的例子
function loadImageAsync(url) {
  return new Promise(function(resolve, reject){
    var image = new Image();
    image.onload = function(){
     resolve(image); 
    };
    image.onerror = function() {
      reject(new　Error('Could not load image at ' +url));
    };
    image.src = url;
  });
}
//上面代码中，使用Promise包装了一个图片加载的异步操作，如果加载成功就调用resolve，否则就调用reject

//下面是是用Promise对象实现Ajax操作的例子
var getJSON = function(url) {
  var promise = new Promise(function(resolve, reject){
    var client = new XHMHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader('Accept', 'application/json');
    cliend.send();

    function handler() {
      if (this.readeState !==4) {
        return 
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
  });
  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: '+json);
}, function(error){
  console.error('出错了', error);
})
// 上面代码中，getJSON是对XMLHttpRequest对象的封装，用于发出一个针对JSON数据的HTTP请求
//并且返回一个Promise对象。需要注意的是，在getJSON内部，resolve函数和reject函数调用时，都带有参数。
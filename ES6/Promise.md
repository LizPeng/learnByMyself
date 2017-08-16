##　基本用法

```
var promise = new Promise(function(resolve, reject) {
  //..code
  if(/*异步操作成功*/){
    resolve(value)
  }else {
    reject(error)
  }
})

```

Promise狗仔函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。他们是两个函数，由js引擎提供，不用自己部署。

resolve将promise状态从pending变为resolved，在异步操作成功的时候调用，并将异步操作的结果作为参数传递出去；
reject从pending变为Rjected，在异步操作失败调用，并异步操作报出的错误，作为参数传递出去。

Promise实例生成以后，可以用then方法分别制定Resolved状态和Rejected状态的 回调函数。

```
promise.then(function(value){
	//success
}, function(error){
	//failure
})
```

then方法接收两个回调函数作为参数。第一个回调函数是Promise对象的状态变为Resolved时调用，第二个是变为Rejected调用。
其中第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。

```
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100).then((value) => {
  console.log(value);
});
```

上面的代码timeout方法返回一个Promise实例，表示一段时间后才会发生的结果。过了指定的时间（ms参数 ）以后，Promise实例的状态变为Resolved，就会触发then方法绑定了回到函数。

```
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('Resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// Resolved
```

上面代码中，Promise 信件后立即执行，所以先输出Promise。然后then方法指定的回调函数，将在**当前脚本所有同步任务执行完才会执行**，所以Resolved最后输出。
```
function loadImageAsync(url) {
  return new Promise(function(resolve, reject){
    var image = new Image();
    image.onload = function() {
      resolve(image);
    };
    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    }
    image.src = url;
  })
}
```
上面代码中，使用Promise包装了一个图片加载的异步操作。如果加载成功，就调用resolve方法，否则就调用reject方法。


**下面是一个用Promise对象实现的Ajax操作的例子**
```
var getJSOn = function(url) {
  var promise = new Promise(function(resolve, reject){
    var client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

    function handler() {
      if(this.readyState !== 4){
        return;
      }
      if(this.status === 200 ){
        resolve(this.response);
      } else {
        reject(new Error(this.statusText))
      }
    };
  });
  return promise;
}

getJSON("/posts.json").then(function(json) {
  console.log('Contents: '+ json);
}, function(error) {
  console.error('出错了', error);
})

```

上面代码中，getJSON是对XMLHttpRequest对象的封装，用于发出一个针对JSON数据的HTTP请求，并且返回一个Promise对象。需要注意的是，在getJSON内部，resolve函数和reject函数调用时，都带有参数。

如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数。reject函数的参数通常是Error对象的实例，表示抛出的错误；resolve函数的参数除了正常的值外，还可能是一个Promise实例，比如像下面这样。

```
var p1 =  new Promise(function(resolve, reject) {
  //...
})
var p2 = new Promise(function(resolve, reject) {
  //.
  resolve(p1);
})
```
上面代码中，p1和p2都是Promise的实例，但是p2的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作。

注意，这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。如果p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；如果p1的状态是Resolved或者Rejected，那么p2的回调函数就会立刻执行。

```
var p1 =  new Promise(function(resolve, reject) {
  setTimeout(()=> reject(new Error('fail')), 3000)
})
var p2 = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})
p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
```

上面的代码，p1是一个Promise，3秒之后变为rejected。p2的状态在1秒之后改变，resolve方法返回的是p1。由于p2返回的是另一个Promise，导致p2自己的状态无效了，由p1状态决定p2的状态。所以，后面的then语句都变成针对后者（p1）。又过了2秒，p1变为Rejecte，导致触发catch方法指定的回调函数。
```
new Promise((resolve, reject) => {
  resolve(1)
  console.log(2)
}).then( r => {
  console.log(r);
})
//2
//1
```
上面代码中，调用完resolve(1)以后，后面的console.log(2)还是回执行，因为立即Resolved的Promise是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。

一般来说，调用resolve或reject以后，Promise的使命就完成了，后续操作应该放到then方法里，而不应该写在resolve或reject后面。所以最好在它们前面加上`return`语句，这样就不会有意外。

```
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
})
```

## Promise.prototype.then() 

Promise实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。它的作用为Promise实例添加**状态改变时的回调函数**。

> then方法的第一个参数是Resolved状态的回调函数
> 
> 第二个参数（可选）是Rejected状态的回调函数。

then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。
```
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  //...
})
```
上面的代码使用then方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。

采用链式的then，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），这时 后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。

```
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURl);
}).then(function funcA(comments) {
  console.log("Resolved: ", comments);
}, function funcB(err) {
  console.log("Rejected: ", err);
})
```

上面代码中，第一个then方法指定的回调函数，返回的是另一个Promise对象。这时，第二个then方法指定的回调函数，就会等等这个新的Promise对象状态发生变化。如果变为Resolved，就调用funcA，如果状态变为Rejected，就调用funcB。
```
getJSON("/post/1.json").then(
  post => getJSON(post.commentURL)
).then(
  comments => console.log("Resolved: ", comments),
  err => console.log("Rejected: ", err)
)
```
上面的代码采用箭头函数，更简洁。

## Promise.prototype.catch()

catch方法就是.then(null, rejection)的别名，用于指定发生错误时的回调函数。


## Promise.all()

all方法用于将多个Promise实例，包装成一个新的Promise实例。

	var p = Promise.all([p1, p2, p3]);

上面代码中，Promise.all方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。（Promise.all方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。）

> p的状态由p1、p2、p3决定，分成两种情况。
> 
> （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
> 
> （2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

## Promise.race()

race方法同样是将多个Promise，包装成一个新的Promise实例。

	var p = Promise.race([p1, p2, p3]);

上面代码中，只要p1,p2,p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的Promise实例的返回值，就传递给p的回调函数。

## Promise.resolve()

有时需要将现有对象转为Promise对象，Promise.resolve方法就起到这个作用。

	var jsPromise = Promise.resolve($.ajax('/whatever.json'));

上面代码将jQuery生成的deferred对象，转为一个新的Promise对象。

Promise.resolve等价于下面的写法。

	Promise.resolve('foo')
	// 等价于
	new Promise(resolve => resolve('foo'))


## Promise.reject()

Promise.reject(reason)方法也会返回一个新的Promise实例，该实例的状态为rejected.
```
var p = Promise.reject('出错了');
// 等同于
var p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
```
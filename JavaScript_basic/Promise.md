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
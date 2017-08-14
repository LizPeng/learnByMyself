# Promise 

## 1.Promise的含义

Promise是异步编程的一种解决方案，ES6将其写进了语言标准，统一了用法，原生提供了Promise对象。

Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

Promise对象有以下两个特点。

（1） 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending，Resolved、Rejected。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来。
（2） 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从Pending变为Resolved，从Pending变为Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件Event完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供了同一的借口，使得控制异步操作更加容易。

Promise也有一些缺点。首先，无法取消promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反映到外部。第三，当处于Pending状态时，无法得知目前进展到哪个阶段。

如果某些事件不断地反复发生，一般来说，使用Stream模式是比部署Promise更好的选择。

## 2.基本用法

ES6规定，Promise对象是一个构造函数，用来生成Promise实例。
    
    var promise = new Promise(function(resolve, reject) {
      //..some code
      if( /* 异步操作成功 */){
    	resolve(value);
      }else {
    	reject(error)
      }
    })

Promise构造函数接受一个**函数**作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由JavaScript提供，不用自己部署。

resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（既从Pending变为Resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，将Promise对象的状态从Pending变为Rejected，在异步操作失败时调用，并将异步操作爆出的错误，作为参数传递出去。

Promise实例生成以后，可以用then方法分别制定Resolved状态和Reject状态的回调函数。

    promise.then(function(value) {
      //success
    }, function(error) {
      //failure
    })

**then方法**可以接受两个回调函数作为参数。第一个回调函数时Promise对象的状态变为Resolved时调用，第二个回调函数时Promise对象的状态变为Rejected时调用。其中第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。

下面是一个Promise对象的简单例子。
    
    function timetout(ms) {
      return new Promise((resolve, reject) => {
   		 setTimeout(resolve, ms, 'done');
      })
    }
    
    timeout(100).then((value) => {
      console.log(value);
    })
    //上面代码中，timeout方法返回一个Promise实例，表示一段时间以后才会发生的结果。
	//过了指定的时间(ms参数)以后，Promise实例的状态变为Resolved，就会触发then方法绑定的回调函数


Promise新建后就会立即执行

    let promise = new Promise(function(resolve, reject){
      console.log('Promise');
      resolve();
    });
    
	//then省略了第二个回调函数参数
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



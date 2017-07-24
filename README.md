## call()
call()方法调用一个函数，其具有一个指定的this值和分别地提供的参数（参数的列表)。
语法：

    fun.call(thisArg[, arg1[, arg2[, ...]]])

参数：

> thisArg：在fun函数运行时指定的this值。；
> arg1,args2,...指定的参数列表

使用call方法调用函数并且指定上下文的'this'

在下面的例子中，当调用 greet 方法的时候，该方法的 this 值会绑定到 i 对象。

    function greet() {
      var reply = [this.person, 'Is An Awesome', this.role].join(' ');
      console.log(reply);
    }
    
    var i = {
      person: 'Douglas Crockford', role: 'Javascript Developer'
    };
    
    greet.call(i); // Douglas Crockford Is An Awesome Javascript Developer

## apply()

apply()方法调用一个函数，其具有一个指定的this值，以及作为一个数组提供更多参数

> 注意：call()方法的作用和apply()方法类似，只有一个区别，就是call()方法接收的是**若干个参数的列表**，而apply()方法接收的是一个包含多个参数的**数组**。
## call()
call()方法调用一个函数，其具有一个指定的this值和分别地提供的参数（参数的列表)。

**语法：**

    fun.call(thisArg[, arg1[, arg2[, ...]]])

**参数：**

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

## pop()

Array.prototype.pop(),this method removes the last element from an array and returns that element.This method change s the length of the array.

这个方法从数组中移除最后一个元素，并返回被删除的元素。这个方法会改变原数组的长度。

    var a = [1, 2, 3];
    var b = a.pop();
    
    console.log(b);//3
    console.log(a);//(2)[1,2]

## split()

split()方法将一个String对象分割成字符串数组。using a specified seperator string to determin where to make each split。

**语法** `str.split([separator[, limit]])`

> **separator：**指定用来分隔字符串的字符(串)。可以是一个字符串或正则表达式。
> 
> **limit:**一个整数，限制返回的分隔片段数量。

    var myString = "Hello World. How are you doing?";
    var splits = myString.split(" ", 3);
    
    console.log(splits);//["Hello", "World.", "How"]


## Array.prototype.sort()

sort()方法在适当的位置对数组的元素进行排序，并返回数组。sort排序不一定是稳定的。

**语法**： `arr.sort(compareFunction);`

> **compareFunction**:可选，用来指定按某种顺序进行排序的函数。如果省略，sorted according to each character's Unicode code point value ,according to the string conversion of each element.
> 
> **返回值**：返回排序后的数组。原数组已经被排序后的数组代替。

如果指明了compareFunction，那么数组会按照调用该函数的返回值排序。既a和b是两个将要被比较的元素。

> - 如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；a-b升序；
> - 如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。b-a降序；


    var numbers = [4, 2, 5, 1, 3];
    numbers.sort(function(a, b) {
    return a - b;
    });
    console.log(numbers);// [1, 2, 3, 4, 5]



## Array.prototype.shift()

shift()方法从数组中删除第一个元素，并返回该元素的值，此方法更改数组的长度

    let a = [1, 2, 3];
    let b = a.shift();
    
    console.log(a); 
    // [2, 3]
    
    console.log(b); 
    // 1

## Array.prototype.reduce()

reduce() 方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。

语法：

 `array.reduce(function(accumulator, currentValue,currentIndex, array), initialValue)`

> 
- callback：执行数组中每个值的函数，包含四个参数
- accumulator：上一次调用回调返回的值，或者是体用的初始值(initialValue)
- currentValue： 数组中正在处理的元素
- currentIndex： 数据中正在处理的元素索引，如果提供了initialValue,从0开始；否则从1开始
- array：调用reduce的数组

返回值： 函数累计处理的结果

    var total = [0, 1, 2, 3].reduce(function(sum, value) {
      return sum + value;
    }, 0);
    // total is 6

    var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b) {
      return a.concat(b);
    }, []);
    // flattened is [0, 1, 2, 3, 4, 5]


## Object.assign()

用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

语法：` Object.assign(target, ...sources)`

> target： 目标对象。
> sources ： （多个）源对象。
> 返回值 ：target目标对象

描述：如果目标对象中的属性具有相同的键，则属性将被sources中的属性覆盖。后来的sources属性将类似地覆盖早先的属性。

## Object.keys()

返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用for...in循环遍历该对象时返回的顺序一致

语法`Object.keys(obj)`

> 参数：obj要返回其枚举自身属性的对象。
> 返回值：一个标示给定对象的所有课枚举属性的字符串数组。

## 3.1 函数中的作用域


	function foo(a) {
	    var b = 2;
	    //
	    function bar() {
	        //
	    }
	    //
	    var c = 3 ;
	}



在这代码片段中，foo(..)的作用域气泡中包含了标识符a b c 和bar。无论标识符声明出现在作用域中的何处，这个标识符所代表的变量或函数都将附属于所处作用域的气泡。我们在下一张讨论具体的原理

bar(..)拥有自己的作用域气泡。全局作用域也有自己的作用域气泡，它只包含了一个标识符：foo。

由于标识符a、b、c和bar都附属于foo(..)的作用域气泡，因此无法从foo的外部对它们进行访问。

函数作用域的含义是指，属于这个函数的全部变量都可以在整个函数的范围内使用及复用（事实上在嵌套的作用域中也可以使用）。


## 3.2 隐藏内部实现

对函数的传统认知就是先声明一个函数，然后再向里面添加代码。但反过来想也可以带来一些启示：从所写的代码中挑选出一个任意的片段，然后用函数声明对它进行包装，实际上就是把这些代码“隐藏”起来了。

实际的结果就是在这个代码片段的周围创建了一个作用域气泡，也就是说着断码中的任何声明（变量或函数）都将绑定在这个新创建的包装函数的作用域中，而不是闲钱所在的作用域中。换句话说说，可以把变量和函数包裹在一个函数的作用域中，然后用这个作用域来“隐藏”它们。

	function doSomething(a) {
		b = a + doSomethingElse( a * 2 );
		console.log( b * 3 );
	}
	function doSomethingElse(a) {
		return a - 1;
	}
	var b;
	doSomething( 2 ); // 15

更‘合理’的设计

	function doSomething(a) {
		function doSomethingElse(a) {
			return a - 1;
		}
		var b;

		b = a + doSomethingElse( a * 2 );
		console.log( b * 3 );
	} 
	doSomething( 2 ); // 15

 现在，b和doSomethingElse(..)都无法从外部被访问，而只能被doSomething()所控制。


**规避冲突**

1、全局命名空间：这些苦通常在全局作用域中声明一个名字足够独特的变量，通常是一个对象。这个对象被用作库的*命名空间*，所有需要暴露给外界的功能都会成为这个对象（命名空间）的属性，而不是将自己的标识符暴露在顶级的此法作用域中。

2，模块管理： 另外一种避免冲突的办法和现代的模块机制很接近，就是从众多模块管理器汇总挑选一个来使用。使用这些工具，任何库都无需将标识符加入到全局作用域中，而是通过依赖管理器的机制蒋库的标识符显示地导入到另外一个特定的作用域中。

## 3.3 函数作用域

我们已经知道，在任意代码片段外部添加包装函数，可以将内部的变量和函数定义“隐藏”起来，外部作用域无法访问包装函数内部的任何内容。

如果函数不需要函数名（或者至少函数名可以不污染所在作用域），并且能够自动运行，这将会更加理想。

幸好，JavaScript提供了能够同时解决这两个问题的方案，

    var a = 2;
    
    (function(){var a = 3 ; console.log(a);//3})()
    console.log(a);//2

首先，包装函数的声明以 (function...开始，函数会被当做函数表达式而不是一个标准的函数声明来处理。

> 区分函数声明和表达式最简单的方法是看function关键字出现在声明中的位置（不仅仅是一行代码，而是整个生命中的位置）。
> 
> 如果function是声明中的第一个词，那么就是一个函数声明，否则就是一个函数表达式

**函数声明和函数表达式**之间最**重要的区别**是它们的名称标识符将会绑定在何处。

换句话说，(function foo(){..})作为函数表达式意味着foo只能在..所代表的位置中被访问，外部作用域则不行。foo变量名被隐藏在自身中意味着不会非必要地污染外部作用域。

###　3.3.1 匿名和具名

	setTimeout(function(){
		console.log("i waited 1 second")
	}, 1000);

这叫作**匿名函数表达式**，因为function()...没有名称标识符。函数表达式可以是匿名的，而函数声明则不可以省略函数名。

匿名函数表达式有几个缺点

1. 匿名函数在栈追踪不会显示出有意义的函数名，是调试很困难。
2. 如果没有函数名，当函数需要引用自身时只能使用已经过去的arguments.callee引用。
3. 省略了对于代码可读性/可理解行 很重要的函数名。

*行内函数表达式*非常强大且有用---匿名和具名之间的区别不会对这点有任何影响。给函数表达式指定一个函数名可以有效解决以上问题。始终给函数表达式命名是一个最佳实践：

setTimeout( function timeoutHandler(){ //我有名字了！
	console.log('waited 1 second')
}, 1000)


### 3.3.2 立即执行函数表达式

    var a = 2; 
    (function foo() {
    	var a = 3;
    	console.log(a);//3
    })()
    
    console.log(a)//2

由于函数被包含在一对()括号内部，因此成为了一个表达式，通过在末尾加上另外一个()可以立即执行这个函数。第一个()将函数编程表达式，第二个()执行了这个函数。
	
这种模式，社区规定了一个数据IIFE，代表立即执行函数表达式Immediately Invoked Function Expression 

相比于传统的IIFE形式，很多人喜欢另一个改进的形式：(function(){..}())。

功能上是一致的。


## 3.4 块作用域

尽管你可能连一行带有块作用域风格的代码都没有写过， 但对下面这种很常见的 JavaScript
代码一定很熟悉：

	for (var i=0; i<10; i++) {
		console.log( i );
	}

我们在 for 循环的头部直接定义了变量 i， 通常是因为只想在 for 循环内部的上下文中使
用 i， 而忽略了 i 会被绑定在外部作用域（ 函数或全局） 中的事实。

###　3.4.1 with

###　3.4.2 try/catch

### 3.4.3 let

ES6 引入了let关键字，let关键字可以将变量绑定到所在的任意作用域中（通常是{...}内部）。换句话说，let implicitly hijacks any block's scope for its variable declaration.

	var foo = true;
	if (foo) {
		let bar = foo * 2;
		bar = something( bar );
		console.log( bar );
	} 
	console.log( bar ); // ReferenceError

用let将变量附加在一个已经存在的块作用域上的行为时隐式的。

    if (foo) {
	    { // <-- 显式的块explicit block
		    let bar = foo * 2;
		    bar = something( bar );
		    console.log( bar );
	    }
    }
	console.log( bar ); // ReferenceError

We can create an arbitrary block for let to bind to by simply including a { .. } pair anywhere a statement is valid grammar.在这个例子中，我们在if声明内部 显示地创建了一个块。

在第四章，我们会讨论提升，提升是指声明会被视为存在于其所出现的作用域的整个范围内。


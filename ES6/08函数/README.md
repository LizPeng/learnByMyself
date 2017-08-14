# **函数的扩展**
---
## 1.函数参数的默认值

### 基本用法
- ES6允许为函数的参数设置默认值，即直接写在参数定义的后面。
- 参数变量是默认声明的，所以不能用let或const再次声明（否则会报错）。
- 使用参数默认值时，函数不能有同名参数

 **如果参数默认值时变量，那么参数就是不传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值时惰性求值的。**

    let x = 99 ;
    function foo(p = x + 1) {
      console.log(p);
    }
    foo();//100
    x = 100 ;
    foo();//101
 

### 与解构赋值默认值结合使用
    function foo({x, y = 5}) {
 	  console.log(x, y);
 	}
 	
 	foo({x: 1, y: 2}) // 1, 2
 	foo() // TypeError: Cannot read property 'x' of undefined

**注意:只有当函数foo的参数是一个对象时，变量x和y才会通过解构赋值而生成。**

 如果结合函数参数的默认值，就可以省略第二个参数。这时，就出现了**双重默认值**

    function fetch(url, { method = 'GET' } = {}) {
      console.log(method);
    }
    
    fetch('http://example.com')
    // "GET"
上面代码中，函数fetch没有第二个参数时，**函数参数**的默认值就会生效，然后才是*解构赋值*的默认值生效，变量method才会取到默认值GET

**注意：函数参数默认值和解构对象默认值解析顺序**

### 参数默认值的位置
定义了默认值的参数，应该是函数的尾参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。

**传入undefined，将触发该参数等于默认值，null则没有这个效果**
###  函数的lengh属性
指定了默认值之后，函数的length属性，将返回没有指定默认值的参数个数。
也就是说，指定了默认值后，length属性将失真。

rest参数也不会计入length属性

    (function(...args) {}).length // 0

如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了

    (function (a = 0, b, c) {}).length // 0
    (function (a, b = 1, c) {}).length // 1

### 作用域
一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域(context)。
等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。

    let x = 1;
    function f(y = x) {
      let x = 2;
     console.log("x:"+x);
      console.log(y);
    }
    f()
    //x:2
    //1

上面的代码中，函数f调用时，参数y = x 形成一个单独的作用域。这个作用域里面，变量x本身没有定义，所以指向外层的全局变量x。函数调用时，函数体内部的局部变量x影响不到默认值变量x。

    var x = 1;
    function foo(x = x ){
      //...
    }
    foo()// ReferenceError: x is not defined
上面代码中，参数x=x形成一个单独的作用域。实际执行的是let x=x，由于**暂时性死区**的原因，这行代码会报错“x未定义”

**[暂时性死区（Temporal Dead Zone）：详细解释请看这里吧](https://segmentfault.com/a/1190000008213835?utm_source=tuicool&utm_medium=referral)**

简单的说明TDZ：以let/const声明的变量或常量，必需是经过对声明的赋值语句的求值后，才算初始化完成，创建时并不算是初始化。如果以let声明的变量没有赋给初始值，那么赋值给它undefined值。也就是经过初始化的完成，才代表着TDZ期间的真正结束，这些在作用域中的被声明的变量才能够正常地被访问。

    let x = x //ReferenceErrot
因为右值（要被赋的值），它在此时是一个还未被初始化完成的变量，实际上我们就在这一个同一表达式中要初始化它。

    function bar(func = () => foo){
      let foo = "inner";
      console.log(func());
    }
    bar()// ReferenceError: foo is not defined

上面的代码中，匿名函数里面的foo指向函数外层（函数参数形成的单独作用域里面，并没有定义变量foo，所以指向外层）。但是函数外层并没有声明变量foo，所以报错。

    var x = 1;
    function foo(x, y = function(){ x = 2; console.log("x参数为："+x);}) {
      var x = 3;
      y();
      console.log(x);
    }
    foo()
	//x参数为：2
	//3
    x //1
上面的代码中，函数foo的参数形成一个单独作用域。这个作用域里面，首先声明了变量x，然后声明了变量y，y的默认值时一个匿名函数。这个匿名函数内部的变量x，指向同一个作用域的第一个参数x。函数foo内部又声明了一个内部变量x，该变量与第一个参数x由于不是一个作用域，所以不是同一个变量，因此执行y后，内部变量x和外部全局变量x的值都没变。

如果将var x=3的var去掉，函数foo的内部变量x就指向第一个参数x，与匿名函数内部的x是一致的，最后输出的就是2，而外层的全局变量x依然不受影响。

### 应用
 利用参数默认值，可以指定一个参数不得省略，如果省略就抛出一个错误。

    function throwIfMissing() {
      throw new Error('Missing parameter');
    }
    function foo(mustBeProvided = throwIfMissing()) {
      return mustBeProvided;
    }
    foo()// Error: Missing parameter

上面代码的foo函数，如果调用的时候没有参数，就会调用throwIfMissing函数，从而抛出一个错误。
## 2.rest参数
ES6引入rest参数（形式为"...变量名"),用于获取函数的多余参数，这样就不需要使用arguments对象了，rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中

    function add(...valuse) {
     let sum = 0;
     for (var val of values) {
      sum += val;
     }
    
     return sum;
    }
    
    add(2, 5, 4);//10
    
上面代码的add函数是一个求和函数，利用rest参数，可以向该函数传入**任意数目**的参数。

rest参数中的变量代表一个数组，所以数组特有的方法都可以用于这个变量。下面是一个利用rest参数改写数组push方法的例子。

    function push(array, ...items) {
      items.forEach(function(item)) {
      array.push(item);
      console.log(item):
      }
    }
    var a = [];
    push(a,1,2,3)

**注意：rest参数只能是最后一个参数，否则会报错**

函数的length属性，不包括rest参数

## 3.扩展运算符

### 含义

扩展运算符(spread)是三个点(...)。它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。

    console.log(...[1, 2, 3])//1 2 3 
    console.log(1,...[2, 3, 4], 5)//1 2 3 4 5
    [...document.querySelectorAll('div')]// [<div>, <div>, <div>]

该运算符主要用于函数调用。

    function push(array, ...items) {
      array.push(...items);
    }
    
    function add(x, y) {
      return x + y ;
    }
    var numbers = [4, 49];
    add(...numbers)//53
    

上面代码中，array.push(...items)和add(...numbers)这两行，都是函数的调用，它们都使用了扩展运算符，该运算符将一个数组，变为参数序列。

扩展运算符与正常的函数参数可以结合使用，非常灵活

    function f(v, w, x, y, z){}
    var args = [0, 1];
    f(-1, ...args, 2, ...[3]);

### 替代数组的apply方法

由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。

下面是扩展运算符取代apply方法的一个实际的例子，应用Math.max方法，简化求出一个数组最大元素的写法。

    //ES5的写法
    Math.max.apply(null, [14, 3, 88]);
    //ES6的写法
    Math.max(...[14, 3, 88]);
    //等同于
    Math.max(14, 3, 88);
    
上面代码表示，由于JavaScript不提供数组最大元素的函数，所以只能套用Math.max函数，将数组转为一个参数序列，然后求最大值。有了扩展运算符以后，就可以直接用Math.max了。

另一个例子是通过push函数，将一个数组添加到另一个数组的尾部。

    var arr1 = [0, 1, 2];
    var arr2 = [3, 4, 5];
    Array.prototype.push.apply(arr1,arr2);//ES5
    arr1.push(...arr2);//ES6
    
上面ES5的写法中，push方法的参数不能是数组，所以只好通过apply方法变通使用push方法。

### 扩展运算符的应用
#### （1）合并数组
 
扩展运算符提供了数组合并的新写法。

    //ES5
    [1, 2].concat(more);
    arr1.concat(arr2,arr3);
    //ES6
    [1, 2, ...more];
    [...arr1, ...arr2, ...arr3];

#### （2）与结构赋值结合

    const [first, ...rest] = [1,2,3,4,5];
    first//1
    rest//[2,3,4,5]
    
    const [fitst, ...rest] = ["foo"];
    first//"foo"
    rest //[]
如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

#### (3) 函数的返回值

JavaScript的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象。扩展运算符提供了解决这个问题的一种变通方法。
    
    var dateFields = readDateFields(database);
    var d = new Date(...dateFields);

上面代码从数据库取出一行数据，通过扩展运算符，直接将其传入构造函数Date。

#### (4) 字符串

扩展运算符还可以将字符串转为真正的数组。

    [...'hello']//["h", "e", "l", "l", "o"]

上面的写法，有一个重要的好处，那就是能够正确识别32位的Unicode字符。

    'x\uD83D\uDE80y'.length // 4
    [...'x\uD83D\uDE80y'].length // 3

上面代码的第一种写法，JavaScript会将32位Unicode字符，识别为2个字符，采用扩展运算符就没有这个问题。因此，正确返回字符串长度的函数，可以像下面这样写
    
    function length(str) {
     return [...str].length;
    }

凡是涉及到操作32位Unicode字符的函数，都有这个问题。因此，最好都用扩展运算符改写。

    let str = 'x\uD83D\uDE80y';
    str.split('').reverse().join('')
    // 'y\uDE80\uD83Dx'
    
    [...str].reverse().join('')
    // 'y\uD83D\uDE80x'

上面代码中，如果不用扩展运算符，字符串的reverse操作就不正确。

#### （5）实现了Iterator接口的对象

任何Iterator接口的对象，都可以用扩展运算符转为真正的数组。

    var nodeList = document.querySelectorAll('div');
    var array = [...nodeList];

上面的代码中，querySelectorAll方法返回的是一个nodeList对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转化为真正的数组，原因就在于NodeList对象实现了Iterator接口。

对于那些没有部署Iterator接口的类似数组的对象，扩展运算符就无法将其转为真正的数组。这时，可是改为使用Array.from方法将arrayLike转为真正的数组。

#### （6）Map和Set，Generator函数

扩展运算符内部调用的是数据结构的Iterator接口，因此只要具有Iterator接口的对象，都可以使用扩展运算符，比如Map结构。

    let map = new Map([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
    ])
    
    let arr = [...map.keys()]; //[1, 2, 3]

Generator函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。

    var go = function*(){
      yield 1;
      yield 2;
      yield 3;
    };
    
    [...go()] // [1, 2, 3]

上面代码中，变量go是一个Generator函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组。
如果对没有iterator接口的对象，使用扩展运算符，将会报错。

判断有无Iterator接口

    typeof object[Symbol.iterator];
    //function就是有
    //undefined就是没有


## 4 严格模式

从ES5开始，函数内部可以设定为严格模式。'use strict'

ES2016做了一点修改，规定只要函数参数使用了默认值，解构赋值，或者扩展运算符，那么函数内部就不能显示设定为严格模式，否则会报错。

这样规定的原因是，函数内部的严格模式，同事适用于函数体和函数参数。但是，函数执行的时候，先执行函数参数，然后再执行函数体。这样就有一个不合理的地方，只有从函数体之中，才能知道参数是否应该以严格模式执行，但是参数却应该先于函数体执行。

    function doSomething(value = 070) {
      'use strict';
      return value;
    }

上面的代码中，参数value的默认值时八进制数070，但是严格模式下不能用前缀0表示八进制，所以应该报错。但实际上，JavaScript引擎会先成功执行value=070，然后进入函数体内部，发现需要用严格模式执行，这时才会报错。

虽然可以先解析函数体代码，再执行参数代码，但是这样无疑就增加了复杂性。因此，标准索性禁止了这种用法，只要参数使用了默认值，解构赋值，或者扩展运算符，就不能显式指定严格模式。

两种方法可以规避这种限制。第一种是设定全局性的严格模式，这是合法的。

    'use strict';
    function doSomething(a, b = a) {
    	//code
    }

第二种是把函数包在一个屋参数的立即执行函数里面。

    const doSomething = (function () {
      'use strict';
      return function(value = 42) {
    return value;
      };
    }())

## 5 name属性

函数的name属性，返回该函数的属性名。

    function foo() {}
    foo.name //'foo'

这个属性早就被浏览器广泛支持，但是直到ES6，才将其写入了标准。

需要注意的是，ES6对这个属性的行为做出了一些修改。如果将一个匿名函数赋值给一个变量，ES5的name属性，会返回空字符串，而ES6的name属性会返回实际的函数名。

    var f = function () {};
    
    // ES5
    f.name // ""
    // ES6
    f.name // "f"

如果将一个具名函数赋值给一个变量，则ES5，ES6的name属性都返回这个具名函数原本的名字

    const bar = function baz() {};
    
    // ES5
    bar.name // "baz"
    
    // ES6
    bar.name // "baz"

Function构造函数返回的函数实例，name属性的值为anonymaous。

    (new Function).name //"anonymous"

bind返回的函数，name属性值会加上bound前缀。

    function foo() {};
    
    foo.bind({}).name //"bound foo"
    
    (function(){}).bind({}).name //'bound '
## [详细图解作用域链与闭包](http://www.jianshu.com/p/21a16d44f150)

![](http://upload-images.jianshu.io/upload_images/599584-aacdb7b7ba2468da.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**作用域**：

在js中，将作用域定义为一套规则，这套规则用来管理引擎如何在当前作用域以及嵌套的子作用域中根据**标识符**名称进行变量查找。

> 这里的标识符，指的是变量名或者 函数名

> js中只有全局作用域与函数作用域。
> 
> 作用域与执行上下文是两个完全不同的概念



![](http://upload-images.jianshu.io/upload_images/599584-391af3aad043c028.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
执行上下文生命周期

**作用域链**:是由当前环境与上层环境的一系列变量对象组成，它保证了当前执行环境对符合访问权限的变量和函数 的有序访问。

作用域链是由一系列变量对象组成，我们可以在这个单向同道中，查询变量对象中的标识符，这样就可以访问到上一层作用域中的变量了。

##　闭包

> 闭包是一种特殊的对象
> 
> 它由两部分组成。执行上下文（代号A），以及在该执行上下文中创建的函数（代号B）。
> 当B执行时，如果访问了A中变量对象中的值，那么闭包就会产生。
> 在大多数理解中，包括许多著名的书籍，文章里都以函数B的名字代指这里生成的闭包。而在chrome中，则以执行上下文A的函数名代指闭包。


![](http://upload-images.jianshu.io/upload_images/599584-75ba724cb9e19b51.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在上面的图中，红色箭头所指的正是闭包。其中Call Stack为当前的函数调用栈，Scope为当前正在被执行的函数的作用域链，Local为当前的局部变量。

**通过闭包，我们可以在其他的执行上下文中，访问到函数的内部变量**比如在上面的例子中，我们在函数bar的执行环境中访问到了函数foo的a变量。

需要注意的是，虽然例子中的闭包被保存在了全局变量中，但是闭包的作用域链并不会发生任何改变。在闭包中，能访问到的变量，仍然是作用域链上能够查询到的变量。

对上面的例子修改，在函数bar声明一个变量c，并在闭包fn中试图访问该变了，运行结果会抛出错误。

```
var fn = null;
function foo() {
    var a = 2;
    function innnerFoo() { 
        console.log(c); // 在这里，试图访问函数bar中的c变量，会抛出错误
        console.log(a);
    }
    fn = innnerFoo; // 将 innnerFoo的引用，赋值给全局变量中的fn
}

function bar() {
    var c = 100;
    fn(); // 此处的保留的innerFoo的引用
}

foo();
bar();
```

### 闭包的应用场景

> 
- 柯里化：函数式编程
- 模块：


## 5全方位解读this

>**this的指向，是在函数被调用的时候确定的。**也就是**执行上下文被创建**的时候确定的。
>在函数执行的过程中，this一旦被确定了，就不可更改了


### 一、全局对象中的this
### 二、函数中的this

例子

```
//demo03
var a = 20;
var obj = {
    a: 10,
    c: this.a + 20,
    fn: function () {
        return this.a;
    }
}

console.log(obj.c);//40 ???
console.log(obj.fn());//10
```

在一个**函数**的上下文中，this由调用者提供，由调用函数的方式来决定。**如果调用者函数被某一个对象所拥有，那么该函数在调用时，内部的this指向该对象。如果函数独立调用，那么该函数内部的this，则指向undefined。**但是在非严格模式中，当this指向undefined时，它会被自动指向全局对象。

```
// 为了能够准确判断，我们在函数内部使用严格模式，因为非严格模式会自动指向全局
function fn() {
    'use strict';
    console.log(this);
}

fn();  // fn是调用者，独立调用
window.fn();  // fn是调用者，被window所拥有
```

在上面的简单例子中，fn()作为独立调用者，this指向undefined。
而window.fn()则因为fn被window所拥有，内部的this就指向window对象。

再看demo03例子。需要明确的是，单独的{}是不会形成新的作用域的，因此这里的this.a，由于没有作用域的限制，所以它仍然处于全局作用域之中。所以这里的this其实是指向window对象。
```
'use strict';
var a = 20;
function foo () {
    var a = 1;
    var obj = {
        a: 10, 
        c: this.a + 20,
        fn: function () {
            return this.a;
        }
    }
    return obj.c;

}
console.log(foo());    // 报错
console.log(window.foo());  // 40

```

看例子：

```
var a = 20;
var foo = {
    a: 10,
    getA: function () {
        return this.a;
    }
}
console.log(foo.getA()); // 10
//getA是调用者，他不是独立调用，被对象foo所拥有，因此它的this指向了foo。
var test = foo.getA;
console.log(test());  // 20
//test()作为调用者，但它是独立调用的，因此this指向undefined，在非严格模式中，自动转向全局window

```
另一个例子：
```
function foo() {
    console.log(this.a)
}

function active(fn) {
    fn(); // 真实调用者，为独立调用
}

var a = 20;
var obj = {
    a: 10,
    getA: foo
}

active(obj.getA);
```

### 三、使用call, apply显示指定this

它们除了参数略有不同，其功能完全一样。它们的第一个参数都为this将要指向的对象。

而call与apply后面的参数，都是向将要执行的函数**传递参数**。其中call以一个一个的形式传递，apply以数组的形式传递。
```
function fn(num1, num2) {
    console.log(this.a + num1 + num2);
}
var obj = {
    a: 20
}

fn.call(obj, 100, 10); // 130
fn.apply(obj, [20, 10]); // 50

```

- 将类数组对象转换为数组//[].slice.call(arguments)
- 根据自己的需要灵活修改this指向//foo.showName.call(bar)
- 实现继承
- 在向其他执行上下文的传递中，确保this的指向保持不变

```
//继承
//定义父级的构造函数
var Person = function(name, age) {
  this.name = name;
  this.age = age;
  this.gender = ['man', 'woman'];
}

//定义子类的构造函数
var Student = function(name, age, high) {
  //use call
  Person.call(this, name, age);
  this.high = high;
}

Student.prototype.message = function(){
  console.log('name: ' + this.name + ', age: ' + this.age + ', high: '+ this.high);
}

new Student('xiaoming', 12, '150cm').message();
```

解释一下，在student的构造函数中，借助call方法，将父级的构造函数执行了一次，相当于将Person中的代码，在Student中赋值了一份，其中的this指向为从Student中new出来的实例对象。call方法保证了this的指向正确，因此相当于实现了继承。


```
var obj = {
    a: 20,
    getA: function() {
        setTimeout(function() {
            console.log(this.a)
        }, 1000)
    }
}

obj.getA();
//我们期待的是getA被obj调用时，this指向obj
//但是由于匿名函数的存在导致了this指向的丢失，在这匿名函数中this指向了全局。
```

使用es5自带的bind方法


```
var obj = {
    a: 20,
    getA: function() {
        setTimeout(function() {
            console.log(this.a)
        }.bind(this), 1000)
    }
}

obj.getA();

```

### 四、构造函数与原型方法上的this

结合下面的例子

```
function Person(name, age) {
  //这里的this指向了谁？
  this.name = name;
  this.age = age;
}

Person.prototype.getName = function() {
  //this
  return this.name;
}

var p1 = new Person('nick', 20)
p1.getName()

```

通过new操作符调用构造函数，会经理以下4个阶段

> 
- 创建一个新的对象；
- 将构造函数的this指向这个新对象；
- 指向构造函数的代码，为这个对象添加属性，方法等；
- 返回新对象。

因此，当new操作符调用构造函数时，this其实指向的就是这个新创建的对象，最后又将新的对象返回出来，被实例对象p1接收。因此，我们可以使，这个时候，构造函数的this，指向了新的实例对象，p1.

而原型方法上的this就好理解多了，根据上边对函数中this的定义，p1.getName()中的getName为调用者，他被p1所拥有，因此getName中的this，也是指向了p1.


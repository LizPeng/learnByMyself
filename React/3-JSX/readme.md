# 3.1使用JSX
---
利用JSX编写DOM结构，可以用原生的HTML标签，也可以直接像普通标签一样引用React组件。这两者约定通过大小写来区分，**小写**的**字符串**是HTML标签，**大写**开头的**变量**是React组件。

### 使用HTML标签：

    import React from 'react';
    import { render } from 'react-dom';
    
    var myDivElement = <div className ="foo" />;
    render(myDivElement, document.getElementById('mountNode'));

HTML里的class在JSX里要写成className,因为class在JS里是保留关键字。同理某些属性比如for要写成htmlFor。

### 使用组件：

    import React from 'react';
    import { render } from 'react-dom';
    import MyComponent from './MyComponent';
    
    var myElement = <MyComponent someProperty={ture} />;
    render(myElement, document.body);


## 使用JavaScript表达式

属性值使用表达式，只要用{} 替换 "" :

    // Input(JSX)
    var person = <Person name={window.isLoggedIn ? window.name : ''} />;
    //Ourput(JS):
    var person = React.createElement(
      Person,
      {name: window.isLoggedIn ? window.name : ''}
    );

子组件也可以作为表达式使用：

    //Input (JSX)
    var content = <Container>{window.isLoggedIn ? <Nav /> : <Login />}</Container>;
    //Output (JS)
    var content = React.createElement(
      Container,
      null,
      window.isLoggedIn ? React.createElement(Nav) : React.createElement(Login)
    );

## 注释 

在JSX里使用注释也很简单，就是沿用JavaScript，唯一要注意的是在一个组件的子元素位置使用注释要用 {} 包起来。

    var content = (
      <Nav>
   		 {/* child comment, put {} around */}
   		 <Person
		     /* multi
		     line
		     comment */
		     name = {window.isLoggedIn ? window.name : ''} //end of line comment
		  /> 
      </Nav>
    );
    

## HTML 转义

React会将所有要显示到DOM的字符串转义，防止XSS.所以如果JSX中含有转义后的实体字符比如&copy；(©) 最后显示到DOM中不会正确显示，因为React自动把&copy;中的特殊字符转义了。有几种解决办法：

- 直接使用UTF-8字符
- 使用对应字符的Unicode编码，[查询编码](http://www.fileformat.info/info/unicode/char/00a9/index.htm)
- 使用数组组装 `<div>{['cc ', <span>&copy;</span>, ' 2015']}</div>`
- 直接插入原始的HTML


  `<div dangerouslySetInnerHTML={{__html: 'cc &copy; 2015'}}/>`

## 自定义HTML属性

如果JSX中使用的属性不存在于HTML的规范中，这个属性会被被忽略。如果要使用自定义属性，可以用data-前缀。


# 3.2 属性扩散
---

有时候你需要给组件设置多个属性，你不想一个个写下这些属性，或者有时候你甚至不知道这些属性的名称，这时候spread attributes的功能就很有用了。

比如：

    var props = {};
    props.foo = x;
    props.bar = y;
    var component = <Component {...props} />;

props对象的属性会被设置成Component的属性。

属性也可以被覆盖：
    
    var props = { foo: 'defaule' };
    var component = <Component {...props} foo={'override'} />;
    console.log(component.props.foo);//'override'





# 3.3 和HTML的差异
---

比较典型的还有：

- style属性接受由CSS属性构成的JS对象
- onChange事件表现更接近我们的直觉(不需要onBlur去触发)
- 表单的表现差异比较大，要单独再讲
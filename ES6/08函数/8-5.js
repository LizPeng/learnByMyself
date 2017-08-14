function foo() {}
foo.name //'foo'

var f = function () {};

// ES5
f.name // ""

// ES6
f.name // "f"
Function构造函数返回的函数实例，name属性的值为anonymous。

(new Function).name // "anonymous"
bind返回的函数，name属性值会加上bound前缀。

function foo() {};
foo.bind({}).name // "bound foo"

(function(){}).bind({}).name // "bound "
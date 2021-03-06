[原文地址](http://taobaofed.org/blog/2017/03/16/javascript-functional-programing/)

## 我理解的函数式编程

以函数作为主要载体的编程方式，用函数去拆解、抽象一般的表达式。

与命令式相比，这样做的好处有以下几点：

- 语义更加清晰
- 可复用性更高
- 可维护性更好
- 作用域局限，副作用少

### 基本的函数式编程

    //数组中每个单词，首字母大写
    
    //一般写法
	
	const arr = ['apple', 'pen', 'apple-pen'];
	for (const i in arr){
		const c = arr[i][0];	
		arr[i] = c.toUpperCase() + arr[i].slice(1)
	}
	console.log(arr);
	//函数式写法一
	function upperFirst(word){
		return word[0].toUpperCase() + word.slice(1)	
	}
	function wordToUpperCase(arr){
		return arr.map(upperFirst)
	}
	console.log(wordToUpperCase(arr))
	
	//函数式写法二
	console.log(arr.map(['apple', 'pen', 'apple-pen'], word => word[0].toUpperCase() + word.slice(1)));

写法一盒写法二的主要差别在于，可以考虑函数是否后续有复用的可能，如果没有，则后者更优。

## 链式优化

//优化写法（lodash的链式写法）
  `  const utils = {
      chain(a){
	    this._temp =a ;
	    return this 
      },
      sum(b) {
	    this._temp += b;
	    return this;
      },
      sub(b) {
	    this._temp -= b;
	    return this;
      },
      value() {
	    const _temp = this._temp;
	    this._temp = undefined;
	    return _temp;
      }
    }
    console.log(utils.chain(1).sum(2).sum(3).sub(4).value());
`
这样改写后，整体结构会变得比较清晰，而且链的每一环节在做什么可以很容易的展现出来。函数的嵌套和链式的对比还有一个很好的例子，那就是**回调函数和Promise模式**。

    //顺序请求两个接口
    // 回调函数
    import $ from 'jquery';
    $.post('a/url/to/target', (rs)=>{
      if(rs){
	    $.post('a/url/to/another/target', (rs2) => {
	      if(rs2){
	    	$.post('a/url/to/third/target');
	      }
	    })
      }
    })
    
    // Promise
    import request from 'catta'; //catta是一个轻量级请求工具，支持fetch，jsonp，ajax无依赖
    request('a/url/to/target')
	    .then(rs => rs ? $.post('a/url/to/another/target') : Promise.reject())
	    .then(rs2 => rs2 ? $.post('a/url/to/third/target') : Promise.reject());

随着回调函数嵌套层级和单层复杂度增加，它将会变得臃肿且难以维护，而Promise的链式结构，在高复杂时，仍能纵向扩展，而且层次隔离很清晰。

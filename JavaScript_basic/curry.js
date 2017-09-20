// 简单实现，参数只能从右到左传递
function createCurry(func, args) {
    var arity = func.length;
    var args = args || [];

    return function() {
        var _args = [].slice.call(arguments);
        [].push.apply(_args, args);
        // 如果参数个数小于最初的func.length，则递归调用，继续收集参数
        if (_args.length < arity) {
            return createCurry.call(this, func, _args);
        }

        // 参数收集完毕，则执行func
        return func.apply(this, _args);
    }
}



/**
 * 在某个项目中，针对于某一个数组的操作其实是固定的
 * 也就是说，同样的操作，可能会在项目的不同地方调用很多次。
 * 在map函数的基础上，进行二次封装，以简化在项目中的使用。
 * 加入需要调用的操作是将数组的每一项都转化为百分比 1-->100%
 * //普通封装
  function getNewArray(array) {
    return array.map(function(item) {
      return item * 100 + '%'
    })
  }
  getNewArray(([1, 2, 3, 0.12]))//["100%", "200%", "300%", "12%"]
 */

/*柯里化eg重点start*/
//step1 借助柯里化二次封装
function _map(func, array) {
  return array.map(func)//遍历或过滤操作array参数
}
var _getNewArray = createCurry(_map); //将函数柯里化

var getNewArray = _getNewArray(function(item) {
  return item * 100 + '%' //对每一项的操作
})
getNewArray([1, 2, 3, 0.12])//["100%", "200%", "300%", "12%"]
/*柯里化eg重点end*/

//step2 对数组进行过滤
function _filter(func, array) {
  return array.filter(func)
}

var _find = createCurry(_filter)
var findNumber = _find(function(item) {
  if(typeof item == 'number'){
    return item
  }
})
findNumber([1, 2, 3, '2', '3', 4]); // [1, 2, 3, 4] 找出所有数字

//封装另外的过滤操作，找出数字为20的子项

var find20 = _find(function(item,i) {
  if(typeof item === 20){
    return i;
  }
})
find20([1, 2, 3, 30, 20, 100]); 
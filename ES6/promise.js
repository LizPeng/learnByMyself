var fn = function(num) {
  return new Promise(function(resolve, reject) {
    if(typeof num == 'number') {
      resolve(num);
    } else {
      reject('TypeError')
    }
  })
}

fn(2).then(function(num) {
  console.log('first: ' + num);
  return num + 1;
})
  .then((num) => {
    console.log('second: ' + num);
    return num + 1;
  })
  .then((num) => {
    console.log('third: ' + num);
    return num + 1;
  })

/**
  * 封装一个get请求的方法
  */
var url = '';
function getJSON(url) {
  return new Promise(function(resolve, reject) {
    var XHR = new XMLHttpRequest();
    XHR.open('GET', url, true);
    XHR.send();

    XHR.onreadystatechange = function() {
      if (XHR.readyState == 4) {
        if ( XHR.status == 200) {
          try {
            var response = JSON.parse(XHR.responseText);
            resolve(response);
          } catch (e) {
            reject(e)
          }
        } else {
          reject(new Error(XHR.statusTEXT));
        }
      }
    }
  })
}
getJSON(url).then(resp => console.log(resp));

/**
 * Promise.all接受一个Promise对象组成的数组作为参数
 * 当这个数组所有的Promise对象状态都变成resolved或rejected的时候，它才会去调用then方法
 */
var url1=''
function renderAll() {
  return Promise.all([getJSON(url), getJSON(url1)]);
}
renderAll().then(function(value) {
  cosole.log(value);
})

/**
 * Promise.race
 * 也是以一个Promise对象组成的数组作为参数
 * 不同的是，只要当数组中的其中一个Promise状态变成Resolved或者Rejected
 * 就可以调用then方法。而传递给then方法的值也会有所不同
 */
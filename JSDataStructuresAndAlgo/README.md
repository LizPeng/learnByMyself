## JavaScript不是强类型语言

这意味着你可以声明一个变量并初始化成一个数字类型的值，然后把它更新成字符串或者其他类型的值。

null表示变量没有值。

undefined表示变量已经被声明，但尚未赋值。


### 位运算
---

位运算一脸懵逼！！！！！！！！！！


    console.log('5 & 1:', (5 & 1))
    console.log('5 | 1:', (5 | 1))
    console.log('~ 5:', (~5))
    console.log('5 ^ 1:', (5 ^ 1))
    console.log('5 << 1:', (5 << 1))
    console.log('5 >> 1:', (5 >> 1))


以下算法参考来自[这里](http://www.365mini.com/page/bit-operation.htm)

按位 与 & 
---

将两个证书的二进制形式进行**逐位** “与”操作（包括符号位）。

也就是将两个二进制数对应位上的数进行如下计算：如果两个数对应位上的数都为1，则结果数对应位上的数为1，否则为0


按位 或 |
---

与&恰好相反

如果两个数对应位上的数至少有一个为1，结果数对应位上的数位1，否则为0。


JavaScript还**支持delete操作符**，可以删除对象里的属性

    
    var myObj = {name: 'John', age: 21};
    delete myObj.age;
    console.log(myObj); // 输出对象{name: "John"}


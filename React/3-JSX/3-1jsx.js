//使用HTML标签
import React from 'react';
import { render } from 'react-dom';

var myDivElement = <div className ="foo" />;
render(myDivElement, document.getElementById('mountNode'));
// 使用组件
import React from 'react';
import { render } from 'react-dom';
import MyComponent from './MyComponent';

var myElement = <MyComponent someProperty={ture} />;
render(myElement, document.body);

//属性值表达式
// Input(JSX)
var person = <Person name={window.isLoggedIn ? window.name : ''} />;
//Ourput(JS):
var person = React.createElement(
  Person,
  {name: window.isLoggedIn ? window.name : ''}
);

//子组件也可以作为表达式使用：
//Input (JSX)
var content = <Container>{window.isLoggedIn ? <Nav /> : <Login />}</Container>;
//Output (JS)
var content = React.createElement(
  Container,
  null,
  window.isLoggedIn ? React.createElement(Nav) : React.createElement(Login)
);

//注释

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
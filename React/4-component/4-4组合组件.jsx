import React from 'react';
import { render } from 'react-dom';

const ProfilePic = (props) => {
  return (
    <img src={'http://graph.facebook.com/' + props.username + '/picture'} />
  );
}

const ProfileLink = (props) => {
  return (
    <a href={'http://www.facebook.com/' + props.username}>
      {props.username}
    </a>
  );
}

const Avatar = (props) => {
  return (
    <div>
      <ProfilePic username={props.username} />
      <ProfileLink username={props.username} />
    </div>
  );
}

render(
  <Avatar username="pwh" />,
  document.getElementById('example')
);
//循环插入子元素

const ListItemWrapper = (props) => <li>{props.data.text}</li> 

const MyComponent = (props) => {
  return (
    <ul>
      {props.results.map((result) => {
        return <ListItemWrapper key={result.id} data={result} />;
      })}
    </ul>
  )
}

//增加字符串前缀
render() {
  var items = {};

  this.props.results.forEach((result) => {
    items['result-'+ result.id] = <li> {result.text} </li>;
  });
  return (
    <ol>
      {items}
    </ol>
  )
}



import React, { Component } from 'react';
import { render } from 'react-dom';

class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  handleClick(e) {
    this.setState({ liked: !this.state.liked });
  }

  render() {
    const text = this.state.liked ? 'liked' : 'haven\'t liked ';
    return (
      <p onClick={this.handleClick.bind(this)}>
        You {text} this. Click to toggle.
      </p>
    );
  }
}

render(
  <LikeButton />,
  document.getElementById('example')
);

//构造函数中初始化状态
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count:props.initialCount };
  }

  render() {
    //...
  }
}




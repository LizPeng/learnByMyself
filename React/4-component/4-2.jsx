//一个简单的例子
//
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
      const text = this.state.liked ?　'like' : 'havent\' liked ';
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
 
render: function(){
  return <p onClick={this.handleClick.bind(this, 'extra param')}> </p>;
},
handleClick: function(param, event) {
  //handle click
}


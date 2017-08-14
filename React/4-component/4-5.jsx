import React , { Component } from 'react' ;
import { render } from 'react-dom' ;

class GroceryList extends Component {
  handleClick(i) {
    console.log('You clickd: ' + this.props.items[i]);
  }
  render() {
    return (
      <div>
       {this.props.items.map((item,i) => {
         return (
           <div onClick={this.handleClick.bind(this, i)} key={i} >{tiem}</div>
         );
       })} 
      </div>
    );
  }
}

render(
  <GroceryList items={['Apple', 'Banana', 'Cranberyy']} />, mountNode
);

import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router' ;


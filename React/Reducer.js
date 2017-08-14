const chatReducer = (state = defaultState, action = {}) => {
  return {
    chatLog: chatLog(state.chatLog, action),
    statusMessage: statusMessage(state.statusMessage, action);
    userName: userName(state.userName, action)
  }
};

import { combineReducers } from 'redux';

const chatReducer1 = combineReducers({
  chatLog,
  statusMessage,
  userName
})
export default todoApp
/*
上面的代码通过combineReducers方法将三个子Reducer合并成一个大函数。
这种写法有一个前提，就是State的属性名必须与子Reducer同名
*/
//不同名要采用下面的写法
const reducer2 = combineReducers({
  a:doSomethingA,
  b:processB,
  c:c
})

//combinerReducer的简单实现
const combineReducers = reducers => {
  return (state ={}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
      },
      {}
    )
  }
}

store.dispatch(action)//发出action
let nextState = todoApp(previousState, action)
store.subscribe(listener)

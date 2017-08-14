以下内容来源[这里](https://github.com/LizPeng/react-pxq)
# Redux 
---

首先，Redux并不是必须的，它的作用相当于在顶层组件之上又加了一个组件，作用是进行逻辑运算、储存数据和实现组件**尤其是顶层组件**的通信。如果组件之间的交流不多，逻辑不复杂，只是单纯的进行视图的渲染，这时候用回调，context就行，没必要用redux，用了反而影响开发速度。如果组件交流特别频繁，逻辑很复杂，那redux的优势就特别明显了。

先简单说一下redux和react是怎么配合的。react-redux提供了connect和Provider两个好基友，它们一个将组件与redux关联起来，一个将store传给组件。组件通过dispath发出action，store根据action的type属性调用对应的reducer并传入state和这个action，reducer对state进行处理并返回一个新的state放入store，connect监听到store发生变化，调用setState更新组件，此时组件props也就跟着变化。


值得注意的是connect，Provider，mapStateToProps，mapDispatchToProps是react-redux提供的，redux本身和react没有半毛钱关系，它只是数据处理中心，没有和react产生任何耦合，是react-redux让它们联系在一起。

## 先说redux：

### redux主要由三部分组成：store，reducer，action 。
store是一个对象，它有四个主要的方法：

1、 dispatch：
> 用于action的分发----在createStore中可以用middleware中间件对dispatch进行改造，比如当action传入dispatch会立即触发reducer，有些时候我们不希望它立即触发，而是等待异步操作完成后再触发，这时候用redux-thunk对dispatch进行改造，以前只能传入一个对象，改造完成后可以传入一个函数，在这个函数里我们手动dispatch一个action对象，这个过程是可控的，就实现了异步。

2、 subscribe：

> 监听state的变化----这个函数在store调用dispatch时会注册一个listener监听state变化，当我们需要知道state是否变化时可以调用，它返回一个函数，调用这个返回的函数可以注销监听。
> `let unsubscribe = store.subscribe(()={console.log("state发生了变化")})`

3、 getState：

> 获取store中的state----当我们用个action触发了reducer改变了state时，需要再拿到新的state里的数据，毕竟数据才是我们想要的。getState主要在两个地方需要用到，一是dispatch拿到action后store需要用它来获取state里的数据，并把这个数据传给reducer，这个过程是自动执行的，二是我们利用subscribe监听到state发生变化后调用它来获取新的state数据，如果做到这一步，说明我们已经成功了。

4、 replaceReducer：

> 替换reducer，改变state修改的逻辑。

store可以通过createStore()方法创建，接受三个参数，经过combineReducers合并的reducer和state初始状态以及改变dispatch的中间件，后两个参数并不是必须的。store的主要作用是将action和reducer联系起来并改变state。


action ：
> action是一个对象，其中type属性时必须的，同时可以传入一些数据。action可以用actionCreactor进行创造。dispatch就是把action对象发送出去。

reducer：

> reducer是一个函数，它接受一个state和一个action，根据action的type返回一个新的state。根据业务逻辑可以分为很多个reducer，然后通过combineReducers将它们合并，state树种有很多对象，每个state对象对应一个reducer，state对象的名字可以在合并时定义。

像这个样子：

    const reducer = combineReducers({
		a: doSomethingWithA,
		b: processB,	
		c: c	
	})

combineReducers:

> 其实它也是一个reducer，它接受整个state和一个action，然后整个state拆分发送给对应的reducer进行处理，所有的reducer会收到相同的action，不过它们会根据action的type进行判断，有这个type就进行处理然后返回新的state，没有就返回默认值，然后这些分数的state又会整合在一起返回一个新的state树。

接下来分析一下整体的流程，首先调用store.dispatch将action作为参数传入，同时用getState获取当前的状态树state并注册subscribe的listener监听state变化，再调用combineReducers并将获取的state和action传入。combineReducers会将传入的state和action传给所有reducer，reducer会根据state的key值获取与自己对应的state，并根据action的type返回新的state，触发state树的更新，我们调用subscribe监听到state发生变化后用getState获取新的state数据。

**redux的state和react的state两者完全没有关系，除了名字一样。**

###上面分析了redux的主要功能，那么react-redux到底做了什么？

React-Redux
---

如果只使用redux，那么流程是这样的：

> component --> dispatch(action) --> reducer --> subscribe --> getState -->component

用了react-redux之后流程是这样的：

> component --> actionCreator(data) --> reducer --> component 

store的三个功能：dispatch，subcribe，getState都不需要手动来写了。react-redux帮我们做了这些，同时它提供了两个好基友Provider和connect。

**Provider**是一个组件，它接受store作为props，然后通过context往下传，这样react中任何组件都可以通过context获取store。也意味着我们可以在任何一个组件里利用dispatch(action)来触发reducer改变state，并用subscribe监听state的变化，然后用getState获取变化后的值。但是并不推荐这样做，它会让数据流变得混乱，过渡的耦合也会影响组件的费用，维护起来也更麻烦。

connect--connect(mapStateToProps, mapDispatchToProps, mergeProps, options)是一个函数，它接受四个参数并且再返回一个函数--wrapWithConnect, wrapWithConnect接受一个组件作为参数wrapWithConnect(component),它内部定义了一个新组件Connect(容器组件)并将传入的组件(ui组件)作为Connect的子组件然后return出去。

所以它的完整写法是这样的： `connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(component)`


mapStateToProps(state,[ownProps]):

> mapStateToProps接受两个参数，store的state和自定义的props，并返回一个新的对象，这个对象会作为props的一部分传入ui组件。我们可以根据组件所需要的数据自定义返回一个对象，ownProps的变化也会触发mapStateToProps。

    function mapStateToProps(state){
      return { todos: state.todos };
    }
    
mapDispatchToProps(dispatch, [ownProps])：

> mapDispatchToProps如果是对象，那么会和store绑定作为props的一部分传入ui组件。如果是个函数，它接受两个参数，bindActionCreators会将action和dispatch绑定并返回一个对象，这个对象会和ownProps一起作为props的一部分传入ui组件。所以不论mapDispatchToProps是对象还是函数，它最终都会返回一个对象，如果是函数，这个对象的key值时可以自定义的。


    function mapDispatchToProps(dispatch){
      return {
    	todoActions: bindActionCreators(todoActionCreators, dispatch),
   		counterActions:bingActionCreators(counterActionCreators, dispatch)
      };
    }

mapDispatchToProps返回的对象其属性其实就是一个个actionCreator，因为已经和dispatch绑定，所以当调用actionCreators时会立即发送action，而不用手动dispatch。ownProps的变化也会触发mapDispatchToProps。

mergeProps(stateProps, dispatchProps, ownProps):

> 将mapStateToProps()与mapDispatchToProps()返回的对象和组件自身的props合并成新的props并传入数组。默认返回Object.assgin({}, ownProps, stateProps, dispatchProps)的结果。

options: 

> pure = true　表示Connect容器组件将在shouldComponentUpdate中对store的state和ownProps进行浅对比，判断是否发生变化，优化性能。为false则不必对。

其实connect函数并没有做什么，大部分的逻辑都是在它返回的wrapWithConnect函数内实现的，确切的说实在wrapWithConnect内定义的Connect组件里实现的。


# 下面是一个完整的react--> redux --> react流程：

一、Provider组件接受redux的store作为props，然后通过context往下传
二、connect函数在初始化的时候会将mapDispatchToProps对象绑定到store，如果mapDispatchToProps是函数则在Connect组件获得store后，根据传入的store.dispatch和action通过bindActionCreators进行绑定，再将返回的对象绑定到store，connect函数会返回一个wrapWithConnect函数，同时wrapWithConnect会被调用且传入一个ui组件，wrapWithConnect内部使用class Connect extends Component定义了一个Connect组件，传入的ui组件就是Connect的子组件，然后Connect组件会通过context获得store，并且通过store.getState获得完整的state对象，将state传入mapStateToProps返回stateProps对象，mapDispatchToProps对象或mapDispatchToProps函数会返回一个dispatchProps对象，stateProps、dispatchProps以及Connect组件的props三者通过Object.assign(),或者mergeProps合并为props传入ui组件。然后在ComponentDidMount中调用store.subscribe，注册了一个回调函数handleChange监听state的变化。

三、此时ui组件就可以在props中找到actionCreator，当我们调用actionCreator时会自动调用dispatch，在dispatch中会调用getState获取整个state，同时注册一个listener监听state的变化，store将获得的state和action传给combineReducers，combineReducers会将state依据state的key值分别传给子reducer，并将action传给全部子reducer，reducer会被依次执行进行action.type的判断，如果有则返回一个新的state，如果没有则返回默认。combineReducers再次将子reducer返回的单个state进行合并成一个新的完整的state。此时state发生了变化。dispatch在state返回新的值之后会调用所有注册的listener函数其中包括handleChange函数，handleChange函数内部首先调用getState获取新的state值并对新旧两个state进行浅对比，如果相同直接return，如果不同则调用mapStateToProps获取stateProps并将新旧两个stateProps进行浅对比，如果相同，直接return结束，不进行后续操作。如果不相同则调用this.setState()触发Connect组件的更新，传入ui组件，触发ui组件的更新，此时ui组件获得新的props，react --> redux --> react 的一次流程结束。

**上面的有点复杂，简化版的流程是：**

一、Provider组件接受redux的store作为props，然后通过context往下传。

二、connect函数收到Provider传出的store，然后接受三个参数mapStateToProps，mapDispatchToProps和组件，并将state和actionCreator以props传入组件，这时就可以调用actionCreator
函数来出发reducer函数返回新state，connect监听到state变化调用setState更新组件并将新的state传入组件。

connect可以写的非常简洁，mapStateToProps、mapDispatchToProps只不过是传入的回调函数，connect函数在必要的时候会调用它们，名字不是固定的，甚至可以不写名字。

简化版本：

    connect(state => state,action)(Component);

# 项目搭建

上面说了react，react-router和redux的知识点。但是怎么将他们整合起来，搭建一个完成的项目。

1、先引用react.js , redux , react-router等基本文件，建议用npm安装，直接在文件中引用。
2、先从react.js redux react-router中引入所需要的对象和方法。

    import React, {Component, PropTypes} from 'react';
    import ReactDOM, {render} from 'react-dom';
    import {Provider, connect} from 'react-redux';
    import {createStore, combineReducers, applyMiddleware} from 'redux';
    import {Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router' ;

3、根据需求创建顶层UI组件，每个顶层ui组件对应一个页面。
4、创建actionCreators和reducers，并用combineReducers将所有的reducer合并成一个大的reducer。利用createStore创建store并引入combineReducers和applyMiddleware。
5、利用connect将actionCreator，reducer和顶层的ui组件进行关联并返回一个新的组件。
6、利用connect返回的新的组件配合react-router进行路由的部署，返回一个路由组件Router。
7、将Router放入最顶层组件Provider，引入store作为Provider的属性。
8、调用render渲染Provider组件且放入页面的标签中。

可以看到顶层的ui组件其实被套了四层组件，Provider，Router，Route，Connect，这四个组件并不会再视图上改变react，它们只是功能性的。

通常我们在顶层的UI组件打印props时可以看到一堆属性：

![](https://github.com/bailicangdu/pxq/raw/master/src/images/react_props.png)

上图的顶层ui组件总共有18个，如果刚刚接触react，可能对这些属性怎么来的感到困惑，其实这些属性来自五个地方：

组件自定义属性1个，actionCreator返回的对象6个，reducer返回的state4个，Connect组件属性0个，以及Router注入的属性7个。


#state
---
state主要作用是用于组件保存、控制。**修改自己**的可变状态。state咋组件内部初始化，可以被组件自身修改，而外部不能访问也不能修改。

你可以任务state是一个局部的、只能被组件自身控制的数据源。state中状态可以通过setState方法进行更新，setState会导致组件的**重新渲染**。

props的主要作用是让使用该组件的父组件可以传入参数来配置该组件。它是外部传进来的配置参数，组件内部无法控制也无法修改。除非外部组件主动传入新的props，**否则组件的props永远保持不变。**

state 和props 有千丝万缕的关系。它们都可以决定组件的行为和显示形态。一个组件的state中的数据可以用个props传递给子组件，一个组件可以使用外部传入props来初始化自己的state。但是它们的职责非常明晰分明：**state**让组件自己控制组件的状态，**props**让外部对组件组件进行配置。

一个简单的规则：尽量少用state，尽量多的用props。

没有state的组件叫无状态组件（statless component），设置里的state的叫做有状态组件（stateful component)。

React.js非常鼓励无状态组件，在0.14版本引入了函数式组件----一种定义不能使用state组件，例如原来这样写的组件：

	class HelloWorld extends Component {
	  constructor(props) {
	    super(props)
	  }
	    
	  sayHi () {
	    alert(`Hello ${this.props.name}`)
	  }
	    
	  render () {
		  return (
		      <div onClick={this.sayHi.bind(this)}>Hello {this.props.name}</div>
		  )
	  }
	}
	HelloWorld.propTypes ={
		name: React.PropTypes.string.isRequired
	}


用函数式组件的编写方式就是：

    const HelloWorld = ({name1})=>{
	const sayHi = (event) =>alert(`Hello ${name1}`)
		return (
			<div onClick={sayHi}>Hello {name1}</div>
		)
	}



	HelloWorld.propTypes ={
		name: React.PropTypes.string.isRequired
	}

以前一个组件时通过继承Component 来构建，一个子类就是一个组件。而用函数式的组件编写方法是一个函数就是一个组件，你可以和以前一样通过<HelloWorld />使用该组件。不同的是，函数式组件只能接受props而无法像类组件一样可以在constructor里面初始化state。你可以立即函数式组件就是一种只能接受props和提供render方法的类组件。


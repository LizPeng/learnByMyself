//A ReactElement
const myComponent = <myComponent />

// render
const myComponentInstance = ReactDOM.render(myComponent, mountNode);
myComponentInstance.doSomething();


import { findDOMNode } from 'react-dom';

//Inside Component class
componenDidMount() {
  const el = findDOMNode(this);
}
//findDOMNode()不能用在无状态组件上

class App extends Component {
  constructor() {
    return { userInput: '' };
  }
  handleChange(e) {
    this.setState({userInput: e.target.value });
  }
  clearAndFocusInput() {
    this.setState({userInput: '' },()=>{
      this.refs.theInput.focus();
    });
  }
  render() {
    return (
      <div>
        <div onClick={this.clearAndFocusInput.bind(this)}>
          Click to Focus and Reset
        </div>
        <input 
          ref="theInput"
          value={this.state.userInput}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    )
  }
}
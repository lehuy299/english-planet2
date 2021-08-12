import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Page = () => (
  <div>
    <CountingParent/>
    <CountingParent/>
    <CountingParent/>
  </div>
);

class CountingParent extends React.Component{
  state = {
    actionCount: 0
  }

  handleAction = (action) => {
    console.log('Child says', action);

    this.setState({
      actionCount: this.state.actionCount + 1
    });
  }

  handleActionReset = () => {
    this.setState({
      actionCount: 0
    });
  }

  render() {
    return (
      <div>
        <Child onAction={this.handleAction}/>
        <p>Clicked {this.state.actionCount} times</p>
        <div>
          <button onClick={this.handleActionReset}>Reset</button>
        </div>
      </div>
    );
  }
}

function Child({onAction}){
  return (
    <button onClick={onAction}>
      Clicked Me!
    </button>
  )
}

ReactDOM.render(
  <Page/>,
  document.querySelector('#root')
);
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function IconButton(props) {
  console.log(props.prop1)
  return (
  <button>
    <i class="target-icon"/>
    {props.children}
  </button>
  );
}

ReactDOM.render(
  // <IconButton
  //   prop1={"aaaaa"}
  // >
  //   <span style={{color: "red"}}>Do The Thing</span>
  // </IconButton>,
  IconButton({
    children: 
      <span style={{color: "red"}}>Do The Thing</span>
  }),
  document.getElementById('root')
);

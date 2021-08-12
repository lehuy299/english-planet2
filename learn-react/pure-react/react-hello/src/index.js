import React from 'react';
import ReactDOM from 'react-dom';

function Hello(){
  return(
    <span>Hello</span>
  );
}

function World(){
  return(
    <span>World</span>
  );
}

function HelloWorld(){
  return(
    <div>
      <Hello/> <World/>!
    </div>
  );
}

function SubmitButton(){
  var buttonLabel = "Submit";
  return(
    <button>{buttonLabel}</button>
  );
}

function ValidIndicator(){
  var isValid = true;
  return(
    <span>
      {isValid && 'valid'}
      {!isValid && 'not valid'}
    </span>
  )
}

ReactDOM.render(
  <HelloWorld/>,
  document.querySelector('#root')
);

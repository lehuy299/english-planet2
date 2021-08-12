import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Envelop({person}){
  return(
    <div className="envelop">
      <AddressLabel person={person.toPerson}/>,
      <AddressLabel person={person.fromPerson}/>
    </div>
  );
}

function AddressLabel({person}){
  return(
  <div className="address-label">
   <span>{person.name}</span>
   <span>{person.address}</span>
   <span>{person.city}</span>
  </div>
  );
}

var person = {
  toPerson: {
    name: "Mr. Sender",
    address: "123 Fake St.",
    city: "Bostom, MA 02118"
  },
  fromPerson: {
    name: "Mr. Receiver",
    address: "123 Fake St.",
    city: "San Francisco, CA 94101"
  }
};


ReactDOM.render(
  <Envelop person={person}/>,
  document.getElementById('root')
);


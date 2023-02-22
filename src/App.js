import React, { Component } from 'react';
import logo from './restriction.png';
import './App.css';
import SMSForm from './SMSForm';
import RelationForm from './components/RelationForm';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <RelationForm />
          <SMSForm />
        </header>
      </div>
    );
  }
}

import React from 'react';
import Users from './components/Users';
import './App.css';
import Header from './components/Header';
import UsersPosts from './components/UsersPosts'
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Route exact path="/" component={Users} />
      <Route path="/user/:id" render={(props) => <UsersPosts {...props}/>} />
    </div>
  );
}

export default App;

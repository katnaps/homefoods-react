import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import UserProfile from './pages/UserProfile.js';
import Modal from './containers/Modal.js';
import NavBar from './components/NavBar.js';


function App() {
  return (
   <Modal>
     <NavBar />
     <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/users/:id" component={UserProfile} />
     </Switch>
   </Modal>
  );
}

export default App;

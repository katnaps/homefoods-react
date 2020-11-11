import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Modal from './containers/Modal.js';
import NavBar from './components/NavBar.js';
import HomePage from './pages/HomePage.js';
import UserProfile from './pages/UserProfile.js';
import Recipe from './pages/Recipe';
import RecipePage from './pages/RecipePage';
import FoodAnalyze from './pages/FoodAnalyze';


function App() {
  return (
   <Modal>
     <NavBar />
     <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/users/:id" component={UserProfile} />
        <Route path="/recipes/" component={RecipePage} />
        <Route path="/recipe/:id" component={Recipe} />
        <Route path="/food/" component={FoodAnalyze} />
     </Switch>
   </Modal>
  );
}

export default App;

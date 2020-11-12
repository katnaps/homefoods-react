import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Modal from './containers/Modal.js';
import NavBar from './components/NavBar.js';
import HomePage from './pages/HomePage.js';
import UserProfile from './pages/UserProfile.js';
import Recipe from './pages/Recipe';
import RecipePage from './pages/RecipePage';
import FoodAnalyze from './pages/FoodAnalyze';

import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <Container fluid >
      <Modal>
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/users/:id" component={UserProfile} />
          <Route path="/recipes/" component={RecipePage} />
          <Route path="/recipe/:id" component={Recipe} />
          <Route path="/food/" component={FoodAnalyze} />
        </Switch>
        <ToastContainer />
      </Modal>
    </Container>
  );
}

export default App;

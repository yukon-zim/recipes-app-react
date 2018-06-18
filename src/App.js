import React, { Component } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import RecipeList from './recipe-list/recipe-list';
import RecipeDetail from './recipe-detail/recipe-detail';
import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Redirect exact from='/' to='/recipes'/>
                        <Route exact path='/recipes' component={RecipeList}/>
                        <Route exact path='/detail/:id' component={RecipeDetail}/>
                        <Route exact path='/detail/new' component={RecipeDetail}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;

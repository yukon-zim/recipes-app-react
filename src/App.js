import React, { Component } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import RecipeList from './recipe-list/recipe-list';
import './App.css';
import Header from './header/header';
import UpdateRecipe from './recipe-detail/UpdateRecipe';
import CreateRecipe from './recipe-detail/CreateRecipe';
import Signin from './login/signinPage';
import Reset from './login/resetPage';

const client = new ApolloClient({
    uri: "http://localhost:4000",
    request: operation => {
        operation.setContext({
            fetchOptions: {
                credentials: 'include',
            },
            // headers,
        });
    },
});

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ApolloProvider client={client}>
                    <Header/>
                        <Switch>
                            <Redirect exact from='/' to='/recipes'/>
                            <Route exact path='/recipes' component={RecipeList}/>
                            <Route exact path='/detail/new' key="add" component={CreateRecipe}/>
                            <Route exact path='/detail/:id' key="update" component={UpdateRecipe}/>
                            <Route exact path='/signin' component={Signin}/>
                            <Route exact path='/reset' component={Reset}/>
                        </Switch>
                    </ApolloProvider>
                </div>
            </Router>
        );
    }
}

export default App;

import React, { Component } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import RecipeList from './recipe-list/recipe-list';
import { css } from 'styled-components'
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

const GlobalStyle = createGlobalStyle`
  ${props => props.theme.oldSchool && css`
     && {
      body {
        background: ${props => props.theme.oldSchoolOptions.lightPurple};
      }
      a {
        color: ${props => props.theme.oldSchoolOptions.black};
      }
     }
  `}
`;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: {
                oldSchool: true,
                oldSchoolOptions: {
                    darkPurple: 'rgb(103, 103, 151)',
                    lightPurple: 'rgb(154, 154, 202)',
                    white: 'rgb(238, 238, 238)',
                    black: 'rgb(17, 17, 17)',
                    darkGrey: 'rgb(85, 85, 85)',
                    updatePurple: 'rgb(114, 102, 255)',
                    deletePurple: 'rgb(34, 34, 74)'
                }
            },
        };

    };
    changeTheme = () => {
        this.setState({
            theme: {...this.state.theme,
                oldSchool: !this.state.theme.oldSchool}
        });
    };
    render() {
        return (
            <Router>
                <ThemeProvider theme={this.state.theme}>
                    <div>
                        <ApolloProvider client={client}>
                            <Header/>
                            <Switch>
                                <Redirect exact from='/' to='/recipes'/>
                                <Route
                                    exact path='/recipes'
                                    render={(props) => (
                                        <RecipeList
                                        {...props}
                                        changeTheme={this.changeTheme}
                                        currentTheme={this.state.theme}
                                        />)}
                                    />
                                <Route exact path='/detail/new' key="add" component={CreateRecipe}/>
                                <Route exact path='/detail/:id' key="update" component={UpdateRecipe}/>
                                <Route exact path='/signin' component={Signin}/>
                                <Route exact path='/reset' component={Reset}/>
                            </Switch>
                        </ApolloProvider>
                        <GlobalStyle/>
                    </div>
                </ThemeProvider>
            </Router>
        );
    }
}

export default App;

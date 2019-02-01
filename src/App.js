import React, { Component } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { css } from 'styled-components';
import './App.css';
import RecipeList from './recipe-list/recipe-list';
import Header from './header/header';
import UpdateRecipe from './recipe-detail/UpdateRecipe/UpdateRecipe';
import CreateRecipe from './recipe-detail/CreateRecipe/CreateRecipe';
import Signin from './login/signinPage';
import Reset from './login/resetPage';
import Footer from './footer/footer';
import User from './login/User';
import background from './background.svg';

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
${props => !props.theme.oldSchool && css`
    && h2,h3,h5 {color: ${props => props.theme.newSchoolOptions.gray};}
    body {
      background-color: ${props => props.theme.oldSchoolOptions.white};
      background-image: url(${background});
      }
`}
`;

class App extends Component {
    state = {
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
            },
            newSchoolOptions: {
                gray: 'rgba(3,12,25,0.65)',
                listBreakGray:'#dee2e6',
                recipeButtonBlue:'#2196F3',
                recipeButtonHover: 'rgb(30, 135, 226)'
            }
        },
    };
    changeTheme = () => {
        this.setState(prevState => ({
            theme: { ...prevState.theme,
                oldSchool: !prevState.theme.oldSchool }
        }));
    };
    render() {
        const themeProps = {
            changeTheme: this.changeTheme,
            currentTheme: this.state.theme
        };
        return (
            <Router>
                <ThemeProvider theme={this.state.theme}>
                    <div>
                        <ApolloProvider client={client}>
                            <User>
                                {({ data, error, loading }) => (
                                    <React.Fragment>
                                        {loading && (
                                            <h4>Loading recipes...</h4>
                                        )}
                                        {error && (
                                            <h4>Encountered an error while loading recipes.
                                                Is the GraphQL server running?</h4>
                                        )}
                                        {!error && !loading && (
                                            <React.Fragment>
                                                <Header user={data.whoAmI}/>
                                                <Switch>
                                                    <Redirect exact from='/' to='/recipes'/>
                                                    <Route exact path='/recipes'
                                                           render={(props) => (
                                                               <RecipeList
                                                                   {...props}
                                                                   user={data.whoAmI}
                                                               />)}
                                                    />
                                                    <Route exact path='/detail/new' key="add"
                                                           render={(props) => (
                                                               <CreateRecipe
                                                                   {...props}
                                                                   user={data.whoAmI}
                                                               />)}
                                                    />
                                                    <Route exact path='/detail/:id' key="update"
                                                           render={(props) => (
                                                               <UpdateRecipe
                                                                   {...props}
                                                                   user={data.whoAmI}
                                                               />
                                                           )}
                                                    />
                                                    <Route exact path='/signin' component={Signin}/>
                                                    <Route exact path='/reset' component={Reset}/>
                                                </Switch>
                                            </React.Fragment>
                                        )}
                                    </React.Fragment>
                                )}
                            </User>
                            <Footer
                                {...themeProps}
                            />
                        </ApolloProvider>
                        <GlobalStyle/>
                    </div>
                </ThemeProvider>
            </Router>
        );
    }
}

export default App;

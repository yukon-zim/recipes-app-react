import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import { CURRENT_USER_QUERY } from './User'
import Form from '../style/UserFormStyle';

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            id
            email
            name
        }
    }
`;

class Signin extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    };
    saveToState= (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    goToListView = () => {
        this.props.history.push('/recipes');
    };

    signin = async (signinMutation) => {
        try {
            const res = await signinMutation({
                variables: {
                    ...this.state
                }
            });
            this.goToListView();
            return res;
        } catch (err) {
            console.error(err);
        }
    };

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ name: '', email: '', password: ''})
    }

    render() {
        return (
            <Mutation
                mutation={SIGNIN_MUTATION}
                variables={this.state}
                refetchQueries={[{query: CURRENT_USER_QUERY}]}>
                {(signin, {error, loading}) => (

                    <Form ref={form => this.signinForm = form}
                          onSubmit={this.handleSubmit}>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label className="header-label user-form">
                            <h2> Sign into your account! </h2>
                            </label>
                            {error && (
                                <p className="error-message">{error.message}</p>
                            )}
                            <label className="user-form" htmlFor="email">
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    value={this.state.email}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <label className="user-form" htmlFor="password">
                                Password:
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={this.state.password}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <button className="btn btn-primary btn-signin"
                                    type="submit"
                                    onClick={async () => this.signin(signin)}>Sign In</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        )
    }

}

export default withRouter(Signin);
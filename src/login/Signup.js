import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import { CURRENT_USER_QUERY } from './User';
import Form from '../style/UserFormStyle';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!, $signupCode: String!) {
        createUser(email: $email, name: $name, password: $password, signupCode: $signupCode) {
            id
            email
            name
        }
    }
`;

class Signup extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        signupCode: ''
    };
    saveToState = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    signup = async (signupMutation) => {
        try {
            const res = await signupMutation({
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

    goToListView = () => {
        this.props.history.push('/recipes');
    };

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ name: '', email: '', password: ''})
    }

    render() {
        return (
            <Mutation
                mutation={SIGNUP_MUTATION}
                refetchQueries={[{query: CURRENT_USER_QUERY}]}>
                {(signup, {error, loading}) => (
                    <Form ref={form => this.signupForm = form}
                          onSubmit={this.handleSubmit}>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label className="header-label user-form">
                            <h2> Sign up for an account! </h2>
                            </label>
                            {error && (
                                <p className="error-message">{error.message}</p>
                            )}
                            <label htmlFor="email">
                                Email:
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    value={this.state.email}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <label htmlFor="name">
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="name"
                                    value={this.state.name}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <label htmlFor="password">
                                Password:
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={this.state.password}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <label htmlFor="signupCode">
                                Signup code:
                                <input
                                    required
                                    type="password"
                                    name="signupCode"
                                    placeholder="seeeecret code!"
                                    value={this.state.signupCode}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <button className="btn btn-primary btn-update-recipe"
                                    type="submit"
                                    onClick={async () => this.signup(signup)}>Sign Up</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        )
    }
}
export default withRouter(Signup);
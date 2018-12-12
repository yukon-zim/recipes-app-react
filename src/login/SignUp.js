import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
        createUser(email: $email, name: $name, password: $password) {
            id
            email
            name
        }
    }
`;

class SignUp extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    };
    saveToState = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    signUp = async (signUpMutation) => {
        try {
            const res = await signUpMutation({
                variables: {
                    ...this.state
                }
            });
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
            <Mutation mutation={SIGNUP_MUTATION}>
                {(signUp, {error, loading}) => (
                    <form ref={form => this.signUpForm = form}
                          onSubmit={this.handleSubmit}>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2> sign up for an account </h2>
                            {error && (
                                <p className="error-message">{error}</p>
                            )}
                            <label htmlFor="email">
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    value={this.state.email}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <label htmlFor="name">
                                Name
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="name"
                                    value={this.state.name}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <label htmlFor="password">
                                Password
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={this.state.password}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <button className="btn btn-primary btn-update-recipe"
                                    type="submit"
                                    onClick={async () => this.signUp(signUp)}>Sign Up</button>
                        </fieldset>
                    </form>
                )}
            </Mutation>
        )
    }
}
export default SignUp;
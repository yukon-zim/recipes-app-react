import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from './User';
import * as Styled from '../style/UserForm';
import FormValidHelper from './FormValidHelper';


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
        this.setState({ [e.target.name]: e.target.value });
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
        this.setState({ name: '', email: '', password: '' })
    }

    render() {
        const { email, name, password, signupCode } = this.state;
        const formIsValid = FormValidHelper.isFormValid(this.signupForm);
        return (
            <Mutation
                mutation={SIGNUP_MUTATION}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
                {(signup, { error, loading }) => (
                    <Styled.Form ref={form => this.signupForm = form}
                          onSubmit={this.handleSubmit}
                          className="user-form">
                        <fieldset disabled={loading} aria-busy={loading}>
                            <Styled.HeaderLabel className="header-label user-form">
                                <h2> Sign up for an account! </h2>
                            </Styled.HeaderLabel>
                            <Styled.UserFormLabel htmlFor="email">
                                Email:
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    value={email}
                                    onChange={this.saveToState}
                                />
                            </Styled.UserFormLabel>
                            <Styled.UserFormLabel htmlFor="name">
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="name"
                                    value={name}
                                    onChange={this.saveToState}
                                />
                            </Styled.UserFormLabel>
                            <Styled.UserFormLabel htmlFor="password">
                                Password:
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={password}
                                    onChange={this.saveToState}
                                />
                            </Styled.UserFormLabel>
                            <Styled.UserFormLabel htmlFor="signupCode">
                                Signup code:
                                <input
                                    required
                                    type="password"
                                    name="signupCode"
                                    placeholder="seeeecret code!"
                                    value={signupCode}
                                    onChange={this.saveToState}
                                />
                            </Styled.UserFormLabel>
                            <Styled.UserFormButton className="btn btn-primary btn-update-recipe"
                                    type="submit"
                                            disabled={!formIsValid}
                                            onClick={async () => this.signup(signup)}>Sign Up</Styled.UserFormButton>
                            {error && (
                                <p className="error-message">{error.message}</p>
                            )}
                        </fieldset>
                    </Styled.Form>
                )}
            </Mutation>
        )
    }
}

Signup.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default withRouter(Signup);
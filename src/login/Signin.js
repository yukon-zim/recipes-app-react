import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from './User'
import * as Styled from '../style/UserForm';
import FormValidHelper from './FormValidHelper';

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
        this.setState({ name: '', email: '', password: '' })
    }

    render() {
        const { email, password } = this.state;
        const formIsValid = FormValidHelper.isFormValid(this.signinForm);
        return (
            <Mutation
                mutation={SIGNIN_MUTATION}
                //todo: check variables
                variables={this.state}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
                {(signin, { error, loading }) => (

                    <Styled.Form ref={form => this.signinForm = form}
                          onSubmit={this.handleSubmit}
                          className="user-form">
                        <fieldset disabled={loading} aria-busy={loading}>
                            <Styled.HeaderLabel className="header-label user-form">
                                <h2> Sign into your account! </h2>
                            </Styled.HeaderLabel>
                            <Styled.UserFormLabel className="user-form" htmlFor="email">
                                Email:
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    value={ email }
                                    onChange={this.saveToState}
                                />
                            </Styled.UserFormLabel>
                            <Styled.UserFormLabel className="user-form" htmlFor="password">
                                Password:
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={ password }
                                    onChange={this.saveToState}
                                />
                            </Styled.UserFormLabel>
                            <Styled.UserFormButton className="btn btn-primary btn-signin"
                                            type="submit"
                                            disabled={!formIsValid}
                                            onClick={async () => this.signin(signin)}>Sign In</Styled.UserFormButton>
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

Signin.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default withRouter(Signin);
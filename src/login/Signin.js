import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import { CURRENT_USER_QUERY } from './User'
import Form from '../style/UserFormStyle';
import UserFormButton from '../style/UserFormButton';
import UserFormLabel from '../style/UserFormLabel';
import HeaderLabel from '../style/UserFormHeaderLabel';
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
        this.setState({ name: '', email: '', password: ''})
    }

    render() {
        const formIsValid = FormValidHelper.isFormValid(this.signinForm);
        return (
            <Mutation
                mutation={SIGNIN_MUTATION}
                variables={this.state}
                refetchQueries={[{query: CURRENT_USER_QUERY}]}>
                {(signin, {error, loading}) => (

                    <Form ref={form => this.signinForm = form}
                          onSubmit={this.handleSubmit}>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <HeaderLabel className="header-label user-form">
                            <h2> Sign into your account! </h2>
                            </HeaderLabel>
                            {error && (
                                <p className="error-message">{error.message}</p>
                            )}
                            <UserFormLabel className="user-form" htmlFor="email">
                                Email:
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    value={this.state.email}
                                    onChange={this.saveToState}
                                />
                            </UserFormLabel>
                            <UserFormLabel className="user-form" htmlFor="password">
                                Password:
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={this.state.password}
                                    onChange={this.saveToState}
                                />
                            </UserFormLabel>
                            <UserFormButton className="btn btn-primary btn-signin"
                                    type="submit"
                                            disabled={!formIsValid}
                                    onClick={async () => this.signin(signin)}>Sign In</UserFormButton>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        )
    }

}

export default withRouter(Signin);
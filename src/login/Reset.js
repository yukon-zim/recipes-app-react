import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import { CURRENT_USER_QUERY } from './User'
import Form from '../style/UserFormStyle';
import HeaderLabel from '../style/UserFormHeaderLabel';
import UserFormLabel from '../style/UserFormLabel';
import UserFormButton from '../style/UserFormButton';
import FormValidHelper from './FormValidHelper';

const RESET_MUTATION = gql`
    mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
        resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
            id
            email
            name
        }
    }
`;

class Reset extends Component {
    static propTypes = {
        resetToken: propTypes.string.isRequired
    };
    state = {
        password: '',
        confirmPassword: ''
    };
    saveToState= (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    goToListView = () => {
        this.props.history.push('/recipes');
    };

    resetPassword = async (resetPasswordMutation) => {
        try {
            const res = await resetPasswordMutation({
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
        this.setState({ password: '', confirmPassword: '' })
    }
    render() {
        const formIsValid = FormValidHelper.isFormValid(this.resetForm);
        return (
            <Mutation
                mutation={RESET_MUTATION}
                variables={{
                    resetToken: this.props.resetToken,
                    password: this.state.password,
                    confirmPassword: this.state.confirmPassword
                }}
                refetchQueries={[{query: CURRENT_USER_QUERY}]}
            >
                {(reset, {error, loading, called}) => (
                    <Form ref={form => this.resetForm = form}
                          onSubmit={this.handleSubmit}
                          className="reset-form">
                        <fieldset disabled={loading} aria-busy={loading}>
                            <HeaderLabel className="header-label reset-form">
                                <h2> Reset your PW: </h2>
                            </HeaderLabel>
                            <UserFormLabel className="reset-form" htmlFor="password">
                                New PW:
                                <input
                                    // required
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={this.state.password}
                                    onChange={this.saveToState}
                                />
                            </UserFormLabel>
                            <UserFormLabel className="reset-form" htmlFor="confirmPassword">
                                Confirm your new PW:
                                <input
                                    // required
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="confirmPassword"
                                    value={this.state.confirmPassword}
                                    onChange={this.saveToState}
                                />
                            </UserFormLabel>
                            <UserFormButton className="btn btn-primary btn-reset-password"
                                            type="submit"
                                            disabled={!formIsValid}
                                            onClick={async () => this.resetPassword(reset)}>Reset your PW</UserFormButton>
                            {error && (
                                <p className="error-message">{error.message}</p>
                            )}
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        )
    }

}

export default withRouter(Reset);
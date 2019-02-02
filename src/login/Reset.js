import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from './User'
import * as Styled from '../style/UserForm';
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
        const { resetToken } = this.props;
        const { password, confirmPassword } = this.state;
        const formIsValid = FormValidHelper.isFormValid(this.resetForm);
        return (
            <Mutation
                mutation={ RESET_MUTATION }
                variables={{
                    resetToken,
                    password,
                    confirmPassword
                }}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
                {(reset, { error, loading }) => (
                    <Styled.Form ref={ form => this.resetForm = form }
                          onSubmit={ this.handleSubmit }
                          className="reset-form">
                        <fieldset disabled={loading} aria-busy={loading}>
                            <Styled.HeaderLabel className="header-label reset-form">
                                <h2> Reset your PW: </h2>
                            </Styled.HeaderLabel>
                            <Styled.UserFormLabel className="reset-form" htmlFor="password">
                                New PW:
                                <input
                                    // required
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={password}
                                    onChange={this.saveToState}
                                />
                            </Styled.UserFormLabel>
                            <Styled.UserFormLabel className="reset-form" htmlFor="confirmPassword">
                                Confirm your new PW:
                                <input
                                    // required
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="confirmPassword"
                                    value={confirmPassword}
                                    onChange={this.saveToState}
                                />
                            </Styled.UserFormLabel>
                            <Styled.UserFormButton className="btn btn-primary btn-reset-password"
                                            type="submit"
                                            disabled={!formIsValid}
                                            onClick={async () => this.resetPassword(reset)}>Reset your PW</Styled.UserFormButton>
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

Reset.propTypes = {
    resetToken: PropTypes.string.isRequired
};

export default withRouter(Reset);
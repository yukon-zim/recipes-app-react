import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import { CURRENT_USER_QUERY } from './User'
import Form from '../style/UserFormStyle';


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
            console.log(this.state);
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
                          onSubmit={this.handleSubmit}>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2> Reset your PW </h2>
                            {error && (
                                <p className="error-message">{error.message}</p>
                            )}
                            <label htmlFor="password">
                                New PW
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={this.state.password}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <label htmlFor="confirmPassword">
                                Confirm your new PW
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="confirmPassword"
                                    value={this.state.confirmPassword}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <button className="btn btn-primary btn-reset-password"
                                    type="submit"
                                    onClick={async () => this.resetPassword(reset)}>Reset your PW</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        )
    }

}

export default withRouter(Reset);
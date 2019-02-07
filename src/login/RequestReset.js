import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import * as Styled from '../style/UserForm';
import FormValidHelper from './FormValidHelper';

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!) {
        requestReset(email: $email) {
            message
        }
    }
`;

class RequestReset extends Component {
    state = {
        email: ''
    };
    saveToState= (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    requestReset = async (requestResetMutation) => {
        try {
            const res = await requestResetMutation({
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
        this.setState({ email: '' })
    }

    render() {
        const formIsValid = FormValidHelper.isFormValid(this.requestResetForm);
        return (
            <Mutation
                mutation={REQUEST_RESET_MUTATION}
                variables={this.state}>
                {(reset, { error, loading, called }) => (
                    <Styled.Form ref={form => this.requestResetForm = form}
                                 onSubmit={this.handleSubmit}
                                 className="user-form">
                        <fieldset disabled={loading} aria-busy={loading}>
                            <Styled.HeaderLabel className="header-label user-form">
                                <h2> Request a PW reset </h2>
                            </Styled.HeaderLabel>
                            <Styled.UserFormLabel htmlFor="email">
                                Email:
                                <input
                                    className="email"
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    value={this.state.email}
                                    onChange={this.saveToState}
                                />
                            </Styled.UserFormLabel>
                            <Styled.UserFormButton className="btn btn-primary btn-request-reset"
                                                   disabled={!formIsValid}
                                                   type="submit"
                                                   onClick={async () => this.requestReset(reset)}>Request Reset</Styled.UserFormButton>
                            {error && (
                                <p className="error-message">{error.message}</p>
                            )}
                            {!error && !loading && called && <p className="success-message">Success! check email for reset link</p>}
                        </fieldset>
                    </Styled.Form>
                )}
            </Mutation>
        )
    }
}

export default RequestReset;
export { REQUEST_RESET_MUTATION }
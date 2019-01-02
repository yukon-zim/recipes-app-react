import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../style/UserFormStyle';
import UserFormButton from '../style/UserFormButton';
import UserFormLabel from '../style/UserFormLabel';
import HeaderLabel from '../style/UserFormHeaderLabel';
import FormValidHelper from './FormValidHelper';

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!) {
        requestReset(email: $email) {
            message
        }
    }
`;

class Signin extends Component {
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
                {(reset, {error, loading, called}) => (
                    <Form ref={form => this.requestResetForm = form}
                          onSubmit={this.handleSubmit}>
                        <fieldset disabled={loading} aria-busy={loading}>
                        <HeaderLabel className="header-label user-form">
                            <h2> Request a PW reset </h2>
                        </HeaderLabel>
                            {error && (
                                <p className="error-message">{error.message}</p>
                            )}
                            {!error && !loading && called && <p>Success! check email for reset link</p>}
                            <UserFormLabel htmlFor="email">
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    value={this.state.email}
                                    onChange={this.saveToState}
                                />
                            </UserFormLabel>
                            <UserFormButton className="btn btn-primary btn-request-reset"
                                            disabled={!formIsValid}
                                            type="submit"
                            onClick={async () => this.requestReset(reset)}>Request Reset</UserFormButton>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        )
    }

}

export default Signin;
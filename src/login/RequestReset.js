import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../style/UserFormStyle';

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
        return (
            <Mutation
                mutation={REQUEST_RESET_MUTATION}
                variables={this.state}>
                {(reset, {error, loading, called}) => (
                    <Form ref={form => this.requestResetForm = form}
                          onSubmit={this.handleSubmit}>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2> Request a PW reset </h2>
                            {error && (
                                <p className="error-message">{error.message}</p>
                            )}
                            {!error && !loading && called && <p>Success! check email for reset link</p>}
                            <label htmlFor="email">
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    value={this.state.email}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <button className="btn btn-primary btn-request-reset"
                                type="submit"
                            onClick={async () => this.requestReset(reset)}>Request Reset</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        )
    }

}

export default Signin;
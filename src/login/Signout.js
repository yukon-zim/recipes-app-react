import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import Button from '../style/Button';


const SIGNOUT_MUTATION = gql`
    mutation SIGNOUT_MUTATION {
        signout {
            message
        }
    }
`;

const Signout = () => (
    <Mutation
        mutation={SIGNOUT_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {signout => (<Button
            className="btn btn-primary mr-2 mt-2"
            type="button"
            onClick={ signout }>Sign Out</Button>)}
    </Mutation>
);

export default Signout;
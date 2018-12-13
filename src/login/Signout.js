import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';


const SIGNOUT_MUTATION = gql`
    mutation SIGNOUT_MUTATION {
        signout {
            message
        }
    }
`;

const Signout = props => (
    <Mutation
        mutation={SIGNOUT_MUTATION}
        refetchQueries={[{query: CURRENT_USER_QUERY}]}>
        {signout => (<button
            className="btn btn-primary mr-2 mt-2"
            onClick={signout} >Sign Out</button>)}
    </Mutation>
);

export default Signout;
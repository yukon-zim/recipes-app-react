import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

const CURRENT_USER_QUERY = gql`
    query {
        whoAmI {
            id
            email
            name
            superuser
        }
    }
`;
const User = props => (
    <Query {...props} query={CURRENT_USER_QUERY}>
        {payload => {
           return props.children(payload)
        }}
    </Query>
);

User.PropTypes = {
    children: PropTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY };
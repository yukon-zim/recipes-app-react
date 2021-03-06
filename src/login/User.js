import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import propTypes from 'prop-types';

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
function User(props) {
    return (
        <Query {...props} query={CURRENT_USER_QUERY}>
            {payload => {
                return props.children(payload)
            }}
        </Query>
    )
}

User.propTypes = {
    children: propTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY };
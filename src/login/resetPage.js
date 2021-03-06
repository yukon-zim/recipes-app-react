import React from 'react';
import QueryString from 'query-string';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Reset from './Reset';


const ResetLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  padding-top: 1rem;
  padding-left: 1rem;
  form {flex-basis: 33%}
`;

function ResetPage({ location }) {
    const { resetToken } = QueryString.parse(location.search);
    return (
        <ResetLayout>
                <Reset resetToken={resetToken}/>
        </ResetLayout>
    )
}

ResetPage.propTypes = {
    resetToken: PropTypes.string.isRequired
};
export default ResetPage;
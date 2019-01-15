import React from 'react';
import QueryString from 'query-string';
import styled from 'styled-components';
import Reset from './Reset';

const ResetLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  padding-top: 1rem;
  padding-left: 1rem;
  form {flex-basis: 33%}
`;

const ResetPage = props => {
    const { resetToken } = QueryString.parse(props.location.search);
    return (
        <ResetLayout>
                <Reset resetToken={resetToken}/>
        </ResetLayout>
    )
};
export default ResetPage;
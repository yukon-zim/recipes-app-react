import React from 'react';
import QueryString from 'query-string';
import Reset from './Reset';

const ResetPage = props => {
    const { resetToken } = QueryString.parse(props.location.search);
    return (
        <div>
            <p>Reset your Password</p>
            <Reset resetToken={resetToken}/>
        </div>
    )
};
export default ResetPage;
import React from 'react';
import Signup from './Signup';
import Signin from './Signin';
import RequestReset from './RequestReset';
import styled from 'styled-components';

const Columns = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
grid-gap: 20px;
`;
//todo: find components using goToListView/router dependencies, check if this can be abstracted to a reusable helper
const SignInPage = props => (
    <Columns>
        <Signin/>
        <Signup/>
        <RequestReset/>
    </Columns>
);

export default SignInPage;
import React from 'react';
import Signup from './Signup';
import Signin from './Signin';
import RequestReset from './RequestReset';
import Columns from '../style/Columns';

function SignInPage() {
    return (
        <Columns>
            <Signin/>
            <Signup/>
            <RequestReset/>
        </Columns>
    )
}

export default SignInPage;
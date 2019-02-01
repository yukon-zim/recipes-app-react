import React from 'react';
import Signup from './Signup';
import Signin from './Signin';
import RequestReset from './RequestReset';
import Columns from '../style/Columns';

const SignInPage = () => (
            <Columns>
                <Signin/>
                <Signup/>
                <RequestReset/>
            </Columns>
);

export default SignInPage;
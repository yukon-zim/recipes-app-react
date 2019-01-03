import React from 'react';
import Signup from './Signup';
import Signin from './Signin';
import RequestReset from './RequestReset';
import Columns from '../style/Columns';

//todo: find components using goToListView/router dependencies, check if this can be abstracted to a reusable helper
const SignInPage = props => (
            <Columns>
                <Signin/>
                <Signup/>
                <RequestReset/>
            </Columns>
);

export default SignInPage;
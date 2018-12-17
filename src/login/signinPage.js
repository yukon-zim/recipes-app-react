import React from 'react';
import Signup from './Signup';
import Signin from './Signin';
import RequestReset from './RequestReset';
//todo: find components using goToListView/router dependencies, check if this can be abstracted to a reusable helper
const SignInPage = props => (
    <div>
        <Signup/>
        <Signin/>
        <RequestReset/>
        {/*RequestPWReset component*/}
    </div>
);

export default SignInPage;
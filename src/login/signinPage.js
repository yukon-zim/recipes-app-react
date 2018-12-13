import React from 'react';
import Signup from './Signup';
import Signin from './Signin';
//todo: find components using goToListView/router dependencies, check if this can be abstracted to a reusable helper
const SignInPage = props => (
    <div>
        <Signup/>
        <Signin/>
        <p>coming soon - PW reset request</p>
        {/*RequestPWReset component*/}
    </div>
);

export default SignInPage;
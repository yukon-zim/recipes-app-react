import React from 'react';
import {Link} from 'react-router-dom';
import User from '../login/User';
import Signout from '../login/Signout'
import Button from '../style/Button';

// "functional component" (only has render function); can use shorthand notation
const Header = () => (
    <User>
        {({data}) => {
            let userName;
            if (!data || !data.whoAmI) {
                userName = '';
            } else {
                userName = data.whoAmI.name;
            }
            return (
                <nav className="nav">
                    <ul className="navbar-nav flex-container">
                        <li className="welcome-header">
                            <h1> Welcome {userName} to the FilePro Recipe Graveyard! </h1>
                        </li>
                    </ul>

                    <ul className="ml-auto navbar-nav flex-container">
                        <li>
                            <Button as={Link} className="btn btn-primary mr-2 mt-2" to="/recipes">Recipe List</Button>
                        </li>
                        {data.whoAmI && (
                            <li>
                                <Signout className="btn btn-primary mr-2 mt-2"/>
                            </li>
                        )}
                        {!data.whoAmI && (
                            <li>
                                <Button as={Link} className="btn btn-primary mr-2 mt-2" to="/signin">Sign In/Up</Button>
                            </li>
                        )}
                    </ul>
                </nav>
            )
        }}
    </User>
);
export default Header;
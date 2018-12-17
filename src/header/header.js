import React from 'react';
import {Link} from 'react-router-dom';
import User from '../login/User';
import Signout from '../login/Signout'

// "functional component" (only has render function); can use shorthand notation
const Header = () => (
    <User>
        {({data: {whoAmI}}) => {
            let userName;
            if (!whoAmI) {
                //todo: more elegant way to do this?  sometimes whoAmI is undefined
                // while page is loading, so view cannot render
                userName = '';
            } else {
                userName = whoAmI.name;
            }
            return (<nav className="nav">
                    <ul className="navbar-nav">
                        <li>
                            <h1> Welcome {userName} to the FilePro Recipe Graveyard! </h1>
                        </li>
                    </ul>

                    <ul className="ml-auto navbar-nav text-center">
                        <li>
                            <Link className="btn btn-primary mr-2 mt-2" to="/recipes">Recipe List</Link>
                        </li>
                        {whoAmI && (
                            <li>
                                <Signout className="btn btn-primary mr-2 mt-2"/>
                            </li>
                        )}
                        {!whoAmI && (
                            <li>
                                <Link className="btn btn-primary mr-2 mt-2" to="/signin">Sign In/Up</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            )
        }}
    </User>
);
export default Header;
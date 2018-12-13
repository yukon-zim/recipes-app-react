import React from 'react';
import {Link} from 'react-router-dom';
import User from '../login/User';

// "functional component" (only has render function); can use shorthand notation
const Header = props => {
    return (
        <nav className="nav">

            <ul className="navbar-nav">
                <li>
                    <User>
                        {({data: {whoAmI}}) => {
                            console.log(whoAmI);
                            if (whoAmI) return <h1> Welcome {whoAmI.name} to the FilePro Recipe Graveyard! </h1>;
                            return <h1> Welcome to the FilePro Recipe Graveyard! </h1>;
                        }}
                    </User>
                </li>
            </ul>

            <ul className="ml-auto navbar-nav text-center">
                <li>
                    <Link className="btn btn-primary mr-2 mt-2" to="/recipes">Recipe List</Link>
                </li>
            </ul>
        </nav>
    )
};
export default Header;
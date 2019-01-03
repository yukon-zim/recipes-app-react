import React from 'react';
import {Link} from 'react-router-dom';
import styled, { css } from 'styled-components'
import Signout from '../login/Signout'
import Button from '../style/Button';

const Nav = styled.nav`
    padding-top: 0.5rem;
    ${props => props.theme.oldSchool && css`
      background: ${props => props.theme.oldSchoolOptions.black};
      color: ${props => props.theme.oldSchoolOptions.white};
    `}
`;

// "functional component" (only has render function); can use shorthand notation
const Header = (props) => {
    const user = props.user;
    let userName;
    if (!user || !user.name) {
        userName = '';
    } else {
        userName = user.name;
    }
    return (
        <Nav className="nav">
            <ul className="navbar-nav flex-container">
                <li className="welcome-header">
                    <h1> Welcome {userName} to the FilePro Recipe Graveyard! </h1>
                </li>
            </ul>

            <ul className="ml-lg-auto mt-0 navbar-nav flex-container">
                <li>
                    <Button as={Link} className="btn btn-primary mr-2 mt-2" to="/recipes">Recipe List</Button>
                </li>
                {user && (
                    <li>
                        <Signout className="btn btn-primary mr-2 mt-2"/>
                    </li>
                )}
                {!user && (
                    <li>
                        <Button as={Link} className="btn btn-primary mr-2 mt-2" to="/signin">Sign In/Up</Button>
                    </li>
                )}
            </ul>
        </Nav>
    )
};
export default Header;
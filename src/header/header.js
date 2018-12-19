import React from 'react';
import {Link} from 'react-router-dom';
import styled, { css } from 'styled-components'
import User from '../login/User';
import Signout from '../login/Signout'
import Button from '../style/Button';

const Nav = styled.nav`
  ${props => props.theme.oldSchool && css`
  padding-top: 0.5rem;
  background: rgb(17, 17, 17);
  color: rgb(255, 255, 255);
`}
`;

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
                        {data.whoAmI && (
                            <li>
                                <Signout className="btn btn-primary mr-2 mt-2"/>
                            </li>
                        )}
                        {!data.whoAmI && (
                            <li>
                                <Button as={Link} className="btn btn-primary mr-2" to="/signin">Sign In/Up</Button>
                            </li>
                        )}
                    </ul>
                </Nav>
            )
        }}
    </User>
);
export default Header;
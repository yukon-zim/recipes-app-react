import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types';
import Signout from '../login/Signout'
import Button from '../style/Button';

const Nav = styled.nav`
    padding-top: 0.5rem;
    margin-bottom: 0.5rem;
    ${props => props.theme.oldSchool && css`
      background: ${props => props.theme.oldSchoolOptions.black};
      color: ${props => props.theme.oldSchoolOptions.white};
    `}
    ${props => !props.theme.oldSchool && css`
      border: 2px solid ${props => props.theme.newSchoolOptions.gray};
      color: ${props => props.theme.newSchoolOptions.gray};`}
`;

// "functional component" (only has render function); can use shorthand notation
const Header = ({ user }) => {
    const userName = user ? user.name: '';
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

Header.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired
    })
};

export default Header;
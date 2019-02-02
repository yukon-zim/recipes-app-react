import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import Button from '../style/Button';


const FooterDiv = styled.div`
padding-top: 0.5rem;
`;

const Footer = ({ changeTheme }) => (
    <FooterDiv>
        <Button
            className="btn btn-primary"
            id="change-theme"
            type="button"
            onClick={() => changeTheme()}
        > Change theme</Button>
    </FooterDiv>
);

Footer.propTypes = {
    changeTheme: PropTypes.func.isRequired
};

export default Footer;
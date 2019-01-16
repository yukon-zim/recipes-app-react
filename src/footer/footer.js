import React from 'react';
import styled from 'styled-components'
import Button from '../style/Button';

const FooterDiv = styled.div`
padding-top: 0.5rem;
`;

const Footer = (props) => (
    <FooterDiv>
        <Button
            className="btn btn-primary"
            id="change-theme"
            type="button"
            onClick={() => props.changeTheme()}
        > Change theme</Button>
    </FooterDiv>
);

export default Footer;
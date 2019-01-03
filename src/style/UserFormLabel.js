import styled, { css } from 'styled-components'
import UserFormHeaderLabel from './UserFormHeaderLabel';

const UserFormLabel = styled(UserFormHeaderLabel)` 
  &&&& {  margin: 0px;
    margin-bottom: 1rem;
    flex-basis: auto;
    ${props => props.theme.oldSchool && css`
    background: ${props => props.theme.oldSchoolOptions.white};
    border: 5px ${props => props.theme.oldSchoolOptions.white};
    `}
    }
`;

export default UserFormLabel;
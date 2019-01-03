import styled, { css } from 'styled-components'

const HeaderLabel = styled.label`
 &&& { margin-right: -15px;
  margin-left: -15px;
  padding-top: 1rem;
  font-size: 1rem;
  ${props => props.theme.oldSchool && css`
    background: ${props => props.theme.oldSchoolOptions.darkPurple};
    border: 5px ${props => props.theme.oldSchoolOptions.darkPurple};
  `}
  ${props => !props.theme.oldSchool && css`
    color: ${props => props.theme.newSchoolOptions.gray};
   `}
  }
  &&&.user-form,&&&.reset-form {
  margin-right: 0px;
  margin-left: 0px;
  }
`;

export default HeaderLabel;
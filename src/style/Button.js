import styled, { css } from 'styled-components'

const Button = styled.button`
padding: 0.75rem 0.75rem;
 /*styling for oldSchool theme buttons*/
${props => props.theme.oldSchool && css`
   /*fileMaker*/
   && {
    background: ${props => props.theme.oldSchoolOptions.darkGrey};
    color: rgb(255, 255, 255);
    :hover {
      background: ${props => props.theme.oldSchoolOptions.darkGrey};
    }
    :active {
      background: ${props => props.theme.oldSchoolOptions.darkGrey};
    }
   };
  ${props => props.update && css`
    && {
      background: ${props => props.theme.oldSchoolOptions.updatePurple};
    :hover {
      background: ${props => props.theme.oldSchoolOptions.updatePurple};
    }
    :active {
      background: ${props => props.theme.oldSchoolOptions.updatePurple};
    }
    }
  `};
   ${props => props.delete && css`
      && {
        background: ${props => props.theme.oldSchoolOptions.deletePurple};
      :hover {
        background: ${props => props.theme.oldSchoolOptions.deletePurple};
       }
      :active {
        background: ${props => props.theme.oldSchoolOptions.deletePurple};
       }
       }
  `};
`}
 &&.btn-light {
 padding-top: 0.25rem;
 padding-bottom: 0.25rem;
 margin: 0.125rem;
 };
 `;

export default Button;

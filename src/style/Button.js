import styled, { css } from 'styled-components'

const Button = styled.button`
padding: 0.75rem 0.75rem;
margin-right: 0.5rem;
${props => props.theme.oldSchool && css`
   /*fileMaker*/
   && {
    background: ${props => props.theme.oldSchoolOptions.darkGrey};
    color: ${props => props.theme.oldSchoolOptions.white};
    &&:active {
      background: ${props => props.theme.oldSchoolOptions.darkGrey};
    }
   };
  ${props => (props.update || props.create) && css`
    && {
      background: ${props => props.theme.oldSchoolOptions.updatePurple};
      &&:active {
      background: ${props => props.theme.oldSchoolOptions.updatePurple};
    }
    }
  `};
   ${props => props.delete && css`
      && {
        background: ${props => props.theme.oldSchoolOptions.deletePurple};
        &&:active {
      background: ${props => props.theme.oldSchoolOptions.deletePurple};
    }
       }
  `};
`}
 &&.btn-light {
 padding-top: 0.25rem;
 padding-bottom: 0.25rem;
 margin: 0.125rem;
 ${props => !props.theme.oldSchool && css`
&& {
        background: ${props => props.theme.newSchoolOptions.recipeButtonBlue};
        color: ${props => props.theme.oldSchoolOptions.white};
      :hover {
        background: ${props => props.theme.newSchoolOptions.recipeButtonHover};
       }`
    }
 };
 `;

export default Button;

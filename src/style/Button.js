import styled, { css } from 'styled-components'

const Button = styled.button`
padding: 0.75rem 0.75rem;
 /*styling for oldSchool theme buttons*/
 ${props => props.theme.oldSchool && css`
   /*fileMaker*/
   && {
   background: rgb(85, 85, 85);
   :hover {
      background: rgb(85, 85, 85);
   }
   :active {
   background: rgb(85, 85, 85);
   }
   };
   ${props => props.update && css`
    && {
    background: rgb(114, 102, 255);
      :hover {
      background: rgb(114, 102, 255);
         }
      :active {
      background: rgb(114, 102, 255);
         }
  `};
   ${props => props.delete && css`
    && {
    background: rgb(34, 34, 74);
      :hover {
      background: rgb(34, 34, 74);
         }
      :active {
      background: rgb(34, 34, 74);
         }
  `};
`};
 `;

export default Button;

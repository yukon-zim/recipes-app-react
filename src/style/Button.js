import styled, { css } from 'styled-components'

const Button = styled.button`
   padding: 0.75rem 0.75rem;
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

`;

const UpdateButton = styled.button`
&& {
background: rgb(97, 97, 211);
:hover {
      background: rgb(97, 97, 211);
   }
   :active {
   background: rgb(97, 97, 211);
   }
`;

const DeleteButton = styled(Button)`
background: rgb(34, 34, 74);
`;

export default Button;
export { UpdateButton, DeleteButton };

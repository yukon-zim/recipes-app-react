import styled, { css } from 'styled-components'

const FormFieldRow = styled.label`
 &&& { display: flex;
  flex-direction: row;
  ${props => !props.theme.oldSchool && css`
    padding-top: 0.25rem;
    &&.list-item{padding: 0.5rem}
  `}
  }
`;

export default FormFieldRow;
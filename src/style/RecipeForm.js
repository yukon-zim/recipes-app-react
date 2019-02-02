import styled, { css } from 'styled-components';

export const FormField = styled.span`
  flex-basis: 100%;
  &&.recipe-detail-list-field {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  margin: 0.125rem;
  }
  &&.recipe-detail-field {
  margin-bottom: 0;
  }
`;

export const FormFieldLabel = styled.span`
  flex-basis: auto;
  white-space: nowrap;
`;

export const FormFieldRow = styled.label`
 &&& { display: flex;
  flex-direction: row;
  ${props => !props.theme.oldSchool && css`
    padding-top: 0.25rem;
    &&.list-item{padding: 0.5rem}
  `}
  }
`;
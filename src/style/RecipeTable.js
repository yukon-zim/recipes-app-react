import styled, { css } from 'styled-components';

export const Row = styled.tr`
 display: flex;
  flex-direction: row;
  margin-right: -15px;
    margin-left: -15px;
`;
export const HeaderCell = styled.th`
  flex-basis: ${props => `${(props.col * 100 / 12)}%`};
  ${props => props.theme.oldSchool && css`
      && { border-bottom-color: ${props => props.theme.oldSchoolOptions.darkPurple};
      border-top-color: ${props => props.theme.oldSchoolOptions.darkPurple};
      background: ${props => props.theme.oldSchoolOptions.darkPurple};
      font-size: 1rem;
      }
  `}
`;
export const Cell = styled.td`
  flex-basis: ${props => `${(props.col * 100 / 12)}%`};
  ${props => props.theme.oldSchool && css`
      && { border: 10px solid ${props => props.theme.oldSchoolOptions.lightPurple};
      background: ${props => props.theme.oldSchoolOptions.white};
      font-size: 1rem;
      }
   `}
`;
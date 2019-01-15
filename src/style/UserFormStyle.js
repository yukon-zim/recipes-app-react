import styled, { css } from 'styled-components';


const Form = styled.form`
${props => props.theme.oldSchool && css`
&&{
  label {
    width: auto;
    background: ${props => props.theme.oldSchoolOptions.white};
    border: 5px solid ${props => props.theme.oldSchoolOptions.white};
    padding: 10px;
    display: block;
    margin-bottom: 1rem;
    font-size: 1rem;
    color: ${props => props.theme.oldSchoolOptions.black};
    }
  }
  div.spacer {
    padding: 10px;
  }
  select {
    // width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
  }
  input {
  margin-bottom: 0.5rem;
    width: auto;
    height: 2rem;
    margin-left: 0.5rem
  }
  fieldset {
    border: 0;
    padding: 0;
  }
}
`}
${props => !props.theme.oldSchool && css`
  // default to bootstrap theme
  &&{
    color: ${props => props.theme.newSchoolOptions.gray};
  &&.user-form,&&.reset-form {
    border: 2px solid ${props => props.theme.newSchoolOptions.gray};
    padding: 0.5rem;
  }
  label {
    display: block;
    margin-bottom: 0rem;
    color: ${props => props.theme.newSchoolOptions.gray};
  }
  div.spacer {
    padding: 10px;
  }
  li:not(:first-child){
    border-top: 2px solid ${props => props.theme.newSchoolOptions.listBreakGray};
  }
  }
`}
    `;

export default Form;
import styled from 'styled-components'

const Form = styled.form`
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
  label.header-label {
    background: ${props => props.theme.oldSchoolOptions.darkPurple};
    border: 5px ${props => props.theme.oldSchoolOptions.darkPurple};
     margin-right: -15px;
    margin-left: -15px;
    padding-top: 1rem;
          font-size: 1rem;
  div.recipe-id {
font-size: 0.75rem;
margin-left: 2px;
color: ${props => props.theme.oldSchoolOptions.lightPurple};
}
}
label.user-form {
margin: 0px;
          margin-bottom: 1rem;
       
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
   width: auto;
   height: 2rem;
  }
  fieldset {
    border: 0;
    padding: 0;
}
}
`;

export default Form;
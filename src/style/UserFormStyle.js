import styled from 'styled-components'

const Form = styled.form`
 label {
 box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
 border: 5px solid white;
 padding: 10px;
    display: block;
    margin-bottom: 1rem;
  },
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid black;
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.red};
    }
  }
  input[type='submit'] {
   width: auto;
  }
  fieldset {
    border: 0;
    padding: 0;
}
`;

export default Form;
import styled from 'styled-components';

const Columns = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
grid-gap: 20px;
padding: 1rem;
`;

export default Columns;
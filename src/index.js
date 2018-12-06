import 'bootstrap/dist/css/bootstrap.css'
import 'bootswatch/dist/materia/bootstrap.css'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// const RECIPE_QUERY = gql`
//     query RECIPE_QUERY($id: ID!) {
//         recipe(id: $id) {
//             name
//         }
//     }
// `;
//
// client.query({query: RECIPE_QUERY, variables: {id: 3}}).then(result => console.log(result));

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import App from './App';
import recipeFixtures from './testing/recipe-fixtures.js';

it('renders without crashing', () => {
    // const div = document.createElement('div');
    // fetch.mockResponseOnce(JSON.stringify(recipeFixtures()));
    // ReactDOM.render(<App />, div);
    // expect(fetch.mock.calls.length).toEqual(1);
    // expect(fetch.mock.calls[0][0]).toEqual('http://localhost:1337/recipes');
    // ReactDOM.unmountComponentAtNode(div);
});

// it('renders welcome message', () => {
//     const wrapper = shallow(<App />);
//     const welcome = <h2>Welcome to React</h2>;
//     // expect(wrapper.contains(welcome)).to.equal(true);
//     expect(wrapper.contains(welcome)).toEqual(true);
// });

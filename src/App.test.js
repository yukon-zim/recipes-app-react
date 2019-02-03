import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import wait from 'waait';
import App from './App';
import recipeFixtures from './testing/recipe-fixtures.js';


it('renders without crashing', async () => {
    const wrapper = mount(<App user={{ username:'steven anita tester' }}/>);
    await wait(500);
    wrapper.update();
    // expect(wrapper.find('Header')).toHaveLength(1);
    expect(wrapper.find('Footer')).toHaveLength(1);
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

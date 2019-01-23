import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from "react-apollo/test-utils";
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom'
import recipeFixtures from '../testing/recipe-fixtures.js';
import UpdateRecipe, {GET_RECIPE_QUERY} from './UpdateRecipe';


const theme = {newSchoolOptions: {}, oldSchoolOptions: {}};
jest.mock('../recipe-detail/recipe-detail', () => () => 'RecipeDetail');

describe('component tests', () => {
    const mockRequest = {
        query: GET_RECIPE_QUERY,
        variables: {
            id: '1'
        }
    };
    const mocks = [{
        request: mockRequest,
        result: {data: {recipe: recipeFixtures()[0]}}
    }];
    const errorMocks = [{
        request: mockRequest,
        result: {error: "Bad Request"}
    }];

    describe('render tests', () => {
        let wrapper;
        it('should render the basic page elements',  async () => {
            wrapper = mount(<MockedProvider mocks={mocks}><UpdateRecipe match={{params: {id: '1'}}}/></MockedProvider>);
            await new Promise(resolve => setTimeout(resolve));
            wrapper.update();
            // with RecipeDetail mocked
            console.log(wrapper.debug());
            expect(wrapper.contains('RecipeDetail')).toEqual(true);
        });
    })

});
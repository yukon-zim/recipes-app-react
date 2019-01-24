import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from "react-apollo/test-utils";
import { isEqual } from 'lodash';
import recipeFixtures from '../../testing/recipe-fixtures.js';
import UpdateRecipe, {GET_RECIPE_QUERY} from './UpdateRecipe';

jest.mock('../recipe-detail', () => () => () => 'RecipeDetail');

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
        it('should render child HOC',  async () => {
            // addTypename=false in order to successfully run mocked gql query, otherwise mockedProvider
            // will not recognize mocked query as identical to GET_RECIPE_QUERY run by component
            wrapper = mount(<MockedProvider mocks={mocks} addTypename={false}><UpdateRecipe match={{params: {id: '1'}}}/></MockedProvider>);
            // advance query and update wrapper to see mocked data instead of loading state
            await new Promise(resolve => setTimeout(resolve));
            wrapper.update();
            expect(wrapper.contains('RecipeDetail')).toEqual(true);
            // locate the element within the wrapper that's displaying the recipe
            // implicitly confirms functionality of deepCopy method in component under test
            const mockedComponent = wrapper.findWhere(elem => {
                const recipe = elem.props().recipe;
                return recipe && isEqual(recipe, recipeFixtures()[0])
            });
            // should be exactly 1 recipe-displaying component
            expect(mockedComponent).toHaveLength(1);
        });
        it('should handle payload with no data and an error', async () => {
            const errorMessage = <p className="error-message">Couldn&#39;t find the recipe with ID 1</p>;
            wrapper = mount(<MockedProvider mocks={errorMocks}><UpdateRecipe match={{params: {id: '1'}}}/></MockedProvider>);
            // advance query and update wrapper to see mocked data instead of loading state
            await new Promise(resolve => setTimeout(resolve));
            wrapper.update();
            expect(wrapper.contains(errorMessage)).toEqual(true);
        });
        it('should display loading state', () => {
            wrapper = mount(<MockedProvider mocks={mocks}><UpdateRecipe match={{params: {id: '1'}}}/></MockedProvider>);
            expect(wrapper.contains(<p>loading recipe</p>)).toEqual(true);
        })
    })
// no method tests - deepCopy method tested in render tests
});
import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils'
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import recipeFixtures from '../../testing/recipe-fixtures';
import CreateRecipeButtons, { CREATE_RECIPE_MUTATION } from './CreateRecipeButtons'
import { ALL_RECIPES_QUERY } from '../../recipe-list/recipe-list';

const theme = { newSchoolOptions: {}, oldSchoolOptions: {} };

describe('component tests', () => {
    const mockTestRecipe = {
        name: 'test',
        category: 'test',
        numberOfServings: 'test',
        ingredients: ['test'],
        instructions: ['test'],
        notes: 'test'
    };
    const mockMutation = {
        query: CREATE_RECIPE_MUTATION,
        variables: mockTestRecipe
    };
    const mockQuery = {
        query: ALL_RECIPES_QUERY,
        variables: {
            searchTerm: ''
        }
    };
    const mocks = [{
        request: mockMutation,
        result: { data: { addRecipe: recipeFixtures()[0] } } },
        { request: mockQuery,
        result: { data: { recipe: recipeFixtures()[0] } }
    }];
    const errorMocks = [{
        request: mockMutation,
        result: { error: "Bad Request" }
    }];

    describe('testing event handlers', async () => {
        it('should apply click from \'save new recipe\' button', async () => {
            let spyReset = jest.fn();
            // load empty recipe
            const wrapper = mount(<ThemeProvider theme={theme}>
                <MemoryRouter>
                    <MockedProvider mocks={mocks} addTypename={false}>
                        <CreateRecipeButtons
                            recipe={mockTestRecipe}
                            user={{ username:'steven anita tester' }}
                            formIsDirty={true}
                            formIsValid={true}
                            resetForm={spyReset}
                        />
                    </MockedProvider>
                </MemoryRouter>
            </ThemeProvider>);
            const mockedButton = wrapper.find('CreateRecipeButtons').find('button.btn-save-new-recipe');

            // apply click to 'save new' button
            mockedButton.simulate('mouseDown');
            // wait for create mutation
            await new Promise(resolve => setTimeout(resolve, 10));
            wrapper.update();
            expect(spyReset).toHaveBeenCalled();
        });
    })
});
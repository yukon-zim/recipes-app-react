import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils'
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import recipeFixtures from '../../testing/recipe-fixtures';
import UpdateRecipeButtons, { UPDATE_RECIPE_MUTATION, DELETE_RECIPE_MUTATION } from './UpdateRecipeButtons'
import { ALL_RECIPES_QUERY } from '../../recipe-list/recipe-list';

const theme = {newSchoolOptions: {}, oldSchoolOptions: {}};

describe('component tests', () => {
    const mockTestRecipe = {
        id: '1',
        name: 'test',
        category: 'test',
        numberOfServings: 'test',
        ingredients: ['test'],
        instructions: ['test'],
        notes: 'test'
    };
    const mockUpdateMutation = {
        query: UPDATE_RECIPE_MUTATION,
        variables: mockTestRecipe
    };
    const mockDeleteMutation = {
        query: DELETE_RECIPE_MUTATION,
        variables: {id: '1'}
    };
    const mockQuery = {
        query: ALL_RECIPES_QUERY,
        variables: {
            searchTerm: ''
        }
    };
    const mocks = [{
        request: mockUpdateMutation,
        result: {data: {addRecipe: recipeFixtures()[0]}}
    }, {
        request: mockDeleteMutation,
        result: {data: {message:'success'}}
    }, {
        request: mockQuery,
        result: {data: {recipe: recipeFixtures()[0]}}
    }];
    const errorMocks = [{
        request: mockUpdateMutation,
        result: {error: "Bad Request"}
    }];

    describe('testing event handlers', async () => {
        let spyReset;
        let wrapper;
        let spyConfirmDelete;
        let history;
        beforeEach(() => {
            spyConfirmDelete = jest.fn();
            spyConfirmDelete.mockImplementation(() => {return true});
            global.confirm = spyConfirmDelete;
            spyReset = jest.fn();
            history = createMemoryHistory();
            // load mocked recipe
            wrapper = mount(<ThemeProvider theme={theme}>
                <Router history={history}>
                    <MockedProvider mocks={mocks} addTypename={false}>
                        <UpdateRecipeButtons
                            recipe={mockTestRecipe}
                            user={{username:'steven anita tester'}}
                            formIsDirty={true}
                            formIsValid={true}
                            resetForm={spyReset}
                        />
                    </MockedProvider>
                </Router>
            </ThemeProvider>);
        });
        it('should apply click from \'update recipe\' button', async () => {
            const mockedButton = wrapper.find('UpdateRecipeButtons').find('button.btn-update-recipe');
            // apply click to 'save new' button
            mockedButton.simulate('mouseDown');
            // wait for update mutation
            await new Promise(resolve => setTimeout(resolve, 10));
            wrapper.update();
            expect(spyReset).toHaveBeenCalled();
        });
        it('should apply click from \'delete recipe\' button', async () => {

            const mockedButton = wrapper.find('UpdateRecipeButtons').find('button.btn-delete-recipe');
            // history has 1 entry on creation
            expect(history).toHaveLength(1);
            // apply click to 'save new' button
            mockedButton.simulate('mouseDown');
            // wait for delete mutation
            await new Promise(resolve => setTimeout(resolve, 10));
            wrapper.update();
          expect(history).toHaveLength(2);
        });
    })
});
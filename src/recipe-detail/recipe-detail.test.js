import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import recipeFixtures from '../testing/recipe-fixtures.js';
import recipeDetail from './recipe-detail';

const theme = { newSchoolOptions: {}, oldSchoolOptions: {} };
jest.mock('./CreateRecipe/CreateRecipeButtons', () => () => 'CreateRecipeButtons');
jest.mock('./UpdateRecipe/UpdateRecipeButtons', () => () => 'UpdateRecipeButtons');

describe('component tests', () => {
    let spyCheckValidity = jest.fn();
    spyCheckValidity.mockImplementation(() => {return true});
    function mockSetFormRef() {
        this.recipeForm = { checkValidity: spyCheckValidity };
    }
    let NewRecipeDetail;
    let EditRecipeDetail;
    beforeEach(() =>{
        spyCheckValidity.mockClear();
        // setup HOCs for mounting where needed; setup spyCheckValidity for use on Update form
        NewRecipeDetail = recipeDetail(() => 'CreateRecipeButtons' );
        EditRecipeDetail = recipeDetail(() => 'UpdateRecipeButtons' );
        jest.spyOn(EditRecipeDetail.prototype, 'setFormRef').mockImplementation(mockSetFormRef);
    });
    describe('render scenarios', () => {
        it('should render an empty component for route /detail/new', () => {
            const wrapper = mount(
                <ThemeProvider theme={theme}>
                <MemoryRouter>
                    <NewRecipeDetail
                        id={'new'}
                        newRecipeMode={true}
                    />
                </MemoryRouter>
            </ThemeProvider>);
            const mockedDetail = wrapper.find('RecipeDetail').instance();
            expect(mockedDetail.state.recipe).toEqual({
                ingredients: [],
                instructions: [],
                name: ''
            });
            expect(mockedDetail.state.recipeId).toEqual(undefined);
            expect(wrapper.find('RecipeDetailField')).toHaveLength(4);
            expect(wrapper.find('RecipeDetailListField')).toHaveLength(2);
            expect(wrapper.contains('CreateRecipeButtons')).toEqual(true);
        });
        it('should render a recipe when given an existing recipe', async () => {
            const wrapper = mount(<ThemeProvider theme={theme}>
                <MemoryRouter>
                    <EditRecipeDetail
                        recipe={recipeFixtures()[0]}
                        newRecipeMode={false}
                    />
                </MemoryRouter>
            </ThemeProvider>);
            const mockedDetail = wrapper.find('RecipeDetail').instance();
            expect(mockedDetail.state.recipe).toEqual(recipeFixtures()[0])
        });
    });
    describe('direct method calls on component', () => {
        let wrapper;
        let mockedDetail;
        beforeEach(() => {
            //setup wrapper and assign mockedDetail for further testing
            wrapper = mount(<ThemeProvider theme={theme}>
                <MemoryRouter>
                    <EditRecipeDetail
                        recipe={recipeFixtures()[0]}
                        newRecipeMode={false}
                    />
                </MemoryRouter>
            </ThemeProvider>);
            mockedDetail = wrapper.find('RecipeDetail').instance();
        });
        it('should correctly add an item to a list', async () => {
            expect(mockedDetail.state.recipe).toEqual(recipeFixtures()[0]);
            spyCheckValidity.mockClear();
            // add new ingredient
            mockedDetail.addListItem('ingredients');
            // check that ingredients have changed
            expect(mockedDetail.state.recipe.ingredients).not.toEqual(recipeFixtures()[0].ingredients);
            // check that instructions have not changed
            expect(mockedDetail.state.recipe.instructions).toEqual(recipeFixtures()[0].instructions);
            expect(mockedDetail.state.formIsDirty).toEqual(true);
            expect(spyCheckValidity).toHaveBeenCalled();
            // cannot fully check form validity in unit test - this relies on HTML5's checkValidity
        });
        it('should correctly remove an item from a list', async () => {
            expect(mockedDetail.state.recipe).toEqual(recipeFixtures()[0]);
            spyCheckValidity.mockClear();
            // remove instruction
            mockedDetail.deleteListItem(0, 'instructions');
            // check that instructions have changed
            expect(mockedDetail.state.recipe.instructions).not.toEqual(recipeFixtures()[0].instructions);
            // check that ingredients have not changed
            expect(mockedDetail.state.recipe.ingredients).toEqual(recipeFixtures()[0].ingredients);
            expect(mockedDetail.state.formIsDirty).toEqual(true);
            expect(spyCheckValidity).toHaveBeenCalled();
            // cannot fully check form validity in unit test - this relies on HTML5's checkValidity
        });
        it('should correctly move an item up/down a list', async () => {
            expect(mockedDetail.state.recipe).toEqual(recipeFixtures()[0]);
            // move 0th instruction down
            mockedDetail.moveListItemDown(0, 'instructions');
            // check that instructions have changed
            expect(mockedDetail.state.recipe).not.toEqual(recipeFixtures()[0].instructions);
            // check that ingredients have not changed
            expect(mockedDetail.state.recipe.ingredients).toEqual(recipeFixtures()[0].ingredients);
            // move 1st instruction back up to 0th index
            mockedDetail.moveListItemUp(1, 'instructions');
            // recipe should now match fixtures again
            expect(mockedDetail.state.recipe).toEqual(recipeFixtures()[0]);
            expect(mockedDetail.state.formIsDirty).toEqual(true);
            // cannot fully check form validity in unit test - this relies on HTML5's checkValidity
        })
    });
});
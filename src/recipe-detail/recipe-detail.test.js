import React from 'react';
import { shallow, mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import recipeFixtures from '../testing/recipe-fixtures.js';
import recipeDetail from './recipe-detail';
import RecipeDetailField from './recipe-detail-field';

const theme = {newSchoolOptions: {}, oldSchoolOptions: {}};
jest.mock('./CreateRecipe/CreateRecipeButtons', () => () => 'CreateRecipeButtons');
jest.mock('./UpdateRecipe/UpdateRecipeButtons', () => () => 'UpdateRecipeButtons');

describe('component tests', () => {
    let spyCheckValidity = jest.fn();
    spyCheckValidity.mockImplementation(() => {return true});
    function mockSetFormRef() {
        this.recipeForm = { checkValidity: spyCheckValidity };
    }
    describe('render scenarios', () => {
        // it('should render an empty component for route /detail/new', () => {
        //     const NewRecipeDetail = recipeDetail('CreateRecipeButtons');
        //     const wrapper = mount(<ThemeProvider theme={theme}>
        //         <MemoryRouter>
        //             <NewRecipeDetail
        //                 id={'new'}
        //                 newRecipeMode={true}
        //             />
        //         </MemoryRouter>
        //     </ThemeProvider>);
        //     const mockedDetail = wrapper.find('RecipeDetail').instance();
        //     expect(mockedDetail.state.recipe).toEqual({
        //         ingredients: [],
        //         instructions: [],
        //         name: ''
        //     });
        //     expect(mockedDetail.state.recipeId).toEqual(undefined);
        //     expect(wrapper.find('RecipeDetailField')).toHaveLength(4);
        //     expect(wrapper.find('RecipeDetailListField')).toHaveLength(2);
        //     expect(wrapper.find('CreateRecipeButtons')).toHaveLength(0);
        // });
        it('should render a recipe when given an existing ID', async () => {

            const EditRecipeDetail = recipeDetail('UpdateRecipeButtons');
            jest.spyOn(EditRecipeDetail.prototype, 'setFormRef').mockImplementation(mockSetFormRef);
            const wrapper = mount(<ThemeProvider theme={theme}>
                <MemoryRouter>
                    <EditRecipeDetail
                        recipe={recipeFixtures()[0]}
                        newRecipeMode={false}
                    />
                </MemoryRouter>
            </ThemeProvider>);
            const mockedDetail = wrapper.find('RecipeDetail').instance();
            mockedDetail.recipeForm = {
                checkValidity: spyCheckValidity,
            };
            expect(mockedDetail.state.recipe).toEqual(recipeFixtures()[0])
            // expect(wrapper.state('recipe')).toEqual(expect.objectContaining({
            //     name: recipeFixtures()[0].name,
            //     ingredients: recipeFixtures()[0].ingredients,
            //     instructions: recipeFixtures()[0].instructions
            // }));
        });
        it('should render a blank recipe when given a null ID', () => {
            const wrapper = shallow(<RecipeDetail
                match={{params: {id: null}}}
            />);
            expect(wrapper.state('recipe')).toEqual({
                ingredients: [],
                instructions: [],
                name: ''
            });
            expect(wrapper.state('newRecipeMode')).toEqual(true);
            expect(wrapper.find('RecipeDetailField')).toHaveLength(4);
            expect(wrapper.find('RecipeDetailListField')).toHaveLength(2);
            expect(wrapper.find('button.btn-update-recipe')).toHaveLength(0);
            expect(wrapper.find('button.btn-delete-recipe')).toHaveLength(0);
            expect(wrapper.find('button.btn-save-new-recipe')).toHaveLength(1);
            expect(wrapper.state('formError')).toEqual('Could not load null');
        });
        it('should render a blank recipe if not passed a numeric ID in the URL', () => {
            const wrapper = shallow(<RecipeDetail
                match={{params: {id: 'test'}}}
            />);
            expect(wrapper.state('recipe')).toEqual({
                ingredients: [],
                instructions: [],
                name: ''
            });
            expect(wrapper.state('newRecipeMode')).toEqual(true);
            expect(wrapper.find('RecipeDetailField')).toHaveLength(4);
            expect(wrapper.find('RecipeDetailListField')).toHaveLength(2);
            expect(wrapper.find('button.btn-update-recipe')).toHaveLength(0);
            expect(wrapper.find('button.btn-delete-recipe')).toHaveLength(0);
            expect(wrapper.find('button.btn-save-new-recipe')).toHaveLength(1);
        })
    });
    describe('direct method calls on component', () => {
        it('should correctly add an item to a list', async () => {
            const jsonstring = JSON.stringify(recipeFixtures()[0]);
            fetch.mockResponseOnce(jsonstring);

            const wrapper = shallow(<RecipeDetail
                match={{params: {id: 1}}}
            />);
            await wrapper.instance().getRecipePromise;
            expect(wrapper.state('recipe')).toEqual(expect.objectContaining({
                name: recipeFixtures()[0].name,
                ingredients: recipeFixtures()[0].ingredients,
                instructions: recipeFixtures()[0].instructions
            }));
            // add new ingredient
            wrapper.instance().addListItem('ingredients');
            // check that ingredients have changed
            expect(wrapper.state('recipe')).not.toEqual(expect.objectContaining({
                ingredients: recipeFixtures()[0].ingredients
            }));
            // check that instructions have not changed
            expect(wrapper.state('recipe')).toEqual(expect.objectContaining({
                instructions: recipeFixtures()[0].instructions
            }));
            expect(wrapper.state('formIsDirty')).toEqual(true);
        });
        it('should correctly remove an item from a list', async () => {
            const jsonstring = JSON.stringify(recipeFixtures()[0]);
            fetch.mockResponseOnce(jsonstring);

            const wrapper = shallow(<RecipeDetail
                match={{params: {id: 1}}}
            />);
            await wrapper.instance().getRecipePromise;
            expect(wrapper.state('recipe')).toEqual(expect.objectContaining({
                name: recipeFixtures()[0].name,
                ingredients: recipeFixtures()[0].ingredients,
                instructions: recipeFixtures()[0].instructions
            }));
            // remove instruction
            wrapper.instance().deleteListItem(0, 'instructions');
            // check that instructions have changed
            expect(wrapper.state('recipe')).not.toEqual(expect.objectContaining({
                instructions: recipeFixtures()[0].instructions
            }));
            // check that ingredients have not changed
            expect(wrapper.state('recipe')).toEqual(expect.objectContaining({
                ingredients: recipeFixtures()[0].ingredients
            }));
            expect(wrapper.state('formIsDirty')).toEqual(true);
        });
        it('should correctly move an item up/down a list', async () => {
            const jsonstring = JSON.stringify(recipeFixtures()[0]);
            fetch.mockResponseOnce(jsonstring);

            const wrapper = shallow(<RecipeDetail
                match={{params: {id: 1}}}
            />);
            await wrapper.instance().getRecipePromise;
            expect(wrapper.state('recipe')).toEqual(expect.objectContaining({
                name: recipeFixtures()[0].name,
                ingredients: recipeFixtures()[0].ingredients,
                instructions: recipeFixtures()[0].instructions
            }));
            // move 0th instruction down
            wrapper.instance().moveListItemDown(0, 'instructions');
            // check that instructions have changed
            expect(wrapper.state('recipe')).not.toEqual(expect.objectContaining({
                instructions: recipeFixtures()[0].instructions
            }));
            // check that ingredients have not changed
            expect(wrapper.state('recipe')).toEqual(expect.objectContaining({
                ingredients: recipeFixtures()[0].ingredients
            }));
            // move 1st instruction back up to 0th index
            wrapper.instance().moveListItemUp(1, 'instructions');
            // recipe should now match fixtures again
            expect(wrapper.state('recipe')).toEqual(expect.objectContaining({
                instructions: recipeFixtures()[0].instructions
            }));
        })
    });
    describe('testing event handlers', () => {
        it('should apply click from \'update recipe\' button', async () => {
            let spyCheckValidity = jest.fn();
            let spyReset = jest.fn();
            spyCheckValidity.mockImplementation(() => {return true});

            // load initial recipe
            const initialJsonString = JSON.stringify(recipeFixtures()[0]);
            fetch.mockResponseOnce(initialJsonString);
            const wrapper = shallow(<RecipeDetail
                match={{params: {id: 1}}}
            />);
            await wrapper.instance().getRecipePromise;
            const initialRecipe = wrapper.state('recipe');

            // apply spies to form
            wrapper.instance().recipeForm = {
                checkValidity: spyCheckValidity,
                reset: spyReset
            };

            // mock update request with another recipe
            const updatedJsonString = JSON.stringify(recipeFixtures()[1]);
            fetch.mockResponseOnce(updatedJsonString);

            // apply click to update button
            wrapper.find('button.btn-update-recipe').simulate('click');
            await wrapper.instance().updateRecipePromise;

            expect(wrapper.state('recipe')).not.toEqual(initialRecipe);
            expect(wrapper.state('formIsDirty')).toEqual(false);
            expect(spyCheckValidity).toHaveBeenCalled();
            expect(spyReset).toHaveBeenCalled();
        });
        it('should apply click from \'save new recipe\' button', async () => {
            let spyCheckValidity = jest.fn();
            spyCheckValidity.mockImplementation(() => {return true});

            // load empty recipe
            const wrapper = shallow(<RecipeDetail
                match={{params: {id: 'new'}}}
            />);
            wrapper.instance().recipeForm = {
                checkValidity: spyCheckValidity,
            };

            // mock 'save new' request with another recipe
            const newRecipeJsonString = JSON.stringify(recipeFixtures()[1]);
            fetch.mockResponseOnce(newRecipeJsonString);

            // apply click to 'save new' button
            wrapper.find('button.btn-save-new-recipe').simulate('click');
            await wrapper.instance().saveNewRecipePromise;

            expect(wrapper.state('recipe')).toEqual(expect.objectContaining({
                name: recipeFixtures()[1].name,
                ingredients: recipeFixtures()[1].ingredients,
                instructions: recipeFixtures()[1].instructions
            }));
            expect(wrapper.state('recipeId')).not.toBeNaN();
            expect(wrapper.state('formIsDirty')).toEqual(false);
            expect(wrapper.state('newRecipeMode')).toEqual(false);
            expect(wrapper.state('formError')).toEqual('');
            expect(spyCheckValidity).toHaveBeenCalled();
        });

        it('should apply click from \'delete recipe\' button', async () => {
            let history = [];
            let spyConfirmDelete = jest.fn();
            spyConfirmDelete.mockImplementation(() => { return true });

            // load initial recipe
            const initialJsonString = JSON.stringify(recipeFixtures()[0]);
            fetch.mockResponseOnce(initialJsonString);
            const wrapper = shallow(<RecipeDetail
                match={{params: {id: 1}}}
                history={history}
            />);
            await wrapper.instance().getRecipePromise;

            // apply click to delete button
            global.confirm = spyConfirmDelete;
            wrapper.find('button.btn-delete-recipe').simulate('click');
            await wrapper.instance().deleteRecipePromise;

            expect(spyConfirmDelete).toHaveBeenCalledWith(`Are you sure you want to delete this recipe? This action cannot be undone.`)
            expect(wrapper.state('formError')).toEqual('');
            expect(history.length).toEqual(1);
        });
    })
});
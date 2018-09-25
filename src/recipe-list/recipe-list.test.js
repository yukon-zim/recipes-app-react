import React from 'react';
import { shallow, render } from 'enzyme';
import recipeFixtures from '../testing/recipe-fixtures.js';
import RecipeList from './recipe-list';

describe('component tests', () => {
    describe('render tests', () => {
        let wrapper;
        beforeEach(() => {
            // set up fetch response for when getRecipes is called by componentDidMount
            const jsonString = JSON.stringify(recipeFixtures());
            fetch.mockResponseOnce(jsonString);
        });
        it('should render the basic page elements', async () => {
            wrapper = shallow(<RecipeList/>);
            await wrapper.instance().getRecipesPromise;
            expect(wrapper.find('RecipeSearch')).toHaveLength(1);
            expect(wrapper.find('RecipeListTable')).toHaveLength(1);
            expect(wrapper.find('ImportCsv')).toHaveLength(1);
            expect(wrapper.find('ImportUrl')).toHaveLength(1);
            expect(wrapper.find('Link')).toHaveLength(1);
        });
        it('should update state to match the list of fixture recipes', async () => {
            wrapper = shallow(<RecipeList/>);
            await wrapper.instance().getRecipesPromise;
            expect(wrapper.state('recipes').length).toEqual(4);
            expect(wrapper.state('recipes')[0]).toEqual(expect.objectContaining({
                name: recipeFixtures()[0].name,
                ingredients: recipeFixtures()[0].ingredients,
                instructions: recipeFixtures()[0].instructions
            }));
            expect(wrapper.state('searchInProgress')).toEqual(false);
        })
    });
    describe('method tests', () => {
        let wrapper;
        beforeEach(() => {
            // set up fetch response for when getRecipes is called by componentDidMount
            const jsonString = JSON.stringify(recipeFixtures());
            fetch.mockResponseOnce(jsonString);
        });
        it('should set recipes correctly with setter', async () => {
            wrapper = shallow(<RecipeList/>);
            await wrapper.instance().getRecipesPromise;
            expect(wrapper.state('recipes')[0]).toEqual(expect.objectContaining({
                name: recipeFixtures()[0].name,
                ingredients: recipeFixtures()[0].ingredients,
                instructions: recipeFixtures()[0].instructions
            }));
            wrapper.instance().setRecipes(recipeFixtures()[1]);
            expect(wrapper.state('recipes')).toEqual(expect.objectContaining({
                name: recipeFixtures()[1].name,
                ingredients: recipeFixtures()[1].ingredients,
                instructions: recipeFixtures()[1].instructions
            }));
        });
        it('should set searchInProgress property correctly with setter', async () => {
            wrapper = shallow(<RecipeList/>);
            await wrapper.instance().getRecipesPromise;
            expect(wrapper.state('searchInProgress')).toEqual(false);
            wrapper.instance().setSearchInProgress(true);
            expect(wrapper.state('searchInProgress')).toEqual(true);
        })
    })
});

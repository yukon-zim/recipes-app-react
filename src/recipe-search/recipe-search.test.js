import React from 'react';
import { shallow, render } from 'enzyme';
import recipeFixtures from '../testing/recipe-fixtures.js';
import RecipeSearch from './recipe-search';

describe('component tests', () => {
    let spySetRecipes;
    let spySetSearchInProgress;
    const fullRecipeList = [recipeFixtures()[0], recipeFixtures()[1]];
    beforeEach(() => {
        spySetRecipes = jest.fn();
        spySetSearchInProgress = jest.fn();
    });
    describe('render tests', () => {
        let wrapper;
        it('render when search is not in progress', () => {
            wrapper = shallow(<RecipeSearch
                fullRecipeList={fullRecipeList}
                recipes={[recipeFixtures()[0], recipeFixtures()[1]]}
                searchInProgress={false}
            />);
            const noSearchHeader = <h2>My 2 Recipes</h2>;
            expect(wrapper.find('input#search-recipes-field')).toHaveLength(1);
            expect(wrapper.contains(noSearchHeader)).toEqual(true);
        });
        it('render when search is in progress', () => {
            wrapper = shallow(<RecipeSearch
                fullRecipeList={fullRecipeList}
                recipes={[]}
                searchInProgress={true}
            />);
            const searchResultsHeader = <h2>Search results: 0 recipe(s)</h2>;
            expect(wrapper.contains(searchResultsHeader)).toEqual(true)
        });
    });
    describe('event tests', () => {
        let wrapper;
        it('non-empty search term', async () => {
            wrapper = shallow(<RecipeSearch
                fullRecipeList={fullRecipeList}
                recipes={[]}
                searchInProgress={true}
                setSearchInProgress={spySetSearchInProgress}
                setRecipes={spySetRecipes}
            />);
            // mock out search fetch request
            const searchResponse = JSON.stringify([recipeFixtures()[0]]);
            fetch.mockResponseOnce(searchResponse);
            // simulate onKeyUp event (entering search term)
            wrapper.find('input#search-recipes-field').simulate('keyUp', {target:{value: 'test'}});
            // await search promises
            await wrapper.instance().responsePromise;
            await wrapper.instance().jsonDataPromise;
            expect(spySetSearchInProgress).toHaveBeenCalledWith(true);
            expect(spySetRecipes).toHaveBeenCalledWith(JSON.parse(searchResponse))
        });
        it('empty search term', async () => {
            wrapper = shallow(<RecipeSearch
                fullRecipeList={fullRecipeList}
                recipes={[]}
                searchInProgress={true}
                setSearchInProgress={spySetSearchInProgress}
                setRecipes={spySetRecipes}
            />);
            // simulate onKeyUp event (entering search term)
            wrapper.find('input#search-recipes-field').simulate('keyUp', {target:{value: ''}});
            expect(spySetSearchInProgress).toHaveBeenCalledWith(false);
            expect(spySetRecipes).toHaveBeenCalledWith(fullRecipeList);
        })
    })
});

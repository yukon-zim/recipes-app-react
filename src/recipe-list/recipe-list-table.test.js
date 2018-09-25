import React from 'react';
import { shallow, render } from 'enzyme';
import recipeFixtures from '../testing/recipe-fixtures.js';
import RecipeListTable from './recipe-list-table';

describe('component tests', () => {
    describe('render tests', () => {
        let wrapper;
        // noRecipesOnUser = true
        it('should not render any recipes if none exist', () => {
            wrapper = shallow(<RecipeListTable
                recipes={[]}
                searchInProgress={false}
            />);
            expect(wrapper.find('span.span-no-user-recipes')).toHaveLength(1);
            expect(wrapper.find('span.span-no-recipes-found')).toHaveLength(0);
            expect(wrapper.find('tr.data-row')).toHaveLength(0)
        });
        // noRecipesFound = true
        it('should not render any recipes if none are returned by search', () => {
            wrapper = shallow(<RecipeListTable
                recipes={[]}
                searchInProgress={true}
            />);
            expect(wrapper.find('span.span-no-user-recipes')).toHaveLength(0);
            expect(wrapper.find('span.span-no-recipes-found')).toHaveLength(1);
            expect(wrapper.find('tr.data-row')).toHaveLength(0)
        });
        // searchInProgress = true, single-recipe list
        it('should render a list if a recipe is returned by search', () => {
            wrapper = shallow(<RecipeListTable
                recipes={[recipeFixtures()[0]]}
                searchInProgress={true}
            />);
            const pageSpans = wrapper.find('span');
            const nameSpan = pageSpans.filterWhere((span) => {
                return span.text() === recipeFixtures()[0].name.toUpperCase()
            });
            expect(nameSpan).toHaveLength(1);
            expect(wrapper.find('tr.data-row')).toHaveLength(1);
            expect(wrapper.find('span.span-no-user-recipes')).toHaveLength(0);
            expect(wrapper.find('span.span-no-recipes-found')).toHaveLength(0);
        });
        // searchInProgress = false, multi-recipe list
        it('should render data if not in search mode and recipes exist', () => {
            wrapper = shallow(<RecipeListTable
                recipes={[recipeFixtures()[0], recipeFixtures()[1]]}
                searchInProgress={false}
            />);
            expect(wrapper.find('tr.data-row')).toHaveLength(2);
            expect(wrapper.find('span.span-no-user-recipes')).toHaveLength(0);
            expect(wrapper.find('span.span-no-recipes-found')).toHaveLength(0);
        });
    });
    describe('method tests', () => {
        let wrapper;
        function nodeText(nodeId) {
            return nodeId.text();
        }
        it('should correctly sort recipes by column header', () => {
            let spySetRecipe = jest.fn();
            const validRecipes = [recipeFixtures()[0], recipeFixtures()[1]];
            wrapper = shallow(<RecipeListTable
                recipes={validRecipes}
                searchInProgress={false}
                setRecipes={spySetRecipe}
            />);
            // compare text of name cells to fixture data to test order
            expect(wrapper.find('span.name-span').map(nodeText)).toEqual([
                recipeFixtures()[0].name.toUpperCase(),
                recipeFixtures()[1].name.toUpperCase()
            ]);
            expect(wrapper.state('currentSortByField')).toEqual(null);
            expect(wrapper.state('currentSortByOrder')).toEqual(null);
            // click name header to sort by name asc
            wrapper.find('th.name-header a').simulate('click');
            // check spy was called w correctly ordered data
            expect(spySetRecipe).toHaveBeenCalledWith([recipeFixtures()[0], recipeFixtures()[1]]);
            expect(wrapper.state('currentSortByField')).toEqual('name');
            expect(wrapper.state('currentSortByOrder')).toEqual('asc');
            // click name header to sort by name desc
            wrapper.find('th.name-header a').simulate('click');
            // check spy was called w correctly ordered data
            expect(spySetRecipe).toHaveBeenCalledWith([recipeFixtures()[1], recipeFixtures()[0]]);
            expect(wrapper.state('currentSortByField')).toEqual('name');
            expect(wrapper.state('currentSortByOrder')).toEqual('desc');
        })
    })
});
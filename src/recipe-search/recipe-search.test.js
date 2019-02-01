import React from 'react';
import { shallow } from 'enzyme';
import recipeFixtures from '../testing/recipe-fixtures.js';
import RecipeSearch from './recipe-search';

describe('component tests', () => {
    let spySetSearchTerm;
    beforeEach(() => {
        spySetSearchTerm = jest.fn();
    });
    describe('render tests', () => {
        let wrapper;
        it('render when search is not in progress', () => {
            wrapper = shallow(<RecipeSearch
                recipes={[recipeFixtures()[0], recipeFixtures()[1]]}
                searchInProgress={false}
            />);
            const noSearchHeader = <h2>My 2 Recipes</h2>;
            expect(wrapper.find('input#search-recipes-field')).toHaveLength(1);
            expect(wrapper.contains(noSearchHeader)).toEqual(true);
        });
        it('render when search is in progress', () => {
            wrapper = shallow(<RecipeSearch
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
                recipes={[]}
                searchInProgress={true}
                setSearchTerm={spySetSearchTerm}
            />);
            // simulate onKeyUp event (entering search term)
            wrapper.find('input#search-recipes-field').simulate('keyUp', { target:{ value: 'test' } });
            expect(spySetSearchTerm).toHaveBeenCalledWith('test');
        });
        it('empty search term', async () => {
            wrapper = shallow(<RecipeSearch
                recipes={[]}
                searchInProgress={true}
                setSearchTerm={spySetSearchTerm}
            />);
            // simulate onKeyUp event (entering search term)
            wrapper.find('input#search-recipes-field').simulate('keyUp', { target:{ value: '' } });
            expect(spySetSearchTerm).toHaveBeenCalledWith('');
        })
    })
});

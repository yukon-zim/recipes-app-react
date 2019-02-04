import React from 'react';
import { shallow } from 'enzyme';
import RecipeSearch from './recipe-search';

describe('component tests', () => {
    let spySetSearchTerm;
    beforeEach(() => {
        spySetSearchTerm = jest.fn();
    });
    describe('render tests', () => {
        let wrapper;
        it('basic render', () => {
            wrapper = shallow(<RecipeSearch
                setSearchTerm={spySetSearchTerm}
            />);
            expect(wrapper.find('input#search-recipes-field')).toHaveLength(1);
        });
    });
    describe('event tests', () => {
        let wrapper;
        it('non-empty search term', async () => {
            wrapper = shallow(<RecipeSearch
                setSearchTerm={spySetSearchTerm}
            />);
            // simulate onKeyUp event (entering search term)
            wrapper.find('input#search-recipes-field').simulate('keyUp', { target:{ value: 'test' } });
            expect(spySetSearchTerm).toHaveBeenCalledWith('test');
        });
        it('empty search term', async () => {
            wrapper = shallow(<RecipeSearch
                setSearchTerm={spySetSearchTerm}
            />);
            // simulate onKeyUp event (entering search term)
            wrapper.find('input#search-recipes-field').simulate('keyUp', { target:{ value: '' } });
            expect(spySetSearchTerm).toHaveBeenCalledWith('');
        })
    })
});

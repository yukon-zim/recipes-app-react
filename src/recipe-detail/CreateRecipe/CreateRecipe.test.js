import React from 'react';
import { mount } from 'enzyme';
import { isEqual } from 'lodash';
import CreateRecipe from '../CreateRecipe/CreateRecipe';

jest.mock('../recipe-detail', () => () => () => 'RecipeDetail');

describe('component tests', () => {
    describe('render tests', () => {
        let wrapper;
        it('should render child HOC',  async () => {
            wrapper = mount(<CreateRecipe/>);
            expect(wrapper.contains('RecipeDetail')).toEqual(true);
        });
    })
});
import React from 'react';
import { shallow, render } from 'enzyme';
import recipeFixtures from '../testing/recipe-fixtures.js';
import ImportUrl from './import-url';

describe('component tests', () => {
    let wrapper;
    let spyGetRecipes;
    let spySetRecipes;
    beforeEach(() => {
        spyGetRecipes = jest.fn();
        spySetRecipes = jest.fn();
        wrapper = shallow(<ImportUrl
            getRecipes={spyGetRecipes}
            setRecipes={spySetRecipes}
        />)
    });
    describe('render tests', () => {

        it('initial render prior to file selection', () => {
            expect(wrapper.state('urlInputValid')).toEqual(false);
            expect(wrapper.find('button.btn-import-url[disabled=true]')).toHaveLength(1);
            expect(wrapper.state('urlImportError')).toEqual('');
        });
    });
    describe('method tests', () => {
        it('event when selecting a URL', () => {
            // simulate onChange event (entering url)
            wrapper.find('input#url-file-upload').simulate('change', {target:{value: 'www.google.com'}});
            expect(wrapper.state('urlInputValid')).toEqual(true);
            expect(wrapper.find('button.btn-import-url[disabled=false]')).toHaveLength(1);
            expect(wrapper.state('urlImportError')).toEqual('');
        });
        it('event when clicking import button', async () => {
            // set up spy return values
            spyGetRecipes.mockImplementation(async () => {
                return [recipeFixtures()[0], recipeFixtures()[1]]
            });
            // simulate onChange event (entering url)
            wrapper.find('input#url-file-upload').simulate('change', {target:{value: 'www.google.com'}});
            // set up import fetch request
            const importResponse = JSON.stringify({message: 'successful test'});
            fetch.mockResponseOnce(importResponse);
            // simulate click on import button
            wrapper.instance().urlToImportInput = {value: 'www.google.com'};
            wrapper.find('button.btn-import-url').simulate('click');
            // await import and getRecipes promises
            await wrapper.instance().importUrlRequestPromise;
            await wrapper.instance().getRecipesPromise;
            expect(spyGetRecipes).toHaveBeenCalledWith();
            expect(spySetRecipes).toHaveBeenCalledWith([recipeFixtures()[0], recipeFixtures()[1]]);
            // url input/state should reset
            expect(wrapper.state('urlInputValid')).toEqual(false);
            expect(wrapper.find('button.btn-import-url[disabled=true]')).toHaveLength(1);
            expect(wrapper.state('urlImportError')).toEqual('successful test');
        })
    })
});
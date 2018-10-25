import React from 'react';
import { shallow, render } from 'enzyme';
import recipeFixtures from '../testing/recipe-fixtures.js';
import ImportCsv from './import-csv';

describe('component tests', () => {
    let spyGetRecipes;
    let wrapper;
    beforeEach(() => {
        spyGetRecipes = jest.fn()
        wrapper = shallow(<ImportCsv
            getRecipes={spyGetRecipes}
        />)
    });
    describe('render tests', () => {

        it('initial render prior to file selection', () => {
            expect(wrapper.state('csvImportEnabled')).toEqual(false);
            expect(wrapper.find('button.btn-import-recipe')).toHaveLength(0);
            expect(wrapper.find('button.btn-cancel-import')).toHaveLength(0);
            expect(wrapper.state('csvImportError')).toEqual('');
        });
    });
    describe('method tests', () => {
        it('rendering on selecting a file and cancelling import', () => {
            // simulate onChange event (selecting csv file)
            wrapper.find('input#csv-file-upload').simulate('change', {});
            // must also simulate ref on input element
            wrapper.instance().csvFileInput = {};
            expect(wrapper.state('csvImportEnabled')).toEqual(true);
            expect(wrapper.find('button.btn-import-recipe')).toHaveLength(1);
            expect(wrapper.find('button.btn-cancel-import')).toHaveLength(1);
            expect(wrapper.state('csvImportError')).toEqual('');
            // simulate click on cancel button
            wrapper.find('button.btn-cancel-import').simulate('click');
            expect(wrapper.state('csvImportEnabled')).toEqual(false);
            expect(wrapper.find('button.btn-import-recipe')).toHaveLength(0);
            expect(wrapper.find('button.btn-cancel-import')).toHaveLength(0);
            expect(wrapper.state('csvImportError')).toEqual('');
        });
        it('rendering on clicking import button', async () => {
            spyGetRecipes.mockImplementation(async () => {
                return [recipeFixtures()[0], recipeFixtures()[1]]
            });
            // simulate onChange event (selecting csv file)
            wrapper.find('input#csv-file-upload').simulate('change', {});
            // must also simulate ref on input element
            wrapper.instance().csvFileInput = {files: ['']};
            // set up import fetch request
            const importResponse = JSON.stringify({message: 'successful test'});
            fetch.mockResponseOnce(importResponse, {status: 200});
            // simulate click on import button
            wrapper.find('button.btn-import-recipe').simulate('click');
            // await import and getRecipes promises
            await wrapper.instance().importRecipesPromise;
            await wrapper.instance().getRecipesPromise;
            expect(spyGetRecipes).toHaveBeenCalledWith();
        })
    })
});
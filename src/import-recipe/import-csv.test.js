import React from 'react';
import { shallow, render } from 'enzyme';
import recipeFixtures from '../testing/recipe-fixtures.js';
import ImportCsv from './import-csv';

describe('component tests', () => {
    let spyGetRecipes;
    beforeEach(() => {
        spyGetRecipes = jest.fn()
    });
    describe('render tests', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = shallow(<ImportCsv
                getRecipes={spyGetRecipes}
            />)
        });
        it('initial render prior to file selection', () => {
            expect(wrapper.state('csvImportEnabled')).toEqual(false);
            expect(wrapper.find('button.btn-import-recipe')).toHaveLength(0);
            expect(wrapper.find('button.btn-cancel-import')).toHaveLength(0);
            expect(wrapper.state('csvImportError')).toEqual('');
        });
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
            const importResponse = {message: 'successful test'};
            fetch.mockResponseOnce(importResponse, {status: 200});
            // simulate click on import button
            wrapper.find('button.btn-import-recipe').simulate('click');
            // await import and getRecipes promises
            await wrapper.instance().importRecipesPromise;
            await wrapper.instance().getRecipesPromise;
            expect(spyGetRecipes).toHaveBeenCalledWith();
        })
    });
    describe('method tests', () => {
        it('further import tests', () => {

        })
    })
});
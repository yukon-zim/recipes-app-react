import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from "react-apollo/test-utils";
import { ThemeProvider } from 'styled-components';
import wait from 'waait';
import recipeFixtures from '../testing/recipe-fixtures.js';
import ImportUrl from './import-url';
import { URL_IMPORT_MUTATION } from './import-url';
import { ALL_RECIPES_QUERY } from '../recipe-list/recipe-list';

const theme = { newSchoolOptions: {}, oldSchoolOptions: {} };

describe('component tests', () => {
    const mockMutation = {
        query: URL_IMPORT_MUTATION,
        variables: { url: 'www.google.com' }
    };
    const mockQuery = {
        query: ALL_RECIPES_QUERY,
        variables: {
            searchTerm: ''
        }
    };
    const mocks = [{
        request: mockMutation,
        result: { data: { importRecipeFromUrl: { name: 'Test Recipe' } } }
    },{
        request: mockQuery,
        result: { data: { recipes: recipeFixtures()[0] } }
    }];
    const errorMocks = [{
        request: mockMutation,
        result: { errors: ["Bad Request"] }
    }];
    let wrapper;
    let mockedComponent;
    beforeEach(() => {
        wrapper = mount(<ThemeProvider theme={theme}>
            <MockedProvider mocks={mocks} addTypename={false}>
            <ImportUrl/>
        </MockedProvider>
        </ThemeProvider>);
        mockedComponent = wrapper.find('ImportUrl').instance();
    });
    describe('render tests', () => {

        it('initial render prior to file selection', () => {
            expect(mockedComponent.state.urlInputValid).toEqual(false);
            expect(wrapper.find('button.btn-import-url[disabled=true]')).toHaveLength(1);
            expect(mockedComponent.state.urlImportMessage).toEqual('');
        });
    });
    describe('method tests', () => {
        it('event when selecting a URL', () => {
            // simulate onChange event (entering url)
            wrapper.find('input#url-file-upload').simulate('change', { target:{ value: 'www.google.com' } });
            expect(mockedComponent.state.urlInputValid).toEqual(true);
            expect(wrapper.find('button.btn-import-url[disabled=false]')).toHaveLength(1);
            expect(mockedComponent.state.urlImportMessage).toEqual('');
        });
        it('event when clicking import button', async () => {
            // simulate onChange event (entering url)
            wrapper.find('input#url-file-upload').simulate('change', { target:{ value: 'www.google.com' } });
            // simulate click on import button
            mockedComponent.urlToImportInput = { value: 'www.google.com' };
            wrapper.find('button.btn-import-url').simulate('mouseDown');
            await wait(100);
            wrapper.update();
            // url input/state should reset
            expect(mockedComponent.state.urlInputValid).toEqual(false);
            expect(wrapper.find('button.btn-import-url[disabled=true]')).toHaveLength(1);
            expect(mockedComponent.state.urlImportMessage).toEqual('Successfully imported recipe from URL!');
        })
    })
});
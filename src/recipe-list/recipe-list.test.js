import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from "react-apollo/test-utils";
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import wait from 'waait';
import recipeFixtures from '../testing/recipe-fixtures.js';
import RecipeList, { ALL_RECIPES_QUERY } from './recipe-list';


const theme = { newSchoolOptions: {}, oldSchoolOptions: {} };
//
// Consistent unit tests with Enzyme and Jest
// To get consistency, always use mount
// if/when we need to mock Components, use jest to mock each one
//

// MOCKING COMPONENTS
// mock paths should be relative to the current test file location
// (test files are usually in the same directory as component-under-test,
//  so you can just use the same path that is listed in the import in the component-under-test)
// more information about mocking Components can be found here:
// https://jestjs.io/docs/en/tutorial-react (Section: Snapshot Testing with Mocks, Enzyme and React 16)
//  and here:
// https://stackoverflow.com/questions/50253660/mock-with-jest-causes-warnings-correct-casing-tag-is-unrecognized-and-unknown
//
jest.mock('../recipe-search/recipe-search', () => () => 'RecipeSearch');
jest.mock('../import-recipe/import-url', () => () => 'ImportUrl');
// It is debatable whether we want EVERYTHING mocked out in this component.
// RecipeListTable is a core part of RecipeList, and they are in the same folder.
// If we did not mock it out, we could put tests for that Component in this test, too.
// I kept it in order to keep this test as a "true" unit test.
// The tests will still run if RecipeListTable is not mocked, however, how you query for
// mocked component vs. un-mocked component differs
// to see the difference, check out comments "// with RecipeListTable mocked" and "// without RecipeListTable mocked"
jest.mock('./recipe-list-table', () => () => 'RecipeListTable');

describe('component tests', () => {
    const mockRequest = {
        query: ALL_RECIPES_QUERY,
        variables: {
            searchTerm: ''
        }
    };
    const mocks = [{
        request: mockRequest,
        result: { data: recipeFixtures() }
    }];
    const errorMocks = [{
        request: mockRequest,
        result: { error: "Bad Request" }
    }];

    describe('render tests', () => {
        let wrapper;
        it('should render the basic page elements', async () => {
            wrapper = mount(<MockedProvider mocks={mocks}><RecipeList/></MockedProvider>);
            // advance wrapper past GQL query loading state
            await wait(500);
            wrapper.update();
            // with RecipeListTable mocked
            expect(wrapper.contains('RecipeListTable')).toEqual(true);
            // without RecipeListTable mocked
            // expect(wrapper.find('RecipeListTable')).toHaveLength(1);
            expect(wrapper.contains('RecipeSearch')).toEqual(true);
        });
        it('should handle payload with no data and an error', async () => {
            wrapper = mount(<MockedProvider mocks={errorMocks}><RecipeList/></MockedProvider>);
            // advance wrapper past GQL query loading state
            await wait(500);
            wrapper.update();
            expect(wrapper.contains('RecipeListTable')).toEqual(false);
            expect(wrapper.contains('RecipeSearch')).toEqual(false);
            expect(wrapper.exists('h4.network-error')).toEqual(true);
        });
        describe("sign in/out", () => {
            const noUserHeader = <h5>Sign in to add new recipes!</h5>;

            it('should show add new recipe button when a user is signed in', async () => {
                wrapper = mount(<ThemeProvider theme={theme}><MemoryRouter><MockedProvider mocks={mocks}><RecipeList user={{ username:'steven anita tester' }}/></MockedProvider></MemoryRouter></ThemeProvider>);
                // advance wrapper past GQL query loading state
                await wait(500);
                wrapper.update();
                expect(wrapper.contains('RecipeListTable')).toEqual(true);
                expect(wrapper.contains(noUserHeader)).toEqual(false);
                // have to include including tag type (Link) in the check in order to narrow down which element
                // to see why, uncomment the following 3 lines to see what the final JSX looks like
                // side note: debug() function is very very helpful for debugging:  https://airbnb.io/enzyme/docs/api/ShallowWrapper/debug.html
                // const addRecipeLink = wrapper.find('#add-new-recipe');
                // console.log(addRecipeLink.debug());
                // console.log(wrapper.debug());
                expect(wrapper.find('Link#add-new-recipe')).toHaveLength(1);
                expect(wrapper.contains('ImportUrl')).toEqual(true);
            });
            it('should not show add new recipe button when a user is not signed in', async () => {
                wrapper = mount(<MockedProvider mocks={mocks}><RecipeList/></MockedProvider>);
                // advance wrapper past GQL query loading state
                await wait(500);
                wrapper.update();
                expect(wrapper.contains('RecipeListTable')).toEqual(true);
                expect(wrapper.contains(noUserHeader)).toEqual(true);
                expect(wrapper.find('#add-new-recipe')).toHaveLength(0);
                expect(wrapper.contains('ImportUrl')).toEqual(false);
            });
        });
    });
    describe('method tests', () => {
        it('should set searchInProgress and searchTerm property correctly with setter', async () => {
            const wrapper = mount(<MockedProvider mocks={mocks}><RecipeList/></MockedProvider>);
            // advance wrapper past GQL query loading state
            await wait(500);
            wrapper.update();
            const mockedProvider = wrapper.find('RecipeList').instance();

            expect(mockedProvider.state.searchTerm).toEqual('');
            expect(mockedProvider.state.searchInProgress).toEqual(false);

            mockedProvider.setSearchTerm('test');
            expect(mockedProvider.state.searchTerm).toEqual('test');
            expect(mockedProvider.state.searchInProgress).toEqual(true);

            mockedProvider.setSearchTerm('');
            expect(mockedProvider.state.searchTerm).toEqual('');
            expect(mockedProvider.state.searchInProgress).toEqual(false);
        })
    })
});

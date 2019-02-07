import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils'
import { ThemeProvider } from 'styled-components';
import wait from 'waait';
import RequestReset, { REQUEST_RESET_MUTATION } from './RequestReset';
import FormValidHelper from './FormValidHelper';

const theme = { newSchoolOptions: {}, oldSchoolOptions: {} };
// mock out form validity
let mockSpyIsFormValid = jest.fn();
mockSpyIsFormValid.mockReturnValue(true);
FormValidHelper.isFormValid = mockSpyIsFormValid.bind(FormValidHelper);

describe('component tests', () => {
    const mockRequest = {
        query: REQUEST_RESET_MUTATION,
        variables: {
            email: 'steven.anita.tester@test.com'
        }
    };
    const mocks = [{
        request: mockRequest,
        result: { data: { message: 'successful test' } }
    }];
    const errorMocks = [{
        request: mockRequest,
        result: { errors: [{ message: "Bad Request" }] }
    }];

    describe('render tests', () => {
        let wrapper;
        // mock out form validity checks
        beforeEach(() => {
            mockSpyIsFormValid.mockClear();
        });
        it('successfully renders the form', () => {
            wrapper = mount(
                <ThemeProvider theme={theme}>
                    <MockedProvider mocks={mocks} addTypename={false}>
                        <RequestReset/>
                    </MockedProvider>
                </ThemeProvider>);
            expect(wrapper.find('HeaderLabel')).toHaveLength(1);
            expect(wrapper.find('UserFormLabel')).toHaveLength(1);
            expect(wrapper.find('UserFormButton')).toHaveLength(1);
        });
        it('disables submit button when form is not valid', () => {
            mockSpyIsFormValid.mockReturnValue(false);
            wrapper = mount(
                <ThemeProvider theme={theme}>
                    <MockedProvider mocks={mocks} addTypename={false}>
                        <RequestReset/>
                    </MockedProvider>
                </ThemeProvider>);
            expect(wrapper.find('UserFormButton').prop('disabled')).toBe(true);
        });
        it('displays errors when appropriate', async () => {
            mockSpyIsFormValid.mockReturnValue(true);
            wrapper = mount(
                <ThemeProvider theme={theme}>
                    <MockedProvider mocks={errorMocks} addTypename={false}>
                        <RequestReset/>
                    </MockedProvider>
                </ThemeProvider>);
            wrapper.find('input.email').simulate('change', { target: {
                    name: 'email',
                    value: 'steven.anita.tester@test.com'
                } });
            wrapper.find('UserFormButton').simulate('click');
            // advance past mutation call
            await wait(500);
            wrapper.update();
            expect(wrapper.find('p.error-message').text()).toEqual('GraphQL error: Bad Request');
        });
        it('disables form when loading', async () => {
            mockSpyIsFormValid.mockReturnValue(true);
            wrapper = mount(
                <ThemeProvider theme={theme}>
                    <MockedProvider mocks={errorMocks} addTypename={false}>
                        <RequestReset/>
                    </MockedProvider>
                </ThemeProvider>);
            expect(wrapper.find('fieldset').prop('disabled')).toBe(false);
            wrapper.find('UserFormButton').simulate('click');
            expect(wrapper.find('fieldset').prop('disabled')).toBe(true);
            await wait(500);
            wrapper.update();
            expect(wrapper.find('fieldset').prop('disabled')).toBe(false);
        });
    });
});
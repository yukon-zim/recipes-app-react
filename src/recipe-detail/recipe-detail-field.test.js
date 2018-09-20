import React from 'react';
import { shallow, render } from 'enzyme';
import recipeFixtures from '../testing/recipe-fixtures.js';
import RecipeDetailField from './recipe-detail-field';

describe('component tests', () => {
    let spyIsFieldInEditAndFocus;
    let spyIsFieldInEditMode;
    let spyEditField;
    let spyUnfocusField;
    let spyUnfocusFieldOnEnter;
    let spySetRecipeField;

    beforeEach(() => {
        spyIsFieldInEditAndFocus = jest.fn();
        spyIsFieldInEditMode = jest.fn();
        spyEditField = jest.fn();
        spyUnfocusField = jest.fn();
        spyUnfocusFieldOnEnter = jest.fn();
        spySetRecipeField = jest.fn();
    });

    describe('renders label and span elements when field is not in edit mode', () => {
        let wrapper;
        beforeEach(() => {
            // assign spy a return value
            spyIsFieldInEditMode.mockImplementation(() => {return false});
            wrapper = shallow(<RecipeDetailField
                recipe={recipeFixtures()[0]}
                isFieldInEditAndFocus={spyIsFieldInEditAndFocus}
                isFieldInEditMode={spyIsFieldInEditMode}
                editField={spyEditField}
                unfocusField={spyUnfocusField}
                unfocusFieldOnEnter={spyUnfocusFieldOnEnter}
                setRecipeField={spySetRecipeField}
                type='textarea'
                fieldName="notes"
                label="Notes: Test"
                required={true}
            />);
        });
        it('renders label and span tag correctly when field is not in edit mode', () => {
            const testLabel = <label>Notes: Test&nbsp;</label>;
            const pageSpans = wrapper.find('span');
            const notesSpan = pageSpans.filterWhere((span) => {return span.text() === recipeFixtures()[0].notes});
            // should render correct label text
            expect(wrapper.contains(testLabel)).toEqual(true);
            // should call isFieldInEditMode
            expect(spyIsFieldInEditMode).toHaveBeenCalled();
            // isFieldInEditMode === false, so span should appear instead of InputType component
            // should render correct notes text
            expect(notesSpan).toHaveLength(1);
            // InputType evaluates to either textarea or input element
            expect(wrapper.exists('textarea')).toEqual(false);
            expect(wrapper.exists('input')).toEqual(false);
            // error should not exist
            expect(wrapper.exists('div.alert')).toEqual(false);
        });
        it('applies click events correctly', () => {
            const pageSpans = wrapper.find('span');
            const notesSpan = pageSpans.filterWhere((span) => {return span.text() === recipeFixtures()[0].notes});
            spyEditField.mockClear();
            notesSpan.simulate('click');
            expect(spyEditField).toHaveBeenCalledWith('notes');
        });
    });
    describe('renders input element when field is in edit mode', () => {
        describe('where input element is text input', () => {
            let wrapper;
            function findTestField(input) {
                return input.prop('id') === 'name' &&
                    input.prop('autoFocus') === true &&
                    input.prop('value') === recipeFixtures()[0].name &&
                    input.prop('type') === 'text' &&
                    input.prop('placeholder') === 'name' &&
                    input.prop('name') === 'name' &&
                    input.prop('required') === true;
            }
            beforeEach(() => {
                spyIsFieldInEditMode.mockImplementation(() => {return true});
                spyIsFieldInEditAndFocus.mockImplementation(() => {return true});

                wrapper = shallow(<RecipeDetailField
                    recipe={recipeFixtures()[0]}
                    isFieldInEditAndFocus={spyIsFieldInEditAndFocus}
                    isFieldInEditMode={spyIsFieldInEditMode}
                    editField={spyEditField}
                    unfocusField={spyUnfocusField}
                    unfocusFieldOnEnter={spyUnfocusFieldOnEnter}
                    setRecipeField={spySetRecipeField}
                    type='text'
                    fieldName="name"
                    label="Name: test"
                    required={true}
                    requiredErrorText="Test error text"
                />);
            });
            it('renders text field correctly in edit mode', () => {
                // set up spies
                // should call spy functions
                expect(spyIsFieldInEditMode).toHaveBeenCalledWith('name');
                expect(spyIsFieldInEditAndFocus).toHaveBeenCalledWith('name');
                const pageInputs = wrapper.find('input');
                const nameInput = pageInputs.filterWhere(findTestField);
                // should render correct input element
                expect(nameInput).toHaveLength(1);
                expect(wrapper.exists('textarea')).toEqual(false);
                expect(wrapper.exists('span')).toEqual(false);
                // visible alert triggered by css and form validity -
                // not by value of bound data
                expect(wrapper.exists('div.alert')).toEqual(true);
            });
            it('applies data changes correctly when field is updated', () => {
                const pageInputs = wrapper.find('input');
                const nameInput = pageInputs.filterWhere(findTestField);
                spySetRecipeField.mockClear();
                // simulate entering test data into name field
                nameInput.simulate('change', {target: {value: 'testName'}});
                expect(spySetRecipeField).toHaveBeenCalledWith('name', 'testName');
            });
            it('unfocuses field on enter', () => {
                const pageInputs = wrapper.find('input');
                const nameInput = pageInputs.filterWhere(findTestField);
                spyUnfocusFieldOnEnter.mockClear();
                // simulate onKeyUp event
                nameInput.simulate('keyUp');
                expect(spyUnfocusFieldOnEnter).toHaveBeenCalled();
            });
            it('unfocuses field on blur', () => {
                const pageInputs = wrapper.find('input');
                const nameInput = pageInputs.filterWhere(findTestField);
                spyUnfocusField.mockClear();
                // simulate unfocus event
                nameInput.simulate('blur');
                expect(spyUnfocusField).toHaveBeenCalled();
            })
        });
        describe('where input element is textarea input', () => {
            let wrapper;

            function findTestField(input) {
                return input.prop('id') === 'notes' &&
                    input.prop('autoFocus') === true &&
                    input.prop('value') === recipeFixtures()[0].notes &&
                    input.prop('type') === 'textarea' &&
                    input.prop('placeholder') === 'notes' &&
                    input.prop('name') === 'notes' &&
                    input.prop('required') === false;
            }

            beforeEach(() => {
                spyIsFieldInEditMode.mockImplementation(() => {
                    return true
                });
                spyIsFieldInEditAndFocus.mockImplementation(() => {
                    return true
                });

                wrapper = shallow(<RecipeDetailField
                    recipe={recipeFixtures()[0]}
                    isFieldInEditAndFocus={spyIsFieldInEditAndFocus}
                    isFieldInEditMode={spyIsFieldInEditMode}
                    editField={spyEditField}
                    unfocusField={spyUnfocusField}
                    unfocusFieldOnEnter={spyUnfocusFieldOnEnter}
                    setRecipeField={spySetRecipeField}
                    type='textarea'
                    fieldName="notes"
                    label="Notes: test"
                    required={false}
                />);
            });
            it('renders text field correctly in edit mode', () => {
                // should call spy functions
                expect(spyIsFieldInEditMode).toHaveBeenCalledWith('notes');
                expect(spyIsFieldInEditAndFocus).toHaveBeenCalledWith('notes');
                const pageInputs = wrapper.find('textarea');
                const notesInput = pageInputs.filterWhere(findTestField);
                // should render correct input element
                expect(notesInput).toHaveLength(1);
                expect(wrapper.exists('text')).toEqual(false);
                expect(wrapper.exists('span')).toEqual(false);
                // visible alert triggered by css and form validity -
                // not by value of bound data
                expect(wrapper.exists('div.alert')).toEqual(false);
            });
        })
    })
});


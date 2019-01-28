import React from 'react';
import { shallow, mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import recipeFixtures from '../testing/recipe-fixtures.js';
import RecipeDetailListField from './recipe-detail-list-field';

const theme = {newSchoolOptions: {}, oldSchoolOptions: {}};

describe('component tests', () => {
    let spyIsFieldInEditAndFocus;
    let spyIsFieldInEditMode;
    let spyEditField;
    let spyUnfocusField;
    let spyUnfocusFieldOnEnter;
    let spySetRecipeField;
    let spyMoveListItemUp;
    let spyMoveListItemDown;
    let spyAddListItem;
    let spyRemoveListItem;

    beforeEach(() => {
        spyIsFieldInEditAndFocus = jest.fn();
        spyIsFieldInEditMode = jest.fn();
        spyEditField = jest.fn();
        spyUnfocusField = jest.fn();
        spyUnfocusFieldOnEnter = jest.fn();
        spySetRecipeField = jest.fn();
        spyMoveListItemUp = jest.fn();
        spyMoveListItemDown = jest.fn();
        spyAddListItem = jest.fn();
        spyRemoveListItem = jest.fn();
    });

    describe('behavior when a recipe has no list items', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = mount(<ThemeProvider theme={theme}>
                <RecipeDetailListField
                    user={{username:'steven anita tester'}}
                recipe={recipeFixtures()[2]}
                isFieldInEditAndFocus={spyIsFieldInEditAndFocus}
                isFieldInEditMode={spyIsFieldInEditMode}
                editField={spyEditField}
                unfocusField={spyUnfocusField}
                unfocusFieldOnEnter={spyUnfocusFieldOnEnter}
                setRecipeField={spySetRecipeField}
                moveListItemUp={spyMoveListItemUp}
                moveListItemDown={spyMoveListItemDown}
                addListItem={spyAddListItem}
                removeListItem={spyRemoveListItem}
                listType='unordered'
                addListItemLabel="Add Test ingredient"
                fieldName="ingredients"
                label="Ingredients: Test"
                required={true}
                requiredErrorText="Test Ingredient required error"
            />
            </ThemeProvider>);
        });
        it('should render with no list items', () => {
            const pageSpans = wrapper.find('span');
            const ingredientSpan = pageSpans.filterWhere((span) => {
                return span.text().trim() === 'Ingredients: Test'
            });
            // should render correct label text
            expect(ingredientSpan).toHaveLength(1);
            // should render list element
            expect(wrapper.exists('ul')).toEqual(true);
            // should not render list items
            expect(wrapper.exists('li')).toEqual(false);
            expect(wrapper.exists('input')).toEqual(false);
            expect(wrapper.find('button.btn-add-list-item')).toHaveLength(1);
        });
        it('should add a list item when button is clicked', () => {
            spyAddListItem.mockClear();
            wrapper.find('button.btn-add-list-item').simulate('mouseDown');
            expect(spyAddListItem).toHaveBeenCalledWith('ingredients');
        })
    });
    describe('behavior when a recipe has a single-item list', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = mount(<ThemeProvider theme={theme}>
                <RecipeDetailListField
                user={{username:'steven anita tester'}}
                recipe={recipeFixtures()[3]}
                isFieldInEditAndFocus={spyIsFieldInEditAndFocus}
                isFieldInEditMode={spyIsFieldInEditMode}
                editField={spyEditField}
                unfocusField={spyUnfocusField}
                unfocusFieldOnEnter={spyUnfocusFieldOnEnter}
                setRecipeField={spySetRecipeField}
                moveListItemUp={spyMoveListItemUp}
                moveListItemDown={spyMoveListItemDown}
                addListItem={spyAddListItem}
                removeListItem={spyRemoveListItem}
                listType='unordered'
                addListItemLabel="Add Test ingredient"
                fieldName="ingredients"
                label="Ingredients: Test"
                required={true}
                requiredErrorText="Test Ingredient required error"
            />
            </ThemeProvider>);
        });
        it('should render with list items', () => {
            const pageSpans = wrapper.find('span');
            const ingredientSpan = pageSpans.filterWhere((span) => {
                return span.text().trim() === 'Ingredients: Test'
            });
            // should render correct label text
            expect(ingredientSpan).toHaveLength(1);
            // should render unordered list element
            expect(wrapper.exists('ul')).toEqual(true);
            // should render list items that are not inputs and list buttons
            expect(wrapper.find('li')).toHaveLength(recipeFixtures()[3].ingredients.length);
            expect(wrapper.find('button.btn-move-item-up')).toHaveLength(recipeFixtures()[3].ingredients.length - 1);
            expect(wrapper.find('button.btn-move-item-down')).toHaveLength(recipeFixtures()[3].ingredients.length - 1);
            expect(wrapper.find('button.btn-remove-item')).toHaveLength(0);
            expect(wrapper.exists('input')).toEqual(false);
            expect(wrapper.find('button.btn-add-list-item')).toHaveLength(1);
            expect(wrapper.exists('div.alert')).toEqual(false);
        })
    });
    describe('behavior when a recipe has a multi-item list', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = mount(<ThemeProvider theme={theme}>
                <RecipeDetailListField
                recipe={recipeFixtures()[0]}
                isFieldInEditAndFocus={spyIsFieldInEditAndFocus}
                isFieldInEditMode={spyIsFieldInEditMode}
                editField={spyEditField}
                unfocusField={spyUnfocusField}
                unfocusFieldOnEnter={spyUnfocusFieldOnEnter}
                setRecipeField={spySetRecipeField}
                moveListItemUp={spyMoveListItemUp}
                moveListItemDown={spyMoveListItemDown}
                addListItem={spyAddListItem}
                removeListItem={spyRemoveListItem}
                type='textarea'
                rows='3'
                listType='ordered'
                addListItemLabel="Add Test instruction"
                fieldName="instructions"
                label="Instructions: Test"
                required={true}
                requiredErrorText="Test Instructions required error"
            />
            </ThemeProvider>);
        });
        it('should render with list items', () => {
            const pageSpans = wrapper.find('span');
            const instructionSpan = pageSpans.filterWhere((span) => {
                return span.text().trim() === 'Instructions: Test'
            });
            // should render correct label text
            expect(instructionSpan).toHaveLength(1);
            // should render ordered list element
            expect(wrapper.exists('ol')).toEqual(true);
            // should render list items that are not inputs and list buttons
            expect(wrapper.find('li')).toHaveLength(recipeFixtures()[0].instructions.length);
            expect(wrapper.find('button.btn-move-item-up')).toHaveLength(recipeFixtures()[0].instructions.length - 1);
            expect(wrapper.find('button.btn-move-item-down')).toHaveLength(recipeFixtures()[0].instructions.length - 1);
            expect(wrapper.find('button.btn-remove-item')).toHaveLength(recipeFixtures()[0].instructions.length);
            expect(wrapper.exists('input')).toEqual(false);
            expect(wrapper.find('button.btn-add-list-item')).toHaveLength(1);
            expect(wrapper.exists('div.alert')).toEqual(false);
        });
        describe('behavior when in edit mode', () => {
            function findTestField(input) {
                return input.prop('id') === `instructions-1` &&
                    input.prop('autoFocus') === true &&
                    input.prop('value') === recipeFixtures()[0].instructions[1] &&
                    input.prop('type') === 'textarea' &&
                    input.prop('placeholder') === 'instructions' &&
                    input.prop('name') === 'instructions' &&
                    input.prop('required') === true;
            }
            function narrowSpy(fieldName, index) {
                if(index === 1) {
                    return true;
                }
                return false
            }
            beforeEach(() => {
                spyIsFieldInEditMode.mockImplementation(narrowSpy);
                spyIsFieldInEditAndFocus.mockImplementation(narrowSpy);
                wrapper = mount(<ThemeProvider theme={theme}>
                    <RecipeDetailListField
                    recipe={recipeFixtures()[0]}
                    isFieldInEditAndFocus={spyIsFieldInEditAndFocus}
                    isFieldInEditMode={spyIsFieldInEditMode}
                    editField={spyEditField}
                    unfocusField={spyUnfocusField}
                    unfocusFieldOnEnter={spyUnfocusFieldOnEnter}
                    setRecipeField={spySetRecipeField}
                    moveListItemUp={spyMoveListItemUp}
                    moveListItemDown={spyMoveListItemDown}
                    addListItem={spyAddListItem}
                    removeListItem={spyRemoveListItem}
                    type='textarea'
                    rows='3'
                    listType='ordered'
                    addListItemLabel="Add Test instruction"
                    fieldName="instructions"
                    label="Instructions: Test"
                    required={true}
                    requiredErrorText="Test Instructions required error"
                />
                </ThemeProvider>);
            });
            it('should render an input field when in edit mode', () => {
                // should call spy functions
                for (let i = 0; i < recipeFixtures()[0].instructions.length; i++) {
                    expect(spyIsFieldInEditMode).toHaveBeenCalledWith('instructions', i);
                    expect(spyIsFieldInEditAndFocus).toHaveBeenCalledWith('instructions', i);
                }
                const pageText = wrapper.find('textarea');
                const notesText = pageText.filterWhere(findTestField);
                // should render correct textarea element
                expect(pageText).toHaveLength(1);
                expect(notesText).toHaveLength(1);
            })
        })
    })
});
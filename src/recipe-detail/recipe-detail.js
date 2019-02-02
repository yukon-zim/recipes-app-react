/* eslint no-restricted-globals: 0 */
import React, { Component } from 'react';
import Moment from 'moment';
import { Prompt } from 'react-router-dom';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import RecipePropType from './RecipePropType';
import RecipeDetailField from './recipe-detail-field';
import RecipeDetailListField from './recipe-detail-list-field';
import * as Styled from '../style/UserForm';

const RecipeId = styled.div`
  font-size: 0.75rem;
  margin-left: 2px;
  color: ${props => props.theme.oldSchoolOptions.lightPurple};
  ${props => !props.theme.oldSchool && css`
      {color: ${props => props.theme.newSchoolOptions.gray}}
  `}
`;

export default function recipeDetail (FormButtons) {
    return class RecipeDetail extends Component {
        constructor(props) {
            super(props);
            this.state = {
                recipe: this.createEmptyRecipe(),
                recipeId: undefined,
                fieldInEditMode: {
                    fieldName: '',
                    fieldIndex: undefined
                },
                formError: '',
                formIsDirty: false,
                formIsValid: false,
                errorRecipeMode: false
            };
            // for unit testing
            this.setFormRef = this.setFormRef.bind(this);
        }

        createEmptyRecipe() {
            return {
                name: '',
                ingredients: [],
                instructions: []
            }
        }

        setRecipeField = (fieldName, fieldValue, index) => {
            const recipe = this.state.recipe;
            if (index === null || index === undefined) {
                recipe[fieldName] = fieldValue;
            } else {
                recipe[fieldName][index] = fieldValue;
            }
            this.setState({
                recipe,
                formIsDirty: true,
                formIsValid: this.isFormValid()
            });
        };

        editField = (fieldName, index) => {
            if (this.props.user) {
                this.setState({
                    fieldInEditMode: {
                        fieldName,
                        fieldIndex: index
                    },
                });
            }
        };

        isFieldInEditMode = (fieldName, index) => {
            // can't edit recipe if not logged in
            if (!this.props.user) {
                return false;
            }
            // this forces input fields to show even if blank,
            // so users have a visual cue that they can add a value
            if (this.state.recipe[fieldName] === '' ||
                this.state.recipe[fieldName] === null ||
                this.state.recipe[fieldName] === undefined) {
                return true;
            }
            // blank list item fields should also show as blank
            if (index !== null && index !== undefined && this.state.recipe[fieldName][index] === '') {
                return true;
            }
            return this.isFieldInEditAndFocus(fieldName, index);
        };

        isFieldInEditAndFocus = (fieldName, index) => {
            return this.state.fieldInEditMode.fieldName === fieldName && this.state.fieldInEditMode.fieldIndex === index;
        };

        unfocusField = () => {
            this.setState({
                fieldInEditMode: {
                    fieldName: '',
                    fieldIndex: undefined
                },
            });
        };

        unfocusFieldOnEnter = (event) => {
            if (event.key === 'Enter') {
                this.unfocusField()
            }
        };

        addListItem = (fieldName) => {
            const recipe = this.state.recipe;
            recipe[fieldName].push('');
            this.editField(`${fieldName}`, recipe[fieldName].length - 1);
            this.setState({
                recipe,
                formIsDirty: true,
                formIsValid: this.isFormValid()
            });
        };

        moveListItemUp = (itemIndex, fieldName) => {
            const recipe = this.state.recipe;
            const [itemToMove] = recipe[fieldName].splice(itemIndex, 1);
            recipe[fieldName].splice(itemIndex - 1, 0, itemToMove);
            this.setState({
                recipe,
                formIsDirty: true
            });
        };

        moveListItemDown = (itemIndex, fieldName) => {
            const recipe = this.state.recipe;
            const [itemToMove] = recipe[fieldName].splice(itemIndex, 1);
            recipe[fieldName].splice(itemIndex + 1, 0, itemToMove);
            this.setState({
                recipe,
                formIsDirty: true
            });
        };

        deleteListItem = (index, fieldName) => {
            const recipe = this.state.recipe;
            recipe[fieldName].splice(index, 1);
            this.setState({
                recipe,
                formIsDirty: true,
                formIsValid: this.isFormValid()
            });
        };

        isFormValid = () => {
            return (this.recipeForm
                && this.recipeForm.checkValidity()
                && this.state.recipe
                && this.state.recipe.instructions.length >= 1
                && this.state.recipe.ingredients.length >= 1
            );
        };

        loadRecipeIdFromProps(props) {
            if (props.newRecipeMode) {
                this.setState({
                    recipe: this.createEmptyRecipe(),
                    fieldInEditMode: {
                        fieldName: 'name',
                        fieldIndex: undefined
                    }
                });
            } else {
                const recipe = this.props.recipe;
                this.setState({
                    recipe,
                    recipeId: recipe.id,
                    formIsValid: this.isFormValid()
                });
            }
        }

        handleSubmit(event) {
            event.preventDefault();
        }

        resetForm = () => {
            this.recipeForm.reset();
            this.setState({
                formIsDirty: false,
                formIsValid: this.isFormValid()
            })
        };

        setFormRef(form) {
            this.recipeForm = form;
        };

        async componentDidMount() {
            this.loadRecipeIdFromProps(this.props);
            window.scrollTo(0, 0)
        }

        render() {
            const { user } = this.props;
            const {
                recipe,
                formIsDirty,
                formIsValid,
                formError,
                errorRecipeMode
            } = this.state;
            const commonProps = {
                recipe,
                isFieldInEditAndFocus: this.isFieldInEditAndFocus,
                isFieldInEditMode: this.isFieldInEditMode,
                editField: this.editField,
                unfocusField: this.unfocusField,
                unfocusFieldOnEnter: this.unfocusFieldOnEnter,
                setRecipeField: this.setRecipeField
            };
            const commonListProps = {
                moveListItemUp: this.moveListItemUp,
                moveListItemDown: this.moveListItemDown,
                addListItem: this.addListItem,
                removeListItem: this.deleteListItem
            };
            const dateCreatedText = Moment(recipe.dateCreated).format("M/DD/YYYY");
            const dateModifiedText = Moment(recipe.dateModified).format("M/DD/YYYY");
            return (
                <div>
                    <div className="container-fluid">
                        <Styled.Form ref={this.setFormRef}
                              onSubmit={this.handleSubmit}>
                            <Prompt
                                when={formIsDirty}
                                message="Unsaved changes - are you sure you want to leave this page?"
                            />
                            <div className="spacer"></div>
                            <Styled.HeaderLabel className="header-label">
                                <h3>{recipe.name}</h3>

                                <RecipeId className="recipe-id">
                                    <span>ID: </span>
                                    {recipe.id}
                                </RecipeId>
                            </Styled.HeaderLabel>
                            <fieldset>
                                <div>
                                    <span className="error-message">{formError}</span>
                                </div>
                                {!errorRecipeMode && (
                                    <div>
                                        <RecipeDetailField
                                            {...commonProps}
                                            type='text'
                                            fieldName="name"
                                            label="Name:"
                                            required={true}
                                            requiredErrorText="Name is required."
                                        />
                                        <RecipeDetailField
                                            {...commonProps}
                                            type='text'
                                            fieldName="category"
                                            label="Category:"
                                            required={false}
                                        />
                                        <RecipeDetailField
                                            {...commonProps}
                                            type='text'
                                            fieldName="numberOfServings"
                                            label="Number of Servings:"
                                            required={false}
                                        />
                                        <RecipeDetailListField
                                            {...commonProps}
                                            {...commonListProps}
                                            user={user}
                                            type='text'
                                            listType='unordered'
                                            addListItemLabel="Add ingredient"
                                            fieldName="ingredients"
                                            label="Ingredients:"
                                            required={true}
                                            requiredErrorText="Ingredient name is required."
                                        />
                                        <RecipeDetailListField
                                            {...commonProps}
                                            {...commonListProps}
                                            user={user}
                                            type='textarea'
                                            listType='ordered'
                                            addListItemLabel="Add instruction"
                                            fieldName="instructions"
                                            label="Instructions:"
                                            required={true}
                                            requiredErrorText="Instruction text is required."
                                        />
                                        <div>
                                            <label>Date Created:&nbsp;
                                                <span>{dateCreatedText}</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label>Date Modified:&nbsp;
                                                <span>{dateModifiedText}</span>
                                            </label>
                                        </div>
                                        <RecipeDetailField
                                            {...commonProps}
                                            type='textarea'
                                            rows='3'
                                            fieldName="notes"
                                            label="Notes: "
                                            required={false}
                                        />
                                        <FormButtons
                                            recipe={recipe}
                                            user={user}
                                            formIsDirty={formIsDirty}
                                            formIsValid={formIsValid}
                                            resetForm={this.resetForm}
                                        >
                                        </FormButtons>
                                    </div>
                                )}
                            </fieldset>
                        </Styled.Form>
                    </div>
                </div>
            )
        }
    }
}

recipeDetail.propTypes = {
    recipe: RecipePropType.isRequired,
    newRecipeMode: PropTypes.bool.isRequired,
    formIsDirty: PropTypes.bool.isRequired,
    formIsValid: PropTypes.bool.isRequired,
    resetForm: PropTypes.func.isRequired,
    user: PropTypes.object
};

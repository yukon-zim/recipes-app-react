/* eslint no-restricted-globals: 0 */
import React, {Component} from 'react';
import Moment from 'moment';
import {Prompt} from 'react-router-dom';
import styled, { css } from 'styled-components'
import RecipeDetailField from './recipe-detail-field';
import RecipeDetailListField from './recipe-detail-list-field';
import Form from '../style/UserFormStyle';
import HeaderLabel from '../style/UserFormHeaderLabel';

const RecipeDetailContext = React.createContext();

const RecipeId = styled.div`
  font-size: 0.75rem;
  margin-left: 2px;
  color: ${props => props.theme.oldSchoolOptions.lightPurple};
  ${props => !props.theme.oldSchool && css`
      {color: ${props => props.theme.newSchoolOptions.gray}}
  `}
`;

export default class RecipeDetail extends Component {
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
            errorRecipeMode: false
        };
    }

    createEmptyRecipe() {
        return {
            name: '',
            ingredients: [],
            instructions:[]
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
            formIsDirty: true
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
        if (!this.props.user) {
            return false;
        }
        if (this.props.newRecipeMode) {
            return true;
        }
        if (this.state.recipe[fieldName] === '') {
            return true;
        }
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
            formIsDirty: true
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
            formIsDirty: true
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
                recipeId: recipe.id
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    resetForm = () => {
        this.recipeForm.reset();
        this.setState({
            formIsDirty: false
        })
    };

    async componentDidMount() {
        this.loadRecipeIdFromProps(this.props);
        window.scrollTo(0, 0)
    }

    render() {
        const recipe = this.state.recipe;
        console.log("state recipe:");
        console.log(recipe);
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
        const formIsValid = this.isFormValid();
        return (
            <div>
                <div className="container-fluid">
                    <Form ref={form => this.recipeForm = form}
                          onSubmit={this.handleSubmit}>
                        <Prompt
                            when={this.state.formIsDirty}
                            message="Unsaved changes - are you sure you want to leave this page?"
                        />
                        <div className="spacer"></div>
                        <HeaderLabel className="header-label">
                            <h3>{recipe.name}</h3>

                            <RecipeId className="recipe-id">
                                <span>ID: </span>
                                {recipe.id}
                            </RecipeId>
                        </HeaderLabel>
                        <fieldset>
                            <div>
                                <span className="error-message">{this.state.formError}</span>
                            </div>
                            {!this.state.errorRecipeMode && (
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
                                        fieldName="notes"
                                        label="Notes: "
                                        required={false}
                                    />
                                    <RecipeDetailContext.Provider
                                        value={{
                                            recipe: this.state.recipe,
                                            formIsDirty: this.state.formIsDirty,
                                            formIsValid: formIsValid,
                                            resetForm: this.resetForm
                                        }}>
                                        {this.props.children}
                                    </RecipeDetailContext.Provider>
                                </div>
                            )}
                        </fieldset>
                    </Form>
                </div>
            </div>
        )
    }
}

export { RecipeDetailContext };
import React, {Component} from 'react';
import RecipeDetailField from './recipe-detail-field';
import RecipeDetailListField from './recipe-detail-list-field';
import Moment from 'moment';


export default class RecipeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: {
                name: ''
            },
            fieldInEditMode: {
                fieldName: '',
                fieldIndex: ''
            },
            newRecipeMode: false,
            formIsDirty: false
        };
    }

    async getRecipe(recipeId) {
        const response = await fetch(`http://localhost:1337/recipes/${recipeId}`);
        const jsonData = await response.json();
        return jsonData;
    }

    async updateRecipe() {
        if (this.recipeForm.checkValidity()) {
            const urlId = this.state.recipeId;
            try {
                const updatedRecipe = await this.updateRecipeRequest(urlId, this.state.recipe);
                this.recipeForm.reset();
                this.setState({
                    recipe: updatedRecipe,
                    formError: '',
                    formIsDirty: false
                })
            } catch (err) {
                this.setState({
                    formError: err.message
                })
            }
        } else {
            this.setState({
                formError: 'Recipe not saved - check errors on form'
            })
        }
    }

    async updateRecipeRequest(recipeId, updatedRecipe) {
        const response = await fetch(`http://localhost:1337/recipes/${recipeId}`, {
            method: 'PUT',
            body:  JSON.stringify(updatedRecipe)
        });
        const jsonData = await response.json();
        if (response.ok) {
            return jsonData;
        }
        throw new Error(jsonData.message)
    }

    deleteRecipe() {

    }

    setRecipeField(fieldName, fieldValue, index) {
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
    }

    editField(fieldName, index) {
        this.setState({
            fieldInEditMode: {
                fieldName,
                fieldIndex: index
            },
        });
    }

    isFieldInEditMode(fieldName, index) {
        if (this.state.newRecipeMode) {
            return true;
        }
        if (this.state.recipe[fieldName] === '') {
            return true;
        }
        if (index !== null && index !== undefined && this.state.recipe[fieldName][index] === '') {
            return true;
        }
        return this.state.fieldInEditMode.fieldName === fieldName && this.state.fieldInEditMode.fieldIndex === index;
    }

    unfocusField() {
        this.setState({
            fieldInEditMode: {
                fieldName: '',
                fieldIndex: ''
            },
        });
    }

    unfocusFieldOnEnter(event) {
        if (event.key === 'Enter') {
            this.unfocusField()
        }
    }

    addListItem(fieldName) {
        const recipe = this.state.recipe;
        recipe[fieldName].push('');
        this.editField(`${fieldName}`, recipe[fieldName].length - 1);
        this.setState({
            recipe,
            formIsDirty: true
        });
    }

    moveListItemUp(itemIndex, fieldName) {
        const recipe = this.state.recipe;
        const [itemToMove] = recipe[fieldName].splice(itemIndex, 1);
        recipe[fieldName].splice(itemIndex - 1, 0, itemToMove);
        this.setState({
            recipe,
            formIsDirty: true
        });
    }

    moveListItemDown(itemIndex, fieldName) {
        const recipe = this.state.recipe;
        const [itemToMove] = recipe[fieldName].splice(itemIndex, 1);
        recipe[fieldName].splice(itemIndex + 1, 0, itemToMove);
        this.setState({
            recipe,
            formIsDirty: true
        });
    }

    deleteListItem(index, fieldName) {
        const recipe = this.state.recipe;
        recipe[fieldName].splice(index, 1);
        this.setState({
            recipe,
            formIsDirty: true
        });
    }


    handleSubmit(event) {
        event.preventDefault();
    }

    async componentDidMount() {
        const recipeId = this.props.match.params.id;
        const recipe = await this.getRecipe(recipeId);
        this.setState({
            recipe,
            recipeId
        })
    }

    render() {
        const newRecipeMode = false; //temp measure
        const recipe = this.state.recipe;
        const commonProps = {
            recipe,
            isFieldInEditMode: this.isFieldInEditMode.bind(this),
            editField: this.editField.bind(this),
            unfocusField: this.unfocusField.bind(this),
            unfocusFieldOnEnter: this.unfocusFieldOnEnter.bind(this),
            setRecipeField: this.setRecipeField.bind(this)

        };
        const commonListProps = {
            moveListItemUp: this.moveListItemUp.bind(this),
            moveListItemDown: this.moveListItemDown.bind(this),
            addListItem: this.addListItem.bind(this),
            removeListItem: this.deleteListItem.bind(this),
        };
        const dateCreatedText = Moment(recipe.dateCreated).format("M/d/YYYY");
        const dateModifiedText = Moment(recipe.dateModified).format("M/d/YYYY");
        const formIsValid = this.recipeForm ? this.recipeForm.checkValidity() : false;
        return (
            <div>
                <div className="container-fluid">

                    <h2>{recipe.name.toUpperCase()}</h2>

                    <h4> The Deets</h4>
                    <form ref={form => this.recipeForm = form}
                          onSubmit={this.handleSubmit}>
                        <div>
                            <span>ID: </span>
                            {recipe.id}
                        </div>
                        <div>
                            <span className="error-message">{this.state.formError}</span>
                        </div>
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
                            type='text'
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
                        {!newRecipeMode && (
                            <div>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => this.updateRecipe()}
                                    disabled={!this.state.formIsDirty || !formIsValid}>Update recipe</button>
                                <button
                                    className="btn btn-warning"
                                    onClick={() => this.deleteRecipe()}>Delete recipe</button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        )
    }
}
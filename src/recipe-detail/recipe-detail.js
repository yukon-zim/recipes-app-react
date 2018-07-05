import React, {Component} from 'react';
import RecipeDetailField from './recipe-detail-field';
import RecipeDetailListField from './recipe-detail-list-field';


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
            newRecipeMode: false
        }
    }
    async getRecipe(recipeId) {
        const response = await fetch(`http://localhost:1337/recipes/${recipeId}`);
        const jsonData = await response.json();
        return jsonData;
    }

    async componentDidMount() {
        const recipeId = this.props.match.params.id;
        const recipe = await this.getRecipe(recipeId);
        this.setState({
            recipe
        })
    }
    setRecipeField(fieldName, fieldValue, index) {
        const recipe = this.state.recipe;
        if (!index) {
        recipe[fieldName] = fieldValue;
        } else {
        recipe[fieldName][index] = fieldValue;
        }
        this.setState({
            recipe
        })
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
            recipe
        });
    }
    moveListItemUp(itemIndex, fieldName) {
        const recipe = this.state.recipe;
        const [itemToMove] = recipe[fieldName].splice(itemIndex, 1);
        recipe[fieldName].splice(itemIndex - 1, 0, itemToMove);
        // this.recipeForm.form.markAsDirty();
        this.setState({
            recipe
        });
    }

    moveListItemDown(itemIndex, fieldName) {
        const recipe = this.state.recipe;
        const [itemToMove] = recipe[fieldName].splice(itemIndex, 1);
        recipe[fieldName].splice(itemIndex + 1, 0, itemToMove);
        // this.recipeForm.form.markAsDirty();
        this.setState({
            recipe
        });
    }
    deleteListItem(index, fieldName) {
        const recipe = this.state.recipe;
        recipe[fieldName].splice(index, 1);
        // this.recipeForm.form.markAsDirty();
        this.setState({
            recipe
        });
    }
    handleSubmit(event) {
        event.preventDefault();
    }
    render() {
        const recipe = this.state.recipe;
        return (
            <div>
                <div className="container-fluid">

                    <h2>{recipe.name.toUpperCase()}</h2>

                    <h4> The Deets</h4>
                    <form ref={form => this.recipeForm = form}
                          onSubmit={this.handleSubmit}>
                        <div><span>ID </span>{recipe.id}</div>
                        <RecipeDetailField
                        recipe={recipe}
                        type='text'
                        isFieldInEditMode={this.isFieldInEditMode.bind(this)}
                        editField={this.editField.bind(this)}
                        unfocusField={this.unfocusField.bind(this)}
                        unfocusFieldOnEnter={this.unfocusFieldOnEnter.bind(this)}
                        setRecipeField={this.setRecipeField.bind(this)}
                        fieldName="name"
                        label="Name: "
                        required={true}
                        requiredErrorText="Name is required."
                        />
                        <RecipeDetailField
                            recipe={recipe}
                            type='text'
                            isFieldInEditMode={this.isFieldInEditMode.bind(this)}
                            editField={this.editField.bind(this)}
                            unfocusField={this.unfocusField.bind(this)}
                            unfocusFieldOnEnter={this.unfocusFieldOnEnter.bind(this)}
                            setRecipeField={this.setRecipeField.bind(this)}
                            fieldName="category"
                            label="Category: "
                            required={false}
                        />
                        <RecipeDetailField
                            recipe={recipe}
                            type='text'
                            isFieldInEditMode={this.isFieldInEditMode.bind(this)}
                            editField={this.editField.bind(this)}
                            unfocusField={this.unfocusField.bind(this)}
                            unfocusFieldOnEnter={this.unfocusFieldOnEnter.bind(this)}
                            setRecipeField={this.setRecipeField.bind(this)}
                            fieldName="numberOfServings"
                            label="Number of Servings: "
                            required={false}
                        />
                        <RecipeDetailListField
                            recipe={recipe}
                            type='text'
                            listType='unordered'
                            isFieldInEditMode={this.isFieldInEditMode.bind(this)}
                            editField={this.editField.bind(this)}
                            unfocusField={this.unfocusField.bind(this)}
                            unfocusFieldOnEnter={this.unfocusFieldOnEnter.bind(this)}
                            setRecipeField={this.setRecipeField.bind(this)}
                            moveListItemUp={this.moveListItemUp.bind(this)}
                            moveListItemDown={this.moveListItemDown.bind(this)}
                            addListItem={this.addListItem.bind(this)}
                            removeListItem={this.deleteListItem.bind(this)}
                            addListItemLabel="Add ingredient"
                            fieldName="ingredients"
                            label="Ingredients: "
                            required={true}
                        />
                        <RecipeDetailListField
                            recipe={recipe}
                            type='text'
                            listType='ordered'
                            isFieldInEditMode={this.isFieldInEditMode.bind(this)}
                            editField={this.editField.bind(this)}
                            unfocusField={this.unfocusField.bind(this)}
                            unfocusFieldOnEnter={this.unfocusFieldOnEnter.bind(this)}
                            setRecipeField={this.setRecipeField.bind(this)}
                            moveListItemUp={this.moveListItemUp.bind(this)}
                            moveListItemDown={this.moveListItemDown.bind(this)}
                            addListItem={this.addListItem.bind(this)}
                            removeListItem={this.deleteListItem.bind(this)}
                            addListItemLabel="Add instruction"
                            fieldName="instructions"
                            label="Instructions: "
                            required={true}
                        />
                        <RecipeDetailField
                            recipe={recipe}
                            type='textarea'
                            isFieldInEditMode={this.isFieldInEditMode.bind(this)}
                            editField={this.editField.bind(this)}
                            unfocusField={this.unfocusField.bind(this)}
                            unfocusFieldOnEnter={this.unfocusFieldOnEnter.bind(this)}
                            setRecipeField={this.setRecipeField.bind(this)}
                            fieldName="notes"
                            label="Notes: "
                            required={false}
                        />
                    </form>
                </div>
            </div>
        )
    }
}
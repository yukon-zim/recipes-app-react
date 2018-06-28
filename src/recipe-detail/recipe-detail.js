import React, {Component} from 'react';


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
    setRecipeField(fieldName, fieldValue) {
        const recipe = this.state.recipe;
        recipe[fieldName] = fieldValue;
        this.setState({
            recipe,
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
                        <div>
                            <label>Name:</label>
                            {!this.isFieldInEditMode('name') && (
                                <span onClick={() => {
                                    this.editField('name')
                                }}>{recipe.name}</span>
                            )}
                            <input id="name"
                                   value={recipe.name}
                                   onChange={event => {
                                       this.setRecipeField('name', event.target.value)
                                   }}
                                   hidden={!this.isFieldInEditMode('name')}
                                   onBlur={() => this.unfocusField()}
                                   onKeyUp={(event) => this.unfocusFieldOnEnter(event)}
                                   onFocus={() => this.editField('name')}
                                   type="text"
                                   placeholder="name"
                                   name="name"
                                   required
                            />
                            {this.isFieldInEditMode('name') && (recipe.name.invalid && (recipe.name.dirty || recipe.name.touched)) && (
                                <div>
                                    <div className="alert alert-danger">
                                        {recipe.name.errors.required && (
                                            <div>
                                                Name is required.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
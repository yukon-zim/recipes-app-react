import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {orderBy} from 'lodash';


export default class RecipeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSortByField: null,
            currentSortByOrder: null,
            searchInProgress: false,
            urlInputValid: false,
            recipes: []
        };
        this.recipeUrl = 'http://localhost:1337/recipes';
    }

    async getRecipes() {
        const response = await fetch('http://localhost:1337/recipes');
        const jsonData = await response.json();
        return jsonData;
    }

    sortByColumnHeader(field) {
        let recipes = this.state.recipes;
        let currentSortByOrder = this.state.currentSortByOrder;
        if (field === this.state.currentSortByField) {
            if (this.state.currentSortByOrder === 'asc') {
                currentSortByOrder = 'desc';
            } else {
                currentSortByOrder = 'asc';
            }
            recipes = orderBy(recipes, field, currentSortByOrder);
        } else {
            currentSortByOrder = 'asc';
            recipes = orderBy(recipes, field, currentSortByOrder);
        }
        this.setState({
            recipes: recipes,
            currentSortByField: field,
            currentSortByOrder: currentSortByOrder,
        });
    }

    async searchRecipes(searchTerm) {
        if (!searchTerm.trim()) {
            this.setState({
                recipes: this.state.fullRecipeList,
                searchInProgress: false
            });
            return;
        }
        this.setState({
            searchInProgress: true
        });
        const response = await fetch(`${this.recipeUrl}?searchTerm=${searchTerm}`);
        const jsonData = await response.json();
        this.setState({
            recipes: jsonData
        });
    }

    onSelectFile() {
        this.setState({
            csvImportEnabled: true
        })
    }

    async importRecipe(fileData) {
        const formData = new FormData();
        formData.append('importedRecipes', fileData[0]);
        try {
            await this.importRecipeRequest(formData);
            const recipes = await this.getRecipes();
            this.cancelCsvImport();
            this.setState({
                recipes
            });
        } catch (err) {
            this.setState({
                importError: err.message
            });
        }
    }

    async importRecipeRequest(newRecipeFormData) {
        const response = await fetch(`http://localhost:1337/recipes/import`, {
            method: 'POST',
            body: newRecipeFormData
        });
        const jsonData = await response.json();
        if (response.ok) {
            return jsonData;
        }
        throw new Error(jsonData.message)
    }

    cancelCsvImport() {
        this.csvFileInput.value = null;
        this.setState({
            csvImportEnabled: false,
            importError: ''
        })
    }

    onAddUrl() {
        console.log(this.urlToImportInput);
        // if (!this.urlToImportInput === undefined && this.urlToImportInput.validity.valid) {
            this.setState({
                urlInputValid: true
            })
        // }
    }

    async importRecipeByUrl(url) {
        try {
            await this.importUrlRecipeRequest(url);
            const recipes = await this.getRecipes();
            this.cancelUrlImport();
            this.setState({
                recipes
            });
        } catch (err) {
            this.setState({
                importError: err.message
            });
        }
    }

    async importUrlRecipeRequest(url) {
        const response = await fetch(`http://localhost:1337/recipes/import-url`, {
            method: 'POST',
            body: JSON.stringify({url})
        });
        const jsonData = await response.json();
        if (response.ok) {
            return jsonData;
        }
        throw new Error(jsonData.message)
    }

    cancelUrlImport() {
        this.urlToImportInput.value = null;
        this.setState({
            urlInputValid: false,
            importError: ''
        })
    }

    async componentDidMount() {
        const recipes = await this.getRecipes();
        this.setState({
            fullRecipeList: recipes,
            recipes,
            searchInProgress: false
        });
    }

    render() {
        const noRecipesFound = this.state.searchInProgress && this.state.recipes !== undefined && this.state.recipes.length === 0;
        const noRecipesOnUser = !this.state.searchInProgress && this.state.recipes !== undefined && this.state.recipes.length === 0;
        const recipes = this.state.recipes;
        const searchInProgress = this.state.searchInProgress;
        const isImportUrlInvalid = this.urlToImportInput === undefined || !this.urlToImportInput.validity.valid;
        const blankUrl = '#';
        return (
            <div className="container-fluid">
                <div className="mb-4">
                    <input id="search-recipes-field" size="40"
                           onKeyUp={(event) => {
                               this.searchRecipes(event.target.value)
                           }}
                           placeholder="Search recipes"/>
                </div>
                {!searchInProgress && (
                    <h2>My {recipes.length} Recipes</h2>
                )}
                {searchInProgress && (
                    <h2>Search results: {recipes.length} recipe(s)</h2>
                )}
                <div>
                    <table className="recipes table">
                        <thead>
                        <tr className="row">
                            <th className="col-7 ml-2">
                                <a href={blankUrl} onClick={(event) => {
                                    this.sortByColumnHeader('name')
                                }}>Name</a>
                            </th>
                            <th className="col-2">
                                <a href={blankUrl} onClick={(event) => {
                                    this.sortByColumnHeader('category')
                                }}>Category</a>
                            </th>
                            <th className="col-2">
                                <a href={blankUrl} onClick={(event) => {
                                    this.sortByColumnHeader('numberOfServings')
                                }}>Servings</a>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.recipes.map(recipe => {
                                return (
                                    <tr className="row" key={recipe.id}>
                                        <td className="col-7 ml-2">
                                            <Link to={`/detail/${recipe.id}`}>
                                                <span>{recipe.name.toUpperCase()}</span>
                                            </Link>
                                        </td>
                                        <td className="col-2">
                                            <Link to={`/detail/${recipe.id}`}>
                                                <span>{recipe.category}</span>
                                            </Link>
                                        </td>
                                        <td className="col-2">
                                            <Link to={`/detail/${recipe.id}`}>
                                                <span>{recipe.numberOfServings}</span>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            }
                        )}
                        {noRecipesFound && (
                            <tr>
                                <td>
                                    <span>No recipes found</span>
                                </td>
                            </tr>
                        )}
                        {noRecipesOnUser && (
                            <tr>
                                <td>
                                    <span>Why not add/import some recipes?</span>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="mb-4">
                    <Link className="btn btn-primary" id="add-new-recipe" to="/detail/new">Add new recipe!</Link>
                </div>
                <div>
                    <div>
                        <label htmlFor="csv-file-upload">Import recipes by CSV:</label>
                    </div>
                    <div>
                        <input id="csv-file-upload" type="file" ref={csv => this.csvFileInput = csv}
                               onChange={() => this.onSelectFile()}/>
                    </div>
                    {this.state.csvImportEnabled && (
                        <div>
                            <button className="btn btn-secondary btn-sm"
                                    onClick={() => this.importRecipe(this.csvFileInput.files)}>Import recipe CSV
                            </button>
                            <button className="btn btn-secondary btn-sm" onClick={() => this.cancelCsvImport()}>Cancel
                                import
                            </button>
                        </div>
                    )}
                    <div>
                        <form>
                            <div>
                                <label htmlFor="url-file-upload">Import recipes by URL:</label>
                            </div>
                            <div>
                                <input id="url-file-upload" type="url" required
                                       ref={textInput => this.urlToImportInput = textInput}
                                       onChange={() => this.onAddUrl()}/>
                            </div>
                            <div>
                                <button className="btn btn-secondary btn-sm"
                                        disabled={!this.state.urlInputValid}
                                        onClick={() => this.importRecipeByUrl(this.urlToImportInput.value)}>Import web recipe
                                </button>

                            </div>
                        </form>
                    </div>
                    <div>
                <span className="error-message">

                </span>
                    </div>
                </div>
            </div>
        )
    }
}

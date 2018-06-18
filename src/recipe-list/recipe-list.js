import React, {Component} from 'react';
import {Link} from 'react-router-dom';


export default class RecipeList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            searchInProgress: false,
            recipes: []
        }
    }
    async getRecipes() {
        const response = await fetch('http://localhost:1337/recipes');
        const jsonData = await response.json();
        return jsonData;
    }
    async componentDidMount() {
        this.setState({ searchInProgress: true});
        const recipes = await this.getRecipes();
        this.setState({
            recipes,
            searchInProgress: false
        })
    }
    render() {
        const noRecipesFound = this.state.searchInProgress && this.state.recipes !== undefined && this.state.recipes.length === 0;
        const recipes = this.state.recipes;
        const searchInProgress = this.state.searchInProgress;
        return (
            <div className="container-fluid">
                <div className="mb-4">
                    <input id="search-recipes-field" size="40" onKeyUp={ (event) => {this.searchRecipes(event.target.value)}} placeholder="Search recipes"/>
                </div>
                { !searchInProgress && (
                    <h2>My {recipes.length} Recipes</h2>
                )}
                { searchInProgress && (
                    <h2>Search results:  {recipes.length} recipe(s)</h2>
                )}
                <div>
                    <table className="recipes table">
                        <thead>
                        <tr className="row">
                            <th className="col-7 ml-2">
                                <a onClick={ (event) => {this.sortByColumnHeader('name')}} href="">Name</a>
                            </th>
                            <th className="col-2">
                                <a onClick={ (event) => {this.sortByColumnHeader('category')}} href="">Category</a>
                            </th>
                            <th className="col-2">
                                <a onClick={ (event) => {this.sortByColumnHeader('numberOfServings')}} href="">Servings</a>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        { recipes.map(recipe => {
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
                            )}
                        )}
                        {noRecipesFound && (
                            <tr>
                                <td>
                                    <span>No recipes found</span>
                                </td>
                            </tr>
                        )}
                        {noRecipesFound && (
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
                        <label for="csv-file-upload">Import recipes by CSV:</label>
                    </div>
                    <div>
                        {/*}   <input id="csv-file-upload" type="file" #csvFile (change)="onSelectFile(csvFile.files)"/>
                    <button className="btn btn-secondary btn-sm" *ngIf="csvImportEnabled" (click)="importRecipe(csvFile.files)">Import CSV</button>
                <button className="btn btn-secondary btn-sm" *ngIf="csvImportEnabled" (click)="cancelImport()">Cancel import</button>

                    </div>
                    <div>
      <span className="error-message">
        {importError}
      </span>
                    </div>
                    */}
                    </div>
                </div>
            </div>
        )
    }
}
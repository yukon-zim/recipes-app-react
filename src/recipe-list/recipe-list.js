import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import RecipeSearch from '../recipe-search/recipe-search';
import ImportCsv from '../import-recipe/import-csv';
import ImportUrl from '../import-recipe/import-url';
import RecipeListTable from './recipe-list-table';


export default class RecipeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInProgress: false,
            recipes: []
        };
        this.recipeUrl = 'http://localhost:1337/recipes';
    }

    async getRecipes() {
        const response = await fetch('http://localhost:1337/recipes');
        const jsonData = await response.json();
        return jsonData;
    }

    setRecipes(recipes) {
        this.setState({
            recipes: recipes
        })
    }

    setSearchInProgress(isSearching) {
        this.setState({
            searchInProgress: isSearching
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
        const recipes = this.state.recipes;
        // const isImportUrlInvalid = this.urlToImportInput === undefined || this.urlToImportInput.validity === undefined || !this.urlToImportInput.validity.valid;
        const commonRecipeListProps = {
            recipeUrl: this.recipeUrl,
            recipes,
            setRecipes: this.setRecipes.bind(this)
        };
        return (
            <div className="container-fluid">
                <RecipeSearch
                    {...commonRecipeListProps}
                    fullRecipeList={this.state.fullRecipeList}
                    searchInProgress={this.state.searchInProgress}
                    setSearchInProgress={this.setSearchInProgress.bind(this)}
                />
                <div>
                    <RecipeListTable
                        {...commonRecipeListProps}
                        searchInProgress={this.state.searchInProgress}
                    />
                </div>
                <div className="mb-4">
                    <Link className="btn btn-primary" id="add-new-recipe" to="/detail/new">Add new recipe!</Link>
                </div>
                <div>
                    <ImportCsv
                        {...commonRecipeListProps}
                        getRecipes={this.getRecipes.bind(this)}/>
                    <ImportUrl
                        {...commonRecipeListProps}
                        getRecipes={this.getRecipes.bind(this)}/>
                </div>
            </div>
        )
    }
}

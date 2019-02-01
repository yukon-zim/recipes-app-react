import React, { Component } from 'react';

export default class RecipeSearch extends Component {

    async searchRecipes(searchTerm) {
        this.props.setSearchTerm(searchTerm);
    }

    render() {
        const { recipes, loading, searchInProgress } = this.props;
        return (
            <div>
                <div className="mb-4">
                    <input id="search-recipes-field" size="40"
                           onKeyUp={(event) => {
                               this.searchRecipes(event.target.value)
                           }}
                           placeholder="Search recipes"/>
                </div>
                {loading && (
                 <h2>Loading recipes...</h2>
                )}
                {!searchInProgress && !loading && (
                    <h2>My {recipes.length} Recipes</h2>
                )}
                {searchInProgress && !loading && (
                    <h2>Search results: {recipes.length} recipe(s)</h2>
                )}
            </div>
        )
    }
}
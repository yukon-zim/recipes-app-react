import React, {Component} from 'react';

export default class RecipeSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async searchRecipes(searchTerm) {
        // if (!searchTerm.trim()) {
        //     return;
        // }
        this.props.setSearchTerm(searchTerm);
    }

    async componentDidMount() {

    }

    render() {
        const recipes = this.props.recipes;
        return (
            <div>
                <div className="mb-4">
                    <input id="search-recipes-field" size="40"
                           onKeyUp={(event) => {
                               this.searchRecipes(event.target.value)
                           }}
                           placeholder="Search recipes"/>
                </div>
                {!this.props.searchInProgress && (
                    <h2>My {recipes.length} Recipes</h2>
                )}
                {this.props.searchInProgress && (
                    <h2>Search results: {recipes.length} recipe(s)</h2>
                )}
            </div>
        )
    }
}
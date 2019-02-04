import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RecipeSearch extends Component {

    async searchRecipes(searchTerm) {
        this.props.setSearchTerm(searchTerm);
    }

    render() {
        return (
            <div>
                <div className="mb-4">
                    <input id="search-recipes-field" size="40"
                           onKeyUp={(event) => {
                               this.searchRecipes(event.target.value)
                           }}
                           placeholder="Search recipes"/>
                </div>
            </div>
        )
    }
}

RecipeSearch.propTypes = {
setSearchTerm: PropTypes.func.isRequired
};
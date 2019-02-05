import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RecipeSearch extends Component {

    searchRecipes = event => {
        this.props.setSearchTerm(event.target.value);
    };

    render() {
        return (
            <div>
                <div className="mb-4">
                    <input id="search-recipes-field" size="40"
                           onKeyUp={ this.searchRecipes }
                           placeholder="Search recipes"/>
                </div>
            </div>
        )
    }
}

RecipeSearch.propTypes = {
setSearchTerm: PropTypes.func.isRequired
};
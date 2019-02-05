import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { orderBy, differenceBy } from 'lodash';
import PropTypes from 'prop-types';
import RecipePropType from '../recipe-detail/RecipePropType';
import * as Styled from '../style/RecipeTable';

export default class RecipeListTable extends Component {
    state = {
        recipes: this.props.recipes,
        currentSortByOrder: null,
        currentSortByField: null,
    };

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
    };

    // compare state and props recipe arrays. helps determine whether state should be updated when recipe props change
    static recipeListMatch(prevList, newList) {
        if (prevList.length !== newList.length) {
            return false;
        }
        // check for both incrementing and decrementing recipe array
        return (differenceBy(newList, prevList, "id").length === 0 || differenceBy(prevList, newList, "id").length === 0);
    }

    // check whether state should update when props change.
    // maintains table sorting when recipe list changes (as a result of search, for example)
    static getDerivedStateFromProps( nextProps, prevState) {
        if (RecipeListTable.recipeListMatch(prevState.recipes, nextProps.recipes)) {
            return prevState;
        }
        const newList = nextProps.recipes;
        const sortedList = orderBy(newList, prevState.currentSortByField, prevState.currentSortByOrder);
        const newState = {
            ...prevState,
            recipes: sortedList
        };
        return newState;
    }

    render() {
        const { recipes, loading, searchInProgress } = this.props;
        const noRecipesFound = searchInProgress && recipes !== undefined && recipes.length === 0;
        const noRecipes = !searchInProgress && recipes !== undefined && recipes.length === 0;
        const blankUrl = '#';

        return(
            <div>
                <table className="recipes table">
                    <thead className="table-header">
                    <Styled.Row className="row">
                        <Styled.HeaderCell
                            col={7}
                            className="table-header name-header">
                            <a href={blankUrl} onClick={(event) => {
                                this.sortByColumnHeader('name')
                            }}>Name</a>
                        </Styled.HeaderCell>
                        <Styled.HeaderCell
                            col={3}
                            className="table-header cat-header">
                            <a href={blankUrl} onClick={(event) => {
                                this.sortByColumnHeader('category')
                            }}>Category</a>
                        </Styled.HeaderCell>
                        <Styled.HeaderCell
                            col={2}
                            className="table-header servings-header">
                            <a href={blankUrl} onClick={(event) => {
                                this.sortByColumnHeader('numberOfServings')
                            }}>Servings</a>
                        </Styled.HeaderCell>
                    </Styled.Row>
                    </thead>
                    <tbody>
                    {this.state.recipes.map(recipe => {
                            return (
                                <Styled.Row className="data-row" key={recipe.id}>
                                    <Styled.Cell col={7}
                                          className="table-cell">
                                        <Link to={`/detail/${recipe.id}`}>
                                            <span className="table-span name-span">
                                                {recipe.name}
                                                </span>
                                        </Link>
                                    </Styled.Cell>
                                    <Styled.Cell col={3}
                                          className="table-cell">
                                        <Link to={`/detail/${recipe.id}`}>
                                            <span className="table-span category-span">
                                                {recipe.category}
                                                </span>
                                        </Link>
                                    </Styled.Cell>
                                    <Styled.Cell col={2}
                                          className="table-cell">
                                        <Link to={`/detail/${recipe.id}`}>
                                            <span className="table-span servings-span">
                                                {recipe.numberOfServings}
                                                </span>
                                        </Link>
                                    </Styled.Cell>
                                </Styled.Row>
                            )
                        }
                    )}
                    {loading && (
                        <Styled.Row>
                            <td className="table-message">
                                <span className="span-loading">
                                    Loading recipes...
                                </span>
                            </td>
                        </Styled.Row>
                    )}
                    {noRecipesFound && !loading && (
                        <Styled.Row>
                            <td className="table-message">
                                <span className="span-no-recipes-found">
                                    No recipes found
                                </span>
                            </td>
                        </Styled.Row>
                    )}
                    {noRecipes && !loading && (
                        <Styled.Row>
                            <td className="table-message">
                                <span className="span-no-user-recipes">
                                    Why not add/import some recipes?
                                </span>
                            </td>
                        </Styled.Row>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}

RecipeListTable.propTypes = {
    recipes: PropTypes.arrayOf(RecipePropType),
    loading: PropTypes.bool,
    searchInProgress: PropTypes.bool,
};
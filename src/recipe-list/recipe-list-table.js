import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { orderBy, differenceBy } from 'lodash';

export default class RecipeListTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: props.recipes,
            currentSortByOrder: null,
            currentSortByField: null,
        }
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
        const noRecipesFound = this.props.searchInProgress && this.props.recipes !== undefined && this.props.recipes.length === 0;
        const noRecipesOnUser = !this.props.searchInProgress && this.props.recipes !== undefined && this.props.recipes.length === 0;
        const blankUrl = '#';

        return(
            <div>
                <table className="recipes table">
                    <thead className="table-header">
                    <tr className="row">
                        <th className="col-7 ml-2 table-header name-header">
                            <a href={blankUrl} onClick={(event) => {
                                this.sortByColumnHeader('name')
                            }}>Name</a>
                        </th>
                        <th className="col-2 table-header category-header">
                            <a href={blankUrl} onClick={(event) => {
                                this.sortByColumnHeader('category')
                            }}>Category</a>
                        </th>
                        <th className="col-2 table-header servings-header">
                            <a href={blankUrl} onClick={(event) => {
                                this.sortByColumnHeader('numberOfServings')
                            }}>Servings</a>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.recipes.map(recipe => {
                            return (
                                <tr className="row data-row" key={recipe.id}>
                                    <td className="table-cell col-7 ml-2">
                                        <Link to={`/detail/${recipe.id}`}>
                                            <span className="table-span name-span">
                                                {recipe.name.toUpperCase()}
                                                </span>
                                        </Link>
                                    </td>
                                    <td className="table-cell col-2">
                                        <Link to={`/detail/${recipe.id}`}>
                                            <span className="table-span category-span">
                                                {recipe.category}
                                                </span>
                                        </Link>
                                    </td>
                                    <td className="table-cell col-2">
                                        <Link to={`/detail/${recipe.id}`}>
                                            <span className="table-span servings-span">
                                                {recipe.numberOfServings}
                                                </span>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }
                    )}
                    {noRecipesFound && (
                        <tr>
                            <td>
                                <span className="span-no-recipes-found">
                                    No recipes found
                                </span>
                            </td>
                        </tr>
                    )}
                    {noRecipesOnUser && (
                        <tr>
                            <td>
                                <span className="span-no-user-recipes">
                                    Why not add/import some recipes?
                                </span>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}
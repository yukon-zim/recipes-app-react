import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { orderBy } from 'lodash';

export default class RecipeListTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSortByOrder: null,
            currentSortByField: null,
        }
    }

    sortByColumnHeader(field) {
        let recipes = this.props.recipes;
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
            currentSortByField: field,
            currentSortByOrder: currentSortByOrder,
        });
    }


    async componentDidMount() {

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
                    {this.props.recipes.map(recipe => {
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
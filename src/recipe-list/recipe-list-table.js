import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { orderBy, differenceBy } from 'lodash';
import styled, { css } from 'styled-components'

const Row = styled.tr`
 display: flex;
  flex-direction: row;
  margin-right: -15px;
    margin-left: -15px;
`;
const HeaderCell = styled.th`
  flex-basis: ${props => `${(props.col * 100 / 12)}%`};
  ${props => props.theme.oldSchool && css`
      && { border-bottom-color: ${props => props.theme.oldSchoolOptions.darkPurple};
      border-top-color: ${props => props.theme.oldSchoolOptions.darkPurple};
      background: ${props => props.theme.oldSchoolOptions.darkPurple};
      font-size: 1rem;
      }
  `}
`;
const Cell = styled.td`
  flex-basis: ${props => `${(props.col * 100 / 12)}%`};
  ${props => props.theme.oldSchool && css`
      && { border: 10px solid ${props => props.theme.oldSchoolOptions.lightPurple};
      background: ${props => props.theme.oldSchoolOptions.white};
      font-size: 1rem;
      }
   `}
`;


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
        const loading = this.props.loading;
        const noRecipesFound = this.props.searchInProgress && this.props.recipes !== undefined && this.props.recipes.length === 0;
        const noRecipesOnUser = !this.props.searchInProgress && this.props.recipes !== undefined && this.props.recipes.length === 0;
        const blankUrl = '#';

        return(
            <div>
                <table className="recipes table">
                    <thead className="table-header">
                    <Row className="row">
                        <HeaderCell
                            col={7}
                            className="table-header">
                            <a href={blankUrl} onClick={(event) => {
                                this.sortByColumnHeader('name')
                            }}>Name</a>
                        </HeaderCell>
                        <HeaderCell
                            col={3}
                            className="table-header">
                            <a href={blankUrl} onClick={(event) => {
                                this.sortByColumnHeader('category')
                            }}>Category</a>
                        </HeaderCell>
                        <HeaderCell
                            col={2}
                            className="table-header">
                            <a href={blankUrl} onClick={(event) => {
                                this.sortByColumnHeader('numberOfServings')
                            }}>Servings</a>
                        </HeaderCell>
                    </Row>
                    </thead>
                    <tbody>
                    {this.state.recipes.map(recipe => {
                            return (
                                <Row className="data-row" key={recipe.id}>
                                    <Cell col={7}
                                          className="table-cell">
                                        <Link to={`/detail/${recipe.id}`}>
                                            <span className="table-span name-span">
                                                {recipe.name}
                                                </span>
                                        </Link>
                                    </Cell>
                                    <Cell col={3}
                                          className="table-cell">
                                        <Link to={`/detail/${recipe.id}`}>
                                            <span className="table-span category-span">
                                                {recipe.category}
                                                </span>
                                        </Link>
                                    </Cell>
                                    <Cell col={2}
                                          className="table-cell">
                                        <Link to={`/detail/${recipe.id}`}>
                                            <span className="table-span servings-span">
                                                {recipe.numberOfServings}
                                                </span>
                                        </Link>
                                    </Cell>
                                </Row>
                            )
                        }
                    )}
                    {loading && (
                        <tr>
                            <td>
                                <span className="span-loading">
                                    Loading recipes...
                                </span>
                            </td>
                        </tr>
                    )}
                    {noRecipesFound && !loading && (
                        <tr>
                            <td>
                                <span className="span-no-recipes-found">
                                    No recipes found
                                </span>
                            </td>
                        </tr>
                    )}
                    {noRecipesOnUser && !loading && (
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
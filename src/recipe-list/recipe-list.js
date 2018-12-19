import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import RecipeSearch from '../recipe-search/recipe-search';
import ImportCsv from '../import-recipe/import-csv';
import ImportUrl from '../import-recipe/import-url';
import RecipeListTable from './recipe-list-table';
import Button from '../style/Button';

const ALL_RECIPES_QUERY = gql`
    query ALL_RECIPES_QUERY($searchTerm: String) {
        recipes(searchTerm: $searchTerm) {
            id
            name
            category
            numberOfServings
            ingredients
            instructions
            dateCreated
            dateModified
            notes
        }
    }
`;

export default class RecipeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeUrl: 'http://localhost:1337/recipes',
            searchTerm: ''
        };

    };

    setSearchTerm = searchTerm => {
        this.setState({
            searchTerm
        })
    };

    render() {
        // const isImportUrlInvalid = this.urlToImportInput === undefined || this.urlToImportInput.validity === undefined || !this.urlToImportInput.validity.valid;
        return (
            <Query query={ALL_RECIPES_QUERY} variables={{searchTerm: this.state.searchTerm}}>
                {({data, error, loading}) => {
                    const recipes = data.recipes || [];
                    const commonRecipeListProps = {
                        searchInProgress: loading,
                        recipeUrl: this.recipeUrl,
                        recipes
                    };
                    return (<div className="container-fluid">
                            <RecipeSearch
                                {...commonRecipeListProps}
                                setSearchTerm={this.setSearchTerm}
                            />
                            <div>
                                <RecipeListTable
                                    {...commonRecipeListProps}
                                />
                            </div>
                            <div className="mb-4">
                                <Button as={Link} className="btn btn-primary" id="add-new-recipe" to="/detail/new">Add new recipe!</Button>
                            </div>
                            <div>
                                {false &&
                                <ImportCsv
                                    {...commonRecipeListProps}
                                    />
                                }
                                <ImportUrl
                                    {...commonRecipeListProps}
                                    />
                            </div>
                        </div>
                    )}}
            </Query>
        )
    }
}

export { ALL_RECIPES_QUERY };

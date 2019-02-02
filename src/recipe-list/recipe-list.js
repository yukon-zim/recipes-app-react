import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import RecipeSearch from '../recipe-search/recipe-search';
import ImportCsv from '../import-recipe/import-csv';
import ImportUrl from '../import-recipe/import-url';
import RecipeListTable from './recipe-list-table';
import Button from '../style/Button';
import PropTypes from 'prop-types';

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
    state = {
        recipeUrl: 'http://localhost:1337/recipes',
        searchTerm: '',
        searchInProgress: false
    };

    setSearchTerm = searchTerm => {
        this.setState({
            searchTerm,
            searchInProgress: !!searchTerm
        })
    };

    async componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        const { user } = this.props;
        return (
            <Query query={ALL_RECIPES_QUERY} variables={{ searchTerm: this.state.searchTerm }}>
                {({ data, error, loading }) => {
                    if (loading) return  <h4>Loading recipes...</h4>;
                    if (error) return <h4 className="network-error">Encountered an error while loading recipes. Are the GraphQL and API servers running?</h4>;
                    const recipes = data.recipes || [];
                    const commonRecipeListProps = {
                        loading,
                        searchInProgress: this.state.searchInProgress,
                        recipeUrl: this.recipeUrl,
                        recipes
                    };
                    return (
                        <React.Fragment>
                            {!error && !loading && (
                                <div className="container-fluid">
                                    <RecipeSearch
                                        {...commonRecipeListProps}
                                        setSearchTerm={this.setSearchTerm}
                                    />
                                    <div>
                                        <RecipeListTable
                                            {...commonRecipeListProps}
                                        />
                                    </div>
                                    <div>
                                        {!user && (
                                            <div>
                                                <h5>Sign in to add new recipes!</h5>
                                            </div>
                                        )}
                                        {user && (
                                            <React.Fragment>
                                                <div className="mb-4">
                                                    <Button as={Link} className="btn btn-primary" id="add-new-recipe" to="/detail/new">Add new recipe!</Button>
                                                </div>
                                                <div className="mb-4">
                                                    {false &&
                                                    <ImportCsv
                                                        {...commonRecipeListProps}
                                                    />
                                                    }
                                                    <ImportUrl
                                                        {...commonRecipeListProps}
                                                    />
                                                </div>
                                            </React.Fragment>
                                        )}
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    )}}
            </Query>
        )
    }
}

RecipeList.propTypes = {
    user: PropTypes.object
};

export { ALL_RECIPES_QUERY };

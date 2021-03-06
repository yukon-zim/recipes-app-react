import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_RECIPES_QUERY } from '../recipe-list/recipe-list';
import Button from '../style/Button';

const URL_IMPORT_MUTATION = gql`
    mutation URL_IMPORT_MUTATION($url: String!) {
        importRecipeFromUrl(url: $url) {
            name
        }
    }
`;

export default class ImportUrl extends Component {
    state = {
        urlInputValid: false,
        urlImportMessage: ''
    };

    async importRecipeByUrl(importUrlMutation) {
        try {
        const res = await importUrlMutation({
            variables: { url: this.urlToImportInput.value }
        });
        this.cancelUrlImport();
        this.setState({
            urlImportMessage: 'Successfully imported recipe from URL!'
        });
        return res;
        } catch (err) {
            console.error(err);
        }
    }

    cancelUrlImport() {
        this.urlToImportInput.value = null;
        this.setState({
            urlInputValid: false,
            urlImportMessage: ''
        })
    }

    onAddUrl = (e) => {
        const urlInput = e.target;
        if (urlInput.value) {
            this.setState({
                urlInputValid: true,
                urlImportMessage: ''
            })
        }
    };

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return(
            <div>
                <div>
                    <Mutation mutation={URL_IMPORT_MUTATION}
                              refetchQueries={[{ query: ALL_RECIPES_QUERY, variables: { searchTerm: '' } }]}>
                        {(importUrl, { error }) => (
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <label htmlFor="url-file-upload">
                                        Import recipes by URL if you dare! This is in beta but MAY support URLs from: <br/>
                                        <ul>
                                            <li>TheKitchn</li>
                                            <li>Food52</li>
                                            <li>AllRecipes</li>
                                        </ul>
                                    </label>
                                </div>
                                <span className="badge-success">
                                    {this.state.urlImportMessage}
                                </span>
                                <div>
                                    <input id="url-file-upload" type="url" required
                                           ref={textInput => this.urlToImportInput = textInput}
                                           onChange={this.onAddUrl}/>
                                </div>
                                <div>
                                    <Button className="btn btn-primary btn-sm btn-import-url"
                                            disabled={!this.state.urlInputValid}
                                            type="submit"
                                            onMouseDown={() => this.importRecipeByUrl(importUrl)}>Import web recipe
                                    </Button>
                                </div>
                                <div>
                                    {error && (
                                        <p className="error-message">An error ocurred while importing the recipe. Check the browser console.</p>
                                    )}
                                </div>
                            </form>
                        )}
                    </Mutation>
                </div>
            </div>
        )
    }
}

export { URL_IMPORT_MUTATION }

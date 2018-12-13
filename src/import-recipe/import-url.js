import React, {Component} from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_RECIPES_QUERY } from '../recipe-list/recipe-list'

const URL_IMPORT_MUTATION = gql`
    mutation URL_IMPORT_MUTATION($url: String!) {
        importRecipeFromUrl(url: $url) {
            name
        }
    }
`;

export default class ImportUrl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urlInputValid: false,
            urlImportMessage: ''
        }
    }
    async importRecipeByUrl(importUrlMutation) {
        try {
            const res = await importUrlMutation({
                variables: {url: this.urlToImportInput.value}
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

    onAddUrl(urlInput) {
        if (urlInput.value) {
            this.setState({
                urlInputValid: true
            })
        }
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    async componentDidMount() {

    }

    render() {
        return(
            <div>
                <div>
                    <Mutation mutation={URL_IMPORT_MUTATION}
                              refetchQueries={[{query: ALL_RECIPES_QUERY, variables: {searchTerm: ''}}]}>
                        {(importUrl, {error, loading}) => (
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <label htmlFor="url-file-upload">Import recipes by URL:</label>
                                </div>
                                <span className="badge-success">
                                    {this.state.urlImportMessage}
                                </span>
                                <div>
                                    <input id="url-file-upload" type="url" required
                                           ref={textInput => this.urlToImportInput = textInput}
                                           onChange={(event) => this.onAddUrl(event.target)}/>
                                </div>
                                <div>
                                    <button className="btn btn-secondary btn-sm btn-import-url"
                                            disabled={!this.state.urlInputValid}
                                            onClick={() => this.importRecipeByUrl(importUrl)}>Import web recipe
                                    </button>
                                </div>
                                <div>
                                    {error && (
                                        <p className="error-message">An error ocurred while importing the recipe. Check the console.</p>
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

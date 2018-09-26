import React, {Component} from 'react';

export default class ImportUrl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urlInputValid: false,
            urlImportError: ''
        }
    }
    async importRecipeByUrl(url) {
        try {
            this.importUrlRequestPromise = this.importUrlRecipeRequest(url);
            const importResponse = await this.importUrlRequestPromise;
            this.getRecipesPromise = this.props.getRecipes();
            const recipes = await this.getRecipesPromise;
            this.cancelUrlImport();
            this.props.setRecipes(recipes);
            this.setState({
                urlImportError: importResponse.message
            });
        } catch (err) {
            console.log(err);
            this.setState({
                urlImportError: err.message
            });
        }
    }

    async importUrlRecipeRequest(url) {
        const response = await fetch(`http://localhost:1337/recipes/import-url`, {
            method: 'POST',
            body: JSON.stringify({url})
        });
        const jsonData = await response.json();
        if (response.ok) {
            return jsonData;
        }
        throw new Error(`${jsonData.name} ${jsonData.statusCode} - check api logs`)
    }

    cancelUrlImport() {
        this.urlToImportInput.value = null;
        this.setState({
            urlInputValid: false,
            urlImportError: ''
        })
    }

    onAddUrl(urlInput) {
        // if (!this.urlToImportInput === undefined && this.urlToImportInput.validity.valid) {
        if (urlInput.value) {
            this.setState({
                urlInputValid: true
            })
        }
        // }
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
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="url-file-upload">Import recipes by URL:</label>
                        </div>
                        <div>
                            <input id="url-file-upload" type="url" required
                                   ref={textInput => this.urlToImportInput = textInput}
                                   onChange={(event) => this.onAddUrl(event.target)}/>
                        </div>
                        <div>
                            <button className="btn btn-secondary btn-sm btn-import-url"
                                    disabled={!this.state.urlInputValid}
                                    onClick={() => this.importRecipeByUrl(this.urlToImportInput.value)}>Import web recipe
                            </button>

                        </div>
                        <div>
                                <span className="error-message url-import-error">
                                    {this.state.urlImportError}
                                </span>
                        </div>
                    </form>
                </div>
            </div>
        )}
}

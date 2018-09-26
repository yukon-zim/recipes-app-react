import React, {Component} from 'react';

export default class ImportCsv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            csvImportEnabled: false,
            csvImportError: ''
        }
    }

    async importRecipe(fileData) {
        const formData = new FormData();
        formData.append('importedRecipes', fileData[0]);
        try {
            this.importRecipesPromise = this.importRecipeRequest(formData);
            const importResponse = await this.importRecipesPromise;
            this.getRecipesPromise = this.props.getRecipes();
            const recipes = await this.getRecipesPromise;
            console.log(recipes);
            this.cancelCsvImport();
            this.props.setRecipes(recipes);
            this.setState({
                csvImportError: importResponse.message
            });
        } catch (err) {
            this.setState({
                csvImportError: err.message
            });
        }
    }

    async importRecipeRequest(newRecipeFormData) {
        const response = await fetch(`http://localhost:1337/recipes/import`, {
            method: 'POST',
            body: newRecipeFormData
        });
        const jsonData = await response.json();
        if (response.ok) {
            return jsonData;
        }
        throw new Error(jsonData.message)
    }

    onSelectFile() {
        this.setState({
            csvImportEnabled: true,
            csvImportError: ''
        })
    }

    cancelCsvImport() {
        this.csvFileInput.value = null;
        this.setState({
            csvImportEnabled: false,
            csvImportError: ''
        })
    }

    async componentDidMount() {

    }

    render() {
        return(
            <div>
                <div>
                    <label htmlFor="csv-file-upload">Import recipes by CSV:</label>
                </div>
                <div>
                    <input id="csv-file-upload" type="file" ref={csv => this.csvFileInput = csv}
                           onChange={() => this.onSelectFile()}/>
                </div>
                {this.state.csvImportEnabled && (
                    <div>
                        <button className="btn btn-secondary btn-sm btn-import-recipe"
                                onClick={() => this.importRecipe(this.csvFileInput.files)}>Import recipe CSV
                        </button>
                        <button className="btn btn-secondary btn-sm btn-cancel-import" onClick={() => this.cancelCsvImport()}>Cancel
                            import
                        </button>
                    </div>
                )}
                <div>
                        <span className="error-message csv-import-error">
                            {this.state.csvImportError}
                        </span>
                </div>
            </div>
        )
    }
}
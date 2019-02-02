import React, { Component } from 'react';

export default class ImportCsv extends Component {
    state = {
        csvImportEnabled: false,
        csvImportError: ''
    };

    async importRecipe(fileData) {
        const formData = new FormData();
        formData.append('importedRecipes', fileData[0]);
        try {
            this.importRecipesPromise = this.importRecipeRequest(formData);
            const importResponse = await this.importRecipesPromise;
            this.cancelCsvImport();
            this.setState({
                csvImportError: importResponse.message + '. Refresh the page to see all recipes.'
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

    onSelectFile = () => {
        this.setState({
            csvImportEnabled: true,
            csvImportError: ''
        })
    };

    cancelCsvImport() {
        this.csvFileInput.value = null;
        this.setState({
            csvImportEnabled: false,
            csvImportError: ''
        })
    }

    render() {
        return(
            <div>
                <div>
                    <label htmlFor="csv-file-upload">Import recipes by CSV:</label>
                </div>
                <div>
                    <input id="csv-file-upload" type="file" ref={csv => this.csvFileInput = csv}
                           onChange={this.onSelectFile}/>
                </div>
                {this.state.csvImportEnabled && (
                    <div>
                        <button className="btn btn-secondary btn-sm btn-import-recipe"
                                onMouseDown={() => this.importRecipe(this.csvFileInput.files)}>Import recipe CSV
                        </button>
                        <button className="btn btn-secondary btn-sm btn-cancel-import"
                                onMouseDown={() => this.cancelCsvImport()}>Cancel
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
import React, {Component} from 'react';

export default class RecipeDetailField extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {

    }

    render() {
        const recipe = this.props.recipe;
        let InputType = this.props.type === 'textarea' ? 'textarea' : 'input';
        return (
            <div>
                <label>{this.props.label}</label>
                {!this.props.isFieldInEditMode(this.props.fieldName) && (
                    <span onClick={() => {
                        this.props.editField(this.props.fieldName)
                    }}>{recipe[this.props.fieldName]}</span>
                )}
                {this.props.isFieldInEditMode(this.props.fieldName) && (
                    <InputType id={this.props.fieldName}
                        // pass a value:string even if fieldName is null/undefined to avoid controlled component error
                           value={recipe[this.props.fieldName] || ''}
                           onChange={event => {
                               this.props.setRecipeField(this.props.fieldName, event.target.value)
                           }}
                           onBlur={() => this.props.unfocusField()}
                           onKeyUp={(event) => this.props.unfocusFieldOnEnter(event)}
                           onFocus={() => this.props.editField(this.props.fieldName)}
                           type={this.props.type}
                           placeholder={this.props.fieldName}
                           name={this.props.fieldName}
                           required={this.props.required}
                    />
                )}
                {this.props.isFieldInEditMode(this.props.fieldName) && (recipe.name.invalid && (recipe.name.dirty || recipe.name.touched)) && (
                    <div>
                        <div className="alert alert-danger">
                            {recipe.name.errors.required && (
                                <div>
                                    {this.props.requiredErrorText}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
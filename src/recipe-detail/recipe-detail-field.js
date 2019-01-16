import React, {Component} from 'react';
import FormFieldRow from '../style/FormFieldRow';
import FormFieldLabel from '../style/FormFieldLabel';
import FormField from '../style/FormField';

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
        const isAutoFocused = this.props.isFieldInEditAndFocus(this.props.fieldName);
        let InputType = this.props.type === 'textarea' ? 'textarea' : 'input';
        return (
            <div>
                <FormFieldRow onClick={(event) => event.preventDefault()}>
                    <FormFieldLabel>{this.props.label}&nbsp;</FormFieldLabel>
                    {!this.props.isFieldInEditMode(this.props.fieldName) && (
                        <FormField onClick={() => {
                            this.props.editField(this.props.fieldName)
                        }}>{recipe[this.props.fieldName]}</FormField>
                    )}
                    {this.props.isFieldInEditMode(this.props.fieldName) && (
                        <FormField as={InputType} id={this.props.fieldName}
                                   className="recipe-detail-field"
                                   autoFocus={isAutoFocused}
                            // pass a value:string even if fieldName is null/undefined to avoid controlled component error
                                   value={recipe[this.props.fieldName] || ''}
                                   onChange={event => {
                                       this.props.setRecipeField(this.props.fieldName, event.target.value)
                                   }}
                                   onBlur={() => this.props.unfocusField()}
                                   onKeyUp={(event) => this.props.unfocusFieldOnEnter(event)}
                                   onFocus={() => this.props.editField(this.props.fieldName)}
                                   type={this.props.type}
                                   rows='3'
                                   placeholder={this.props.fieldName}
                                   name={this.props.fieldName}
                                   required={this.props.required}
                        />
                    )}
                    {this.props.isFieldInEditMode(this.props.fieldName) && this.props.required && (
                        <div className="alert alert-danger form-field-invalid">
                            {this.props.requiredErrorText}
                        </div>
                    )}
                </FormFieldRow>
            </div>
        )
    }
}
import React, {Component} from 'react';

export default class RecipeDetailListField extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {

    }

    render() {
        const recipe = this.props.recipe;
        const InputType = this.props.type === 'textarea' ? 'textarea' : 'input';
        const ListType = this.props.listType === 'unordered' ? 'ul' : 'ol';
        if (!recipe) {
            return '';
        }
        if(!recipe[this.props.fieldName]) {
            return '';
        }
        return (
            <div>
                <label>{this.props.label}</label>
                <ListType>
                    {recipe[this.props.fieldName].map((listItem, index) => {
                        return (
                            <li key={index}>
                                <div>
                                    {!this.props.isFieldInEditMode(this.props.fieldName, index) && (
                                        <span onClick={() => {
                                            this.props.editField(this.props.fieldName, index)
                                        }}>{listItem}
                                        </span>
                                    )}
                                    {this.props.isFieldInEditMode(this.props.fieldName, index) && (
                                        <InputType id={`${this.props.fieldName}-${index}`}
                                                   className="recipe-detail-list-field"
                                                   value={listItem || ''} // pass a string even if fieldName is null/undefined
                                                   onChange={event => {
                                                       this.props.setRecipeField(this.props.fieldName, event.target.value, index)
                                                   }}
                                                   onBlur={() => this.props.unfocusField()}
                                                   onKeyUp={(event) => this.props.unfocusFieldOnEnter(event)}
                                                   onFocus={() => this.props.editField(this.props.fieldName, index)}
                                                   type={this.props.type}
                                                   placeholder={this.props.fieldName}
                                                   name={this.props.fieldName}
                                                   required={this.props.required}
                                        />
                                    )}
                                    {!(index === 0) && (
                                        <button
                                            className="btn btn-light btn-sm"
                                            title="move up"
                                            onClick={() => this.props.moveListItemUp(index, this.props.fieldName)}>
                                            <i className="fas fa-arrow-up">up</i>
                                        </button>
                                    )}
                                    {!(index === recipe[this.props.fieldName].length - 1) && (
                                        <button
                                            className="btn btn-light btn-sm"
                                            title="move down"
                                            onClick={() => this.props.moveListItemDown(index, this.props.fieldName)}>
                                            <i className="fas fa-arrow-down">down</i>
                                        </button>
                                    )}
                                    {(recipe[this.props.fieldName].length > 1 ) && (
                                    <button
                                        className="btn btn-light btn-sm"
                                        title="remove" onClick={() => this.props.removeListItem(index, this.props.fieldName)}>
                                        <i className="fas fa-trash-alt">delete</i>
                                    </button>
                                    )}
                                    {this.props.isFieldInEditMode(this.props.fieldName, index) && this.props.required && (
                                            <div className="alert alert-danger form-list-field-invalid">
                                                {this.props.requiredErrorText}
                                            </div>
                                    )}
                                </div>
                            </li>
                        )
                    })}
                    <button
                        className="btn btn-secondary"
                        onClick={() => this.props.addListItem(this.props.fieldName)}>
                        {this.props.addListItemLabel}
                    </button>
                </ListType>
            </div>
        )
    }
}
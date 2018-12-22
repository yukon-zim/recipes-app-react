import React, {Component} from 'react';
import Button from '../style/Button';

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
        const ListType = this.props.listType === 'unordered' ? 'ul' : 'ol';
        if (!recipe) {
            return '';
        }
        if(!recipe[this.props.fieldName]) {
            return '';
        }
        return (
            <div>
                <label onClick={(event) => event.preventDefault()}>
                    {this.props.label}&nbsp;
                    <ListType>
                        {recipe[this.props.fieldName].map((listItem, index) => {
                            const isAutoFocused = this.props.isFieldInEditAndFocus(this.props.fieldName, index);
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
                                                <input id={`${this.props.fieldName}-${index}`}
                                                       className="recipe-detail-list-field"
                                                       autoFocus={isAutoFocused}
                                                       value={listItem || ''} // pass a string even if fieldName is null/undefined
                                                       onChange={event => {
                                                           this.props.setRecipeField(this.props.fieldName, event.target.value, index)
                                                       }}
                                                       onBlur={() => this.props.unfocusField()}
                                                       onKeyUp={(event) => this.props.unfocusFieldOnEnter(event)}
                                                       onFocus={() => this.props.editField(this.props.fieldName, index)}
                                                       type='text'
                                                       placeholder={this.props.fieldName}
                                                       name={this.props.fieldName}
                                                       required={this.props.required}
                                                />
                                        )}
                                        {!(index === 0) && (
                                            <Button
                                                className="btn btn-light btn-sm btn-move-item-up"
                                                title="move up"
                                                onClick={() => this.props.moveListItemUp(index, this.props.fieldName)}>
                                                <i className="fas fa-arrow-up"><i className="fas fa-arrow-up"></i></i>
                                            </Button>
                                        )}
                                        {!(index === recipe[this.props.fieldName].length - 1) && (
                                            <Button
                                                className="btn btn-light btn-sm btn-move-item-down"
                                                title="move down"
                                                onClick={() => this.props.moveListItemDown(index, this.props.fieldName)}>
                                                <i className="fas fa-arrow-down"><i className="fas fa-arrow-down"></i></i>
                                            </Button>
                                        )}
                                        {(recipe[this.props.fieldName].length > 1 ) && (
                                            <Button
                                                className="btn btn-light btn-sm btn-remove-item"
                                                title="remove" onClick={() => this.props.removeListItem(index, this.props.fieldName)}>
                                                <i className="fas fa-trash-alt"><i className="fas fa-trash-alt"></i></i>
                                            </Button>
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
                        <Button
                            className="btn btn-primary btn-add-list-item"
                            onClick={() => this.props.addListItem(this.props.fieldName)}>
                            {this.props.addListItemLabel}
                        </Button>
                    </ListType>
                </label>
            </div>
        )
    }
}
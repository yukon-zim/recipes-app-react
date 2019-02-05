import React from 'react';
import PropTypes from 'prop-types';
import RecipePropType from './RecipePropType';
import Button from '../style/Button';
import * as Styled from '../style/RecipeForm';

function RecipeDetailListField(
    {
        recipe,
        user,
        type,
        listType,
        addListItemLabel,
        fieldName,
        label,
        required,
        requiredErrorText,
        isFieldInEditAndFocus,
        isFieldInEditMode,
        editField,
        unfocusField,
        unfocusFieldOnEnter,
        setRecipeField,
        moveListItemUp,
        moveListItemDown,
        addListItem,
        removeListItem
    }
) {
    const ListType = listType === 'unordered' ? 'ul' : 'ol';
    let InputType = type === 'textarea' ? 'textarea' : 'input';
    if (!recipe) {
        return '';
    }
    if (!recipe[fieldName]) {
        return '';
    }
    return (
        <div>
            <label onClick={(event) => event.preventDefault()}>
                <Styled.FormFieldLabel>{label}&nbsp;</Styled.FormFieldLabel>
                <ListType>
                    {recipe[fieldName].map((listItem, index) => {
                        const isAutoFocused = isFieldInEditAndFocus(fieldName, index);
                        return (
                            <li key={index}>
                                <Styled.FormFieldRow className="list-item" as="div">
                                    {!isFieldInEditMode(fieldName, index) && (
                                        <Styled.FormField
                                            className="recipe-detail-list-field"
                                            onClick={() => {
                                                editField(fieldName, index)
                                            }}>{listItem}
                                        </Styled.FormField>
                                    )}
                                    {isFieldInEditMode(fieldName, index) && (
                                        <Styled.FormField
                                            as={InputType}
                                            id={`${fieldName}-${index}`}
                                            className="recipe-detail-list-field"
                                            autoFocus={isAutoFocused}
                                            value={listItem || ''} // pass a string even if fieldName is null/undefined
                                            onChange={event => {
                                                setRecipeField(fieldName, event.target.value, index)
                                            }}
                                            onBlur={() => unfocusField()}
                                            onKeyUp={(event) => unfocusFieldOnEnter(event)}
                                            onFocus={() => editField(fieldName, index)}
                                            type={type}
                                            rows='3'
                                            placeholder={fieldName}
                                            name={fieldName}
                                            required={required}
                                        />
                                    )}
                                    {!(index === 0) && (
                                        <Button
                                            disabled={!user}
                                            className="btn btn-light btn-sm btn-move-item-up"
                                            title="move up"
                                            type="button"
                                            onMouseDown={() => moveListItemUp(index, fieldName)}>
                                            <i className="fas fa-arrow-up"><i className="fas fa-arrow-up"></i></i>
                                        </Button>
                                    )}
                                    {!(index === recipe[fieldName].length - 1) && (
                                        <Button
                                            disabled={!user}
                                            className="btn btn-light btn-sm btn-move-item-down"
                                            title="move down"
                                            type="button"
                                            onMouseDown={() => moveListItemDown(index, fieldName)}>
                                            <i className="fas fa-arrow-down"><i className="fas fa-arrow-down"></i></i>
                                        </Button>
                                    )}
                                    {(recipe[fieldName].length > 1) && (
                                        <Button
                                            disabled={!user}
                                            className="btn btn-light btn-sm btn-remove-item"
                                            type="button"
                                            title="remove"
                                            onMouseDown={() => removeListItem(index, fieldName)}>
                                            <i className="fas fa-trash-alt"><i className="fas fa-trash-alt"></i></i>
                                        </Button>
                                    )}
                                    {isFieldInEditMode(fieldName, index) && required && (
                                        <div className="alert alert-danger form-list-field-invalid">
                                            {requiredErrorText}
                                        </div>
                                    )}
                                </Styled.FormFieldRow>
                            </li>
                        )
                    })}
                    <Button
                        className="btn btn-primary btn-add-list-item"
                        type="button"
                        disabled={!user}
                        onMouseDown={() => addListItem(fieldName)}>
                        {addListItemLabel}
                    </Button>
                </ListType>
            </label>
        </div>
    )
}

RecipeDetailListField.propTypes = {
    recipe: RecipePropType,
    user: PropTypes.object,
    type: PropTypes.string.isRequired,
    listType: PropTypes.string.isRequired,
    addListItemLabel: PropTypes.string.isRequired,
    fieldName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    requiredErrorText: PropTypes.string,
    isFieldInEditAndFocus: PropTypes.func.isRequired,
    isFieldInEditMode: PropTypes.func.isRequired,
    editField: PropTypes.func.isRequired,
    unfocusField: PropTypes.func.isRequired,
    unfocusFieldOnEnter: PropTypes.func.isRequired,
    setRecipeField: PropTypes.func.isRequired,
    moveListItemUp: PropTypes.func.isRequired,
    moveListItemDown: PropTypes.func.isRequired,
    addListItem: PropTypes.func.isRequired,
    removeListItem: PropTypes.func.isRequired
};
export default RecipeDetailListField;
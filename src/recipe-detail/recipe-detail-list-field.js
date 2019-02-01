import React from 'react';
import Button from '../style/Button';
import FormFieldRow from '../style/FormFieldRow';
import FormFieldLabel from '../style/FormFieldLabel';
import FormField from '../style/FormField';

const RecipeDetailListField = (
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
) => {
    const ListType = listType === 'unordered' ? 'ul' : 'ol';
    let InputType = type === 'textarea' ? 'textarea' : 'input';
    if (!recipe) {
        return '';
    }
    if(!recipe[fieldName]) {
        return '';
    }
    return (
        <div>
            <label onClick={(event) => event.preventDefault()}>
                <FormFieldLabel>{label}&nbsp;</FormFieldLabel>
                <ListType>
                    {recipe[fieldName].map((listItem, index) => {
                        const isAutoFocused = isFieldInEditAndFocus(fieldName, index);
                        return (
                            <li key={index}>
                                <FormFieldRow className="list-item" as="div">
                                    {!isFieldInEditMode(fieldName, index) && (
                                        <FormField
                                            className="recipe-detail-list-field"
                                            onClick={() => {
                                                editField(fieldName, index)
                                            }}>{listItem}
                                        </FormField>
                                    )}
                                    {isFieldInEditMode(fieldName, index) && (
                                        <FormField
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
                                    {(recipe[fieldName].length > 1 ) && (
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
                                </FormFieldRow>
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
};
export default RecipeDetailListField;
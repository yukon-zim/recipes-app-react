import React from 'react';
import FormFieldRow from '../style/FormFieldRow';
import FormFieldLabel from '../style/FormFieldLabel';
import FormField from '../style/FormField';

const RecipeDetailField = (
    {
        recipe,
        type,
        fieldName,
        label,
        required,
        requiredErrorText,
        isFieldInEditAndFocus,
        isFieldInEditMode,
        editField,
        unfocusField,
        unfocusFieldOnEnter,
        setRecipeField
    }
    ) => {
    const isAutoFocused = isFieldInEditAndFocus(fieldName);
    let InputType = type === 'textarea' ? 'textarea' : 'input';
    return (
        <div>
            <FormFieldRow onClick={(event) => event.preventDefault()}>
                <FormFieldLabel>{label}&nbsp;</FormFieldLabel>
                {!isFieldInEditMode(fieldName) && (
                    <FormField
                        className='read-only-field'
                        onClick={() => {
                            editField(fieldName)
                        }}>{recipe[fieldName]}</FormField>
                )}
                {isFieldInEditMode(fieldName) && (
                    <FormField as={InputType} id={fieldName}
                               className="recipe-detail-field"
                               autoFocus={isAutoFocused}
                        // pass a value:string even if fieldName is null/undefined to avoid controlled component error
                               value={recipe[fieldName] || ''}
                               onChange={event => {
                                   setRecipeField(fieldName, event.target.value)
                               }}
                               onBlur={() => unfocusField()}
                               onKeyUp={(event) => unfocusFieldOnEnter(event)}
                               onFocus={() => editField(fieldName)}
                               type={type}
                               rows='3'
                               placeholder={fieldName}
                               name={fieldName}
                               required={required}
                    />
                )}
                {isFieldInEditMode(fieldName) && required && (
                    <div className="alert alert-danger form-field-invalid">
                        {requiredErrorText}
                    </div>
                )}
            </FormFieldRow>
        </div>
    )
};
export default RecipeDetailField;
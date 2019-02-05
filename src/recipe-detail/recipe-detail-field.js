import React from 'react';
import PropTypes from 'prop-types';
import RecipePropType from './RecipePropType';
import * as Styled from '../style/RecipeForm';

function RecipeDetailField(
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
    }) {
    const isAutoFocused = isFieldInEditAndFocus(fieldName);
    let InputType = type === 'textarea' ? 'textarea' : 'input';
    return (
        <div>
            <Styled.FormFieldRow onClick={(event) => event.preventDefault()}>
                <Styled.FormFieldLabel>{label}&nbsp;</Styled.FormFieldLabel>
                {!isFieldInEditMode(fieldName) && (
                    <Styled.FormField
                        className='read-only-field'
                        onClick={() => {
                            editField(fieldName)
                        }}>{recipe[fieldName]}</Styled.FormField>
                )}
                {isFieldInEditMode(fieldName) && (
                    <Styled.FormField as={InputType} id={fieldName}
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
            </Styled.FormFieldRow>
        </div>
    )
};

RecipeDetailField.propTypes = {
    recipe: RecipePropType,
    type: PropTypes.string.isRequired,
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
};
export default RecipeDetailField;
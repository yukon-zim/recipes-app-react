export default class FormValidHelper {
   static isFormValid = (form) => {
        return form && form.checkValidity();
    };
}

// export { isFormValid };
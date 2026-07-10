export class FormValidator {
    config;
    formElement;
    inputList;
    submitButton;
    constructor(config, formElement) {
        this.config = config;
        this.formElement = formElement;
        this.inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
        const submitButton = this.formElement.querySelector(this.config.submitButtonSelector);
        if (!submitButton) {
            throw new Error(`No se encontró el botón Submit con el selector "${this.config.submitButtonSelector}".`);
        }
        this.submitButton = submitButton;
    }
    getErrorElement(inputElement) {
        return this.formElement.querySelector(`.${inputElement.id}-error`);
    }
    showInputError(inputElement) {
        const errorElement = this.getErrorElement(inputElement);
        if (!errorElement) {
            return;
        }
        inputElement.classList.add(this.config.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this.config.errorClass);
    }
    hideInputError(inputElement) {
        const errorElement = this.getErrorElement(inputElement);
        if (!errorElement) {
            return;
        }
        inputElement.classList.remove(this.config.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this.config.errorClass);
    }
    checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this.showInputError(inputElement);
            return;
        }
        this.hideInputError(inputElement);
    }
    hasInvalidInput() {
        return this.inputList.some((inputElement) => !inputElement.validity.valid);
    }
    disableSubmitButton() {
        this.submitButton.classList.add(this.config.inactiveButtonClass);
        this.submitButton.disabled = true;
    }
    enableSubmitButton() {
        this.submitButton.classList.remove(this.config.inactiveButtonClass);
        this.submitButton.disabled = false;
    }
    toggleButtonState() {
        if (this.hasInvalidInput()) {
            this.disableSubmitButton();
            return;
        }
        this.enableSubmitButton();
    }
    setEventListeners() {
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener("focus", (event) => {
                const target = event.currentTarget;
                if (!(target instanceof HTMLInputElement)) {
                    return;
                }
                if (!target.validity.valid) {
                    this.checkInputValidity(target);
                }
            });
            inputElement.addEventListener("input", (event) => {
                const target = event.currentTarget;
                if (!(target instanceof HTMLInputElement)) {
                    return;
                }
                this.checkInputValidity(target);
                this.toggleButtonState();
            });
        });
    }
    enableValidation() {
        this.setEventListeners();
        this.resetValidation();
    }
    resetValidation() {
        this.inputList.forEach((inputElement) => {
            this.hideInputError(inputElement);
        });
        this.toggleButtonState();
    }
}

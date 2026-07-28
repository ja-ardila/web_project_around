import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    formElement;
    inputList;
    submitButton;
    submitButtonText;
    handleFormSubmit;
    isSubmitting = false;
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        const formElement = this.popupElement.querySelector(".popup__form");
        const submitButton = this.popupElement.querySelector(".popup__button");
        if (!formElement || !submitButton) {
            throw new Error(`No se encontró el formulario en "${popupSelector}".`);
        }
        this.formElement = formElement;
        this.inputList = Array.from(this.formElement.querySelectorAll(".popup__input"));
        this.submitButton = submitButton;
        this.submitButtonText =
            submitButton.textContent?.trim() ?? "Guardar";
        this.handleFormSubmit = handleFormSubmit;
    }
    getInputValues() {
        return this.inputList.reduce((values, inputElement) => {
            values[inputElement.name] =
                inputElement.value;
            return values;
        }, {});
    }
    setLoadingState(isLoading) {
        this.isSubmitting = isLoading;
        this.formElement.setAttribute("aria-busy", String(isLoading));
        this.submitButton.setAttribute("aria-disabled", String(isLoading));
        this.submitButton.classList.toggle("popup__button_loading", isLoading);
        this.submitButton.textContent = isLoading
            ? "Guardando..."
            : this.submitButtonText;
    }
    async handleSubmit() {
        if (this.isSubmitting) {
            return;
        }
        const inputValues = this.getInputValues();
        this.setLoadingState(true);
        try {
            await this.handleFormSubmit(inputValues);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            this.setLoadingState(false);
        }
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            void this.handleSubmit();
        });
    }
    close() {
        super.close();
        this.formElement.reset();
    }
}

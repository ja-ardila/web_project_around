import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    formElement;
    inputList;
    handleFormSubmit;
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        const formElement = this.popupElement.querySelector(".popup__form");
        if (!formElement) {
            throw new Error(`No se encontró el formulario en "${popupSelector}".`);
        }
        this.formElement = formElement;
        this.inputList = Array.from(this.formElement.querySelectorAll(".popup__input"));
        this.handleFormSubmit = handleFormSubmit;
    }
    getInputValues() {
        return this.inputList.reduce((values, inputElement) => {
            values[inputElement.name] =
                inputElement.value;
            return values;
        }, {});
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            const inputValues = this.getInputValues();
            this.handleFormSubmit(inputValues);
        });
    }
    close() {
        super.close();
        this.formElement.reset();
    }
}

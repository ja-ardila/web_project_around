import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    formElement;
    submitButton;
    handleConfirm = null;
    constructor(popupSelector) {
        super(popupSelector);
        const formElement = this.popupElement.querySelector(".popup__form");
        const submitButton = this.popupElement.querySelector(".popup__button");
        if (!formElement || !submitButton) {
            throw new Error(`No se encontró el formulario de confirmación en "${popupSelector}".`);
        }
        this.formElement = formElement;
        this.submitButton = submitButton;
    }
    setSubmitAction(handleConfirm) {
        this.handleConfirm = handleConfirm;
    }
    async handleSubmit() {
        if (!this.handleConfirm) {
            return;
        }
        this.submitButton.disabled = true;
        try {
            await this.handleConfirm();
            this.close();
        }
        catch (err) {
            console.error(err);
        }
        finally {
            this.submitButton.disabled = false;
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
        this.handleConfirm = null;
    }
}

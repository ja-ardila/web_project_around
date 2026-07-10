import type { FormValidationConfig } from "../utils/constants.js";

export class FormValidator {
  private config: FormValidationConfig;
  private formElement: HTMLFormElement;
  private inputList: HTMLInputElement[];
  private submitButton: HTMLButtonElement;

  constructor(
    config: FormValidationConfig,
    formElement: HTMLFormElement,
  ) {
    this.config = config;
    this.formElement = formElement;

    this.inputList = Array.from(
      this.formElement.querySelectorAll<HTMLInputElement>(
        this.config.inputSelector,
      ),
    );

    const submitButton =
      this.formElement.querySelector<HTMLButtonElement>(
        this.config.submitButtonSelector,
      );

    if (!submitButton) {
      throw new Error(
        `No se encontró el botón Submit con el selector "${this.config.submitButtonSelector}".`,
      );
    }

    this.submitButton = submitButton;
  }

  private getErrorElement(
    inputElement: HTMLInputElement,
  ): HTMLElement | null {
    return this.formElement.querySelector<HTMLElement>(
      `.${inputElement.id}-error`,
    );
  }

  private showInputError(inputElement: HTMLInputElement): void {
    const errorElement = this.getErrorElement(inputElement);

    if (!errorElement) {
      return;
    }

    inputElement.classList.add(this.config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this.config.errorClass);
  }

  private hideInputError(inputElement: HTMLInputElement): void {
    const errorElement = this.getErrorElement(inputElement);

    if (!errorElement) {
      return;
    }

    inputElement.classList.remove(this.config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this.config.errorClass);
  }

  private checkInputValidity(inputElement: HTMLInputElement): void {
    if (!inputElement.validity.valid) {
      this.showInputError(inputElement);
      return;
    }

    this.hideInputError(inputElement);
  }

  private hasInvalidInput(): boolean {
    return this.inputList.some(
      (inputElement) => !inputElement.validity.valid,
    );
  }

  private disableSubmitButton(): void {
    this.submitButton.classList.add(
      this.config.inactiveButtonClass,
    );

    this.submitButton.disabled = true;
  }

  private enableSubmitButton(): void {
    this.submitButton.classList.remove(
      this.config.inactiveButtonClass,
    );

    this.submitButton.disabled = false;
  }

  private toggleButtonState(): void {
    if (this.hasInvalidInput()) {
      this.disableSubmitButton();
      return;
    }

    this.enableSubmitButton();
  }

  private setEventListeners(): void {
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("focus", (event: FocusEvent) => {
        const target = event.currentTarget;

        if (!(target instanceof HTMLInputElement)) {
          return;
        }

        if (!target.validity.valid) {
          this.checkInputValidity(target);
        }
      });

      inputElement.addEventListener("input", (event: Event) => {
        const target = event.currentTarget;

        if (!(target instanceof HTMLInputElement)) {
          return;
        }

        this.checkInputValidity(target);
        this.toggleButtonState();
      });
    });
  }

  public enableValidation(): void {
    this.setEventListeners();
    this.resetValidation();
  }

  public resetValidation(): void {
    this.inputList.forEach((inputElement) => {
      this.hideInputError(inputElement);
    });

    this.toggleButtonState();
  }
}
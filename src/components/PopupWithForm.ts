import { Popup } from "./Popup.js";

export type FormInputValues = Record<string, string>;

export type FormSubmitHandler = (
  inputValues: FormInputValues,
) => Promise<void>;

export class PopupWithForm extends Popup {
  private formElement: HTMLFormElement;
  private inputList: HTMLInputElement[];
  private submitButton: HTMLButtonElement;
  private submitButtonText: string;
  private handleFormSubmit: FormSubmitHandler;
  private isSubmitting = false;

  constructor(
    popupSelector: string,
    handleFormSubmit: FormSubmitHandler,
  ) {
    super(popupSelector);

    const formElement =
      this.popupElement.querySelector<HTMLFormElement>(
        ".popup__form",
      );

    const submitButton =
      this.popupElement.querySelector<HTMLButtonElement>(
        ".popup__button",
      );

    if (!formElement || !submitButton) {
      throw new Error(
        `No se encontró el formulario en "${popupSelector}".`,
      );
    }

    this.formElement = formElement;
    this.inputList = Array.from(
      this.formElement.querySelectorAll<HTMLInputElement>(
        ".popup__input",
      ),
    );

    this.submitButton = submitButton;
    this.submitButtonText =
      submitButton.textContent?.trim() ?? "Guardar";
    this.handleFormSubmit = handleFormSubmit;
  }

  private getInputValues(): FormInputValues {
    return this.inputList.reduce<FormInputValues>(
      (values, inputElement) => {
        values[inputElement.name] =
          inputElement.value;

        return values;
      },
      {},
    );
  }

  private setLoadingState(isLoading: boolean): void {
    this.isSubmitting = isLoading;
    this.formElement.setAttribute(
      "aria-busy",
      String(isLoading),
    );
    this.submitButton.setAttribute(
      "aria-disabled",
      String(isLoading),
    );
    this.submitButton.classList.toggle(
      "popup__button_loading",
      isLoading,
    );
    this.submitButton.textContent = isLoading
      ? "Guardando..."
      : this.submitButtonText;
  }

  private async handleSubmit(): Promise<void> {
    if (this.isSubmitting) {
      return;
    }

    const inputValues = this.getInputValues();
    this.setLoadingState(true);

    try {
      await this.handleFormSubmit(inputValues);
    } catch (err) {
      console.error(err);
    } finally {
      this.setLoadingState(false);
    }
  }

  public override setEventListeners(): void {
    super.setEventListeners();

    this.formElement.addEventListener(
      "submit",
      (event: SubmitEvent) => {
        event.preventDefault();
        void this.handleSubmit();
      },
    );
  }

  public override close(): void {
    super.close();
    this.formElement.reset();
  }
}

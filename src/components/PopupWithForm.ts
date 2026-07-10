import { Popup } from "./Popup.js";

export type FormInputValues = Record<string, string>;

export type FormSubmitHandler = (
  inputValues: FormInputValues,
) => void;

export class PopupWithForm extends Popup {
  private formElement: HTMLFormElement;
  private inputList: HTMLInputElement[];
  private handleFormSubmit: FormSubmitHandler;

  constructor(
    popupSelector: string,
    handleFormSubmit: FormSubmitHandler,
  ) {
    super(popupSelector);

    const formElement =
      this.popupElement.querySelector<HTMLFormElement>(
        ".popup__form",
      );

    if (!formElement) {
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

  public override setEventListeners(): void {
    super.setEventListeners();

    this.formElement.addEventListener(
      "submit",
      (event: SubmitEvent) => {
        event.preventDefault();

        const inputValues = this.getInputValues();

        this.handleFormSubmit(inputValues);
      },
    );
  }

  public override close(): void {
    super.close();
    this.formElement.reset();
  }
}
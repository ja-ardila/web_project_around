import { Popup } from "./Popup.js";

type ConfirmationHandler = () => Promise<void>;

export class PopupWithConfirmation extends Popup {
  private formElement: HTMLFormElement;
  private submitButton: HTMLButtonElement;
  private handleConfirm: ConfirmationHandler | null =
    null;

  constructor(popupSelector: string) {
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
        `No se encontró el formulario de confirmación en "${popupSelector}".`,
      );
    }

    this.formElement = formElement;
    this.submitButton = submitButton;
  }

  public setSubmitAction(
    handleConfirm: ConfirmationHandler,
  ): void {
    this.handleConfirm = handleConfirm;
  }

  private async handleSubmit(): Promise<void> {
    if (!this.handleConfirm) {
      return;
    }

    this.submitButton.disabled = true;

    try {
      await this.handleConfirm();
      this.close();
    } catch (err) {
      console.error(err);
    } finally {
      this.submitButton.disabled = false;
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
    this.handleConfirm = null;
  }
}

import { Popup } from "./Popup.js";

export interface PopupImageData {
  name: string;
  link: string;
}

export class PopupWithImage extends Popup {
  private popupImage: HTMLImageElement;
  private popupCaption: HTMLElement;

  constructor(popupSelector: string) {
    super(popupSelector);

    const popupImage =
      this.popupElement.querySelector<HTMLImageElement>(
        ".popup__image",
      );

    const popupCaption =
      this.popupElement.querySelector<HTMLElement>(
        ".popup__caption",
      );

    if (!popupImage || !popupCaption) {
      throw new Error(
        `El popup "${popupSelector}" no contiene la imagen o la leyenda.`,
      );
    }

    this.popupImage = popupImage;
    this.popupCaption = popupCaption;
  }

  public override open(
    data?: PopupImageData,
  ): void {
    if (!data) {
      throw new Error(
        "Se requieren los datos de la imagen para abrir el popup.",
      );
    }

    this.popupImage.src = data.link;
    this.popupImage.alt = data.name;
    this.popupCaption.textContent = data.name;

    super.open();
  }
}
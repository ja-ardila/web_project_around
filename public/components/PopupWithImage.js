import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    popupImage;
    popupCaption;
    constructor(popupSelector) {
        super(popupSelector);
        const popupImage = this.popupElement.querySelector(".popup__image");
        const popupCaption = this.popupElement.querySelector(".popup__caption");
        if (!popupImage || !popupCaption) {
            throw new Error(`El popup "${popupSelector}" no contiene la imagen o la leyenda.`);
        }
        this.popupImage = popupImage;
        this.popupCaption = popupCaption;
    }
    open(data) {
        if (!data) {
            throw new Error("Se requieren los datos de la imagen para abrir el popup.");
        }
        this.popupImage.src = data.link;
        this.popupImage.alt = data.name;
        this.popupCaption.textContent = data.name;
        super.open();
    }
}

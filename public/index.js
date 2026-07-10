import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithForm, } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Section } from "./components/Section.js";
import { defaultFormConfig, initialCards, } from "./utils/constants.js";
import { UserInfo, } from "./components/UserInfo.js";
/**
 * Busca un elemento del DOM y genera un error si no existe.
 */
function getRequiredElement(selector, parent = document) {
    const element = parent.querySelector(selector);
    if (!element) {
        throw new Error(`No se encontró el elemento: "${selector}".`);
    }
    return element;
}
const editButton = getRequiredElement(".profile__edit-button");
const addButton = getRequiredElement(".profile__add-button");
// Elementos del formulario de edición.
const editPopupElement = getRequiredElement("#edit-popup");
const editForm = getRequiredElement(".popup__form", editPopupElement);
const editNameInput = getRequiredElement(".popup__input_type_name", editForm);
const editDescriptionInput = getRequiredElement(".popup__input_type_description", editForm);
// Elementos del formulario para agregar tarjetas.
const newCardPopupElement = getRequiredElement("#new-card-popup");
const addForm = getRequiredElement(".popup__form", newCardPopupElement);
// Validadores.
const editFormValidator = new FormValidator(defaultFormConfig, editForm);
const addFormValidator = new FormValidator(defaultFormConfig, addForm);
// Popup de imagen.
const imagePopup = new PopupWithImage("#image-popup");
function handleCardClick(name, link) {
    imagePopup.open({
        name,
        link,
    });
}
// Creación de tarjetas.
function createCard(cardData) {
    const card = new Card(cardData, "#card-template", handleCardClick);
    return card.generateCard();
}
// Sección de tarjetas.
let cardSection;
cardSection = new Section({
    items: initialCards,
    renderer: (cardData) => {
        const cardElement = createCard(cardData);
        cardSection.addItem(cardElement);
    },
}, ".cards__list");
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__description",
});
// Popup de edición del perfil.
const editPopup = new PopupWithForm("#edit-popup", (inputValues) => {
    const userData = {
        name: inputValues.name ?? "",
        job: inputValues.description ?? "",
    };
    userInfo.setUserInfo(userData);
    editPopup.close();
});
// Popup para agregar tarjetas.
const newCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
    const cardData = {
        name: inputValues.name ?? "",
        link: inputValues.link ?? "",
    };
    const cardElement = createCard(cardData);
    cardSection.addItem(cardElement);
    newCardPopup.close();
});
function fillProfileForm() {
    const currentUserInfo = userInfo.getUserInfo();
    editNameInput.value = currentUserInfo.name;
    editDescriptionInput.value = currentUserInfo.job;
}
// Activación de los listeners de los popups.
editPopup.setEventListeners();
newCardPopup.setEventListeners();
imagePopup.setEventListeners();
// Activación de la validación.
editFormValidator.enableValidation();
addFormValidator.enableValidation();
// Apertura del popup de edición.
editButton.addEventListener("click", () => {
    fillProfileForm();
    editFormValidator.resetValidation();
    editPopup.open();
});
// Apertura del popup para agregar tarjetas.
addButton.addEventListener("click", () => {
    addForm.reset();
    addFormValidator.resetValidation();
    newCardPopup.open();
});
// Renderizado de las tarjetas iniciales.
cardSection.renderItems();

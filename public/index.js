import { Api } from "./components/Api.js";
import { Card, } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithForm, } from "./components/PopupWithForm.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Section } from "./components/Section.js";
import { defaultFormConfig } from "./utils/constants.js";
import { UserInfo, } from "./components/UserInfo.js";
const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
        authorization: "0643131e-75cd-455c-bdf0-2b7687c050c4",
        "Content-Type": "application/json",
    },
});
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
const avatarEditButton = getRequiredElement(".profile__avatar-button");
// Elementos del formulario de edición.
const editPopupElement = getRequiredElement("#edit-popup");
const editForm = getRequiredElement(".popup__form", editPopupElement);
const editNameInput = getRequiredElement(".popup__input_type_name", editForm);
const editDescriptionInput = getRequiredElement(".popup__input_type_description", editForm);
// Elementos del formulario para cambiar el avatar.
const avatarPopupElement = getRequiredElement("#avatar-popup");
const avatarForm = getRequiredElement(".popup__form", avatarPopupElement);
// Elementos del formulario para agregar tarjetas.
const newCardPopupElement = getRequiredElement("#new-card-popup");
const addForm = getRequiredElement(".popup__form", newCardPopupElement);
// Validadores.
const editFormValidator = new FormValidator(defaultFormConfig, editForm);
const avatarFormValidator = new FormValidator(defaultFormConfig, avatarForm);
const addFormValidator = new FormValidator(defaultFormConfig, addForm);
// Popup de imagen.
const imagePopup = new PopupWithImage("#image-popup");
// Popup de confirmación para eliminar una tarjeta.
const confirmationPopup = new PopupWithConfirmation("#delete-card-popup");
function handleCardClick(name, link) {
    imagePopup.open({
        name,
        link,
    });
}
async function changeCardLike(cardId, isLiked) {
    const updatedCard = await api.changeLikeStatus(cardId, isLiked);
    return updatedCard.isLiked;
}
function handleCardDelete(card) {
    confirmationPopup.setSubmitAction(async () => {
        await api.deleteCard(card.getId());
        card.removeCard();
    });
    confirmationPopup.open();
}
// Creación de tarjetas.
function createCard(cardData) {
    const card = new Card(cardData, "#card-template", handleCardClick, changeCardLike, handleCardDelete, currentUserId);
    return card.generateCard();
}
// Sección de tarjetas.
const cardSection = new Section({
    items: [],
    renderer: (cardData) => {
        const cardElement = createCard(cardData);
        cardSection.addItem(cardElement);
    },
}, ".cards__list");
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    jobSelector: ".profile__description",
    avatarSelector: ".profile__image",
});
let currentUserId = "";
async function updateUserProfile(profileData) {
    try {
        const userData = await api.updateUserInfo(profileData);
        currentUserId = userData._id;
        userInfo.setUserInfo(userData);
        editPopup.close();
    }
    catch (err) {
        console.error(err);
    }
}
async function updateUserAvatar(avatarData) {
    try {
        const userData = await api.updateUserAvatar(avatarData);
        currentUserId = userData._id;
        userInfo.setUserInfo(userData);
        avatarPopup.close();
    }
    catch (err) {
        console.error(err);
    }
}
async function addNewCard(cardData) {
    try {
        const newCard = await api.addCard(cardData);
        const cardElement = createCard(newCard);
        cardSection.addItem(cardElement);
        newCardPopup.close();
    }
    catch (err) {
        console.error(err);
    }
}
// Popup de edición del perfil.
const editPopup = new PopupWithForm("#edit-popup", async (inputValues) => {
    const profileData = {
        name: inputValues.name ?? "",
        about: inputValues.description ?? "",
    };
    await updateUserProfile(profileData);
});
// Popup para cambiar el avatar.
const avatarPopup = new PopupWithForm("#avatar-popup", async (inputValues) => {
    const avatarData = {
        avatar: inputValues.avatar ?? "",
    };
    await updateUserAvatar(avatarData);
});
// Popup para agregar tarjetas.
const newCardPopup = new PopupWithForm("#new-card-popup", async (inputValues) => {
    const cardData = {
        name: inputValues.name ?? "",
        link: inputValues.link ?? "",
    };
    await addNewCard(cardData);
});
function fillProfileForm() {
    const currentUserInfo = userInfo.getUserInfo();
    editNameInput.value = currentUserInfo.name;
    editDescriptionInput.value = currentUserInfo.about;
}
// Activación de los listeners de los popups.
editPopup.setEventListeners();
avatarPopup.setEventListeners();
newCardPopup.setEventListeners();
imagePopup.setEventListeners();
confirmationPopup.setEventListeners();
// Activación de la validación.
editFormValidator.enableValidation();
avatarFormValidator.enableValidation();
addFormValidator.enableValidation();
// Apertura del popup de edición.
editButton.addEventListener("click", () => {
    fillProfileForm();
    editFormValidator.resetValidation();
    editPopup.open();
});
// Apertura del popup para cambiar el avatar.
avatarEditButton.addEventListener("click", () => {
    avatarForm.reset();
    avatarFormValidator.resetValidation();
    avatarPopup.open();
});
// Apertura del popup para agregar tarjetas.
addButton.addEventListener("click", () => {
    addForm.reset();
    addFormValidator.resetValidation();
    newCardPopup.open();
});
async function initializePage() {
    try {
        const [userData, initialCards] = await Promise.all([
            api.getUserInfo(),
            api.getInitialCards(),
        ]);
        currentUserId = userData._id;
        userInfo.setUserInfo(userData);
        cardSection.renderItems([...initialCards].reverse());
    }
    catch (err) {
        console.error("Fallo al cargar datos iniciales:", err);
    }
}
// Obtención del perfil y las tarjetas desde la API.
void initializePage();

import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithForm, } from "./components/PopupWithForm.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Section } from "./components/Section.js";
import { defaultFormConfig, } from "./utils/constants.js";
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
    const res = await fetch(`https://around-api.es.tripleten-services.com/v1/cards/${cardId}/likes`, {
        method: isLiked ? "DELETE" : "PUT",
        headers: {
            authorization: "0643131e-75cd-455c-bdf0-2b7687c050c4",
        },
    });
    if (!res.ok) {
        throw new Error(`Error al modificar el Me gusta: ${res.status}`);
    }
    const result = (await res.json());
    console.log(result);
    return result.isLiked;
}
async function deleteCard(cardId) {
    const res = await fetch(`https://around-api.es.tripleten-services.com/v1/cards/${cardId}`, {
        method: "DELETE",
        headers: {
            authorization: "0643131e-75cd-455c-bdf0-2b7687c050c4",
        },
    });
    if (!res.ok) {
        throw new Error(`Error al eliminar la tarjeta: ${res.status}`);
    }
}
function handleCardDelete(card) {
    confirmationPopup.setSubmitAction(async () => {
        await deleteCard(card.getId());
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
async function getUserProfile() {
    try {
        const res = await fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
            headers: {
                authorization: "0643131e-75cd-455c-bdf0-2b7687c050c4",
            },
        });
        if (!res.ok) {
            throw new Error(`Error al obtener el perfil: ${res.status}`);
        }
        const result = (await res.json());
        console.log(result);
        currentUserId = result._id;
        userInfo.setUserInfo({
            name: result.name,
            job: result.about,
            avatar: result.avatar,
        });
    }
    catch (err) {
        console.error(err);
    }
}
async function getInitialCards() {
    try {
        const res = await fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
            headers: {
                authorization: "0643131e-75cd-455c-bdf0-2b7687c050c4",
            },
        });
        if (!res.ok) {
            throw new Error(`Error al obtener las tarjetas: ${res.status}`);
        }
        const result = (await res.json());
        console.log(result);
        cardSection.renderItems([...result].reverse());
    }
    catch (err) {
        console.error(err);
    }
}
async function updateUserProfile(inputValues) {
    try {
        const res = await fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
            method: "PATCH",
            headers: {
                authorization: "0643131e-75cd-455c-bdf0-2b7687c050c4",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: inputValues.name ?? "",
                about: inputValues.description ?? "",
            }),
        });
        if (!res.ok) {
            throw new Error(`Error al actualizar el perfil: ${res.status}`);
        }
        const result = (await res.json());
        console.log(result);
        currentUserId = result._id;
        userInfo.setUserInfo({
            name: result.name,
            job: result.about,
            avatar: result.avatar,
        });
        editPopup.close();
    }
    catch (err) {
        console.error(err);
    }
}
async function updateUserAvatar(inputValues) {
    try {
        const res = await fetch("https://around-api.es.tripleten-services.com/v1/users/me/avatar", {
            method: "PATCH",
            headers: {
                authorization: "0643131e-75cd-455c-bdf0-2b7687c050c4",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                avatar: inputValues.avatar ?? "",
            }),
        });
        if (!res.ok) {
            throw new Error(`Error al actualizar el avatar: ${res.status}`);
        }
        const result = (await res.json());
        console.log(result);
        currentUserId = result._id;
        userInfo.setUserInfo({
            name: result.name,
            job: result.about,
            avatar: result.avatar,
        });
        avatarPopup.close();
    }
    catch (err) {
        console.error(err);
    }
}
async function addNewCard(inputValues) {
    try {
        const res = await fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
            method: "POST",
            headers: {
                authorization: "0643131e-75cd-455c-bdf0-2b7687c050c4",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: inputValues.name ?? "",
                link: inputValues.link ?? "",
            }),
        });
        if (!res.ok) {
            throw new Error(`Error al crear la tarjeta: ${res.status}`);
        }
        const result = (await res.json());
        console.log(result);
        const cardElement = createCard(result);
        cardSection.addItem(cardElement);
        newCardPopup.close();
    }
    catch (err) {
        console.error(err);
    }
}
// Popup de edición del perfil.
const editPopup = new PopupWithForm("#edit-popup", async (inputValues) => {
    await updateUserProfile(inputValues);
});
// Popup para cambiar el avatar.
const avatarPopup = new PopupWithForm("#avatar-popup", async (inputValues) => {
    await updateUserAvatar(inputValues);
});
// Popup para agregar tarjetas.
const newCardPopup = new PopupWithForm("#new-card-popup", async (inputValues) => {
    await addNewCard(inputValues);
});
function fillProfileForm() {
    const currentUserInfo = userInfo.getUserInfo();
    editNameInput.value = currentUserInfo.name;
    editDescriptionInput.value = currentUserInfo.job;
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
    await getUserProfile();
    await getInitialCards();
}
// Obtención del perfil y las tarjetas desde la API.
void initializePage();

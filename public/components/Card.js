export class Card {
    data;
    templateSelector;
    handleCardClick;
    handleCardLike;
    handleCardDelete;
    currentUserId;
    element;
    imageElement;
    titleElement;
    likeButton;
    deleteButton;
    constructor(data, templateSelector, handleCardClick, handleCardLike, handleCardDelete, currentUserId) {
        this.data = data;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
        this.handleCardLike = handleCardLike;
        this.handleCardDelete = handleCardDelete;
        this.currentUserId = currentUserId;
    }
    getTemplate() {
        const templateElement = document.querySelector(this.templateSelector);
        if (!templateElement) {
            throw new Error(`No se encontró el template "${this.templateSelector}".`);
        }
        const cardElement = templateElement.content
            .querySelector(".card")
            ?.cloneNode(true);
        if (!(cardElement instanceof HTMLElement)) {
            throw new Error('No se encontró el elemento ".card" dentro del template.');
        }
        return cardElement;
    }
    updateLikeButton() {
        this.likeButton.classList.toggle("card__like-button_is-active", this.data.isLiked);
        this.likeButton.setAttribute("aria-label", this.data.isLiked
            ? "Quitar Me gusta"
            : "Dar Me gusta");
    }
    async handleLikeButtonClick() {
        this.likeButton.disabled = true;
        try {
            this.data.isLiked = await this.handleCardLike(this.data._id, this.data.isLiked);
            this.updateLikeButton();
        }
        catch (err) {
            console.error(err);
        }
        finally {
            this.likeButton.disabled = false;
        }
    }
    handleDeleteButtonClick() {
        this.handleCardDelete(this);
    }
    setEventListeners() {
        this.likeButton.addEventListener("click", () => {
            void this.handleLikeButtonClick();
        });
        if (this.data.owner === this.currentUserId) {
            this.deleteButton.addEventListener("click", () => {
                this.handleDeleteButtonClick();
            });
        }
        this.imageElement.addEventListener("click", () => {
            this.handleCardClick(this.data.name, this.data.link);
        });
    }
    generateCard() {
        this.element = this.getTemplate();
        const imageElement = this.element.querySelector(".card__image");
        const titleElement = this.element.querySelector(".card__title");
        const likeButton = this.element.querySelector(".card__like-button");
        const deleteButton = this.element.querySelector(".card__delete-button");
        if (!imageElement ||
            !titleElement ||
            !likeButton ||
            !deleteButton) {
            throw new Error("La tarjeta no contiene todos los elementos esperados.");
        }
        this.imageElement = imageElement;
        this.titleElement = titleElement;
        this.likeButton = likeButton;
        this.deleteButton = deleteButton;
        this.imageElement.src = this.data.link;
        this.imageElement.alt = this.data.name;
        this.titleElement.textContent = this.data.name;
        this.updateLikeButton();
        if (this.data.owner !== this.currentUserId) {
            this.deleteButton.remove();
        }
        this.setEventListeners();
        return this.element;
    }
    getId() {
        return this.data._id;
    }
    removeCard() {
        this.element.remove();
    }
}

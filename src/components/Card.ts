export interface CardData {
  name: string;
  link: string;
  _id: string;
  isLiked: boolean;
  owner: string;
}

type HandleCardClick = (
  name: string,
  link: string,
) => void;

type HandleCardLike = (
  cardId: string,
  isLiked: boolean,
) => Promise<boolean>;

type HandleCardDelete = (card: Card) => void;

export class Card {
  private data: CardData;
  private templateSelector: string;
  private handleCardClick: HandleCardClick;
  private handleCardLike: HandleCardLike;
  private handleCardDelete: HandleCardDelete;
  private currentUserId: string;

  private element!: HTMLElement;
  private imageElement!: HTMLImageElement;
  private titleElement!: HTMLElement;
  private likeButton!: HTMLButtonElement;
  private deleteButton!: HTMLButtonElement;

  constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: HandleCardClick,
    handleCardLike: HandleCardLike,
    handleCardDelete: HandleCardDelete,
    currentUserId: string,
  ) {
    this.data = data;
    this.templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
    this.handleCardLike = handleCardLike;
    this.handleCardDelete = handleCardDelete;
    this.currentUserId = currentUserId;
  }

  private getTemplate(): HTMLElement {
    const templateElement =
      document.querySelector<HTMLTemplateElement>(
        this.templateSelector,
      );

    if (!templateElement) {
      throw new Error(
        `No se encontró el template "${this.templateSelector}".`,
      );
    }

    const cardElement =
      templateElement.content
        .querySelector<HTMLElement>(".card")
        ?.cloneNode(true);

    if (!(cardElement instanceof HTMLElement)) {
      throw new Error(
        'No se encontró el elemento ".card" dentro del template.',
      );
    }

    return cardElement;
  }

  private updateLikeButton(): void {
    this.likeButton.classList.toggle(
      "card__like-button_is-active",
      this.data.isLiked,
    );

    this.likeButton.setAttribute(
      "aria-label",
      this.data.isLiked
        ? "Quitar Me gusta"
        : "Dar Me gusta",
    );
  }

  private async handleLikeButtonClick(): Promise<void> {
    this.likeButton.disabled = true;

    try {
      this.data.isLiked = await this.handleCardLike(
        this.data._id,
        this.data.isLiked,
      );
      this.updateLikeButton();
    } catch (err) {
      console.error(err);
    } finally {
      this.likeButton.disabled = false;
    }
  }

  private handleDeleteButtonClick(): void {
    this.handleCardDelete(this);
  }

  private setEventListeners(): void {
    this.likeButton.addEventListener("click", () => {
      void this.handleLikeButtonClick();
    });

    if (this.data.owner === this.currentUserId) {
      this.deleteButton.addEventListener("click", () => {
        this.handleDeleteButtonClick();
      });
    }

    this.imageElement.addEventListener("click", () => {
      this.handleCardClick(
        this.data.name,
        this.data.link,
      );
    });
  }

  public generateCard(): HTMLElement {
    this.element = this.getTemplate();

    const imageElement =
      this.element.querySelector<HTMLImageElement>(
        ".card__image",
      );

    const titleElement =
      this.element.querySelector<HTMLElement>(
        ".card__title",
      );

    const likeButton =
      this.element.querySelector<HTMLButtonElement>(
        ".card__like-button",
      );

    const deleteButton =
      this.element.querySelector<HTMLButtonElement>(
        ".card__delete-button",
      );

    if (
      !imageElement ||
      !titleElement ||
      !likeButton ||
      !deleteButton
    ) {
      throw new Error(
        "La tarjeta no contiene todos los elementos esperados.",
      );
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

  public getId(): string {
    return this.data._id;
  }

  public removeCard(): void {
    this.element.remove();
  }
}

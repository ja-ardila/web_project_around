export interface CardData {
  name: string;
  link: string;
}

type HandleCardClick = (
  name: string,
  link: string,
) => void;

export class Card {
  private data: CardData;
  private templateSelector: string;
  private handleCardClick: HandleCardClick;

  private element!: HTMLElement;
  private imageElement!: HTMLImageElement;
  private titleElement!: HTMLElement;
  private likeButton!: HTMLButtonElement;
  private deleteButton!: HTMLButtonElement;

  constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: HandleCardClick,
  ) {
    this.data = data;
    this.templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
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

  private handleLikeButtonClick(): void {
    this.likeButton.classList.toggle(
      "card__like-button_is-active",
    );
  }

  private handleDeleteButtonClick(): void {
    this.element.remove();
  }

  private setEventListeners(): void {
    this.likeButton.addEventListener("click", () => {
      this.handleLikeButtonClick();
    });

    this.deleteButton.addEventListener("click", () => {
      this.handleDeleteButtonClick();
    });

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

    this.setEventListeners();

    return this.element;
  }
}
interface SectionConfig<T> {
  items: T[];
  renderer: (item: T) => void;
}

export class Section<T> {
  private items: T[];
  private renderer: (item: T) => void;
  private container: HTMLElement;

  constructor(
    { items, renderer }: SectionConfig<T>,
    containerSelector: string,
  ) {
    this.items = items;
    this.renderer = renderer;

    const container =
      document.querySelector<HTMLElement>(
        containerSelector,
      );

    if (!container) {
      throw new Error(
        `No se encontró el contenedor "${containerSelector}".`,
      );
    }

    this.container = container;
  }

  public renderItems(): void {
    this.items.forEach((item) => {
      this.renderer(item);
    });
  }

  public addItem(element: HTMLElement): void {
    this.container.prepend(element);
  }
}
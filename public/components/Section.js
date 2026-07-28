export class Section {
    items;
    renderer;
    container;
    constructor({ items, renderer }, containerSelector) {
        this.items = items;
        this.renderer = renderer;
        const container = document.querySelector(containerSelector);
        if (!container) {
            throw new Error(`No se encontró el contenedor "${containerSelector}".`);
        }
        this.container = container;
    }
    renderItems(items = this.items) {
        items.forEach((item) => {
            this.renderer(item);
        });
    }
    addItem(element) {
        this.container.prepend(element);
    }
}

export default class Section {
    constructor({ items, renderer }, containerSelector) {
            this._items = items;
            this._renderer = renderer;
            this._container = document.querySelector(containerSelector);
        }
        //метод, перебирает массив данных items и вызывает для каждого элемента метод addItem.
    renderItems() {
            this._items.forEach((item) => {
                this.renderer(item); // возможно еще this._container
            });
        }
        //метод, который принимает DOM-элемент и добавляет его в контейнер.
    addItem() {
        this._container.prepend(element);
    }
}
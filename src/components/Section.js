export default class Section {
    constructor({ items, renderer, containerSelector }) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    //метод, перебирает массив данных items и вызывает для каждого элемента метод addItem.
    renderItems(data) {
        this._items = data;
        data.forEach(item => {
            this._renderer(item, this._container);
        });
    }

    //метод, который принимает DOM-элемент и добавляет его в контейнер.
    addItem(element) {
        this._container.prepend(element);
    }
}
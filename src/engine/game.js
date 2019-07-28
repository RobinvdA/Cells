import Loop from './loop';
import Renderer from './renderer';

export default class Game {

    constructor(container, options = {}) {
        this.container = container;

        this._onClickCallback = (x, y) => {};

        this.container.addEventListener('click', (event) => {
            let x = (event.pageX - container.offsetLeft) - this.offsetX;
            let y = (event.pageY - container.offsetTop) - this.offsetY;
console.log(event.pageX, container.offsetLeft);
            let cellX = Math.floor(x / this.cellSize);
            let cellY = Math.floor(y / this.cellSize);

            this._onClickCallback(x, y, cellX, cellY);
        }, false);

        this.container.width = this.container.getBoundingClientRect().width;
        this.container.height = this.container.getBoundingClientRect().height;

        this.context = container.getContext('2d');

        this.renderer = new Renderer(this);

        this.loop = new Loop();
        this.loop.onDraw(this.update.bind(this));

        this.columns = [];

        this.cellSize = options.cellSize || 20;
        this.gridHeight = 0;
        this.gridHeight = 0;

        this.offsetX = 0;
        this.offsetY = 0;

        this._movingToX = 0;
        this._movingToY = 0;
    }

    init(columns) {
        this.columns = columns;

        this.gridHeight = this.columns.length * this.cellSize;
        this.gridWidth = this.columns[0].cells.length * this.cellSize;

        return this;
    }

    center() {
        this.offsetX = -((this.gridWidth - this.container.width) / 2);
        this.offsetY = -((this.gridHeight - this.container.height) / 2);

        this.context.translate(this.offsetX, this.offsetY);

        return this;
    }

    move(direction, distance = null) {
        if (this._movingToX != 0 || this._movingToY != 0) return;

        switch (direction) {
            case 'left': this._movingToX -= distance || this.cellSize; break;
            case 'up': this._movingToY -= distance || this.cellSize; break;
            case 'right': this._movingToX += distance || this.cellSize; break;
            case 'down': this._movingToY += distance || this.cellSize; break;
        }
    }

    startMoving(direction) {
        this.move(direction, 100000);
    }

    stopMoving() {
        this._movingToX = 0;
        this._movingToY = 0;
    }

    render() {
        this.renderer.renderMap();

        return this;
    }

    run() {
        this.render();

        this.loop.start();
    }

    stop() {
        this.loop.stop();
    }

    update() {
        this.context.translate(-this.offsetX, -this.offsetY);

        if (this._movingToX > 0) {
            this._movingToX--;
            this.offsetX--;
        } else if (this._movingToX < 0) {
            this._movingToX++;
            this.offsetX++;
        }

        if (this._movingToY > 0) {
            this._movingToY--;
            this.offsetY--;
        } else if (this._movingToY < 0) {
            this._movingToY++;
            this.offsetY++;
        }

        this.context.clearRect(0, 0, this.container.width, this.container.height);

        this.context.translate(this.offsetX, this.offsetY);

        this.context.drawImage(this.renderer.map.container, 0, 0);
    }

    onClick(callback) {
        this._onClickCallback = callback;
    }
}

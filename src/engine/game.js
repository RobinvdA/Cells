import Loop from './loop';
import Renderer from './renderer';
import Resources from './resources';

export default class Game {

    constructor(container, options = {}) {
        this.container = container;

        this._onClickCallback = (x, y) => {};

        this.container.addEventListener('click', (event) => {
            let rect = this.container.getBoundingClientRect();
            let x = event.clientX - rect.left - this.offsetX;
            let y = event.clientY - rect.top - this.offsetY;

            let cellX = Math.floor(x / this.cellSize);
            let cellY = Math.floor(y / this.cellSize);

            this._onClickCallback(cellX, cellY, x, y);
        }, false);

        this.container.width = this.container.getBoundingClientRect().width;
        this.container.height = this.container.getBoundingClientRect().width;

        this.context = container.getContext('2d');

        this.loop = new Loop();
        this.loop.onDraw(this.update.bind(this));

        this._resources = new Resources();

        this.cellSize = options.cellSize || 20;
        this.gridHeight = 0;
        this.gridHeight = 0;

        this.layers = null;

        this.offsetX = 0;
        this.offsetY = 0;

        this._movingToX = 0;
        this._movingToY = 0;
    }

    resources(resources) {
        this._resources.setSprites(resources.sprites);

        this._resources.load((loadingState) => {
            this._onLoadingStateUpdateCallback(loadingState);

            if (loadingState.total >= 100) {
                this._onLoadedCallback(this._resources);
            }
        });

        return this;
    }

    setLayers(layers) {
        this.layers = layers;

        if (! _.isEmpty(this.layers) && ! _.isEmpty(this.layers.all())) {

            this.gridWidth = this.layers.width() * this.cellSize;
            this.gridHeight = this.layers.height() * this.cellSize;

            this.render();
        }

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
        _.each(this.layers.all(), (layer) => {
            layer.render(this._resources, this.cellSize);
        });

        return this;
    }

    isRunning() {
        return this.loop.running;
    }

    run() {
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

        if (! this.layers) return;

        _.each(this.layers.all(), (layer) => {
            this.context.drawImage(layer.container(), 0, 0);
        });
    }

    onClick(callback) {
        this._onClickCallback = callback;
    }

    onLoadingStateUpdate(callback) {
        this._onLoadingStateUpdateCallback = callback;
    }

    onLoaded(callback) {
        this._onLoadedCallback = callback;
    }
}

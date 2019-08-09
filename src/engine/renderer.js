export default class Renderer {

    constructor() {
        this.container = document.createElement('canvas');
        this.container.setAttribute('style', 'position:absolute;left:0;top:0');
        this.container.width = 5000;
        this.container.height = 5000;

        this._context = this.container.getContext('2d');
    }

    render(state, resources, cellSize) {
        this._context.clearRect(0, 0, this.container.width, this.container.height);

        for (let x = 0, rowCount = state.length; x < rowCount; x++) {

            let item = state[x];

            for (let y = 0, cellCount = item.length; y < cellCount; y++) {

                let cell = item[y];

                if (cell === null) continue;

                this._context.drawImage(
                    resources.sprites[cell].image,
                    y * cellSize,
                    x * cellSize
                );

            }

        }
    }
}

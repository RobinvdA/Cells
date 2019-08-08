export default class Renderer {

    constructor(game) {
        this.game = game;

        this.initMap();
    }

    renderMap() {
        this.map.context.clearRect(0, 0, this.map.container.width, this.map.container.height);

        for (let x = 0, rowCount = this.game.columns.length; x < rowCount; x++) {

            let column = this.game.columns[x];

            for (let y = 0, cellCount = column.length; y < cellCount; y++) {

                let cell = column[y];

                this.map.context.drawImage(
                    this.game._resources.sprites[cell],
                    y * this.game.cellSize,
                    x * this.game.cellSize
                );

            }

        }
    }

    initMap() {
        this.map = {container: null, context: null};

        this.map.container = document.createElement('canvas');
        this.map.container.setAttribute('style', 'position:absolute;left:0;top:0');
        this.map.container.width = 5000;
        this.map.container.height = 5000;
        this.map.context = this.map.container.getContext('2d');
    }
}

export default class Renderer {

    constructor(game) {
        this.game = game;

        this.initMap();
    }

    renderMap() {
        this.map.context.clearRect(0, 0, this.map.container.width, this.map.container.height);

        for (let y = 0, rowCount = this.game.grid.rows.length; y < rowCount; y++) {

            let row = this.game.grid.rows[y];

            for (let x = 0, cellCount = row.cells.length; x < cellCount; x++) {

                let cell = row.cells[x];

                this.map.context.beginPath();

                this.map.context.fillStyle = cell.color;
                this.map.context.strokeStyle = '#333';

                this.map.context.rect(
                    x * this.game.cellSize,
                    y * this.game.cellSize,
                    this.game.cellSize,
                    this.game.cellSize
                );

                this.map.context.fill();
                this.map.context.stroke();

                this.map.context.closePath();

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
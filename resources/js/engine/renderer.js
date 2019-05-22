export default class Renderer {

    constructor(game) {
        this.game = game;

        this.initMap();
    }

    renderMap() {
        this.map.context.clearRect(0, 0, this.map.container.width, this.map.container.height);

        for (let y = 0, rowCount = this.game.serverInput.length; y < rowCount; y++) {

            let row = this.game.serverInput[y];

            for (let x = 0, cellCount = row.length; x < cellCount; x++) {

                let color = row[x];

                this.map.context.beginPath();

                this.map.context.fillStyle = color;
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
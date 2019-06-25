export default class Loop {

    constructor() {
        this.fps = 60;

        this.now = null;
        this.then = Date.now();
        this.diff = null;

        this.interval = 1000 / this.fps;

        this.running = false;

        this._onDraw = () => {};
    }

    start() {
        this.running = true;

        this.loop();
    }

    stop() {
        this.running = false;
    }

    onDraw(callable) {
        this._onDraw = callable;
    }

    loop() {
        if (! this.running) return;

        requestAnimationFrame(this.loop.bind(this));

        this.now = Date.now();
        this.diff = this.now - this.then;

        if (this.diff > this.interval) {
            this.then = this.now - (this.diff % this.interval);

            this._onDraw();
        }
    }
}

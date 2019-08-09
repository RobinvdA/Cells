import Renderer from './../renderer';

export default class Layer {

    constructor(name) {

        this.name = name;

        this.state = null;

        this._renderer = new Renderer();

    }

    render(resources, cellSize) {
        this._renderer.render(this.state, resources, cellSize);
    }

    container() {
        return this._renderer.container;
    }

}

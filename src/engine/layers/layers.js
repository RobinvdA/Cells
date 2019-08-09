export default class Layers {

    constructor() {

        this.items = [];

    }

    add(layer) {
        this.items.push(layer);
    }

    get(name) {
        return _.find(this.items, ['name', name]);
    }

    all() {
        return this.items;
    }

    width() {
        if (_.isEmpty(this.items)) return 0;

        if (_.isEmpty(this.items[0].state)) return 0;

        return this.items[0].state.length;
    }

    height() {
        if (_.isEmpty(this.items)) return 0;

        if (_.isEmpty(this.items[0].state)) return 0;

        return this.items[0].state[0].length;
    }

}

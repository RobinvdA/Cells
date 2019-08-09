export default class Resources {

    constructor() {

        this.sprites = [];
        this.spritesLoaded = 0;

        //

    }

    load(onStateUpdate = () => {}) {
        this.sprites = _.map(this.sprites, (sprite) => {
            sprite.image = new Image();

            sprite.image.onload = () => {
                this.spritesLoaded++;

                onStateUpdate(this.loadingState());
            }

            sprite.image.src = sprite.src;

            return sprite;
        });

        return this;
    }

    setSprites(sprites) {
        this.sprites = _.merge(this.sprites, sprites);
    }

    loadingState() {
        let loadingState = {
            sprites: Math.round((this.spritesLoaded / this.sprites.length) * 100)

            //
        };

        loadingState.total = _.mean(_.values(loadingState));

        return loadingState;
    }

}

<template>

    <canvas ref="gameContainer" style="width:100%">

    </canvas>

</template>

<script>
    import Game from './../../engine/game';
    import Sprite from './../../engine/resources/sprite';

    export default {
        props: {
            socket: {
                default: null
            },

            user: {
                default: null
            },

            countdown: {
                default: null
            },

            layers: {
                default: []
            }
        },

        watch: {
            layers: {
                handler(layers) {
                    this.$nextTick(() => {
                        if (! this.engine) {
                            this.init();
                        }

                        this.engine.setLayers(layers);
                    });
                },
                deep: true,
                immediate: true
            }
        },

        data() {
            return {
                engine: null,

                resources: {
                    sprites: []
                }
            }
        },

        mounted() {

        },

        methods: {
            init() {
                this.engine = new Game(this.$refs.gameContainer, {
                    cellSize: 32
                });

                this.loadResources();

                this.initEngineListeners();

                this.initKeyListeners();

                this.engine.run();
            },

            loadResources() {
                window.spriteContext.keys().forEach((filename) => {
                    let sprite = new Sprite();

                    sprite.src = window.spriteContext(filename);

                    this.resources.sprites.push(sprite);
                });

                this.engine.resources(this.resources);
            },

            initEngineListeners() {
                this.engine.onLoadingStateUpdate((loadingState) => {
                    this.$emit('loading-state', loadingState);
                });

                this.engine.onLoaded((resources) => {
                    this.$emit('loaded', resources);
                });

                this.engine.onClick((cellX, cellY) => {
                    this.$emit('click', cellX, cellY);
                });
            },

            initKeyListeners() {
                window.addEventListener('keydown', (event) => {
                    if ([37,38,39,40].indexOf(event.keyCode) > 1) event.preventDefault();

                    switch(event.keyCode) {
                        case 37: this.engine.startMoving('left');
                        case 38: this.engine.startMoving('up');
                        case 39: this.engine.startMoving('right');
                        case 40: this.engine.startMoving('down');
                    }
                }, false);

                window.addEventListener('keyup', (event) => {
                    switch(event.keyCode) {
                        case 37: case 38: case 39: case 40: this.engine.stopMoving();
                    }
                }, false);
            }
        }
    }
</script>

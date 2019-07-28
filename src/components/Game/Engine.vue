<template>

    <v-card width="400px">

        <v-card-title v-if="countdown">
            <h2 class="title text-xs-center">
                {{ countdown }}
            </h2>
        </v-card-title>

        <canvas ref="gameContainer" style="width:100%;height:400px">

        </canvas>

    </v-card>

</template>

<script>
    import Game from './../../engine/game';

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

            state: {
                default: null
            }
        },

        watch: {
            state: {
                handler(state, oldState) {
                    if (state) {
                        this.engine.init(state.columns);

                        if (! oldState) {
                            this.engine.center();

                            this.engine.run();
                        }
                    }
                },
                deep: true
            }
        },

        data() {
            return {
                engine: null,

            }
        },

        mounted() {
            this.init();
        },

        methods: {
            init() {
                this.engine = new Game(this.$refs.gameContainer, {
                    cellSize: 30
                });

                this.engine.onClick((x, y, cellX, cellY) => {
                    console.log('Click', cellX, cellY);
                });

                // this.initKeyListeners();
            },

            initKeyListeners() {
                window.addEventListener('keydown', (event) => {
                    switch(event.keyCode) {
                        case 37: return this.engine.startMoving('left');
                        case 38: return this.engine.startMoving('up');
                        case 39: return this.engine.startMoving('right');
                        case 40: return this.engine.startMoving('down');
                    }
                });

                window.addEventListener('keyup', (event) => {
                    switch(event.keyCode) {
                        case 37: case 38: case 39: case 40: this.engine.stopMoving();
                    }
                });
            }
        }
    }
</script>

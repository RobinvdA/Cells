<template>

    <v-container grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12 md4>
                <v-card>
                    <v-card-title class="headline">
                        {{ game.name }}
                    </v-card-title>

                    <v-data-table :items="game.players" hide-headers hide-actions>
                        <template v-slot:items="props">
                            <td :class="props.item.color"></td>
                            <td class="px-3">
                                {{ props.item.name }}
                            </td>
                        </template>
                    </v-data-table>
                </v-card>
            </v-flex>

            <v-flex shrink>

                <v-card width="500px">

                    <v-card-title class="title">
                        {{ state }}
                    </v-card-title>

                    <canvas ref="gameContainer" style="width:100%;height:400px">

                    </canvas>

                </v-card>

            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    import Game from './../engine/game';

    export default {
        props: {
            socket: {
                default: null
            },

            game: {
                default: null
            },

            user: {
                default: null
            }
        },

        data() {
            return {
                engine: null,

                running: false,

                state: ''
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

                this.initSocketListeners();
            },

            run() {
                if (! this.engine) return;

                this.engine.run();
            },

            stop() {
                if (! this.engine) return;

                this.engine.stop();
            },

            initSocketListeners() {
                this.socket.on('grid', (grid) => {
                    this.engine.init(grid).center();
                });

                this.socket.on('game-start', () => {
                    this.running = true;

                    this.run();
                });

                this.socket.on('game-state', (game) => {
                    this.state = game.state;

                    this.engine.init(game.grid);
                });

                this.socket.on('game-players', (players) => {
                    this.game.players = players;
                });
            }
        },

        beforeDestroy() {
            this.socket.removeListener('grid');
            this.socket.removeListener('game-start');
            this.socket.removeListener('game-state');
        }

    }
</script>

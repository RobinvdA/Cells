<template>

    <v-layout column>
        <v-flex>
            <v-btn @click="join" color="primary">
                Join
            </v-btn>
        </v-flex>

        <v-flex>

            <div style="width:500px; height: 400px;">

                <canvas ref="gameContainer" style="width:100%;height:100%;border:1px solid #333">

                </canvas>

            </div>

        </v-flex>
    </v-layout>

</template>

<script>
    import Game from './../engine/game';

    export default {

        data() {
            return {
                game: null,

                joining: false,
                joined: false,

                player: {
                    color: null
                },

                socket: null
            }
        },

        mounted() {
            this.initSocket();
        },

        methods: {
            join() {
                this.game = new Game(this.$refs.gameContainer, {
                    cellSize: 30
                });

                this.game.onClick((x, y, cellX, cellY) => {
                    console.log('Click', cellX, cellY);
                });

                window.addEventListener('keydown', (event) => {
                    switch(event.keyCode) {
                        case 37: return this.game.startMoving('left');
                        case 38: return this.game.startMoving('up');
                        case 39: return this.game.startMoving('right');
                        case 40: return this.game.startMoving('down');
                    }
                });

                window.addEventListener('keyup', (event) => {
                    switch(event.keyCode) {
                        case 37: case 38: case 39: case 40: this.game.stopMoving();
                    }
                });

                this.loadPlayer();
            },

            run() {
                if (! this.game) return;

                this.game.run();
            },

            stop() {
                if (! this.game) return;

                this.game.stop();
            },

            loadPlayer() {
                this.socket.emit('join');

                this.socket.on('player', (player) => {
                    this.player = player;
                    this.joined = true;
                });

                this.socket.on('game-full', () => {
                    this.joined = false;
                });

                this.socket.on('grid', (grid) => {
                    this.game.init(grid).center();
                });

                this.socket.on('game-start', () => {
                    this.run();
                });
            },

            initSocket() {
                this.socket = new IO(`http://localhost:3000`);
            }
        }

    }
</script>
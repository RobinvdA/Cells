/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import Decoder from "./engine/decoder";

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import Game from './engine/game';

import Echo from 'laravel-echo';

window.io = require('socket.io-client');

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: 'http://localhost:6001'
});

const app = new Vue({
    el: '#app',

    data() {
        return {
            game: null,

            running: false
        }
    },

    mounted() {
        this.initialize();
    },

    methods: {
        toggleState() {
            this.running ? this.stop() : this.run();
        },

        run() {
            if (! this.game) return;

            this.game.run();

            this.running = true;
        },

        stop() {
            if (! this.game) return;

            this.game.stop();

            this.running = false;
        },

        initialize() {
            this.game = new Game(this.$refs.gameContainer, {
                cellSize: 30
            });

            this.game.onClick((x, y, cellX, cellY) => {
                this.click(cellX, cellY);
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

            this.loadPlayers();

            this.loadMap();

            this.echoListener();
        },

        loadPlayers() {
            this.game.resources.setPlayers([
                'red', 'green', 'blue'
            ]);
        },

        loadMap() {
            let data = window.Map;

            this.game.init(Decoder.encode(data)).center();
        },

        click(cellX, cellY) {
            axios.post(`/api/game/click`, {
                x: cellX,
                y: cellY,
                color: 'green'
            }).then(() => {

            }).catch(() => {

            });
        },

        echoListener() {
            window.Echo.channel('cells_game')
                .listen('.App\\Events\\Updated', (e) => {
                    if (_.isEmpty(e.updates)) return;

                    _.each(e.updates, (value, key) => {
                        this.game.serverInput[
                            key.split(':')[0]
                        ][
                            key.split(':')[1]
                        ] = value;

                        this.game.render();
                    });
                });
        }
    }
});

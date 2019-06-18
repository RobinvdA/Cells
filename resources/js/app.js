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

const app = new Vue({
    el: '#app',

    data() {
        return {
            game: null,

            initializing: false,
            initialized: false,

            loading: false,
            running: false,

            joined: false,

            player: {
                color: null
            },

            socket: null
        }
    },

    mounted() {

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

        async initialize() {
            this.initializing = true;
            this.initialized = false;

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

            this.initSockets();

            await this.loadActions();

            await this.loadPlayer();

            this.initialized = true;
            this.initializing = false;
        },

        async loadActions() {
            let response = await axios.get(`/api/game/actions`);

            this.handleUpdates(response.data);

            return response;
        },

        async loadPlayer() {
            this.socket.emit('join');

            this.socket.on('player', (player) => {
                this.player = player;
                this.joined = true;
            });

            this.socket.on('game-full', () => {
                this.joined = false;
            });

            this.socket.on('grid', (grid) => {
                console.log(grid);
                this.game.init(grid).center();
            });
        },

        click(cellX, cellY) {
            if (! this.joined) return;

            axios.post(`/api/game/click`, {
                x: cellX,
                y: cellY,
                color: this.player.color
            }).then(() => {

            }).catch(() => {

            });
        },

        initSockets() {
            this.socket = new IO(SocketServer);
        },

        handleUpdates(updates = []) {
            if (_.isEmpty(updates)) return;

            _.each(updates, (value, key) => {
                this.game.serverInput[
                    key.split(':')[1]
                ][
                    key.split(':')[0]
                ] = value;

                this.game.render();
            });
        }
    }
});

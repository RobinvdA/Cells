<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-title class="headline text-uppercase">
                <span>
                    Cells
                </span>
                <span class="font-weight-light">

                </span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn flat href="https://github.com/robinvda/cells" target="_blank">
                Git
            </v-btn>
        </v-toolbar>

        <v-content>

            <v-container v-if="! user.name" grid-list-lg>
                <v-layout>
                    <v-flex>
                        <v-card>
                            <v-card-text>
                                <v-text-field
                                        v-model="typedName"
                                        @keyup.enter="saveName"
                                        @click:append-outer="saveName"
                                        :loading="savingName"
                                        label="Nickname"
                                        type="text"
                                        append-outer-icon="save"
                                ></v-text-field>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>

            <lobby v-else-if="! game" :socket="socket" :user="user"></lobby>

            <game v-else :socket="socket" :game="game" :user="user"></game>

        </v-content>
    </v-app>
</template>

<script>
    import Lobby from './components/Lobby';
    import Game from './components/Game';

    export default {
        components: {
            Lobby,
            Game
        },

        data() {
            return {
                socket: null,

                game: null,

                typedName: null,

                user: {
                    name: null
                },

                savingName: false
            }
        },

        mounted() {
            this.initSocket();

            this.initSocketListeners();
        },

        methods: {
            saveName() {
                this.savingName = true;

                this.socket.emit('save-name', this.typedName);
            },

            initSocketListeners() {
                this.socket.on('name-saved', (name) => {
                    this.user.name = name;

                    this.savingName = false;
                });

                this.socket.on('joined-game', (game) => {
                    this.game = game;
                });

                this.socket.on('left-game', () => {
                    this.game = null;
                });
            },

            initSocket() {
                this.socket = new IO(`http://localhost:3000`);
            }
        }
    }
</script>

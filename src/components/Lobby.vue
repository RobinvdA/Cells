<template>

    <v-container grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12 sm6>
                <v-card>
                    <v-card-title class="headline">
                        Lobby
                    </v-card-title>

                    <v-data-table :items="players" hide-headers hide-actions>
                        <template v-slot:items="props">
                            <td class="px-3">
                                {{ props.item.name }}
                            </td>
                        </template>
                    </v-data-table>
                </v-card>
            </v-flex>

            <v-flex xs12 sm6>
                <v-card>
                    <v-card-title class="headline">
                        Games
                    </v-card-title>

                    <v-list class="pa-0">
                        <v-list-tile v-for="game in games" @click="join(game)" :key="game.name" ripple>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ game.name }}
                                </v-list-tile-title>
                                <v-list-tile-sub-title>
                                    {{ game.players.length }} / {{ game.slots }} - {{ game.state }}
                                </v-list-tile-sub-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-progress-circular v-if="joining" color="grey lighten-1" width="2" size="18" indeterminate></v-progress-circular>

                                <v-icon v-else color="grey lighten-1">
                                    chevron_right
                                </v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn @click="create" :loading="creating" color="primary" flat>
                            New game
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    export default {
        props: {
            socket: {
                default: null
            },

            user: {
                default: null
            }
        },

        data() {
            return {
                players: [],

                games: [],

                joining: false,
                creating: false,

                maxWaitDuration: 5
            }
        },

        mounted() {
            this.initSocketListeners();

            this.socket.emit('join-lobby');
        },

        methods: {
            join(game) {
                this.joining = true;

                this.socket.emit('join-game', game);
            },

            create() {
                this.creating = true;

                this.socket.emit('create-game', {
                    name: this.user.name + '\'s game'
                });
            },

            initSocketListeners() {
                this.socket.on('lobby-state', (state) => {
                    this.players = state.players;

                    this.games = state.games;
                });
            }
        },

        beforeDestroy() {
            this.socket.removeListener('lobby-state');
        }

    }
</script>
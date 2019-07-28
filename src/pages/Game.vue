<template>

    <v-container v-if="game" fluid grid-list-xl>
        <v-layout row wrap justify-center>
            <v-flex xs12 sm6>
                <v-card>
                    <v-card-title class="headline">
                        {{ game.name }}
                    </v-card-title>

                    <v-data-table :items="game.players" hide-headers hide-actions>
                        <template v-slot:items="props">
                            <td style="width:40px" class="px-3">
                                <v-chip :color="props.item.color.code" label>

                                </v-chip>
                            </td>
                            <td class="body-2 px-3">
                                {{ props.item.name }}
                            </td>
                        </template>
                    </v-data-table>

                    <v-card-actions>
                        <v-btn @click="leave" color="red" flat>
                            Leave
                        </v-btn>

                        <v-spacer />

                        <v-btn v-if="game.user.id == user.id" @click="start" color="primary" outline>
                            Start game
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>

            <v-flex xs12 sm6>
                <v-card>
                    <v-card-title class="headline">

                    </v-card-title>
                </v-card>
            </v-flex>

            <v-flex shrink>

                <engine :countdown="countdown" :state="state"></engine>

            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    import Engine from './../components/Game/Engine';

    export default {
        components: { Engine },

        props: {
            socket: {
                default: null
            },

            user: {
                default: null
            }
        },

        watch: {
            socket: {
                handler() {
                    if (this.socket) {
                        this.socket.emit('join-game-request', this.$route.params.id);

                        this.initSocketListeners();
                    }
                },
                immediate: true
            }
        },

        data() {
            return {
                game: null,

                countdown: null,

                state: null
            }
        },

        mounted() {

        },

        methods: {
            start() {
                this.socket.emit('start-game-request', this.game.id);
            },

            leave() {
                this.socket.emit('leave-game-request', this.game.id);
            },

            initSocketListeners() {
                this.socket.on('game-state', (state) => {
                    this.countdown = null;

                    this.state = state;
                });

                this.socket.on('game-countdown', (count) => {
                    this.countdown = count;
                });

                this.socket.on('join-game-failed', () => {
                    this.$router.go(-1);
                });

                this.socket.on('joined-game', (game) => {
                    this.game = game;
                });

                this.socket.on('left-game', (game) => {
                    this.$router.replace({ name: 'lobby' });
                });
            }
        }

    }
</script>

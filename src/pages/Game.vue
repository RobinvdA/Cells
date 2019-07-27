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
                            <td style="width:160px" class="px-3">
                                <v-chip :color="props.item.color.code" label outline>
                                    {{ props.item.color.name }}
                                </v-chip>
                            </td>
                            <td class="px-3">
                                {{ props.item.name }}
                            </td>
                        </template>
                    </v-data-table>

                    <v-card-actions>
                        <v-spacer />

                        <v-btn @click="leave" color="red" flat>
                            Leave
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

                <v-card width="500px">

                    <v-card-title class="title">

                    </v-card-title>

                    <canvas ref="gameContainer" style="width:100%;height:400px">

                    </canvas>

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
                game: null
            }
        },

        mounted() {

        },

        methods: {
            leave() {
                this.socket.emit('leave-game-request', this.game.id);
            },

            initSocketListeners() {
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

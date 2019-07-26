<template>

    <v-container v-if="game" grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12 md4>
                <v-card>
                    <v-card-title class="headline">
                        {{ game.name }}
                    </v-card-title>

                    <v-data-table :items="game.players" hide-headers hide-actions>
                        <template v-slot:items="props">
                            <td class="px-3">
                                <v-chip :color="props.item.color.code" label outline>
                                    {{ props.item.color.name }}
                                </v-chip>
                            </td>
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
            initSocketListeners() {
                this.socket.on('join-game-failed', () => {
                    this.$router.go(-1);
                });

                this.socket.on('joined-game', (game) => {
                    this.game = game;
                });
            }
        }

    }
</script>

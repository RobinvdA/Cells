<template>

    <v-card>
        <v-card-title class="headline">
            Games
        </v-card-title>

        <v-list class="pa-0">
            <v-list-tile v-for="game in games" @click="join(game)" :key="game.id" ripple>
                <v-list-tile-content>
                    <v-list-tile-title>
                        {{ game.name }}
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                        {{ game.players.length }} / {{ game.slots }}
                    </v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                    <v-icon color="grey lighten-1">
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

</template>

<script>
    export default {
        props: {
            games: {
                default: []
            },

            socket: {
                default: null
            },

            user: {
                default: null
            }
        },

        data() {
            return {
                creating: false
            }
        },

        methods: {
            create() {
                this.creating = true;

                this.socket.emit('create-game-request', {
                    name: this.user.name + '\'s game'
                });
            },

            join(game) {
                this.$router.push({ name: 'game', params: { id: game.id } });
            }
        }
    }
</script>

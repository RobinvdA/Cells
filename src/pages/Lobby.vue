<template>

    <v-container grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12 sm6>
                <users :users="users"></users>
            </v-flex>

            <v-flex xs12 sm6>
                <games :games="games" :socket="socket" :user="user"></games>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    import Users from './../components/Lobby/Users';
    import Games from './../components/Lobby/Games';

    export default {
        components: { Users, Games },

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
                        this.socket.emit('join-lobby-request');

                        this.initSocketListeners();
                    }
                },
                immediate: true
            }
        },

        data() {
            return {
                users: [],

                games: []
            }
        },

        mounted() {

        },

        methods: {
            initSocketListeners() {
                this.socket.on('joined-lobby', (lobby) => {
                    this.users = lobby.users;
                    this.games = lobby.games;
                });

                this.socket.on('user-joined', (user) => {
                    this.addUser(user);
                });

                this.socket.on('user-left', (user) => {
                    this.removeUser(user.id);
                });

                this.socket.on('game-created', (game) => {
                    this.addGame(game);

                    if (game.user.id == this.user.id) {
                        this.$router.push({ name: 'game', params: { id: game.id }});
                    }
                });
            },

            addUser(user) {
                this.users.push(user);
            },

            removeUser(id) {
                let index = _.findIndex(this.users, (user) => {
                    return user.id == id;
                });

                if (index < 0) return false;

                this.users.splice(index, 1);
            },

            addGame(game) {
                this.games.push(game);
            },

            removeGame(id) {
                let index = _.findIndex(this.games, (game) => {
                    return game.id == id;
                });

                if (index < 0) return false;

                this.games.splice(index, 1);
            }
        }

    }
</script>

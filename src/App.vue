<template>

    <component :is="layout">

        <router-view :socket="socket" :user="user"></router-view>

    </component>

</template>

<script>
    export default {
        components: {

        },

        computed: {
            layout() {
                return (this.$route.meta.layout || this.defaultLayout) + '-layout';
            }
        },

        data() {
            return {
                defaultLayout: 'default',

                server: 'http://localhost:3000',

                socket: null,

                user: null
            }
        },

        mounted() {
            this.initSocket();
        },

        methods: {
            initSocket() {
                this.socket = new IO(this.server);

                this.initSocketListeners();
            },

            initSocketListeners() {
                this.socket.on('registered', (user) => {
                    this.user = user;

                    this.$router.push('lobby');
                });
            }
        }
    }
</script>

<template>

    <v-container fluid>
        <v-layout justify-center>
            <v-flex xs12 md6>
                <v-card>
                    <v-card-text v-if="socket">
                        <v-text-field
                            v-model="name"
                            @click:append-outer="save"
                            @keyup.enter="save"
                            :loading="saving"
                            label="Nickname"
                            type="text"
                            append-outer-icon="save"
                        ></v-text-field>
                    </v-card-text>
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
                name: '',

                saving: false
            }
        },

        mounted() {

        },

        methods: {
            save() {
                this.saving = true;

                this.socket.emit('registration-request', this.name);
            }
        }

    }
</script>

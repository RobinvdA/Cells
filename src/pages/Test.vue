<template>

    <v-container fluid grid-list-xl>
        <v-layout row wrap justify-center>
            <v-flex shrink>

                <v-card width="400px">

                    <v-card-title class="headline">
                        Test
                    </v-card-title>

                    <engine :state="state"></engine>

                </v-card>

            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    import Engine from './../components/Game/Engine';

    export default {
        components: { Engine },

        data() {
            return {
                state: [
                    [0,1,2,3],
                    [4,5,6,7],
                    [0,1,2,3],
                    [4,5,6,7],
                ],

                reference: {
                    grass: {
                        0: 'light',
                        1: 'normal',
                        2: 'dark'
                    }
                }
            }
        },

        mounted() {

        },

        methods: {

        }

    }
</script>

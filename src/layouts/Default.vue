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

            <slot></slot>

        </v-content>
    </v-app>

</template>

<script>

</script>

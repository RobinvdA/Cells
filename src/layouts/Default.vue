<template>

    <v-app>
        <v-app-bar app>
            <v-toolbar-title class="headline text-uppercase">
                <span>
                    Cells
                </span>
                <span class="font-weight-light">

                </span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn href="https://github.com/robinvda/cells" target="_blank" text>
                Git
            </v-btn>
        </v-app-bar>

        <v-content>

            <slot></slot>

        </v-content>
    </v-app>

</template>

<script>

</script>

<template>

    <v-card>
        <v-card-title class="headline">
            Lobby
        </v-card-title>

        <v-data-table :items="users" hide-headers hide-actions>
            <template v-slot:items="props">
                <td class="px-3">
                    {{ props.item.name }}
                </td>
            </template>
        </v-data-table>
    </v-card>

</template>

<script>
    export default {
        props: {
            users: {
                default: []
            }
        }
    }
</script>

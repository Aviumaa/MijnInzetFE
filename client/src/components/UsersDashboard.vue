<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-data-table
                :headers="this.headers"
                :items="this.content"
                :item-key="this.content.id"
                :search="search"
                :pagination.sync="pagination"
                :disable-initial-sort="true"
                hide-actions
                class="elevation-3"
        >

            <template v-slot:items="props">
                <tr @click="navigateTo('editUser', props.item)">
                    <td class="px-3">{{ props.item.id }}</td>
                    <td class="px-3">{{ props.item.username }}</td>
                </tr>
            </template>

        </v-data-table>
        <div class="text-xs-right pt-2">
            <v-pagination v-model="pagination.page" :length="pages" color="black"></v-pagination>
        </div>

        <v-dialog v-model="dialog" max-width="400">
            
        </v-dialog>
    </div>
</template>


<script>
    import HeaderTitle from "@/components/HeaderTitle.vue";
    import axios from "axios";

    export default {
        data() {
            return {
                pagination: {
                    search: "",
                    page: 1,
                    rowsPerPage: 25
                },
                selected: [],
                search: "",
                dialog: false
            };
        },
        props: ["headers", "content"],
        computed: {
            pages() {
                // eslint-disable-next-line
                this.pagination.totalItems = this.content.length;

                if (
                    this.pagination.rowsPerPage == null ||
                    this.pagination.totalItems == null
                )
                    return 0;

                return Math.ceil(
                    this.pagination.totalItems / this.pagination.rowsPerPage
                );
            }
        },
        methods: {
            navigateTo(route, user) {
                //this.$router.push(route);
                this.$router.push({name: route, params: { user: user}});
            }
        },
        components: {
            HeaderTitle
        }
    };
</script>

<style scoped>
    .description.ellipsis {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 10vw;
        height: 4.5em;
    }

    .solliciteerButton {
        color: white;
        margin-bottom: 10px;

    }

</style>

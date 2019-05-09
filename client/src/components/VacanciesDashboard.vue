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
                <tr @click="showModal(props.item)">
                    <td class="px-3">{{ props.item.name }}</td>
                    <td class="px-3 description ellipsis">{{ props.item.description }}</td>
                    <td class="px-3">{{ props.item.moduleCoordinator }}</td>
                    <td class="px-3">{{ props.item.period }}</td>
                    <td class="px-3">{{ props.item.typeCourse }}</td>
                    <td class="px-3">{{ props.item.contactHours }}</td>
                </tr>
            </template>
        </v-data-table>
        <div class="text-xs-right pt-2">
            <v-pagination v-model="pagination.page" :length="pages" color="black"></v-pagination>
        </div>

        <v-dialog v-model="dialog" max-width="400">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
            </template>
            <v-card>
                <div class="topRow">
                    <v-flex>
                        <HeaderTitle title="Vacature" :subTitle="this.selected.name"></HeaderTitle>
                    </v-flex>
                </div>
                <v-card-text>
                    <div class="informationRow">
                        <div class="information"><strong>Coördinator: </strong>{{this.selected.moduleCoordinator}}</div>
                        <div class="information" max-width="50px"><strong>Beschrijving: </strong>{{this.selected.description}}
                        </div>
                        <div class="information"><strong>Openstaande uren: </strong>{{this.selected.contactHours}}</div>
                        <div class="information"><strong>Soort vacature: </strong>{{this.selected.typeCourse}}</div>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn round color="indigo darken-4" class="solliciteerButton" @click="solliciteer()">Solliciteer
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
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
            showModal(item) {
                this.selected = item;
                this.dialog = true;
            },
            solliciteer() {
                axios.post('http://localhost:3000/api/UserVacancies', {
                    vacancyId: this.selected.id,
                    userId: 1
                }).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });
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

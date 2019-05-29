<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-layout justify-center>
        <v-flex xs12 sm10 md8 lg6>
            <br>
            <v-flex>
                <HeaderTitle title="Gebruiker wijzigen"></HeaderTitle>
            </v-flex>
            <v-form ref="form">
                <v-card>
                    <v-card-text>
                        <v-text-field
                                ref="username"
                                v-model="user.username"
                                label="Gebruikersnaam"
                                required
                        ></v-text-field>
                        <v-combobox
                            v-model="select"
                            
                        :items="roles"
                        item-text="text"
                            label="Selecteer een rol"
                        ></v-combobox>
                        
                    </v-card-text>
                    <v-divider class="mt-5"></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click="send()">Versturen</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-flex>
    </v-layout>
</template>

<script>
    import Panel from "@/components/Panel.vue";
    import HeaderTitle from "@/components/HeaderTitle.vue";
    import axios from "axios";

    export default {
        data: () => ({
            user: [],
            username: '',
            password: '',
            role: '',

            // de rollen zouden ook uit de db kunnen worden gehaald voor eventuele toekomstige toevoegingen aan rollen
            roles: [{id: '1', text: 'Administrateur'},
                    {id: '2', text: 'Docent'},
                    {id: '3', text: 'Onderwijsprogrammacoordinator'},
                    {id: '4', text: 'Projectcoordinator'},
                    {id: '5', text: 'Modulecoordinator'},
                    {id: '6', text: 'Facilitator'},
                    {id: '7', text: 'Roosteraar'},
                    {id: '8', text: 'Coordinator'}
                    ]
        }),
        components: {
            HeaderTitle,
            Panel
        },
        methods: {
            send(){
                axios.put(`http://localhost:3000/api/users/${this.user.id}/edit`,{
                    username: this.user.username,
                    roleId: this.select.id
                })
                .then(response => {
                })
                .catch(error => {
                console.log(error);
                });
            }
        },
        mounted(){
            this.user = this.$route.params.user;
        }
    };
</script>

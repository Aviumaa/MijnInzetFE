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
                        userid = {{userId}}
                        <v-text-field
                                ref="username"
                                v-model="task"
                                label="Gebruikersnaam"
                                required
                        ></v-text-field>
                        <v-text-field
                                ref="password"
                                v-model="title"
                                label="Wachtwoord"
                                required
                        ></v-text-field>
                        <v-autocomplete
                                ref="role"
                                v-model="role"
                                :items="roles"
                                label="Rol"
                        ></v-autocomplete>
                        
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
            userId: '',
            type: '',
            roles: ['Administrateur',
                    'Docent',
                    'Onderwijsprogrammacoordinator',
                    'Projectcoordinator',
                    'Modulecoordinator',
                    'Facilitator',
                    'Roosteraar']
        }),
        components: {
            HeaderTitle,
            Panel
        },
        methods: {
            send(){}
        }
    };
</script>

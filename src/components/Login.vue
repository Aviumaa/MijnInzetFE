<template>
<div>
    <panel title="Login">
        <v-card-text>
            <v-form>
                <v-text-field class="mb-2" type="text" name="username" v-model="user.username" placeholder="Username"></v-text-field>
                <v-text-field type="password" name="password" v-model="user.password" placeholder="Password"></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login()">Login</v-btn>
        </v-card-actions>
    </panel>
</div>
</template>

<script>
import axios from "axios";
import Panel from '@/components/Panel.vue'

export default {
    data() {
        return {
            response: [],
            errors: [],

            user: {
                username: "",
                password: ""
            }
        };
    },

    methods: {
        login() {
            var params = new URLSearchParams();
            params.append("username", this.user.username);
            params.append("password", this.user.password);
            console.log(this.user.username);

            axios
                .post(`https://mijn-inzet.herokuapp.com/api/login`, params)
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.response = response.data;
                    console.log(response);
                })
                .catch(e => {
                    this.errors.push(e);
                });
        }
    },
    components: {
        Panel
    }
};
</script>

<style>
</style>

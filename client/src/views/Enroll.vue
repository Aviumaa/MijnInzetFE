<template>
    <v-container>
        <div class="topRow">
            <v-layout row>
                <h1>Vacature</h1>
            </v-layout>
        </div>
        <br>
        <div class="informationRow">
            <div class="information"><strong>Naam: </strong>{{vacancyTitle}}</div>
            <div class="information"><strong>Coördinator: </strong>{{coordinator}}</div>
            <div class="information" max-width="50px"><strong>Beschrijving: </strong>{{description}}</div>
            <div class="information"><strong>Openstaande uren: </strong>{{availableHours}}</div>
            <div class="information"><strong>Soort vacature: </strong>{{vacancyType}}</div>
        </div>
        <br>
        <div class="enrollRow">
            <h2 id="enrollTitle">Inschrijven</h2><br>
            <strong>Verzoek:</strong><br>

            <textarea placeholder="waarom wil je dit doen" id="enrollTextArea"></textarea><br>
            <v-btn @click="enroll()">Stuur verzoek</v-btn>
        </div>
        <br>
    </v-container>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                vacancyTitle: "Discrete mathematics",
                coordinator: "Jan Peter",
                description: "Please join me I'm very lonely and nobody wants to be my friend. Please don't ignore this it's a cry for help",
                availableHours: "80",
                vacancyType: "Begeleiding"
            };
        },
        methods: {
            enroll() {
                const params = new URLSearchParams();
                params.append('coordinator', 'value1');
                params.append('type', 'value2');

                axios
                    .post('http://localhost:8080/api/enrolls', params)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.response = response;
                        console.log(response);
                    })
                    .catch(e => {
                        this.errors.push(e);
                    });
            }
        }
    }
</script>

<style scoped>
    h1 {
        font-weight: bold;
    }

    .topRow {
        border-bottom: 2px solid;
    }

    .information {
        padding-bottom: 4px;
    }

    #enrollTitle {
        border-bottom: 2px solid;
    }

    #enrollTextArea {
        border: 2px solid;
    }
</style>

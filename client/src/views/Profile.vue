<template>
    <v-container>
        <v-layout>
            <v-flex xs12>
              <v-card height="80vh" color="white" class="grey--text">
                <v-card-title primary-title>
                  <div>
                    <div class="headline">Profile</div>
                    <span>Profile</span>
                    <v-text-field
                    v-model="inputEmail"
                    label="email"
                    ></v-text-field>
                    <v-button
                    @click="saveEmail"
                    >Opslaan</v-button>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            inputEmail: '',
            id: 1
        }
        
    },
methods: {
    saveEmail() {
        axios.put(`http://localhost:3000/api/users/${this.id}/email`, {
            email: this.inputEmail
        })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        });
        }
    }   
};

</script>

<style>
.contentCard {
    height: 500px;
    width: 500px;
    align-items: center;
}
</style>
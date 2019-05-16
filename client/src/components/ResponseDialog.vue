<template>
    <v-dialog v-model="responseDialog" max-width="250" max-height="400">
        <v-card>
            <v-card-text>
                <div class="informationRow">
                    <div class="messageRow">
                        <strong>{{message}}</strong>
                    </div>
                    <div class="iconRow">
                        <v-icon class="icon" :color="this.color">{{icon}}</v-icon>
                    </div>
                </div>
            </v-card-text>
            <v-spacer></v-spacer>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn round color="indigo darken-4" class="button" @click="close()">
                    Ok
                </v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        data: () => ({
            responseDialog: false,
            message: '',
            icon: '',
            color: 'green'
        }),
        methods: {
            open(message, icon) {
                this.responseDialog = true
                this.message = message
                this.icon = icon;
                if(icon === 'clear'){
                    this.color = 'red';
                }
            },
            close() {
                this.responseDialog = false
            }
        }
    }
</script>

<style scoped>
    .button {
        color: white;
        margin-bottom: 10px;

    }

    .iconRow {
        margin-bottom: 30px;
    }

    .icon {
        margin-top: 10px;
        margin-left: 36%;
        font-size: 45px;
    }

    .messageRow {
        margin-left: 17%;
    }

</style>

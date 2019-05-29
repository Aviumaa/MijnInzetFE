<template>
    <v-dialog
            v-model="loadingDialog"
            hide-overlay
            persistent
            width="300"
    >
        <v-card color="blue">
            <v-card-text>
                {{title}}
                <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                ></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        data: () => ({
            loadingDialog: false,
            title: null,
        }),
        methods: {
            open(title) {
                this.loadingDialog = true
                this.title = title
            },

            close() {
                this.loadingDialog = false
            }
        }
    }
</script>

<style scoped>

</style>

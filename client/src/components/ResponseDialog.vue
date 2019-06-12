<template>
  <v-dialog v-model="responseDialog" max-width="250" max-height="400">
    <v-card>
      <v-card-text>
        <div class="informationRow">
          <div class="messageRow subheading">
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
        <v-btn round color="indigo darken-4" class="button" @click="close()">Ok</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    responseDialog: false,
    message: "",
    icon: "",
    color: "green"
  }),
  methods: {
    open(message, icon) {
      this.responseDialog = true;
      this.message = message;
      this.icon = icon;
      if (icon === "clear") {
        this.color = "red";
      } else if (icon === "done") {
        this.color = "green";
      }
    },
    close() {
      this.responseDialog = false;
    }
  }
};
</script>

<style scoped>
.button {
  color: white;
  margin-bottom: 10px;
}

.iconRow {
  display: flex;
  justify-content: center;
  margin: 2em 0 4em;
}

.icon {
  margin: auto;
  display: flex;
  justify-content: space-between;
}

.messageRow {
  text-align: center;
}
</style>

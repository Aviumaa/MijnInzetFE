<template>
    <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Expandable Table</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark @click="expand = !expand">
        {{ expand ? 'Close' : 'Keep' }} other rows
      </v-btn>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :expand="expand"
      item-key="name"
    >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.calories }}</td>
          <td class="text-xs-right">{{ props.item.fat }}</td>
          <td class="text-xs-right">{{ props.item.carbs }}</td>
          <td class="text-xs-right">{{ props.item.protein }}</td>
          <td class="text-xs-right">{{ props.item.iron }}</td>
        </tr>
      </template>
      <template v-slot:expand="props">
        <v-card flat>
          <v-card-text>Peek-a-boo!</v-card-text>
        </v-card>
      </template>
    </v-data-table>
  </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>
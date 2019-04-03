<template>
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
        <td class="px-3">{{ props.item.name }}</td>
        <td class="px-3 description ellipsis">{{ props.item.description }}</td>
        <td class="px-3">{{ props.item.moduleCoordinator }}</td>
        <td class="px-3">{{ props.item.Period }}</td>
        <td class="px-3">{{ props.item.typeCourse }}</td>
        <td class="px-3">{{ props.item.contactHours }}</td>
      </template>
    </v-data-table>
    <div class="text-xs-right pt-2">
      <v-pagination v-model="pagination.page" :length="pages" :total-visible="7" color="black"></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagination: {
        search: "",
        page: 1,
        rowsPerPage: 25
      },
      selected: [],
      search: ""
    };
  },
  props: ["headers", "content"],
  computed: {
    pages() {
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
</style>
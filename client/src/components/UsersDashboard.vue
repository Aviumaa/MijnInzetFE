<template>
  <div v-resize="onResize" column>
    <v-data-table
      :headers="this.headers"
      :items="this.content"
      :item-key="this.content.id"
      :search="search"
      :pagination.sync="pagination"
      :disable-initial-sort="true"
      hide-actions
      class="elevation-3"
      :hide-headers="isMobile"
      :class="{mobile: isMobile}"
    >
      <template v-slot:items="props">
        <tr @click="navigateTo('editUser', props.item)" v-if="!isMobile">
          <td class="px-3">{{ props.item.id }}</td>
          <td class="px-3">{{ props.item.username }}</td>
          <td class="px-3" v-for="role in props.item.roles" :key="role.id">{{ role.name }}</td>
        </tr>
        <tr v-else>
          <td>
            <ul class="flex-content" @click="navigateTo('editUser', props.item)">
              <li class="flex-item" :data-label="headers[0].text">{{ props.item.id }}</li>
              <li class="flex-item" :data-label="headers[1].text">{{ props.item.username }}</li>
              <li
                class="flex-item"
                :data-label="headers[2].text"
                v-for="role in props.item.roles"
                :key="role.id"
              >{{ role.name }}</li>
            </ul>
          </td>
        </tr>
      </template>
    </v-data-table>
    <div class="text-xs-right pt-2">
      <v-pagination
        v-model="pagination.page"
        :length="pages"
        color="black"
        :total-visible="isMobile ? 5 : 7"
      ></v-pagination>
    </div>

    <v-dialog v-model="dialog" max-width="400"></v-dialog>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      pagination: {
        search: "",
        page: 1,
        rowsPerPage: 25
      },
      selected: [],
      search: "",
      dialog: false,
      isMobile: false
    };
  },
  props: ["headers", "content"],
  computed: {
    pages() {
      // eslint-disable-next-line
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
  },
  methods: {
    navigateTo(route, user) {
      this.$router.push({ name: route, params: { user: user } });
    },
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    }
  }
};
</script>

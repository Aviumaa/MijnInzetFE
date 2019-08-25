<template>
  <div v-resize="onResize" column>
    <v-card>
      <v-card-title>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="this.headers"
        :items="this.content"
        :item-key="this.content.id"
        :search="search"
        :pagination.sync="pagination"
        :disable-initial-sort="true"
        :hide-headers="isMobile"
        :custom-filter="customFilter"
        :class="{mobile: isMobile}"
        hide-actions
      >
        <template v-slot:items="props">
          <tr @click="navigateTo('editUser', props.item)" v-if="!isMobile">
            <td class="px-3">{{ props.item.id }}</td>
            <td class="px-3">{{ props.item.username }}</td>
            <td class="px-3">{{ props.item.email }}</td>
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
    </v-card>
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
    customFilter(items, search) {
      //this custom filter will do a multi-match separated by a space.

      if (!search) {
        return items;
      } //if the search is empty just return all the items

      function new_filter(val, search) {
        return (
          val !== null &&
          ["undefined", "boolean"].indexOf(typeof val) === -1 &&
          val
            .toString()
            .toLowerCase()
            .replace(/[^0-9a-zA-Z]+/g, "")
            .indexOf(search) !== -1
        );
      }

      let needleAry = search
        .toString()
        .toLowerCase()
        .split(" ")
        .filter(x => x);
      //whenever we encounter a space in our search we will filter for both the first and second word (or third word)

      return items.filter(row =>
        needleAry.every(needle =>
          Object.keys(row).some(key => new_filter(row[key], needle))
        )
      );
      //foreach needle in our array cycle through the data (row[key]) in the current row looking for a match.
      // .some will return true and exit the loop if it finds one it will return false if it doesnt
      // .every will exit the loop if we dont find a match but will return true if all needles match
      // .filter the rows on each match
    },
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    }
  }
};
</script>

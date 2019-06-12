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
            <ul class="flex-content" @click="showModal(props.item)">
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

<style >
/* .description.ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 10vw;
  height: 4.5em;
}

.applyToVacancyButton .v-btn__content {
  color: white;
} */

.mobile {
  color: #333;
}

@media screen and (max-width: 768px) {
  .mobile table.v-table tr {
    max-width: 100%;
    position: relative;
    display: block;
  }

  .mobile table.v-table tr:nth-child(even) {
    background: #f1f1f1;
  }

  .mobile table.v-table tr td {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    height: auto;
    padding: 10px;
  }

  .mobile table.v-table tr td ul li:before {
    content: attr(data-label);
    padding-right: 0.5em;
    text-align: left;
    display: block;
    color: #545454;
  }
  .v-datatable__actions__select {
    width: 50%;
    margin: 0px;
    justify-content: flex-start;
  }
  .mobile .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {
    background: transparent;
  }
}
.flex-content {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.flex-item {
  padding: 5px;
  width: 50%;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>

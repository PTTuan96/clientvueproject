<template>
  <div data-app>
    <b-container>
      <div>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field label="Search" v-model="nameSearch"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-select :items="items" filled label="Option Search" v-model="type"></v-select>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <b-button variant="outline-primary" @click.prevent="Search">
              <b-icon-search></b-icon-search>Search
            </b-button>
          </v-col>

          <v-col cols="12" sm="6" md="3"></v-col>
        </v-row>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">UserName</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Profile</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in user" :key="user.id">
            <th scope="row">{{user.id}}</th>
            <td>{{user.username}}</td>
            <td>{{user.email}}</td>
            <td>{{user.role}}</td>
            <td>
              <router-link :to="{ path: '/Detail/'+ user.id}" id="${user.id}" >
                <b-icon-chevron-double-right></b-icon-chevron-double-right>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </b-container>
    <div>
      <b-pagination
        align="center"
        v-model="page"
        :total-rows="pages"
        :per-page="perPage"
        first-number
        last-number
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const API_URL = "http://localhost:8090/api/v1/account/";
const a = "account_";
export default {
  data() {
    return {
      perPage: 1,
      pages: 10,
      user: [],
      page: 1,
      pagesize: 5,
      nameSearch: "",
      items: ["username", "email", "role"],
      type: "",
      loadingSearch: false
    };
  },
  created() {
    axios
      .get(API_URL + "search", {
        params: {
          page: this.page,
          pageSize: this.pagesize,
          nameSearch: this.nameSearch,
          type: this.type
        }
      })
      .then(response => {
        this.user = response.data.account;
        this.pages = response.data.totalPage;
      });
  },
  methods: {
        Search() {
      axios
        .get(API_URL + "search", {
          params: {
            page: this.page,
            pageSize: this.pagesize,
            nameSearch: this.nameSearch,
            type: a + this.type
          }
        })
        .then(response => {
          this.user = response.data.account;
          this.pages = response.data.totalPage;
        });
      this.loadingSearch = true;
    }
  },
  watch: {
    page() {
      console.log(this.$route.matched)
      if (!this.loadingSearch) {
        (this.nameSearch = ""), (this.type = "");
      }
      axios
        .get(API_URL + "search", {
          params: {
            page: this.page,
            pageSize: this.pagesize,
            nameSearch: this.nameSearch,
            type: this.type
          }
        })
        .then(response => {
          this.user = response.data.account;
        });
    },
    
    
  }
};
</script>
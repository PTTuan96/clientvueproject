<template>
  <nav>
    <v-card color="grey lighten-4" flat height="100px" tile>
      <v-toolbar dense>
        <v-app-bar-nav-icon
          class="grey--text"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>Title</v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-if="isLoggedIn">
          <template>
            <v-row class="d-flex" justify="center">
              <v-menu
                v-model="showMenu"
                absolute
                offset-y
                style="max-width: 600px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-card
                    class="portrait"
                    img="https://cdn.vuetifyjs.com/images/cards/girl.jpg"
                    height="20"
                    width="20"
                    v-bind="attrs"
                    v-on="on"
                  ></v-card>
                </template>

                <v-list>
                  <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    @click=""
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-row>
          </template>
        </template>
        
        <template v-else>
          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Login
                <v-icon right>exit_to_app</v-icon>
              </v-btn>
            </template>

            <Login />
          </v-dialog>

          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Register
                <v-icon right>assignment_late</v-icon>
              </v-btn>
            </template>

            <Register />
          </v-dialog>
        </template>
      </v-toolbar>
    </v-card>

    <!-- <v-navigation-drawer v-model="drawer" class="indigo">
      <p>Test</p>
    </v-navigation-drawer>-->
  </nav>
</template>

<script>
import Register from "@/views/web/Register.vue";
import Login from "@/views/web/Login.vue";
import store from "@/store";

export default {
  name: "navbar",
  components: {
    Login,
    Register,
  },
  data() {
    return {
      drawer: false,
      dialog: false,
      items: [
        {
          title: "click1",
        },
        {
          title: "click2",
        },
      ],
    };
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>
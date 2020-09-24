<template>
  <v-card>
    <v-card-title>
      <span class="headline">Login</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <form @submit.prevent="login">

          <v-text-field
            v-model="user.username"
            label="Email"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.password"
            label="Password"
            required
          ></v-text-field>

          <v-row>
            <v-col>
              <v-btn type="submit" color="blue darken-1" text>Confirm</v-btn>
            </v-col>

            <v-spacer></v-spacer>

            <v-col>
              <v-btn @click.prevent="getMembers" color="blue darken-1" text
                >Get Members</v-btn
              >
            </v-col>
          </v-row>

        </form>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      
    };
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    login: function () {
      this.$store
        .dispatch("auth/login", this.user)
        .then(() => {
          const status = this.$store.state.auth;
          if (status === null || status === undefined) {
            this.$router.push("/");
          } else if (status.role === "USER" || status.role === "MEMBER") {
            this.$store.dialog = true
          } else {
            //  this.$router.push('/admin/layout');
          }
        })
        .catch((err) => console.log(err));
    },

    getMembers: function () {
      this.$store.dispatch("auth/getMembers");
    },
  },
};
</script>
<template>
  <v-card>
    <v-card-title>
      <span class="headline">Register</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <form @submit.prevent="register">
          <v-text-field v-model="username" :counter="21" label="User name" required></v-text-field>
          <v-text-field v-model="email" label="E-mail" required></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            required
            type="password"
          ></v-text-field>

          <v-btn class="mr-4" type="submit">Submit</v-btn>
        </form>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      username: "", 
      password: "",
      // is_admin : null
    };
  },
  methods: {
    register: function () {
      let user = {
        username: this.username,
        email: this.email,
        password: this.password,
        // is_admin: this.is_admin
      };
      
      this.$store
        .dispatch("auth/register", user)
        .then(() => {
            this.$router.push("/success")
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

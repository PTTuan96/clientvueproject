<template>
  <div>
    <b-container>
      <button>
        <a :href="$router.resolve({name: 'User'}).href">
          <b-icon-house-door-fill></b-icon-house-door-fill>Home User
        </a>
      </button>
      <span v-show="show==true">
        <b-icon-chevron-compact-right></b-icon-chevron-compact-right>
        <b-icon-person-fill></b-icon-person-fill>
Profile
      </span>
    </b-container>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false
    };
  },
  watch: {
    $route(route) {
      if (route.name == "User") {
        this.show = false;
      } else {
        this.show = true;
      }
    }
  }
};
</script>
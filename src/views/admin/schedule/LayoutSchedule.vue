<template>
  <div>
    <b-container>
      <button>
        <a :href="$router.resolve({name: 'Schedule'}).href">
          <b-icon-house-door-fill></b-icon-house-door-fill>Home Schedule
        </a>
      </button>
      <span v-show="show==true">
        <b-icon-chevron-compact-right></b-icon-chevron-compact-right>
        <b-icon-person-fill></b-icon-person-fill>
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
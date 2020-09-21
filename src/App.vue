<template>
  <v-app>
    <headerMenu></headerMenu>

    <v-main>
      <div id="app">
        <!-- Ini Content -->
        <router-view></router-view>
        </div>
    </v-main>

  </v-app>

</template>

<script>
  import headerMenu from './components/headerMenu.vue'

export default {
  name: 'App',
  beforeCreate: function () {
    if (!this.$session.exists() && this.$router.name) {
      this.$router.push('/')
    }
  },
  components: {
    headerMenu
  },
  data() {
    return {

    };
  },
  methods: {
  }
};
</script>

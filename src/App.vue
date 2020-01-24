<template>
  <div id="app" class="h-100">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  data() {
    return {
      message: 'Hello world',
    };
  },
  methods: {
    roll() {
      const damage = (Math.floor(Math.random()*6)+1)
      this.$store.dispatch('hit', damage);
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: url('./assets/background3.gif')no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover; 
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

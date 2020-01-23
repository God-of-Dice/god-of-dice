<template>
  <div id="app">
    <div id="nav">
      <p>
        {{ $store.state.name }} room name<br>
        {{ $store.state.myRoom }} my room<br>
        {{ $store.state.isPlay }} <br>
        {{ $store.state.players }} <br>
      </p>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <test></test>
    </div>
    <router-view/>
  </div>
</template>

<script>
import test from '@/components/test.vue';

export default {
  components: { test, },
  data() {
    return {
      message: 'Hello world',
    };
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

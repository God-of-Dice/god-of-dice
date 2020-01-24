<template>
  <div id="app">
    <div id="nav">
      <p>
        {{ $store.state.turn }} turn<br>
        {{ $store.state.name }} room name<br>
        {{ $store.state.myRoom }} my room<br>
        {{ $store.state.isPlay }} <br>
        <ul>
          <li v-for="player in $store.state.players"
           :key="player.name"
          >{{ player.name }}, hp: {{ $store.state.hp }}</li>
        </ul>
        {{ $store.state.players }} <br>
      </p>
      <div v-if="$store.state.turn === $store.state.myIndex && $store.state.isPlay">
        <button @click="roll">ROLL DICE</button>
      </div>
       <div v-if="$store.state.turn !== $store.state.myIndex && $store.state.isPlay">
        <button>USE DEFENCE</button>
      </div>
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

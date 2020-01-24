<template>
  <section>
    <h2>Nama room</h2>
    nama player:
    <input type="text" v-model="playerName"><br>
    Join room:
    <input type="text" v-model="roomName">
    <button @click="join">JOIN</button>
    <hr>
  </section>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello world',
      roomName: '',
      playerName: '',
    };
  },
  methods: {
    join() {
      const payload = {
        roomName: this.roomName,
        player: this.playerName,
      };
      this.$store.dispatch('joinroom', payload);
    },
    create() {
      const payload = {
        roomName: this.roomName,
        player: this.playerName,
      };
      this.$store.dispatch('createRoom', payload);
    },
  },
};
</script>

<style scoped>
</style>
<template>
  <div>
    <img src="../assets/emoji_angry.jpeg" alt />
    <img src="../assets/emoji_sleep.jpeg" alt />
    <img src="../assets/emoji_smile.jpeg" alt />
    <div class="flip-card">
      <!-- <div class="flip-card-inner"> -->
      <div class="flip-card-front">
        <form>
          <h1>Enter</h1>
          <h3>God of Dice</h3>
          <input type="text" placeholder="Enter Room" name="room" required v-model="room" />
          <input
            type="text"
            placeholder="Enter Player Name"
            name="player"
            required
            v-model="player"
          />
          <button type="submit" class="btn-enter" @click.prevent="createClick">Enter</button>
          <button @click.prevent="keGameRoom">ke gameroom</button>

        </form>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
export default {
    name: 'LoginForm',
    data() {
        return {
            room: '',
            player: '',
        }
    },
    methods: {
      keGameRoom(){
        this.$router.push('/about')
      },
        createClick() {
            const payload = {
                roomName: this.room,
                player: this.player,
            };
            this.$store.dispatch('joinroom', payload);
        },
    },

}
</script>

<style scoped>
img {
  float: left;
  width: 33%;
  height: 900px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

input[type="text"] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 20px 0;
  border: none;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
}

input[type="text"]:focus {
  background-color: rgba(224, 220, 220, 0.5);
  outline: none;
}

button {
  color: white;
  padding: 15px 50px;
  border: none;
  cursor: pointer;
  width: 110%;
  border-radius: 5px;
  outline: none;
}

.btn-enter {
  background-color: rgba(0, 200, 0, 1);
}
.btn-create {
  background-color: rgba(0, 0, 255, 1);
}


.flip-card-front {
  position: absolute;
  top: calc(100px / 2);
  left: calc(50% - 190px);
  max-width: 300px;
  padding: 0px 50px 50px 20px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  backface-visibility: hidden;
}

#createdCheckBox {
  display: none;
}
</style>
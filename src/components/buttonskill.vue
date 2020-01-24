<template>
    <div>
    <i id='shield' class="fas fa-shield-alt skill" @click="skill"> Shield</i>
    <i class="fas fa-khanda skill" @click="skill"> Double Attack</i>
    <i class="fas fa-skull-crossbones skill" @click="skill"> Secret</i>
    <bar></bar>
    </div>
</template>

<script>

export default {
  components:{
  },
  data () {
    return {
      health1: 100
    }
  },
  methods: {
    skill: function () {
      let sound = new Audio(require('../assets/soundgroup/skill.mp3'))
      sound.play()
      this.decrease()
    },
    decrease: function () {
      let sound = new Audio(require('../assets/soundgroup/clickButton.ogg'))
      sound.play()
      this.$store.dispatch('DECREASE1', 10)
    },
    decrease1: function () {
    //   this.health1 = this.health1 -10
    }
  },
  computed: {
  }

}
</script>

<style>
.skill{
    color: white;
    margin-left: 5%;
    border: 1px solid black;
    padding: 15px;
    border-radius: 10px;
    background-color: #0cbaba;
    background-image: linear-gradient(315deg, #0cbaba 0%, #240a7c 74%);
    background-size: 200% auto;
    transition: 0.5s;
    box-shadow: 0 0 20px #eee;
}
.skill:hover{
    cursor: pointer;
    background-position: right center;
    transform: scale(1.1);
}

#health{
    transform: rotate(180deg);
}

</style>

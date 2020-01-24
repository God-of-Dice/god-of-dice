<template>
    <div>
    <i v-if="heal" id='shield' class="fas fa-shield-alt skill" @click="doHeal"> Heal</i>
    <i v-if="doubleattack" class="fas fa-khanda skill" @click="skill"> Double Attack</i>
    <i v-if="suicide" class="fas fa-skull-crossbones skill" @click="doSuicide"> Secret</i>
    <!-- <bar></bar> -->
    </div>
</template>

<script>

export default {
  components:{
  },
  data () {
    return {
      doubleattack: true,
      heal : true,
      suicide : true
    }
  },
  methods: {
    skill: function () {
      let sound = new Audio(require('../assets/soundgroup/skill.mp3'))
      sound.play()
      this.doubleattack = false
      this.$store.commit('SET_BASEDAMAGE', 10)
    },
    doHeal: function () {
      let sound = new Audio(require('../assets/soundgroup/skill.mp3'))
      sound.play()
      this.heal = false
      this.$store.commit("SET_HEAL")
    },
    doSuicide: function () {
      let sound = new Audio(require('../assets/soundgroup/skill.mp3'))
      sound.play()
      this.suicide = false
      this.$store.commit("SET_SUICIDE")
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

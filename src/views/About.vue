<template>
  <div id="gameroom" class="about h-100">
    <div class="character" id="character">
      <div v-if="isMyTurn" @click="rollthedice" id="diceButton"><i class="fas fa-dice-d6"></i><br> <span id="roll">Roll</span> </div>
      <img v-if="diceroll===true" :class="{'roll animated': diceroll}" @animationend="diceend" src="../assets/dice.gif" id="dice">
      <img v-if="diceroll===false" :src="require(`../assets/${diceResult}.png`)" id="diceResult">

      <buttonSkill id="buttonSkill"></buttonSkill>
      <health class="ml-5 mr-5"></health>
      
      <img :class="{'bounce animated': animatedCloud}" @animationend="animationEnd" src="../assets/cloud.gif" id="cloud">
      <img v-if="animatedCloud===true" src="../assets/slash.gif" id="cloud" alt="" style="z-index:1;">

      <img :class="{'bounce animated': animatedLightning}" @animationend="animationEnd" src="../assets/lightning.gif" id="lightning">
      <img v-if="animatedLightning===true" src="../assets/slash.gif" id="lightning" alt="" style="z-index:1;transform: scaleX(1); right : 16rem;">
    </div>
  </div>
</template>

<script>
import buttonSkill from '../components/buttonskill'
import health from '../components/healt'

export default {
  name: 'battleroom',
  components: {
    buttonSkill,
    health,
  },
  data(){
    return {
      animatedCloud : false,
      animatedLightning : false,
      diceroll : false,
      diceResult : 1,
    }
  },
  methods: {
    animationEnd(){
      this.animatedCloud = false
      this.animatedLightning = false
    },
    animateCloud() {
      this.animatedCloud = true
    },
    animateLightning() {
      this.animatedLightning = true
    },
    rollthedice(){
      this.diceroll = true
      this.diceResult = Math.floor(Math.random()*6)
      // setTimeout(()=>{
        this.diceroll = false
        this.$store.dispatch('hit', this.diceResult);
        let turn = this.getTurn().toString()
        if(turn === "0"){
          this.animatedCloud()
        }else{
          this.animatedLightning()
        }
      // },2000)
    },
    diceend(){
      this.diceroll = false
    },
    diceImageGenerator(){
      return `../assets/slash.gif`
    },
    getTurn(){
      return this.$store.state.myIndex
    }
  },
  computed : {
    isMyTurn(){
      if(this.$store.state.turn === this.getTurn()){
        return true
      }else{
        return false
      }
    }
  },
  created(){
    this.$store.dispatch("fetchData")
    let sound = new Audio(require('../assets/soundgroup/inbattle.mp3'))
    sound.play()
  }
}
</script>

<style>
#id{
  height: 100%;
}

#diceResult{
  position: absolute;
  margin : auto;
  left: 0;
  right: 0;
  top: 0;
  bottom : 0;
  height: 120px;
}

#cloud{
  height: 240px;
  position: absolute;
  bottom : 7rem;
  left : 10rem;
  transform: scaleX(-1)
}
#lightning{
  height: 240px;
  position: absolute;
  bottom : 7rem;
  right : 9rem;
  transform: scaleX(-1)
}

.bounce{
  animation: shake 0.5s; 
}

.roll{
  animation: shake 3s; 
}

#buttonSkill{
  position: absolute;
  left: 0;
  right: 5rem;
  top: 10rem;
  margin-left : auto;
  margin-right : auto;

}

#dice{
  position: absolute;
  margin : auto;
  left: 0;
  right: 0;
  top: 0;
  bottom : 0;
  height: 180px;
}

#diceButton{
    background-color: #dfdd80;
    font-size: 30px;
    width: 120px;
    border-radius: 50%;
    padding: 10px;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 15rem;
    
}

#diceButton:hover{
    color: white;
    cursor: pointer;
    background: #240a7c;
    transform: scale(0.9);
    transition: 0.5s;
}

@keyframes shake {
  0% { transform: translate(2px, 2px) rotate(3deg) scaleX(-1) ; }
  10% { transform: translate(-2px, -4px) rotate(-3deg) scaleX(-1) ; }
  20% { transform: translate(-5px, 1px) rotate(1deg) scaleX(-1) ; }
  30% { transform: translate(5px, 4px) rotate(3deg) scaleX(-1) ; }
  40% { transform: translate(2px, -2px) rotate(1deg) scaleX(-1) ; }
  50% { transform: translate(-2px, 4px) rotate(-3deg) scaleX(-1) ; }
  60% { transform: translate(-5px, 2px) rotate(3deg) scaleX(-1) ; }
  70% { transform: translate(5px, 2px) rotate(-3deg) scaleX(-1) ; }
  80% { transform: translate(-2px, -2px) rotate(1deg) scaleX(-1) ; }
  90% { transform: translate(2px, 4px) rotate(3deg) scaleX(-1) ; }
  100% { transform: translate(2px, -4px) rotate(-3deg) scaleX(-1) ; }
}
</style>
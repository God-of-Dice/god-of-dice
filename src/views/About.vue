<template>
  <div id="gameroom" class="about h-100">
    <div class="character" id="character">
      <button @click="rollthedice" id="rolldice">ROLL DICE</button>
      <img v-if="diceroll===true" :class="{'roll animated': diceroll}" @animationend="diceend" src="../assets/dice.gif" id="dice">
      <img v-if="diceroll===false" :src="require(`../assets/${diceResult}.png`)" id="diceResult">

      <button @click="animateCloud" id="rolldice">Attack cloud</button>
      <button @click="animateLightning" id="rolldice">Attack lightning</button>

      <buttonSkill id="buttonSkill"></buttonSkill>
      <health class="ml-5 mr-5"></health>
      
      <img :class="{'bounce animated': animatedCloud}" @animationend="animationEnd" src="../assets/git .gif" id="cloud">
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
    health
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
      setTimeout(()=>{
        this.diceroll = false
      },2000)
    },
    diceend(){
      this.diceroll = false
    },
    diceImageGenerator(){
      return `../assets/slash.gif`
    }
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
  right: 0;
  top: 5rem;
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
<template>
  <div id="gameroom" class="about h-100">
    <div class="character" id="character">
      <img v-if="animated===true" src="../assets/slash.gif" id="cloud" alt="" style="z-index:1;">
      <img :class="{'bounce animated': animated}" @animationend="animationEnd" src="../assets/cloud.gif" id="cloud">
      <img @click="animate" src="../assets/lightning.gif" id="lightning">
    </div>
  </div>
</template>

<script>

export default {
  name: 'battleroom',
  components: {

  },
  data(){
    return {
      animated : false,
    }
  },
  methods: {
    animationEnd(){
      this.animated = false
    },
    animate() {
      console.log("masuk animated")
      this.animated = true
      console.log(this.animated)
    }
  }
}
</script>

<style>
#id{
  height: 100%;
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
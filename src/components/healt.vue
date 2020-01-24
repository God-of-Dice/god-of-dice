<template>
    <div>
        <b-row>
          <b-col cols="5">
            <h3 style="color : white;">{{$store.state.players[0].name}}</h3>
            <b-progress :value="hpValuePlayerOne" height="30px" :variant="colorbar1" id="health1" class="bar"></b-progress>    
          </b-col>
          <b-col cols="5" offset="2">
            <h3 style="color : white;">{{$store.state.players[1].name}}</h3>
            <b-progress :value="hpValuePlayerTwo" height="30px" :variant="colorbar2" id="health" class="bar" style="transform:scaleX(-1)"></b-progress>
          </b-col>
        </b-row>
    </div>
</template>

<script>
console.log('health componente')
export default {
  computed:{
    hpValuePlayerOne(){
      let hpPlayerOne = this.$store.state.players[0].hp || 0
      return hpPlayerOne
    },
    hpValuePlayerTwo(){
      let hpPlayerTwo = this.$store.state.players[1].hp || 0
      return hpPlayerTwo
    },
    colorbar1: function () {
      let hpPlayerOne = this.$store.state.players[0].hp || 0
      if(hpPlayerOne > 70) {
        return 'success'
      }
      if(hpPlayerOne > 30) {
        return 'warning'
      } else {
        return 'danger'
      }
    },
    colorbar2: function () {
      let hpPlayerTwo = this.$store.state.players[1].hp || 0
      if(hpPlayerTwo > 70) {
        return 'success'
      }
      if(hpPlayerTwo > 30) {
        return 'warning'
      } else {
        return 'danger'
      }
    },
  }

}
</script>

<style>
.bar{
  display: inline;
}

</style>
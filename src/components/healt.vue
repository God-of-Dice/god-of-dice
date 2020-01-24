<template>
    <div>
        <b-row>
          <b-col cols="5">
            <h3>Player 1</h3>
            <b-progress :value="$store.state.healthplayer1" height="30px" :variant="colorbar" id="health1" class="bar"></b-progress>    
          </b-col>
          <b-col cols="5" offset="2">
            <h3>Player 2</h3>
            <b-progress :value="$store.state.healthplayer1" height="30px" :variant="colorbar" id="health" class="bar" style="transform:scaleX(-1)"></b-progress>
          </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
  computed:{
    colorbar: function () {
      if(this.$store.state.healthplayer1 > 70) {
        return 'success'
      }
      if(this.$store.state.healthplayer1 > 30) {
        return 'warning'
      } else {
        return 'danger'
      }
    }
  }

}
</script>

<style>
.bar{
  display: inline;
}

</style>
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <buttonSkill>
    </buttonSkill>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import buttonSkill from '../components/buttonskill'

export default {
  name: 'home',
  components: {
    HelloWorld,
    buttonSkill
  }
}
</script>

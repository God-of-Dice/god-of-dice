<template>
  <div id="diceButton"><i class="fas fa-dice-d6"></i><br> <span id="roll">Roll</span> </div>
</template>

<script>
export default {

}
</script>

<style>
#diceButton{
    background-color: #0cbaba;
    border: 1px solid black;
    font-size: 30px;
    width: 120px;
    border-radius: 50%;
    padding: 10px
    
}

#diceButton:hover{
    color: white;
    cursor: pointer;
    background: #240a7c;
    transform: scale(0.9);
    transition: 0.5s;
}
</style>
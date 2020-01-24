<template>
  <div id="dice"><i class="fas fa-dice-d6"></i><br> <span id="roll">Roll</span> </div>
</template>

<script>
export default {

}
</script>

<style>
#dice{
    border: 1px solid black;
    font-size: 30px;
    width: 120px;
    border-radius: 50%;
    padding: 10px
    
}

#dice:hover{
    color: white;
    cursor: pointer;
    background: #240a7c;
    transform: scale(0.9);
    transition: 0.5s;
}
</style>
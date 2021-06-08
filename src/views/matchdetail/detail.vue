<template>
  <div class="matchdDetail">
    <fieldset class="fieldset" disabled="disabled">
      <legend>routeParams</legend>
      <p v-for="(item,index) in route" :key="index">{{index}} : {{item}}</p>
    </fieldset>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: "",
  setup(){ 
    const route = useRoute()
    return {
      route,
    }
  },
})
</script>

<style lang='less' scoped>
.matchdDetail{
  width: 100%;
  .fieldset{
    width:90%;
    margin: 0 auto;
  }
}
</style>

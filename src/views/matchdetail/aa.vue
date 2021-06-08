<template>
  <div class="">
    {{user}}
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
export default defineComponent({
  name: "",
  props:['user'],
  setup(props){ 
    const mes = 1
    const userddd = toRefs(props).user
    console.log(userddd.value)
    return {
      mes,
      userddd  
    }
  }
})
</script>

<style lang='less' scoped>

</style>

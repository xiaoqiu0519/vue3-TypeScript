<template>
  <div class="majorScore">
    <searchList></searchList>
    <majorContent></majorContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import searchList from './searchList.vue'
import majorContent from './majorContent.vue'
export default defineComponent({
  name: "",
  components:{
    searchList,
    majorContent
  },
  setup(){ 
    const mes = 1
    return {
      mes  
    }
  }
})
</script>

<style lang='less' scoped>

</style>

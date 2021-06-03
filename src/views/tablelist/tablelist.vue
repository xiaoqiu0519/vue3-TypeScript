<template>
  <div>
    {{mes}}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { findRcMatchList } from '@/api/tablelist'
import { IfindRcMatchListParams } from '@/interface/commom'
export default defineComponent({
  name: 'App',
  setup(){ 
    const mes ='饿死的离开'
    const params:IfindRcMatchListParams = {
      current: 1,
      matchQueryType: 1,
      matchStatus: [],
      matchType: 2,
      size: 20,
      status: "",
    } 
    findRcMatchList(params).then(res=>{
      console.log(res)
    })
    return {
      mes
    }
  }
})
</script>

<style scoped>

</style>

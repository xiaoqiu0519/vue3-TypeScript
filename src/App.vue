<template>
  <TagNav></TagNav>
  <router-view/>
</template>
<script type='ts'>
import  { defineComponent} from 'vue'
import store from '@/store/index'
export default defineComponent({
  name:'App',
  setup(){
    if(store.state.token){
      store.dispatch('FINDENUMLIST')
    }
  }
})
</script>
<style lang="less">
body{
  width: 100%;
  height: 100%;
  background: #EEF1F3;
}  
</style>
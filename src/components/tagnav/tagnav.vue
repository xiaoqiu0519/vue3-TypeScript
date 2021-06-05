<template>
  <div class="tagnav">
    <span :class="{nav:1,actived:activeindex === index}" 
      v-for="(tag,index) in tagNav" :key="index"
      @click="changeTab(index)"
      >
      {{tag}}
    </span>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'tagnav',
  props:{
    tagNav:{
      default(){
        return ['Matches','OutRight']
      }
    }
  },
  setup(){
    const activeindex = ref(0)
    const changeTab = (index:number)=>{
      activeindex.value = index
    }
    return{
      activeindex,
      changeTab
    }
  }
})
</script>
<style lang="less" scoped>
.tagnav{
  height: 45px;
  padding: 0 10px;
  line-height: 45px;
  color: white;
  font-weight: 900;
  background-image: linear-gradient(to right, #1f4064 0%, #00bfa8 181%, #00bfa8 181%);
  .nav{
    display: inline-block;
    padding: 0 15px;
    color: white;
    cursor: pointer;
  }
  .actived{
    background: #EEF1F3;
    color: black;;
  }
}  
</style>
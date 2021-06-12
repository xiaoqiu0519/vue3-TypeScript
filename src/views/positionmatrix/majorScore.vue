<template>
  <div class="majorScore">
    <div class="title">{{majorScore.title}}</div>
    <div class="periodlist" v-for="(list,index) in majorScore.periodlist" :key="index">
      <periodlist :periodlist='list' :marketTypeName='majorScore.title' :sportId='majorScore.sportId' :marketType='majorScore.marketType'></periodlist>
    </div>
  </div>
</template>
<script lang="ts">
import periodlist from './periodlist.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: "",
  props: ['majorScore'],
  components:{periodlist},
})
</script>

<style lang='less' scoped>
.majorScore{
  flex: 1;
  margin-left: 5px;
  background: #EEF1F3;
  border-radius: 5px;
  .title{
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-weight: bold;
    font-size: 12px;
  }
  .periodlist{
    display: flex;
    padding: 0 5px;
    height: 60px;
    margin-bottom: 4px;
    justify-content: space-between;
  }
}
</style>

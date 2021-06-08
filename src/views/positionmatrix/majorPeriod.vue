<template>
  <div class="majorperiod">
    <div class="title">Period</div>
    <div class="list">
      <span v-for="(list,index) in majorPeriod" :key="index">{{list.value}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: "",
  props: {
    majorPeriod: {
      default () {
        return [
          {
            period: '1001',
            value: 'Full Time'
          },
          {
            period: '1001',
            value: 'First Half'
          },
          {
            period: '1001',
            value: 'Quarter 1'
          },
          {
            period: '1001',
            value: 'Quarter 2'
          }
        ]
      }
    }
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
.majorperiod{
  width: 110px;
  // height: 200px;
  background: #EEF1F3;
  border-radius: 5px;
  .title{
    width: 110px;
    text-align: center;
    line-height: 30px;
    height: 30px;
    color: #333333;
    font-weight: 900;
    font-size: 12px;
  }
  .list{
    span{
      width: 100px;
      height: 60px;
      margin: 0 auto;
      text-align: center;
      line-height: 60px;
      color: #0184B8;
      display: block;
      background: #FFFFFF;
      border-radius: 5px;
      margin-bottom: 4px;
      font-weight: 900;
      font-size: 12px;
    }
  }
}
</style>

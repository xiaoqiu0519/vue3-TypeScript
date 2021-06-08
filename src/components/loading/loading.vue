<template>
  <div class="Loading">
    <div class="container">
      <span class="el-icon-loading"></span>
      <br>
      <span>loading...</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: "",
  setup(){ 
    const mes = 1
    return {
      mes  
    }
  }
})
</script>

<style lang='less' scoped>
.Loading{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.1);
  position: fixed;
  z-index: 999999;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  .container{
    margin-top: 20%;
    color: #409EFF;
    text-align: center;
  }
  .el-icon-loading{
    font-size: 30px;
    font-weight: 900;
    margin-top: -25%;
  }
  
}
</style>

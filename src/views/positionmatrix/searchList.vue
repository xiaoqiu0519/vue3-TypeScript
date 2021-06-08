<template>
  <div class="searchList">
    <nav>
      <label>Match ID: </label>
      <el-input class="inputSearch input-id" size="mini" v-model="matchId" placeholder="Input" clearable></el-input>
    </nav>
    <nav>
      <label>Sport: </label>
      <el-select clearable size="mini" filterable v-model="sportId" no-data-text='No data' placeholder="Select">
        <el-option v-for="item in sportTypeSelect" :key="item.code" :label="item.value" :value="item.code"/>
      </el-select>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  name: "",
  setup(){ 
    const matchId = ref<number | null>(null)
    const sportId = ref<number | null>(null)
    const sportTypeSelect = reactive({})
    return {
      matchId,
      sportId,
      sportTypeSelect  
    }
  }
})
</script>

<style lang='less' scoped>
.searchList{
  width: 98%;
  height: 50px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  align-content: center;
  nav{
    margin-right: 10px;
  }
  .el-input--mini{
    width: 200px;
  }
  .el-input__inner{
    width: 200px;
  }
}
</style>

<template>
  <div class="tableList">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="matchId" label="matchId"  min-width="100"/>
      <el-table-column prop="openTime" label="openTime"  min-width="180">
        <template v-slot="{row}">
          {{formatTime(row.openTime,'yyyy-MM-dd hh:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column prop="sportName" label="sportName"  min-width="100"/>
      <el-table-column prop="openTime" label="openTime"  min-width="200">
        <template v-slot="{row}">
          {{formatAmount(row.openTime)}}
        </template>
      </el-table-column>
      <el-table-column prop="home"  min-width="200" label="home" />
      <el-table-column prop="away" min-width="200" label="away" />
      <el-table-column prop="liveBookieName" label="Bookie" align="center"  min-width="80"/>
      <el-table-column min-width="100" label="GoTo">
        <template v-slot="{row}">
          <u class="goto" @click="goto(row)">GoTo</u> 
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'
import { findRcMatchList } from '@/api/tablelist'
import { IfindRcMatchListParams } from '@/interface/commom'
import { formatTime ,formatAmount} from '@/utils/filters'
import router from '@/router/index'
import { createLoading } from '@/utils/createLoading'
export default defineComponent({
  name: 'App',
  setup(){ 
    let tableData = ref([])
    const params:IfindRcMatchListParams = {
      current: 1,
      matchQueryType: 1,
      matchStatus: [],
      matchType: 2,
      size: 20,
      status: "",
    } 
    const getRcMatchList = ()=>{
      createLoading(true)
      findRcMatchList(params).then(res=>{
        createLoading(false)
        if(res.code === 0){
          tableData.value = res.data.records
        }
      });
    }  
    const goto=(row:any)=>{
      // router.push(`/matchdetail/matchid/${row.matchId}`)
      router.push('/positionmatrix')
    }
    getRcMatchList()
    return {
      tableData,
      goto,
      formatTime,
      formatAmount,
      getRcMatchList,
    }
  }
})
</script>

<style lang='less' scoped>
.tableList{
  .goto{
    color: #21A694;
    cursor: pointer;
  }
}
</style>

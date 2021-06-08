<template>
  <div class="majorInfo">
    <div class="info">
      <span class="MatchId">Match Id: {{majorInfo.matchId}}</span>
      <span class="teamname">{{majorInfo.home}} vs {{majorInfo.away}}</span>
      <span class="sportType">{{majorInfo.sportName}}</span>
      <span class="line"></span>
      <span>Eng-Premier league</span>
      <span class="line"></span>
      <span>{{formatTime(majorInfo.runningTime,'yyyy/MM/dd hh:mm:ss')}}</span>
      <i class="el-icon-refresh" @click="updateMatch"></i>
    </div>
    <div class="matchTime">
      <div class="tab">
        <span @click="clickTab(list.tabIndex)" :class="{tabActive:tabIndex === list.tabIndex}" v-for="list in tabArr" :key="list.tabIndex">{{list.title}}</span>
      </div>
      <div class="updateTime">
        <span class="score">
          <strong>1H</strong>
          15:20 -
          <strong>5:2</strong>
          (2:0)
        </span>
        <span class="time">
          Last Update Time: {{formatTime(majorInfo.lastCalculateTime,'yyyy-MM-dd hh:mm:ss')}}
        </span>
        <span class="detail" @click="matchRisk(info)">Detail <i class="el-icon-top-right"></i></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { formatTime} from '@/utils/filters'
export default defineComponent({
  name: "",
  props: {
    majorInfo: {
      default () {
        return {
          sportId: '1',
          home: '',
          away: '',
          sportName: '',
          runningTime: '',
          lastCalculateTime: '',
          matchId: ''
        }
      }
    }
  },
  setup(){ 
    const tabArr = reactive( [
      { tabIndex: 1, title: 'Prematch' },
      { tabIndex: 2, title: 'Live' },
      { tabIndex: 3, title: 'All' }
    ])
    const tabIndex =ref(3)
    const clickTab =(index:number)=>{
      tabIndex.value = index
    }
    return {
      tabArr,
      tabIndex,
      formatTime,
      clickTab
    }
  }
})
</script>

<style lang='less' scoped>
.majorInfo{
  .info{
    position: relative;
    span{
      color: #666666;
      font-size: 12px;
    }
    .MatchId{
      width: 110px;
      height: 24px;
      text-align: center;
      line-height: 24px;
      background: #EEF1F3;
      border-radius: 5px;
      color: #0184B8;
      display: inline-block;
      margin-right: 5px;
    }
    .teamname{
      color: #333333;
      font-weight: bold;
      font-size: 14px;
      margin-right: 15px;
    }
    .line{
      width: 1px;
      height: 12px;
      background: #DEDFE4;
      display: inline-block;
      margin: 0 12px;
      position: relative;
      top: 2px;
    }
    .el-icon-refresh{
      position: absolute;
      right: 0;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      color: #0184b8;
      cursor: pointer;
      transition: all 0.5s;
      &:active {
        transform: rotate(360deg);
      }
    }

  }
  .matchTime{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    margin-top: 10px;
    .tab{
      span{
        width: 110px;
        margin-right: 5px;
        height: 27px;
        line-height: 27px;
        text-align: center;
        display: inline-block;
        border: 1px solid #DEDFE4;
        border-radius: 5px;
        cursor: pointer;
        font-size: 12px;
      }
      .tabActive{
        background: #0184B8;
        color: white;
      }
    }
    .updateTime{
      color: #000000;
      span{
        height: 20px;
        line-height: 20px;
      }
      .score{
        width: 150px;
        text-align: center;
        display: inline-block;
        line-height: 20px;
        margin-right: 10px;
        background: #FFFFFF;
        box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
        border-radius: 2px;
        color:#666666;
        strong{
          color: #000000;
          font-size: 14px;
          font-weight: normal;
        }
      }
      .time{
        margin-right: 20px;
      }
      .detail {
        color: #0184b8;
        cursor: pointer;
        i {
          font-weight: bold;
        }
      }
    }
  }
}
</style>

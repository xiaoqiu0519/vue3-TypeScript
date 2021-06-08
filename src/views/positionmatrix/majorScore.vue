<template>
  <div class="majorScore" v-for="(score,index) in majorScore" :key="index">
    <div class="title">{{score.title}}</div>
    <div class="list" v-for="(list,index) in score.Periodlist" :key="index">
      <div class="content">
        <div class="scoreList" v-for="(item,key) in list.score" :key="key">
          <div class="scorekey">
            <i class="chan left el-icon-arrow-left" v-if="key === 0 && score.title !== 'scoreinvest1x2'"></i>
            <input type="text" v-model="item.key" v-if=" key ===  (list.score.length - 1) / 2">
            <span :class="{score:true,preScore:+item.value === +list.preScore}" v-else>{{item.key}}</span>
            <i class="chan right el-icon-arrow-left" v-if="key === list.score.length - 1 && score.title !== 'scoreinvest1x2'"></i>
          </div>
          <div :class="{scorevalue:true,prevalue:+item.value === +list.preScore}">{{item.value}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: "",
  props: {
    majorScore: {
      default () {
        return {
          title: 'Handicap',
          Periodlist: [
            {
              period: '1001',
              preScore: '123',
              score: [
                {
                  key: 10,
                  value: '12323'
                },
                {
                  key: 10,
                  value: '123'
                },
                {
                  key: 10,
                  value: '12323'
                },
                {
                  key: 10,
                  value: '12323'
                },
                {
                  key: 10,
                  value: '12323'
                }
              ]
            }
          ]
        }
      }
    }
  },
  setup(props){ 
    const mes = 1
    // console.log(props)
    return {
      mes  
    }
  }
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
  .list{
    padding: 0 5px;
    border-radius: 5px;
    .content{
      width: 100%;
      height: 60px;
      background: #FFFFFF;
      border-radius: 5px;
      margin-bottom: 4px;
      display: flex;
      justify-content: space-between;
      .scoreList{
        flex: 1;
        text-align: center;
        border-right: 1px solid  #EEF1F3;
        div{
          height: 30px;
          line-height: 30px;
        }
        .scorekey{
          box-sizing: border-box;
          border-bottom: 1px solid  #EEF1F3;
          position: relative;
          .el-icon-arrow-left{
            position: absolute;
            color: #2F4162;
            cursor: pointer;
            font-weight: 900;
            top: 50%;
            margin-top: -6px;
          }
          .left{
            left: 5px;
          }
          .right {
            right: 5px;
            transform: rotate(180deg);
          }
          .score{
            width: 54px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            background: #F7F9FB;
            border-radius: 2px;
            display: inline-block;
          }
          .preScore{
            background: #FFEECC !important;
          }
          input{
            width: 54px;
            outline: none;
            border: 1px solid #DEDFE4;
            border-radius: 2px;
            text-align: center;
          }
        }
        .prevalue{
          color: #CA5434;
        }
      }
    }
  }
}
</style>

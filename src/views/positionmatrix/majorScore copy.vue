<template>
  <div class="majorScore">
    <div class="title">{{majorScore.title}}</div>
    <div class="content">
      <div class="scoreList" v-for="(item,key) in scoreArr[majorScore.title]" :key="key">
        <div class="scorekey">
          <i class="chan left el-icon-arrow-left" @click="changeScore(item.key-1,'min')" v-if="key === 0 && majorScore.title !== 'scoreinvest1x2' && 
              (([1007,3003,3012,3013].indexOf(majorScore.marketType) !== -1 && +item.key > 0) || [1000,3002].indexOf(majorScore.marketType) !== -1)"></i>
          <input @blur="blurInput(majorScore.title)" :class="{preScore:+item.key === +majorScore.Periodlist.preScore}" type="text" v-model="scoreArrInput[majorScore.title]" v-if=" key ===  (scoreArr[majorScore.title].length - 1) / 2">
          <span :class="{score:true,preScore:+item.key === +majorScore.Periodlist.preScore}" v-else>{{item.key}}</span>
          <i class="chan right el-icon-arrow-left" @click="changeScore(item.key+1,'add')" v-if="key === scoreArr[majorScore.title].length - 1 && majorScore.title !== 'scoreinvest1x2'"></i>
        </div>
        <div :class="{scorevalue:true,prevalue:+item.key === +majorScore.Periodlist.preScore}">{{item.value}}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch} from 'vue'
import { uNegIntPattern,uPosIntPattern } from '@/utils/validReg' 
export default defineComponent({
  name: "",
  props: ['majorScore'],
  setup(props){ 
    /**
     * 足球1000玩法、篮球3002玩法：最小值可以为负
     * 足球1007玩法、篮球3003玩法、篮球3012玩法、篮球3013玩法：最小值是0
     */
    const majorScore = toRefs(props).majorScore.value
    const sportLength:any = {1:3,3:5}
    let scoreArr:any = reactive({})
    let scoreArrInput:any = reactive({})
    let itemPeriodlist = majorScore.Periodlist.score
    let preScoreIndex = majorScore.Periodlist.preScoreIndex 
    scoreArrInput[majorScore.title] = majorScore.Periodlist.preScore
    if(+majorScore.marketType === 1005){
      scoreArr[majorScore.title] = itemPeriodlist
    }else{
      let ArrLeft = []
      let ArrRight = itemPeriodlist.slice(preScoreIndex,preScoreIndex + ((sportLength[majorScore.sportId] +1) / 2)) 
      if(preScoreIndex >= (sportLength[majorScore.sportId] -1) / 2){ 
        ArrLeft = itemPeriodlist.slice(preScoreIndex - ((sportLength[majorScore.sportId] -1) / 2),preScoreIndex) 
      }else{
        switch(majorScore.marketType){
          case 1000:
            ArrLeft = [{key:itemPeriodlist[0].key - 1,value:itemPeriodlist[0].value}]
            break;
          case 3002:
            ArrLeft = preScoreIndex === 0
            ?
              [
                {key:itemPeriodlist[0].key - 2,value:itemPeriodlist[0].value},
                {key:itemPeriodlist[0].key - 1,value:itemPeriodlist[0].value}
              ]
            :
              [
                {key:itemPeriodlist[0].key - 1,value:itemPeriodlist[0].value},
                {key:itemPeriodlist[0].key,value:itemPeriodlist[0].value}
              ]
            break;
          case 1007:
            itemPeriodlist[0].key <= 0 
              ?ArrRight = itemPeriodlist.slice(0,3)
              :ArrLeft = [{key:itemPeriodlist[0].key - 1,value:itemPeriodlist[0].value}]
            break;
          case 3012:
          case 3013:
            if(itemPeriodlist[0].key <= 0){
              ArrRight = itemPeriodlist.slice(0,5)
            }else if(itemPeriodlist[0].key === 1){
              ArrLeft = [{key:itemPeriodlist[0].key - 1,value:itemPeriodlist[0].value}]
              ArrRight = itemPeriodlist.slice(0,4)    
            }else{
              ArrLeft = [
                {key:itemPeriodlist[0].key - 2,value:itemPeriodlist[0].value},
                {key:itemPeriodlist[0].key - 1,value:itemPeriodlist[0].value}
              ]
              ArrRight = itemPeriodlist.slice(0,3)
            }
            break;
          }
      }
      scoreArr[majorScore.title] = ArrLeft.concat(ArrRight)
      let diffLength = sportLength[majorScore.sportId] - scoreArr[majorScore.title].length
      while(diffLength){
        diffLength--
        scoreArr[majorScore.title] = scoreArr[majorScore.title].concat([{
          key:scoreArr[majorScore.title][scoreArr[majorScore.title].length-1].key + 1,
          value:scoreArr[majorScore.title][scoreArr[majorScore.title].length-1].value
        }])
      }
    }
    const changeScore = (paramsKey:number,type:string)=>{
      let majorScoreArr:any = majorScore.Periodlist.score
      let curentArr = []
      let activeArr = scoreArr[majorScore.title]
      let lastScore = activeArr[activeArr.length-1]
      let isInmajorScoreArr = majorScoreArr.some((list:any)=> paramsKey === list.key)
      if(isInmajorScoreArr){
        curentArr = majorScoreArr.filter((list:any) => paramsKey === list.key)
      }else{
        if(type === 'min'){
          curentArr = paramsKey > activeArr[0].key 
            ?[{key:lastScore.key-1,value:lastScore.value}]
            :[{key:activeArr[0].key-1,value:activeArr[0].value}]
        }else{
          curentArr = paramsKey > lastScore.key 
            ?[{key:lastScore.key+1,value:lastScore.value}]
            :[{key:activeArr[0].key+1,value:activeArr[0].value}]
        }
      }
      scoreArr[majorScore.title] = type === 'min'
        ? curentArr.concat(activeArr.slice(0,activeArr.length-1))
        : activeArr.slice(1).concat(curentArr)

      for (const key in scoreArrInput) {
        scoreArrInput[key] = scoreArr[key][(scoreArr[key].length - 1) / 2].key
      }
    }
    const blurInput =(title:string)=>{
      if(majorScore.title === title){
        scoreArr[majorScore.title] = []
        let preScore = majorScore.Periodlist.score
        if(!scoreArrInput[majorScore.title] || scoreArrInput[majorScore.title] === '-') scoreArrInput[majorScore.title] = 0
        if(+majorScore.marketType === 1007 || +majorScore.marketType === 3003 || +majorScore.marketType === 3012 || +majorScore.marketType === 3013 ){
          if(+scoreArrInput[majorScore.title] < (+sportLength[majorScore.sportId] - 1) / 2){
            scoreArrInput[majorScore.title] = (+sportLength[majorScore.sportId] - 1) / 2
          }
        }
        if(+scoreArrInput[title] <= +preScore[0].key){
          for(let i = 0 ;i < sportLength[majorScore.sportId];i++){
            let dd = scoreArrInput[title] - (sportLength[majorScore.sportId] - 1) / 2 + i
            if(dd <= +preScore[0].key){
              scoreArr[majorScore.title].push({key:dd,value:preScore[0].value})
            }else{
              scoreArr[majorScore.title].push(preScore[dd- +preScore[0].key])
            }
          }
        }else if(+scoreArrInput[title] >= +preScore[preScore.length-1].key){
          for(let i = 0 ;i < sportLength[majorScore.sportId];i++){
            let dd = scoreArrInput[title] - (sportLength[majorScore.sportId] - 1) / 2 + i
            if(dd <= +preScore[preScore.length-1].key){
              scoreArr[majorScore.title].push(preScore[preScore.length - 1 + dd - +preScore[preScore.length-1].key])
            }else{
              scoreArr[majorScore.title].push({key:dd,value:preScore[preScore.length-1].value})
            }
          }
        }else{
          for(let i = 0 ;i < sportLength[majorScore.sportId];i++){
            let dd = scoreArrInput[title] - (sportLength[majorScore.sportId] - 1) / 2 + i
            if(dd <= +preScore[0].key){
              scoreArr[majorScore.title].push({key:dd,value:preScore[0].value})
            }else if(dd <= +preScore[preScore.length-1].key){
              scoreArr[majorScore.title].push(preScore[preScore.length - 1 + dd - +preScore[preScore.length-1].key])
            }else{
              scoreArr[majorScore.title].push({key:dd,value:preScore[preScore.length-1].value})
            }
          }
        }
      }
    }
    watch(scoreArrInput,()=>{
      for (const key in scoreArrInput) {
        if(key === 'scoreinvestasian' || key === 'Handicap'){
          if(+scoreArrInput[key] >= 0){
            if(!uPosIntPattern.test(scoreArrInput[key])){
              scoreArrInput[key] = scoreArrInput[key].slice(0,scoreArrInput[key].length-1)
            }else{
              if(+scoreArrInput[key][0] === 0 && scoreArrInput[key].toString().length !== 1){
                scoreArrInput[key] = scoreArrInput[key].slice(1)
              }
            }
          }else{
            if(!uNegIntPattern.test(scoreArrInput[key])){
              scoreArrInput[key] = `-${scoreArrInput[key].slice(1,scoreArrInput[key].length-1)}`
            }
          }
        }else{
          if(!uPosIntPattern.test(scoreArrInput[key])){
            scoreArrInput[key] = scoreArrInput[key].slice(0,scoreArrInput[key].length-1)
          }else{
            if(+scoreArrInput[key][0] === 0 && scoreArrInput[key].toString().length !== 1){
              scoreArrInput[key] = scoreArrInput[key].slice(1)
            }
          }
        }
      }
    })
    return {
      scoreArr,
      changeScore,
      blurInput,
      scoreArrInput
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
  .content{
    padding: 0 5px;
    height: 60px;
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    .scoreList{
      flex: 1;
      background: #FFFFFF;
      text-align: center;
      border-radius: 5px;
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
          font-size: 12px;
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
          font-size: 12px;
        }
      }
      .scorevalue{
        font-size: 12px;
      }
      .prevalue{
        color: #CA5434;
      }
    }
  }
}
</style>

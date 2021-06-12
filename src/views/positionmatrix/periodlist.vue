<template>
  <div class="scoreList" v-for="(item,key) in scoreArr[marketTypeTitle]" :key="key">
    <div class="scorekey">
      <i class="chan left el-icon-arrow-left" @click="changeScore(item.key-1,'min')" v-if="key === 0 && marketTypeTitle !== 'scoreinvest1x2' && 
          (([1007,3003,3012,3013].indexOf(marketType) !== -1 && +item.key > 0) || [1000,3002].indexOf(marketType) !== -1)"></i>
      <input @blur="blurInput(marketTypeTitle)" :class="{preScore:+item.key === +periodlist.preScore}" type="text" v-model="scoreArrInput[marketTypeTitle]" v-if=" key ===  (scoreArr[marketTypeTitle].length - 1) / 2">
      <span :class="{score:true,preScore:+item.key === +periodlist.preScore}" v-else>{{item.key}}</span>
      <i class="chan right el-icon-arrow-left" @click="changeScore(item.key+1,'add')" v-if="key === scoreArr[marketTypeTitle].length - 1 && marketTypeTitle !== 'scoreinvest1x2'"></i>
    </div>
    <div :class="{scorevalue:true,prevalue:+item.key === +periodlist.preScore}">{{item.value}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch} from 'vue'
import { uNegIntPattern,uPosIntPattern } from '@/utils/validReg' 
export default defineComponent({
  name: "periodlist",
  props:['periodlist','marketTypeName','marketType','sportId'],
  setup(props){ 
    /**
     * 足球1000玩法、篮球3002玩法：最小值可以为负
     * 足球1007玩法、篮球3003玩法、篮球3012玩法、篮球3013玩法：最小值是0
     */
    const marketTypeTitle = toRefs(props).marketTypeName.value
    const periodlist = toRefs(props).periodlist.value
    const marketType = toRefs(props).marketType.value
    const sportId = toRefs(props).sportId.value
    const sportLength:any = {1:3,3:5}
    let scoreArr:any = reactive({})
    let scoreArrInput:any = reactive({})
    let itemPeriodlist = periodlist.score
    let preScoreIndex = periodlist.preScoreIndex 
    scoreArrInput[marketTypeTitle] = periodlist.preScore
    if(+marketType === 1005){
      scoreArr[marketTypeTitle] = itemPeriodlist
    }else{
      let ArrLeft = []
      let ArrRight = itemPeriodlist.slice(preScoreIndex,preScoreIndex + ((sportLength[sportId] +1) / 2)) 
      if(preScoreIndex >= (sportLength[sportId] -1) / 2){ 
        ArrLeft = itemPeriodlist.slice(preScoreIndex - ((sportLength[sportId] -1) / 2),preScoreIndex) 
      }else{
        switch(marketType){
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
      scoreArr[marketTypeTitle] = ArrLeft.concat(ArrRight)
      let diffLength = sportLength[sportId] - scoreArr[marketTypeTitle].length
      while(diffLength){
        diffLength--
        scoreArr[marketTypeTitle] = scoreArr[marketTypeTitle].concat([{
          key:scoreArr[marketTypeTitle][scoreArr[marketTypeTitle].length-1].key + 1,
          value:scoreArr[marketTypeTitle][scoreArr[marketTypeTitle].length-1].value
        }])
      }
    }
    const changeScore = (paramsKey:number,type:string)=>{
      let majorScoreArr:any = periodlist.score
      let curentArr = []
      let activeArr = scoreArr[marketTypeTitle]
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
      scoreArr[marketTypeTitle] = type === 'min'
        ? curentArr.concat(activeArr.slice(0,activeArr.length-1))
        : activeArr.slice(1).concat(curentArr)

      for (const key in scoreArrInput) {
        scoreArrInput[key] = scoreArr[key][(scoreArr[key].length - 1) / 2].key
      }
    }
    const blurInput =(title:string)=>{
      if(marketTypeTitle === title){
        scoreArr[marketTypeTitle] = []
        let preScore = periodlist.score
        if(!scoreArrInput[marketTypeTitle] || scoreArrInput[marketTypeTitle] === '-') scoreArrInput[marketTypeTitle] = 0
        if(+marketType === 1007 || +marketType === 3003 || +marketType === 3012 || +marketType === 3013 ){
          if(+scoreArrInput[marketTypeTitle] < (+sportLength[sportId] - 1) / 2){
            scoreArrInput[marketTypeTitle] = (+sportLength[sportId] - 1) / 2
          }
        }
        if(+scoreArrInput[title] <= +preScore[0].key){
          for(let i = 0 ;i < sportLength[sportId];i++){
            let dd = scoreArrInput[title] - (sportLength[sportId] - 1) / 2 + i
            if(dd <= +preScore[0].key){
              scoreArr[marketTypeTitle].push({key:dd,value:preScore[0].value})
            }else{
              scoreArr[marketTypeTitle].push(preScore[dd- +preScore[0].key])
            }
          }
        }else if(+scoreArrInput[title] >= +preScore[preScore.length-1].key){
          for(let i = 0 ;i < sportLength[sportId];i++){
            let dd = scoreArrInput[title] - (sportLength[sportId] - 1) / 2 + i
            if(dd <= +preScore[preScore.length-1].key){
              scoreArr[marketTypeTitle].push(preScore[preScore.length - 1 + dd - +preScore[preScore.length-1].key])
            }else{
              scoreArr[marketTypeTitle].push({key:dd,value:preScore[preScore.length-1].value})
            }
          }
        }else{
          for(let i = 0 ;i < sportLength[sportId];i++){
            let dd = scoreArrInput[title] - (sportLength[sportId] - 1) / 2 + i
            if(dd <= +preScore[0].key){
              scoreArr[marketTypeTitle].push({key:dd,value:preScore[0].value})
            }else if(dd <= +preScore[preScore.length-1].key){
              scoreArr[marketTypeTitle].push(preScore[preScore.length - 1 + dd - +preScore[preScore.length-1].key])
            }else{
              scoreArr[marketTypeTitle].push({key:dd,value:preScore[preScore.length-1].value})
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
      scoreArrInput,
      marketTypeTitle,
    }
  }
})
</script>

<style lang='less' scoped>
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

</style>

<template>
  <div class="majorContent">
    <majorCard v-for="(item,index) in majorList" :majorCard='item' :key="index" @updateMatch="init(2, $event)"/>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'
import majorCard from './majorCard.vue'
import { findMatchRiskMatrixInfoList } from '@/api/commom'
import { createLoading } from '@/utils/createLoading'
import store from '@/store/index'
interface ImajorPeriod {
  period:number,
  value:string
}
interface ImajorItem{
  majorPeriod:any,
  majorScore:any[]
}
interface IPeriodlist{
  period: string,
  preScore: number,
  preScoreIndex:number,
  score:any[]
}
type IPrescore = null | number
export default defineComponent({
  name: "",
  components:{
    majorCard
  },
  setup(){ 
    let majorList = ref<any>([])
    const marketTypeName:any = {
      1:[
        {
          title:'scoreinvestasian',
          marketType:1000
        },
        {
          title:'scoreinvestover',
          marketType:1007
        },
        {
          title:'scoreinvest1x2',
          marketType:1005
        }
      ],
      3:[
        [
          {
          title:'Handicap',
          marketType:3002
          },
          {
            title:'Over/Under',
            marketType:3003
          },
        ],
        [
          {
          title:'Over/Under Home',
          marketType:3012
          },
          {
            title:'Over/Under Away',
            marketType:3013
          },
        ]
      ]
    }
    const marketTypeList:any = {
      1000:[],
      1007:[],
      1005:[],
      3002:[],
      3003:[],
      3012:[],
      3013:[]
    }
    const formatData = (matchRiskMatrixList:any,matchParamList:any)=>{
      majorList.value = []
      matchParamList.map((item:any) => {
        const obj = {
          majorInfo: {
            sportId: '',
            home: '',
            away: '',
            sportName: '',
            runningTime: '',
            matchId: '',
            lastCalculateTime: '',
            marketType: ''
          },
          majorItem: [] as ImajorItem[]
        }
        const matchRiskMatrix = matchRiskMatrixList.filter((list:any) => list.matchId === item.matchId)[0]
        const matchParam = matchParamList.filter((list:any) => list.matchId === item.matchId)[0]
        obj.majorInfo.sportId = item.sportId
        obj.majorInfo.home = item.home
        obj.majorInfo.away = item.away
        obj.majorInfo.sportName = item.sportName
        obj.majorInfo.runningTime = item.runningTime
        obj.majorInfo.matchId = item.matchId
        obj.majorInfo.lastCalculateTime = matchRiskMatrix.lastCalculateTime
        obj.majorInfo.marketType = matchRiskMatrix.marketRiskVectors && matchRiskMatrix.marketRiskVectors[0].marketType
        let majorPeriod: ImajorPeriod[] = []
        if(+item.sportId === 1){item.periodList = item.periodList.slice(0,2)}
        item.periodList.map((list:number)=>{
          majorPeriod.push( {
            period:list,
            value:(store.state.periodName as any)[item.sportId.toString()][list.toString()]
          })
        })
        
        for (const key in marketTypeList) {
          marketTypeList[key] = [];
          item.periodList.map((period:number)=>{
            const rv = matchRiskMatrix.marketRiskVectors  
              ? matchRiskMatrix.marketRiskVectors.filter((list:any) => +list.marketType === +key && +list.period === +period)[0]
              : null
            const sc = matchParam.periodScoreSummeries.filter((list:any) => +list.period === +period)[0]
            let preScore:IPrescore = null,preScoreIndex = null,score= []
            if(+item.sportId == 1){
              if(+key === 1000){
                score = [
                  {score: -1,invest: ''},
                  {score: 0,invest: ''},
                  {score: 1,invest: ''}
                ]
              }else{
                score = [
                  {score: 0,invest: ''},
                  {score: 1,invest: ''},
                  {score: 2,invest: ''}
                ]
              }
            }else{
              if(+key === 3002){
                score = [
                  {score: -2,invest: ''},
                  {score: -1,invest: ''},
                  {score: 0,invest: ''},
                  {score: 1,invest: ''},
                  {score: 2,invest: ''}
                ]
              }else{
                score = [
                  {score: 0,invest: ''},
                  {score: 1,invest: ''},
                  {score: 2,invest: ''},
                  {score: 3,invest: ''},
                  {score: 4,invest: ''}
                ]
              }
            }
            if(rv){
              score = (+key === 1000 || +key === 3002 || +key === 1005 ) ? rv.martixItems.reverse() : rv.martixItems
              if(+key === 1000 || +key === 3002){
                preScore = sc.homeScore !==null ? +sc.homeScore - +sc.awayScore : null
              }else if(+key === 3003 || +key === 1007 || +key === 3012 || +key === 3013){
                preScore = sc.homeScore !==null ? +sc.homeScore + +sc.awayScore : null
              }else if(+key === 1005){
                if(sc.homeScore !==null){
                  if(+sc.homeScore === +sc.awayScore){
                    preScore = 1
                  }else if(+sc.homeScore > +sc.awayScore){
                    preScore = 2
                  }else{
                    preScore = 0
                  }
                }
              }
              if(preScore !== null){
                score.map((item:any,index:number)=>{
                  if(+item.score === Number(preScore)){
                    preScoreIndex = index
                  }
                })
              }
            }
            marketTypeList[key].push({
              period:period,
              preScore:preScore,
              preScoreIndex:preScoreIndex,
              score: score
            })
          })
        }
        if(+item.sportId === 1){
          obj.majorItem = [
            {
              majorPeriod:majorPeriod,
              majorScore:[
                {title:'scoreinvestasian',sportId:1,marketType:1000,periodlist:marketTypeList[1000]},
                {title:'scoreinvestover',sportId:1,marketType:1007,periodlist:marketTypeList[1007]},
                {title:'scoreinvest1x2',sportId:1,marketType:1005,periodlist:marketTypeList[1005]}
              ]
            }
          ]
        }else if(+item.sportId === 3){
          obj.majorItem = [
            {
              majorPeriod:majorPeriod,
              majorScore:[
                {title:'Handicap',sportId:3,marketType:3002,periodlist:marketTypeList[3002]},
                {title:'Over/Under',sportId:3,marketType:3003,periodlist:marketTypeList[3003]},
              ]
            },
            {
              majorPeriod:majorPeriod,
              majorScore:[
                {title:'Over/Under Home',sportId:3,marketType:3012,periodlist:marketTypeList[3012]},
                {title:'Over/Under Away',sportId:3,marketType:3013,periodlist:marketTypeList[3013]},
              ]
            }
          ]
        }
        majorList.value.push(obj)
        //监听全局websokcet消息推送
      })
      
    }
    console.log(majorList)
    const init = ()=>{
      const params = {
        // sportId:1,
        // matchQueryType: 1,
        // matchId:"252942",
        // salePeriods:[{"matchId":"252942","salePeriod":3}]
      }
      createLoading(true)
      findMatchRiskMatrixInfoList(params).then(res=>{
        createLoading(false)
        if (res.code === 0) {
          const data = res.data.records[0]
          if (data && data.matchRiskMatrixList) {
            formatData(data.matchRiskMatrixList, data.matchParamList)
          }
        }
      })
    }
    init()
    return {
      majorList,
      init
    }
  }
})
</script>

<style lang='less' scoped>
.majorContent{
  width: 98%;
  margin: 0 auto;
}
</style>

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
        obj.majorInfo.sportId = item.sportId
        obj.majorInfo.home = item.home
        obj.majorInfo.away = item.away
        obj.majorInfo.sportName = item.sportName
        obj.majorInfo.runningTime = item.runningTime
        obj.majorInfo.matchId = item.matchId
        obj.majorInfo.lastCalculateTime = matchRiskMatrix.lastCalculateTime
        obj.majorInfo.marketType = matchRiskMatrix.marketRiskVectors && matchRiskMatrix.marketRiskVectors[0].marketType
        let majorPeriod: ImajorPeriod[] = []
        let Periodlist:IPeriodlist[] = [
          {
            period: '1001',
            preScore: 14,
            preScoreIndex:4,
            score: [
              {
                key: 10,
                value: '10'
              },
              {
                key: 11,
                value: '11'
              },
              {
                key: 12,
                value: '12'
              },
              {
                key: 13,
                value: '13'
              },
              {
                key: 14,
                value: '14'
              }
            ]
          },
          {
            period: '1002',
            preScore: 14,
            preScoreIndex:4,
            score: [
              {
                key: 10,
                value: '10'
              },
              {
                key: 11,
                value: '11'
              },
              {
                key: 12,
                value: '12'
              },
              {
                key: 13,
                value: '13'
              },
              {
                key: 14,
                value: '14'
              }
            ]
          }
        ]
        item.periodList.map((list:number)=>{
          majorPeriod.push( {
            period:list,
            value:(store.state.periodName as any)[item.sportId.toString()][list.toString()]
          })
          // for (const key in marketTypeList) {
          //   marketTypeList[key].push({
          //     period: list,
          //     preScore: 11,
          //     preScoreIndex:1,
          //     score:[
          //       {
          //       key: 10,
          //       value: '10'
          //       },
          //       {
          //         key: 11,
          //         value: '11'
          //       },
          //       {
          //         key: 12,
          //         value: '12'
          //       },
          //     ]
          //   })
          // }
        })
        console.log(marketTypeList)
        if(+item.sportId === 1){
          obj.majorItem = [
            {
              majorPeriod:majorPeriod,
              majorScore:[
                {title:'scoreinvestasian',sportId:1,marketType:1000,periodlist:marketTypeList[1001]},
                {title:'scoreinvestover',sportId:1,marketType:1007,periodlist:Periodlist[1007]},
                {title:'scoreinvest1x2',sportId:1,marketType:1005,periodlist:Periodlist[1005]}
              ]
            }
          ]
        }else if(+item.sportId === 3){
          obj.majorItem = [
            {
              majorPeriod:majorPeriod,
              majorScore:[
                {title:'Handicap',sportId:3,marketType:3002,periodlist:Periodlist[3002]},
                {title:'Over/Under',sportId:3,marketType:3003,periodlist:Periodlist[3003]},
              ]
            },
            {
              majorPeriod:majorPeriod,
              majorScore:[
                {title:'Over/Under Home',sportId:3,marketType:3012,periodlist:Periodlist[3012]},
                {title:'Over/Under Away',sportId:3,marketType:3013,periodlist:Periodlist[3013]},
              ]
            }
          ]
        }
        majorList.value.push(obj)
        //监听全局websokcet消息推送
      })
    }
    
    const init = ()=>{
      const params = {
        sportId:1
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

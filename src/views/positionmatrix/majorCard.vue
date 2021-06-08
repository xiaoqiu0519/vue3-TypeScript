<template>
  <div class="majorCard">
    <majorInfo :majorInfo='majorCard.majorInfo'></majorInfo>
    <div class="majorList" v-for="(item,index) in majorCard.majorItem" :key="index">
      <majorPeriod :majorPeriod='item.majorPeriod'></majorPeriod>
      <majorScore v-for="(list,index) in item.majorScore" :majorScore='list' :key="index"></majorScore>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import majorInfo from './majorInfo.vue'
import majorPeriod from './majorPeriod.vue'
import majorScore from './majorScore.vue'
export default defineComponent({
  name: "",
  props: {
    majorCard: {
      default () {
        return {
          majorInfo: {

          },
          majorItem: [
            {
              majorPeriod: [
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
              ],
              majorScore: [
                {
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
                },
                {
                  title: 'Over/Under',
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
              ]
            }
          ]

        }
      }
    }
  },
  components: {
    majorInfo,
    majorPeriod,
    majorScore
  },
  setup(props){ 
    // console.log(props)
    const mes = 1
    return {
      mes  
    }
  }
})
</script>

<style lang='less' scoped>
.majorCard{
  width: 99%;
  margin: 0 auto;
  margin-bottom: 11px;
  padding: 10px;
  // height: 200px;
  background: #FFFFFF;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.02);
  border-radius: 5px;
  .majorList{
    margin-top: 10px;
    display: flex;
  }
}
</style>

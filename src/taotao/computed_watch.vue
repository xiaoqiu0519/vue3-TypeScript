<template>
  <div class="computed">
    <div>姓 :<input type="text" v-model="firstname"></div>
    <div>名 :<input type="text" v-model="lastname"></div>

    <hr/>
    <div>
      姓名： <input type="text" v-model="username1">
    </div>
    <div>
      姓名： <input type="text" v-model="username2">
    </div>
    <!-- <div>
      姓名： <input type="text" v-model="username1">
    </div> -->
  </div>
  
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: "",
  setup(){ 
    const firstname = ref('东方')
    const lastname = ref('菇凉')
    /**
     * computed 如果只传入一个回调函数，只调用get方法
     * watch 计算的属性，不能自执行，如果需要自动执行需要添加参数 immediate：true，深度计算需要添加属性deep:true
     * watchEfflect 不需要添加参数就可以默认执行
     * wathc 如果监听的不是响应式数据，需要用回调的方式处理一下
     */
    const username1 = computed(()=>{
      return firstname.value + "_" +lastname.value
    })
    const username2 = ref('')
    watch([firstname,lastname],(res)=>{
      username2.value = firstname.value + '_' + lastname.value
    },{immediate:true})
    return {
      firstname,
      lastname ,
      username1 ,
      username2
    }
  }
})
</script>

<style lang='less' scoped>

</style>

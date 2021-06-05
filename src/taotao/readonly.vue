<template>
  <div class="">
    <div>{{user.name}}</div>
    {{obj1}}
    <br>
    {{obj2}}
    <button @click="update">更新数据</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive ,ref, toRef} from 'vue'
export default defineComponent({
  name: "",
  setup(){ 
    const mes = 1
    /**
     * readonly & shallowReadonly 限制只读属性，如果通过此函数 声明的变量,const user = readonly({name:'xiao',age:'12'}) 不能通过user.name 进行改变；readonly深度限制，shallowReadonly浅度限制
     *  
     */
    const user = reactive({
      name:'xiao',
      age:'12'
    })
    const obj = {
      name:'ddd',
      age:'12'
    }
    const obj1 = ref(obj.name)
    const obj2 = toRef(obj,'age')
    const update = ()=>{
      // obj1.value = '22'
      obj2.value = 'dkddkdkdk'
      console.log(obj)
    }
    return {
      mes,
      user,
      update,
      obj1  ,
      obj2
    }
  }
})
</script>

<style lang='less' scoped>

</style>

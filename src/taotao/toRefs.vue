<template>
  <div class="">
    {{name}}{{age}}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive,ref,toRefs } from 'vue'
export default defineComponent({
  name: "",
  setup(){ 
    const mes = ref(1)
    /**
     * toRefs 可以reactive 包裹的对象转化成普通对象，该普通对象的每一个 property 都是ref 对象 ;const {name,age} = toRefs(user)
     */
    const user = reactive({
      name:'小红',
      age:'23'
    })
    const {name,age} = toRefs(user)
    console.log(name)
    console.log(mes)
    // setInterval(()=>{
    //   user1.name.value += "==========="
    // },2000)
    return {
      mes  ,
      name,
      age
      // ...toRefs(user)
    }
  }
})
</script>

<style lang='less' scoped>

</style>

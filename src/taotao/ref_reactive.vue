<template>
<div class="app">
  {{mes}}
  <br>
  {{user}}
  <br>
  <button @click="update">更新数据</button>
</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  name: 'App',
  setup(){ 
    /**
     * 1、setup 是组合Api中的函数，只在初始化的时候执行一次
     * 2、ref 是一个函数，定义一个响应式数据，返回一个响应式对象，对象中有value属性，如果要对其值改变，
     *    需要对他的value属性进行操作，使用的时候，模版中不需要带上 点 value
     * 3、ref 一般是用来定义一个基本类型的响应式数据，类型是ref类型
     * 4、reactive 一般将一个普通对象返回为一个响应式代理对象，响应式对象是深层的，代理对象的类型是Proxy类型
     * 5、reactive 中如果更新目标对象，代理对象是会发生变的，但是试图并不会更新。所以要更新实图，需要通过改变代理对象
     * 6、ref 如果传递一个对象，里面的对象会通过reactive进行处理，会处理成Proxy对象
     */
    const mes = ref(0)
    const obj:any = {
      name:'小红'
    }
    const user = reactive(obj)
    const update = () =>{
      obj.age = 23
      user.name = '小名'
      console.log(user)
    }
    return{
      mes,
      user,
      update
    }
  }
})
</script>

<style scoped>

</style>

<template>
<div>
  {{mes}}
  <br>
  {{arr}}
  <button @click="update">更新数据</button>
</div>
</template>

<script lang="js">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'App',
  setup(){ 
    /**
     * vue2 中：主要是通过Object.defineproperty 来实现数据劫持的，这个对象中有set 和 get 方法，当改变对象的属性的时候会出发
     *          set方法，这时候就可以在里面操作试图更新，当然获取对象的属性的时候也会出发get 方式
     * vue3 中：主要是通过proxy 来实现数据响应式变化的，这个对象主要是接收一个普通对象，返回一个响应式代理对象，通过set 和 get deleteProperty
     *          来监控数据变化的，然后通过Reflect这个来进行反射，两者配合就可以实现数据响应式
     * 原理两者区别：vue2中在处理给对象新增属性或者通过数组下标修改对象的时候，直接修视图是不能更新的，需要通过$set来配合完成，vue3 更加强大高效，
     *            比方说对于比较复杂的对象数据，vue 中需要通过循环不停的去监听，vue中就不需要了，可以proxy就可以深层次的去监听对象的变化
     * 
     */
    const mes = ref(1)
    return{
      mes
    }
  },
  data(){
    return{
      arr:{
        name:'小红',
        cars:['ddd','eee','fff']
      }
    }
  },
  methods:{
    update(){
      this.arr.ddd = '4'
    }
  }
})
</script>

<style scoped>

</style>

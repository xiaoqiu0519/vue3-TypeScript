<template>
  <div class="setup">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: "setup",
  setup(){ 
    /**
     * 1、setup一般都是返回一个对象，对象中的数据可以直接在模版中使用
     * 2、setup 执行的时期是在beforeCreate之前执行，只执行一次，setup执行的时候，当前的组件并不存在，不能使用this对象，this === undefind
     * 3、setup 返回的对象中的数据和data返回的对象的数据合并为当前对象中的数据，都可以在模版中使用
     * 4、setup 中的方法和methods中的方法会合并一起，如果有同名，会以setup中为准,不要混合使用
     * 5、setup 中有两个参数，props 和 context ,props是一个对象，包含父级组件向子级组件传递的数据，context包含三个对象，attrs、emit、solt
     *          attrs 获取当前标签上面所有属性的对象 eg：(<child mess='哈哈'></child> 获取mess等)相当于 this.$attr
     *          emit 是用来分发事件，相当于this.$emit()
     */
    const mes = 1
    return {
      mes  
    }
  }
})
</script>

<style lang='less' scoped>

</style>

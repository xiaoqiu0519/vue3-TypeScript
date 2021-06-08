<template>
  <div class="message" :class="classNameType" v-if="isMessage">
    <span>{{message}}</span>
    <span class="el-icon-close" @click="hide"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs ,ref} from 'vue'
export default defineComponent({
  name: "",
  props:{
    message:String,
    type:{
      type: String,
      default:"error"
    }
  },
  setup(props){ 
    const isMessage = ref(true)
    const propsType = toRefs(props).type
    const classNameType = `${propsType.value}Message`
    const hide =()=>{
      isMessage.value = false
    }
    return {
      classNameType,
      isMessage,
      hide
    }
  }
})
</script>

<style lang='less' scoped>
@keyframes mymove{
  0% {top:0px; opacity: 0.3;}
  25% {top:25px; opacity: 0.3;}
  50% {top:50px; opacity: 0.3;}
  75% {top:75px;opacity: 0.6;}
  100% {top:100px;opacity: 1;}
}
.message{
  width: 350px;
  animation:mymove 0.3s ease;
  position: absolute;
  top: 100px;
  min-height: 50px;
  border-radius: 5px;
  left: 50%;
  margin-left: -150px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  .el-icon-close{
    font-size: 16px;
    cursor: pointer;
    padding: 1px;
    border-radius: 10px;
  }
}
.defaultMessage{
  background: #EAEAEA;
  color: #666666;
  .el-icon-close{
    background: #666666;
    color: white;
  }
}
.successMessage{
  background: #DBE4D0;
  color: #4D7812;
  .el-icon-close{
    background: #4D7812;
    color: white;
  }
}
.errorMessage{
  background: #F8E6E5;
  color: #BC4F2D;
  .el-icon-close{
    background: #BC4F2D;
    color: white;
  }
}
</style>

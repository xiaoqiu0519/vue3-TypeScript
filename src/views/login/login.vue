<template>
  <div class='login'>
    <div class="welcome"><h1>Welcome to Your Vue.js + TypeScript App</h1></div>
    <el-form :model="userinfo" :rules='userinforules' ref="userinforuleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名:" prop="name">
        <el-input type='text' placeholder='4到16位（字母，数字，下划线，减号）' v-model="userinfo.name"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input type='password' placeholder='字母开头，长度在6~18之间，只能包含字符、数字和下划线' v-model="userinfo.password"></el-input>
      </el-form-item>
      <el-form-item label="验证码:" prop="valdcode">
        <el-input type='text' placeholder="请输入4为数字验证码" v-model="userinfo.valdcode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="loginBtn" type="primary" width='300' @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive ,ref, watch} from 'vue'
import { uPattern , uPassword ,uAllnum} from '@/utils/validReg'
import router from '@/router/index'
import { login } from '@/api/commom'
import { IloginParams } from '@/interface/commom'
export default defineComponent({
  name: 'App',
  setup(){
    const userinforuleForm = ref()
    const validateUser = (rule:any, value:string, callback:any)=>{
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }else if(!uPattern.test(value)){
        return callback(new Error('请输入4到16位（字母，数字，下划线，减号）的字符'));
      }else{
        callback()
      }
    }
    const validateWord = (rule:any, value:string, callback:any)=>{
      if (!value) {
        return callback(new Error('密码不能为空'));
      }else if(!uPassword.test(value)){
        return callback(new Error('字母开头，长度在6~18之间，只能包含字符、数字和下划线'));
      }else{
        callback()
      }
    }
    const validateCode = (rule:any, value:number, callback:any)=>{
      if (!value) {
        return callback(new Error('验证码不能为空'));
      }else if(!uAllnum.test(value.toString())){
        return callback(new Error('只能输入数字'));
      }else if(value.toString().length < 4){
        return callback(new Error('请输入4为数字验证码'));
      }else{
        callback()
      }
    }
    const userinforules = {
      name: [
        { validator: validateUser, trigger: 'blur'},
      ],
      password: [
        { validator: validateWord, trigger: 'blur'}
      ],
      valdcode:[
        {validator: validateCode, trigger: 'blur'}
      ]
    }
    const userinfo = reactive({
      name:'',
      password:'',
      valdcode:'',
    })
    watch([
      ()=>userinfo.name,
      ()=>userinfo.password,
      ()=>userinfo.valdcode,
      ],(res)=>{
        if(res[0]){
          if(res[0].length > 16){
            userinfo.name = userinfo.name.slice(0,-1)
          }
        }
        if(res[1]){
          if(res[1].length > 16){
            userinfo.password = userinfo.password.slice(0,-1)
          }
        }
        if(res[2]){
          if(!uAllnum.test(res[2])){
            userinfo.valdcode = userinfo.valdcode.slice(0,-1)
          }else if(res[2].toString().length > 4){
            userinfo.valdcode = userinfo.valdcode.slice(0,-1)
          }
        }
    })
    const submitForm = async ()=>{
      await userinforuleForm.value.validate((vaild:boolean)=>{
        if(vaild){
          const {name,password,valdcode} = userinfo
          const params:IloginParams = {
            password:password,
            name:name,
            googleCode:valdcode,
            systemId:2,
          }
          login(params).then(res=>{
            if(res.code === 0){
              localStorage.setItem('token',res.data.token)
              router.push('/tablelist')
            }
          })
        }else{
          return false
        }
      })
    }
    return{
      userinfo,
      userinforuleForm,
      userinforules,
      submitForm
    }
  }
})
</script>

<style lang='less' scoped>
.login{
  margin-top: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  align-content: center;
  .welcome{
    width: 100%;
    text-align: center;
    margin: 50px auto;
  }
  /deep/ .el-form-item__label{
    text-align: left;
  }
  /deep/ .loginBtn{
    width: 300px;
  }
}

</style>

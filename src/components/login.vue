<template>
    <el-card class="box-card cardWrap">
        <el-form class="login-container">
            <h1 class="title">用户登录</h1>
            <el-form-item label="">
                <el-input type="text" placeholder="请输入账号" v-model="username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input type="text" placeholder="请输入密码" v-model="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%;" @click="doSubmit()">提交</el-button>
            </el-form-item>
            <el-row style="text-align: center; margin-top: -10px;;">
                <el-link type="primary">忘记密码</el-link>
                <el-link type="primary" @click="doRegister()">用户注册</el-link>
            </el-row>
        </el-form>
    </el-card>
</template>
<script>
import { api } from "@/api/api"
export default {
  components: {
  },
  data() {
    return {
      username:'',
      password:'',
      oneToken:'',
      ncInstance: null,
      ncPass: false,
      ncData: null
    };
  },
  created() {
    this.getOneToken()
  },
  methods: {
    async doSubmit(){
      if(!this.username){
        this.$layer.msg('请输入账号')
        return
      }else if(!this.password){
        this.$layer.msg('请输入密码')
        return
      }
      let res = await api.login({
        account:this.username,
        password:this.password,
        oneToken:this.oneToken
      })
      if(res.data.code==0){
        this.$layer.msg("登录成功")
      }else{
        this.$layer.msg(res.data.msg)
      }
    },
    doRegister(){
        
    },
    ncHandle(nc, data) {
      this.ncInstance = nc;
      this.ncData = data;
      this.ncPass = true;
    },
    ncReset() {
      this.ncData = null;
      this.ncPass = false;
      this.ncInstance && this.ncInstance.reset();
    },
    async getOneToken() {
      let res = await api.createOnceToken()
      if(res.data.code==0){
        this.oneToken = res.data.data
        localStorage.setItem('oneToken',res.data.data)
      }
    },
  },
  mounted() {
    
  }
};
</script>
<style lang="less">
.cardWrap{width:90%;margin:15% 5%;}
.title{font-weight: 400;
    color: #1f2f3d;font-size:22px;text-align:center;padding:20px 0;}
</style>
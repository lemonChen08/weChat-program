<template>
    <el-card class="box-card cardWrap">
        <el-form class="login-container">
            <h1 class="title">用户注册</h1>
            <el-form-item label="">
              <el-col :span="8">
                <!-- <drop-down
                  @inputValue="getInputValue"
                  @item-click="itemClick"
                  :itemlist="datalist"
                  :placeholder="placeholder"
                  :nodatatext="nodatatext"
                ></drop-down> -->
                <country-code-selector :countryCode.sync="areaCode"></country-code-selector>
              </el-col>
              <el-col :span="16">
                <el-input type="text" placeholder="请输入手机号码" v-model="username" autocomplete="off"></el-input>
              </el-col>
              
                
            </el-form-item>
            <el-form-item label="">
                <el-input type="number" :class="!codeflag?'blue':'white'" placeholder="请输入6位验证码" v-model="phonecode" autocomplete="off">
                  <template slot="append"><div @click="sendPhoneCode">{{!codeflag?'获取验证码':(auth_time+'s')}}</div></template>
                </el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input type="password" placeholder="请输入密码" v-model="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input type="password" placeholder="请确认密码" v-model="passwordAgan" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input type="text" placeholder="请输入邀请码" v-model="inviteCode" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%;" @click="doSubmit()">提交</el-button>
            </el-form-item>
            <!-- <el-row style="text-align: center; margin-top: -10px;;">
                <el-link type="primary">忘记密码</el-link>
                <el-link type="primary" @click="doRegister()">用户注册</el-link>
            </el-row> -->
        </el-form>
    </el-card>
</template>
<script>
import { api } from "@/api/api"
import countryCodeSelector from 'vue-country-code-selector'
export default {
  components: {
    countryCodeSelector
  },
  data() {
    return {
      oneToken:'',
      areaCode:86,
      username:'',
      password:'',
      inviteCode:'',
      passwordAgan:'',
      phonecode:'',
      ncInstance: null,
      ncPass: false,
      ncData: null,
      codeflag:false,
      auth_time:120,
      itemlist:[],
      datalist:[],
      placeholder: "请输入国家/地区拼写",
      nodatatext: "暂无数据",
    };
  },
  created() {
    this.getOneToken()
    //this.invitcode = this.$route.query.invite;
  },
  methods: {
    doSubmit(){
      if(!this.username){
        this.$layer.msg("请输入手机号码")
        return
      }else if(!this.phonecode){
        this.$layer.msg("请输入六位验证码")
        return
      }else if(!this.password){
        this.$layer.msg("请输入密码")
        return
      }else if(!this.passwordAgan){
        this.$layer.msg("请确认密码")
        return
      }else if(this.passwordAgan!==this.password){
        this.$layer.msg("密码输入不一致")
        return
      }
      this.doRegister()
    },
    async doRegister(){
      let res = await api.register({
        account:this.username,
        areaCode:this.areaCode,
        inviteCode:this.inviteCode,
        oneToken:this.oneToken,
        password:this.password,
        verifyCode:this.phonecode
      })
      if(res.data.code==0){
        this.$layer.msg("注册成功")
      }else{
        this.$layer.msg(res.data.msg)
      }
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
    //发送手机验证码
    sendCode(){
        this.codeflag = true;
        this.auth_time = 120;
        var auth_timetimer = setInterval(() => {
          this.auth_time--;
          if (this.auth_time <= 0) {
            this.codeflag = false;
            clearInterval(auth_timetimer);
          }
        }, 1000)
    },
    async getOneToken() {
      let res = await api.createOnceToken()
      if(res.data.code==0){
        this.oneToken = res.data.data
        localStorage.setItem('oneToken',res.data.data)
      }
    },
    async sendPhoneCode() {
      let that = this
      if(!this.username){
        this.$layer.msg("请输入手机号码")
        return
      }
      if(!this.codeflag){
        let res = await api.sendPhoneCode({
          oneToken: that.oneToken,
          phone: that.username,
          type: "S"
        });
        if (res.data.code == 0) {
          that.$layer.msg("发送成功");
          that.sendCode();
        } else {
          that.$layer.msg(res.data.msg);
        }
      }
    },
    //获取区号
    async getAreacode() {
      let that = this;
      let res = await api.selectList({
        category: "AREA_CODE",
        language: "zh_CN"
      });
      if (res.data.code == 0) {
        that.datalist = [];
        res.data.data.forEach((item, index) => {
          that.datalist.push({
            code: item.value,
            name: item.name
          });
        });
        that.itemlist = that.datalist;
      }
    },
    getInputValue(searchvalue) {
      if (searchvalue == "") {
        this.datalist = this.itemlist;
        return;
      }
      let itemlist = [];
      // 请求获取筛选列表
      this.itemlist.forEach((item, index) => {
        if (item.code.indexOf(searchvalue) != -1) {
          itemlist.push(item);
        } else if (item.name.indexOf(searchvalue) != -1) {
          itemlist.push(item);
        }
      });
      this.datalist = itemlist;
      // this.$set(this.datalist, itemlist);
    },
    itemClick(data) {
      this.selectValue = data.code
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
.blue .el-input-group__append {
    background-color: #409EFF;
    color:#fff;
  } 
.el-input-group__append{
  //width:112px;
}     
.tel-container{
    display: flex;
    align-items: center;
  }
.flag-list-box{background:#fff;width:300px !important;}  
.area-codeNum{padding:0 10px !important;}
</style>
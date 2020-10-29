<template>
    <!-- 绑定手机号 -->
      <div class="phone_box">
        <div class="phone_centent">
          <div class="close_box" @click="closePhone"></div>
          <div class="phone_title">手机登录</div>
          <div class="phone_list">
            <div class="phone_item">
              <div class="form_text">手机号码<span>*</span></div>
              <input type="text" class="phone_input" v-model="phone" placeholder="请输入手机号码">
            </div>
            <!-- <div class="phone_item">
              <div class="form_text">验证码<span>*</span></div>
              <input type="text" class="phone_input code" placeholder="请输入验证码">
              <div class="line"></div>
              <button type="button" class="form_code">发送验证码</button>
            </div> -->
            <button type="button" class="form_btn" @click="login">立即登录</button>
          </div>
        </div>
      </div>
</template>
<script>
import { api } from "@/api/api"
import Bindphone from "./bindPhone"
export default {
  components: {
    Bindphone
  },
  props:[],
  data() {
    return {
      phone:''
    };
  },
  created() {
    
  },
  methods: {
    async login(){
        if(!this.phone){
            this.$layer.msg("请输入手机号码")
            return
        }
        let res = await api.userLogin({
            nickName:'',
            openId:'1',
            phone:this.phone,
            pic:''
        })
        if(res.data.code==0){
            localStorage.setItem('oneToken',res.data.data.token)
            this.closePhone()   
        }else{
            this.$layer.msg(res.data.msg)
        }
    },  
    // 关闭手机绑定
    closePhone(){
      this.$emit('closepop');
    }
  },
  mounted() {
    this.phoneShow
  }
};
</script>
<style scoped>
.phone_box{
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  top: 0;
  left: 0;
  z-index:999;
}
.phone_centent{
  z-index: 2;
  position: absolute;
  background-color: #fff;
  width: 90%;
  border-radius: 8px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.phone_title{
  font-size: 2.2vh;
  position: relative;
  padding: 15px 4%;
}
.phone_title::after{
  content: '';
  position: absolute;
  width: 100%;
  border-top: 1px solid #ececec;
  left: 0;
  bottom: 0;
  transform: scaleY(.5);
}
.phone_list{
  padding: 1vw 5vw;
}
.phone_item{
  position: relative;
  display: -webkit-flex;
  display: flex;
  height: 40px;
  align-items: center;
  -webkit-align-items: center;
  width: 100%;
  position: relative;
}
.phone_item::after{
  content: '';
  position: absolute;
  width: 100%;
  border-top: 1px solid #ececec;
  left: 0;
  bottom: 0;
  transform: scaleY(.5);
}
.form_text{
  font-size: 2vh;
  min-width: 20vw;
  color: #000;
}
.form_text span{
  color: red;
}
.form_box{
  display: -webkit-flex;
  display: flex;
  -webkit-flex: 1;
  flex: 1;
}
.phone_input{
  -webkit-flex: 1;
  flex: 1;
  text-align: right;
  padding: 0 10px;
  height: 40px;
  box-sizing: border-box;
  width: 100%;
  font-size: 2vh;
}
.line{
  height: 15px;
  border-right: 1px solid #ececec;
  margin-right: 10px;
}
.form_code{
  font-size: 2vh;
  min-width: 20vw;
  background: none;
  color: #f9ce80;
  
}
.form_btn{
  width: 100%;
  margin: 20px 0;
  height: 10vw;
  border-radius: 5px;
  font-size: 2vh;
  background: #f9ce80;
  color: #fff;
}

.close_box{
  position: absolute;
  width: 4vh;
  height: 4vh;
  background: url(../assets/images/close.png) no-repeat center;
  background-size: cover;
  top: 3%;
  right: 5%;
  z-index: 2;
}
</style>
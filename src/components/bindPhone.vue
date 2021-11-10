<template>
  <!-- 绑定手机号 -->
  <div class="phone_box">
    <div class="phone_centent">
      <img src="@/assets/images/bg-phone.png" class="bg-img" />
      <div class="phone_list">
        <div class="p-box">
          <div class="p-input">
            <img src="@/assets/images/ico-phone.png" class="ico-phone" />
            <input type="number" maxlength="11" class="phone_input" v-model="phone" placeholder="请输入手机号码" />
          </div>
          <div class="p-input">
            <img src="@/assets/images/ico-phone.png" class="ico-phone" />
            <input type="number" maxlength="6" class="phone_input w_100" v-model="code" placeholder="输入验证码" />
            <span class="get_code c_gray" v-if="isSecond">{{isSecond}} s </span>
            <button class="get_code" @click="getCode" v-else>获取验证码</button>
          </div>
        </div>
        <button type="button" class="form_btn" @click="login">立即登录</button>
      </div>
    </div>
  </div>
</template>
<script>
import { api } from "@/api/api";
let timeId = null
export default {
  props: [],
  data() {
    return {
      phone: "",
      code: "",
      userInfo: null,
      isSecond: ""
    };
  },
  created() {
    let userInfo = localStorage.getItem("userInfo");
    this.userInfo = JSON.parse(userInfo);
  },
  methods: {
    // 获取验证码
    async getCode() {
      if (!this.phone) {
        this.$layer.msg("请输入手机号码");
        return;
      }
      let res = await api.bindPhone({
        action: "sms_send",
        phone: this.phone
      });
      if(res.data.code == 200){
        this.isSecond = 60
        timeId = setInterval(()=>{
        this.isSecond --
        if(this.isSecond <= 0){
          clearInterval(timeId)
          this.isSecond = ''
        }
      },1000)
      }else{
        this.$layer.msg(res.data.message);
      }
    },
    async login() {
      if (!this.phone) {
        this.$layer.msg("请输入手机号码");
        return;
      }
      if (!this.code) {
        this.$layer.msg("请输入验证码");
        return;
      }
      let res = await api.bindPhone({
        action: "wx_bind",
        phone: this.phone,
        wx_id: this.userInfo.wx_id,
        code: this.code
      });
      if (res.data.code == 200) {
        this.$layer.msg("绑定成功");
        this.userInfo.phone = this.phone;
        this.userInfo.user_id = res.data.data.user_id;
        this.userInfo.invite_code = res.data.data.invite_code;
        localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
        this.closePhone();
        window.location.reload();
      } else {
        this.$layer.msg(res.data.message);
      }
    },
    // 关闭手机绑定
    closePhone() {
      this.$emit("closepop");
    }
  }
};
</script>
<style scoped>
.phone_box {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 999;
}
.w_100{
  width: 100px;
}
.get_code {
  line-height: 35px;
  height: 35px;
  width: 85px;
  background: transparent;
  text-align: center;
  display: inline-block;
}
.ico-phone {
  width: 14px;
  height: 19px;
  margin: 0 17px;
}
.phone_input {
  display: flex;
  align-items: center;
  flex: 1;
  box-sizing: border-box;
}
.phone_centent {
  position: relative;
  z-index: 2;
  width: 287px;
  height: 363px;
  position: absolute;
  background-color: #fff;
  border-radius: 16px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.bg-img {
  width: 287px;
  height: 363px;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 16px;
}
.phone_list {
  position: absolute;
  left: 0;
  top: 180px;
  width: 100%;
}
.p-box {
  background: #f1fcff;
  border-radius: 5px;
  margin: 0 15px;
}
.p-input {
  height: 48px;
  display: flex;
  align-items: center;
  line-height: 48px;
}
.phone_input::placeholder {
  color: #4092c6;
}
.c-text {
  text-align: center;
  color: #fff;
  font-size: 12px;
  margin: 10px 0;
}
.c_gray{
  color: #999;
}
.form_btn {
  width: 265px;
  height: 42px;
  border-radius: 28px;
  display: block;
  margin: 10px auto 0;
  font-size: 15px;
  background: #f9ce80;
  color: #aa1e06;
}
</style>
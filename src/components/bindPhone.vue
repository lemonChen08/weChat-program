<template>
  <!-- 绑定手机号 -->
  <div class="phone_box">
    <div class="phone_centent">
      <div class="phone_list">
        <div class="p-input">
          <img src="@/assets/images/ico-phone.png" class="ico-phone" />
          <input type="text" class="phone_input" v-model="phone" placeholder="请输入手机号码" />
        </div>
        <p class="c-text">绑定手机号立即领取加油金</p>
        <button type="button" class="form_btn" @click="login">立即登录</button>
      </div>
    </div>
  </div>
</template>
<script>
import { api } from "@/api/api";
export default {
  props: [],
  data() {
    return {
      phone: "",
      inviteCode: "",
      userInfo: null
    };
  },
  created() {
    let userInfo = localStorage.getItem("userInfo");
    this.userInfo = JSON.parse(userInfo);
  },
  methods: {
    async login() {
      if (!this.phone) {
        this.$layer.msg("请输入手机号码");
        return;
      }
      let res = await api.bindPhone({
        action: "wx_bind",
        phone: this.phone,
        wx_id: this.userInfo.wx_id
      });
      if (res.data.code == 200) {
        this.$layer.msg("绑定成功");
        this.userInfo.phone = this.phone;
        this.userInfo.user_id = res.data.data.user_id;
        localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
        this.closePhone();
        window.location.reload();
      } else {
        this.$layer.msg(res.data.msg);
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
.ico-phone{
  width: 14px;
  height:19px;
  margin:0 17px;
}
.phone_input{
  flex: 1;
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
  background:no-repeat center/100% url("@/assets/images/bg-phone.png");
  transform: translate(-50%, -50%);
}
.phone_list{
  position: absolute;
  left: 0;
  top:222px;
  width: 100%;
  box-sizing: border-box;
}
.p-input{
  width: 257px;
  height: 48px;
  display: flex;
  align-items: center;
  line-height: 48px;
  margin:0 auto;
  background: #F1FCFF;
  border-radius: 5px;
}
.phone_input::placeholder{
  color: #4092C6;
}
.c-text{
  text-align:center;
  color: #fff;
  font-size: 12px;
  margin: 10px 0;
}

.form_btn {
  width:265px;
  height: 42px;
  border-radius: 28px;
  display: block;
  margin: 0 auto;
  font-size:15px;
  background: #f9ce80;
  color: #AA1E06;
}
</style>
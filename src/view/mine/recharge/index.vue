<template>
  <div>
    <div class="container">
      <img src="@/assets/images/recharge.png" class="r-img" />
      <div class="s-box">
        <div class="s-item">
          <img src="@/assets/images/ico-phone.png" class="ico-phone" />
          <input
            type="number"
            maxlength="11"
            class="phone_input"
            v-model="phone"
            placeholder="请输入手机号码"
          />
        </div>
        <div class="s-item">
          <img src="@/assets/images/mine-02.png" class="ico-phone card-ico" />
          <input
            class="phone_input w_100"
            v-model="card_num"
            placeholder="请输入卡号"
          />
        </div>
        <div class="s-item">
          <img src="@/assets/images/card-pw.png" class="ico-phone pw-ico" />
          <input
            class="phone_input w_100"
            v-model="card_pw"
            placeholder="请输入卡密"
          />
        </div>
      </div>
    </div>
    <div class="s-recharge" @click="goRecharge">确认充值</div>
  </div>
</template>
<script>
import { api } from "@/api/api";
export default {
  data() {
    return {
      phone: "",
      card_num: "",
      card_pw: ""
    };
  },
  mounted() {
    let userInfo = localStorage.getItem("userInfo");
    this.phone = JSON.parse(userInfo).phone;
  },
  methods: {
    //确认充值
    async goRecharge() {
      if (!this.phone) {
        this.$message.warning("请输入手机号码");
        return;
      }
      if (!this.card_num) {
        this.$message.warning("请输入卡号");
        return;
      }
      if (!this.card_pw) {
        this.$message.warning("请输入卡密");
        return;
      }
      let res = await api.bindPhone({
        action: "get_oilcard",
        phone: this.phone,
        card_num: this.card_num,
        card_pw: this.card_pw
      });
      if (res.data.code == 200) {
        this.$message.warning("充值成功");
        this.$router.go(-1);
      } else {
        this.$message.warning(res.data.message);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  background: #44b3fa;
  display: flex;
  flex-direction: column;
}
.r-img {
  height: 108px;
}
.s-box {
  display: flex;
  flex-direction: column;
  margin: 30px;
  .s-item {
    display: flex;
    height: 48px;
    background: #f1fcff;
    border-radius: 5px;
    margin-bottom: 15px;
    align-items: center;
    padding: 0 16px;
    color: #44b3fa;
    font-size: 12px;
  }
}
.phone_input {
  flex: 1;
  height: 40px;
}
.phone_input::placeholder {
  color: #44b3fa;
}
.ico-phone {
  width: 11.5px;
  height: 16px;
  margin-right: 12px;
}
.card-ico {
  width: 14.5px;
  height: 12px;
}

.pw-ico {
  width: 16.5px;
  height: 17.5px;
}
.s-recharge {
  width: 320px;
  height: 55px;
  margin: 25px auto;
  line-height: 55px;
  text-align: center;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  background: #46b2ff;
  border-radius: 32px;
}
</style>
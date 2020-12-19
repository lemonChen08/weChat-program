<template>
    <div class="" style="position:absolute;top:0;right:0;bottom:0;left:0;">
      <div class="main">
        <div class="center_box">
      <div class="car_box">
        <img src="../assets/images/w_car.jpg" alt="" class="car_img">
        <img :src="userInfo.headimgurl" alt="" class="car_header">
      </div>
      <div class="car_item">
          <div class="item_text">
            <div class="item_name">我的邀请码</div>
            <p style="position:absolute;right:50px;font-size:18px;">{{inviteCode}}</p>
          </div>
      </div>
      <div class="car_list">
        <!-- <div class="car_item" @click="openPhone">
          <img src="../assets/images/item_icon1.png" alt="" class="item_img">
          <div class="item_text">
            <div class="item_name">我的手机号</div>
          </div>
          <i class="item_go el-icon-arrow-right"></i>
        </div> -->
        <router-link to="tuig" class="car_item">
          <img src="../assets/images/my_list_ic_promote.png" alt="" class="item_img">
          <div class="item_text">
            <div class="item_name">我的推广</div>
          </div>
          <i class="item_go el-icon-arrow-right"></i>
        </router-link>
        <router-link to="jyorder1" class="car_item">
          <img src="../assets/images/item_icon2.png" alt="" class="item_img">
          <div class="item_text">
            <div class="item_name">加油订单</div>
            <div class="item_tips">9折加油，全国10000+合作加油站</div>
          </div>
          <i class="item_go el-icon-arrow-right"></i>
        </router-link>
        <router-link to="xcorder1" class="car_item">
          <img src="../assets/images/item_icon3.png" alt="" class="item_img">
          <div class="item_text">
            <div class="item_name">洗车订单</div>
            <div class="item_tips">全国60000+门店通用</div>
          </div>
          <i class="item_go el-icon-arrow-right"></i>
        </router-link>
      </div>
      </div>
      </div>
      <Tabs></Tabs>
      <!-- 绑定手机号 -->
      <Bindphone @closepop='closePhone' v-show="phoneShow"></Bindphone>
    </div>
</template>
<script>
import Tabs from './tabs'
import { api } from "@/api/api"
import Bindphone from "./bindPhone"
export default {
  components: {
    Bindphone,
    Tabs
  },
  data() {
    return {
      phoneShow:false,
      inviteCode:'',
      userInfo:{}
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.inviteCode = this.userInfo.invite_code
    
  },
  methods: {

    // 打开手机绑定
    openPhone(){
      this.phoneShow = true
    },

    // 关闭手机绑定
    closePhone(){
      this.phoneShow = false
    }
  },
  mounted() {
    
  }
};
</script>
<style scoped>
.center_box{
  padding: 3%;
}
.car_box{
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
.car_img{
  display: block;
  width: 100%;
  border-radius: 10px;
}
.car_header{
  position: absolute;
  width: 10vh;
  height: 10vh;
  border-radius: 50%;
  right: 10%;
  top: 15%;
}
.car_list{
  margin-top: 20px;
}
.car_item{
  background-color: #fff;
  margin-top: 10px;
  display: flex;
  -webkit-display: flex;
  height: 60px;
  align-items: center;
  -webkit-align-items: center;
  padding: 0 2%;
  border-radius: 8px;
}
.item_img{
  width: 5vh;
}
.item_text{
  position:relative;
  display: -webkit-flex;
  display: flex;
  height: 60px;
  -webkit-justify-content: center;
  justify-content: center;
  flex: 1;
  -webkit-flex: 1;
  flex-direction: column;
  -webkit-flex-direction: column;
  margin: 0 10px;
}
.item_name{
  color: #000;
  font-size: 2.2vh;
  font-weight: 500;
}
.item_tips{
  font-size: 0.8vh;
  color: #999;
  margin-top: 8px;
}
.item_go{
   font-size:20px;
}



</style>

<style lang="less">
body{
  background-color: #fafafa;
}
</style>
<template>
    <div class="center_box">
      <div class="car_box">
        <img src="../assets/images/w_car.jpg" alt="" class="car_img">
        <img src="../assets/images/user.jpg" alt="" class="car_header">
      </div>
      <div class="car_list">
        <div class="car_item" @click="openPhone">
          <img src="../assets/images/item_icon1.png" alt="" class="item_img">
          <div class="item_text">
            <div class="item_name">我的手机号</div>
          </div>
          <i class="item_go el-icon-arrow-right"></i>
        </div>
        <router-link to="jyorder" class="car_item">
          <img src="../assets/images/item_icon2.png" alt="" class="item_img">
          <div class="item_text">
            <div class="item_name">加油订单</div>
            <div class="item_tips">9折加油，全国10000+合作加油站</div>
          </div>
          <i class="item_go el-icon-arrow-right"></i>
        </router-link>
        <router-link to="xcorder" class="car_item">
          <img src="../assets/images/item_icon3.png" alt="" class="item_img">
          <div class="item_text">
            <div class="item_name">洗车订单</div>
            <div class="item_tips">全国60000+门店通用</div>
          </div>
          <i class="item_go el-icon-arrow-right"></i>
        </router-link>
      </div>


      <!-- 绑定手机号 -->
      <div class="phone_box" v-if="phoneShow">
        <div class="phone_centent">
          <div class="close_box" @click="closePhone"></div>
          <div class="phone_title">绑定/更换手机</div>
          <div class="phone_list">
            <div class="phone_item">
              <div class="form_text">手机号码<span>*</span></div>
              <input type="text" class="phone_input" placeholder="请输入手机号码">
            </div>
            <div class="phone_item">
              <div class="form_text">验证码<span>*</span></div>
              <input type="text" class="phone_input code" placeholder="请输入验证码">
              <div class="line"></div>
              <button type="button" class="form_code">发送验证码</button>
            </div>
            <button type="button" class="form_btn">立即绑定</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { api } from "@/api/api"
export default {
  components: {
  },
  data() {
    return {
      phoneShow:false
    };
  },
  created() {
    
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


.phone_box{
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  top: 0;
  left: 0;
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

<style lang="less">
body{
  background-color: #fafafa;
}
</style>
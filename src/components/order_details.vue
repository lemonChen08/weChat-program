<template>
    <div class="details_box">
      <div class="details_baner">
        <img src="../assets/images/details_baner.jpg" alt="" class="dt_img">
        <div class="dt_name">订单详情</div>
      </div>
      <div class="order_box">
        <div class="order_item flexbox">
          <div class="od_name">订单状态</div>
          <div class="od_text"><span class="yellow_text">待支付</span></div>
        </div>
        <div class="order_item flexbox">
          <div class="od_name">订单号</div>
          <div class="od_text">123456789456789456465789</div>
        </div>
        <div class="order_item flexbox">
          <div class="od_name">购买服务</div>
          <div class="od_text">标准洗车-五座轿车</div>
        </div>
        <div class="order_item flexbox">
          <div class="od_name">门店价</div>
          <div class="od_text">50元</div>
        </div>
        <div class="order_item flexbox">
          <div class="od_name">优惠价</div>
          <div class="od_text">30元</div>
        </div>
        <div class="order_item flexbox">
          <div class="od_name">有效期</div>
          <div class="od_text"><span class="yellow_text">-</span></div>
        </div>
      </div>
      <div class="order_box">
        <div class="order_item flexbox">
          <div class="od_name">洗车店</div>
          <div class="od_text">深圳炸金花集团有限公司</div>
        </div>
        <div class="order_item flexbox">
          <div class="od_name">详细地址</div>
          <div class="od_text">龙岗坂田岗头市场桃花</div>
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
      
    };
  },
  created() {
    
  },
  methods: {

    
  },
  mounted() {
    
  }
};
</script>
<style scoped>
.flexbox{
  display: flex;
}
.details_baner{
  position: relative;
}
.dt_img{
  display: block;
  width: 100%;
}
.dt_name{
  position: absolute;
  font-size: 3.5vh;
  color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.order_box{
  margin: 15px 4% 0;
  padding: 0 4%;
  border-radius: 8px;
  box-shadow:0 0 15px rgba(0, 0, 0, 0.1);
}

.order_item{
  padding: 15px 0;
  -webkit-align-items: center;
  align-items: center;
}
.od_name{
  font-size: 2.2vh;
  color: #000;
}
.od_text{
  color: #999;
  -webkit-flex: 1;
  flex: 1;
  margin-left: 20px;
  text-align: right;
  font-size: 2vh;
}

.yellow_btn{
  border: 1px solid #e1c558;
  color: #e1c558;
}
.yellow_text{
 color: #e1c558; 
 font-size: 2vh;
}
</style>
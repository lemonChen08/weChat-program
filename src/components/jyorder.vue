<template>
    <div class="order_box">
      <div class="order_item">
        <div class="order_top flexbox">
          <div class="od_t">加油订单</div>
          <div class="od_t yellow_text">待支付</div>
        </div>
        <div class="order_pay flexbox">
          支付金额： <div class="od_m">{{payData.price/100}}</div>元  <del>{{payData.originPrice/100}}元</del>
        </div>
        <div class="order_adress flexbox">
          <img src="../assets/images/dz_icon.png" alt="" class="od_img">
          <div class="od_name">加油店</div>
          <div class="od_line"></div>
          <div class="od_cp">{{payData.jydname}}</div>
        </div>
        <div class="order_btn flexbox">
          <div class="btn_go yellow_btn" @click="toPay">继续支付</div>
          <!-- <router-link to="order_details" class="btn_go">查看</router-link> -->
        </div>
      </div>
    </div>
</template>
<script>
import { api } from "@/api/api"
import {WXinvoke} from "@/util/wxUtil"
export default {
  components: {
  },
  data() {
    return {
      payData:{}
    };
  },
  created() {
    this.payData = JSON.parse(this.$route.query.payData)
  },
  methods: {
    toPay(){
      WXinvoke(this.payData,res=>{
        alert('支付回调'+JSON.stringify(res))
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          this.$layer.msg('支付成功')    
          this.$router.push('home')
        }
      })  
    }
    
  },
  mounted() {
    
  }
};
</script>
<style scoped>
.flexbox{
  display: flex;
}
.order_box{
  padding: 4% 3%;
}
.order_item{
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow:0 0 15px rgba(0, 0, 0, 0.1);
  padding: 4% 3%;
}
.order_top{
  justify-content: space-between;
  
}
.od_t{
  font-size: 2.4vh;
  color: #000;
}
.order_pay{
  padding: 15px 0;
  border-bottom: 1px solid #ececec;
  font-size: 2.2vh;
}
.od_m{
  font-weight: bold;
  color: red;
  font-size: 2.2vh;
}
.order_pay del{
  color: #999;
  margin-left: 10px;
  font-size: 2.2vh;
}
.order_adress{
  margin-top: 15px;
  align-items: center;
  font-size: 2.2vh;
}
.od_img{
 width: 3.5vh;
}
.od_name{
  font-size: 2.2vh;
}
.od_line{
 margin: 0 10px;
 border-left: 1px solid #ececec;
 height: 14px
}
.od_cp{
  font-size: 2.2vh;
  color: #999;
}
.order_btn{
  justify-content: flex-end;
  margin-top: 15px;
  width: 100%;
}
.btn_go{
  border:1px solid #c2c2c2;
  font-size: 2.2vh;
  padding: 10px;
  margin-left: 10px;
}
.yellow_btn{
  border: 1px solid #e1c558;
  color: #e1c558;
}
.yellow_text{
 color: #e1c558; 
}
</style>
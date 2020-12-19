<template>
    <div class="order_box">
      <div class="order_item">
        <div class="order_top flexbox">
          <div class="od_t">洗车订单</div>
          <div class="od_t yellow_text">待支付</div>
        </div>
        <div class="order_pay flexbox">
          支付金额： <div class="od_m">{{payData.final_price}}</div>元  <del>{{payData.price}}元</del>
        </div>
        <div class="order_adress flexbox">
          <img src="../assets/images/dz_icon.png" alt="" class="od_img">
          <div class="od_name">洗车店</div>
          <div class="od_line"></div>
          <div class="od_cp">{{payData.shop_name}}</div>
        </div>
        <div class="order_btn flexbox">
          <div class="btn_go yellow_btn" @click="toPay">继续支付</div>
        </div>
      </div>
    </div>
</template>
<script>
import { xcpayorders,getxcPayConfig} from '@/api/wx';
import {WXinvoke} from "@/util/wxUtil"
import { api } from "@/api/api"
export default {
  components: {
  },
  data() {
    return {
      payData:{},
      myInfo:null
    };
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.myInfo = userInfo
    this.payData = JSON.parse(this.$route.query.payData)
  },
  methods: {
    toPay(){
      xcpayorders(this.payData).then(res => {
        if(res.data.code==200){
          let configdata = {
            order_id:res.data.result.order_id,
            user_id:this.myInfo.user_id
          }
          getxcPayConfig(configdata).then((result)=>{
            WXinvoke(result,response=>{
                if (response.err_msg == "get_brand_wcpay_request:ok") {
                  this.isProcessing = false
                  this.$layer.msg('支付成功')    
                  this.isPay = true
                  this.$router.push({ path: '/xcorder1', query: {}});
                }
            })
          })
        }else{
          that.$layer.msg('下单失败')
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
  padding: 0 3%;
}
.order_item{
  margin-top: 15px;
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
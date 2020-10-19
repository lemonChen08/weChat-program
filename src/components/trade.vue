<template>
    <div class="container">
      <header class="header clearfix">
        <router-link class="myOrder" to="/"><span>我的订单</span></router-link>
        <router-link class="publish" to="/"><span>发布</span></router-link>
        <h2 class="title">交易市场</h2>
      </header>
      <div class="introbody">
        <el-card class="box-card">
          <div class="ordernum clearfix">
            <div class="infobox fl">
              <h3>1478</h3>
              <p>挂买单</p>
            </div>
            <div class="infobox fr">
              <h3>2354</h3>
              <p>挂卖单</p>
            </div>
          </div>
          <div class="otherinfo">
            <div class="infobox fl">
              <h3>1478</h3>
              <p>累计成交量</p>
            </div>
            <div class="infobox fr">
              <h3>$0.7</h3>
              <p>市场价</p>
            </div>
            <div class="infobox myQuguo">
              <h3>2354</h3>
              <p>我的趣果</p>
            </div>
          </div>
        </el-card>
      </div>
      <!-------->
      <div class="tabscreen">
        <div class="tabtitle clearfix">
          <span :class="tradetype=='buy'?'active':''" @click="tradetype='buy'">我要买</span>
          <span :class="tradetype=='sell'?'active':''" @click="tradetype='sell'">我要卖</span>
        </div>
        <div class="screenbox">
          <el-row>
            <el-col :span="18">
              <el-input size="mini" placeholder="手机号搜索" v-model="phone"><el-button slot="append" icon="el-icon-search"></el-button></el-input>
            </el-col>  
            <el-col :span="1"><div class="grid-content"></div></el-col>
            <el-col :span="5">
              <el-button type="primary" size="mini" round @click="isScreen=!isScreen">筛选  <i class="el-icon-edit"></i></el-button>
            </el-col>  
          </el-row>  
          <div class="screencon clearfix" v-show="isScreen">
            <el-col :span="6"><el-button type="info" plain round size='mini'>1-50</el-button></el-col>
            <el-col :span="6"><el-button type="info" plain round size='mini'>50-100</el-button></el-col>
            <el-col :span="6"><el-button type="info" plain round size='mini'>100-500</el-button></el-col>
            <el-col :span="6"><el-button type="info" plain round size='mini'>500-1000</el-button></el-col>
            <el-col :span="6"><el-button type="info" plain round size='mini'>1000-2000</el-button></el-col>
            <el-col :span="6"><el-button type="info" plain round size='mini'>2000-3000</el-button></el-col>
            <el-col :span="5"><el-input placeholder="最小数量" size="mini"></el-input></el-col>
            <el-col class="line" :span="2">--</el-col>
            <el-col :span="5"><el-input placeholder="最大数量" size="mini"></el-input></el-col> 
            <el-col :span="7"><div class="grid-content"></div></el-col> 
            <el-col :span="5"><div class="grid-content"><el-button size="mini" round>重置</el-button></div></el-col> 
            <el-col :span="5"><div class="grid-content"><el-button type="primary" size="mini" round>确定</el-button></div></el-col> 
            <el-col :span="7"><div class="grid-content"></div></el-col> 
          </div>
        </div>
      </div>
      <!------------->
      <div class="marketbox">
        <div class="marketlist buy" v-show="tradetype=='buy'">
          <ul>
            <li>
              <div class="itemFr">
                <h3 class="volume">已卖 50.3 | 43.24%</h3>
                <p class="price">单价 ￥4.41</p>
                <el-button type="primary" size="mini" class="fr" round>买入</el-button>
              </div>
              <div class="itemFl">
                <p class="userhead"><img src="@/assets/images/user.jpg"></img>王也</p>
                <p class="tradeVol">卖出：50.5趣果</p>
                <p class="tradetype">
                  <img src="../assets/images/zfb.png"></img>
                  <img src="@/assets/images/wechat.png"></img>
                  <img src="@/assets/images/bankcard.png"></img>
                </p>
              </div>
            </li>
            <li>
              <div class="itemFr">
                <h3 class="volume">已卖 50.3 | 43.24%</h3>
                <p class="price">单价 ￥4.41</p>
                <el-button type="primary" size="mini" class="fr" round>买入</el-button>
              </div>
              <div class="itemFl">
                <p class="userhead"><img src="@/assets/images/user.jpg"></img>王也</p>
                <p class="tradeVol">卖出：50.5趣果</p>
                <p class="tradetype">
                  <img src="@/assets/images/zfb.png"></img>
                  <img src="@/assets/images/wechat.png"></img>
                  <img src="@/assets/images/bankcard.png"></img>
                </p>
              </div>
            </li>
            <li>
              <div class="itemFr">
                <h3 class="volume">已卖 50.3 | 43.24%</h3>
                <p class="price">单价 ￥4.41</p>
                <el-button type="primary" size="mini" class="fr" round>买入</el-button>
              </div>
              <div class="itemFl">
                <p class="userhead"><img src="@/assets/images/user.jpg"></img>王也</p>
                <p class="tradeVol">卖出：50.5趣果</p>
                <p class="tradetype">
                  <img src="../assets/images/zfb.png"></img>
                  <img src="@/assets/images/wechat.png"></img>
                  <img src="@/assets/images/bankcard.png"></img>
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="marketlist sell" v-show="tradetype=='sell'">
          <ul>
            <li>
              <div class="itemFr">
                <h3 class="volume">已买 50.3 | 43.24%</h3>
                <p class="price">单价 ￥4.41</p>
                <el-button type="primary" size="mini" class="fr" round>卖出</el-button>
              </div>
              <div class="itemFl">
                <p class="userhead"><img src="@/assets/images/user.jpg"></img>王也</p>
                <p class="tradeVol">买入：50.5趣果</p>
                <p class="tradetype">
                  <img src="../assets/images/zfb.png"></img>
                  <img src="@/assets/images/wechat.png"></img>
                  <img src="@/assets/images/bankcard.png"></img>
                </p>
              </div>
            </li>
          </ul>
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
      phone:'',
      tradetype:'buy',
      isScreen:false
    };
  },
  created() {
    
  },
  methods: {
    
    async getOneToken() {
      let res = await api.createOnceToken()
      if(res.data.code==0){
        this.oneToken = res.data.data
        localStorage.setItem('oneToken',res.data.data)
      }
    },
  },
  mounted() {
    
  }
};
</script>
<style lang="less">
.container{position: absolute;;top:0;left:0;bottom:0;right:0;background:#f3f3f3;}
.header{padding:15px;background:#fff;}
.title{text-align:center;font-size:18px;font-weight: 600;}
.myOrder{float:left;color:#333;}
.publish{float:right;color:#333;}
.introbody{background:#fff;padding:15px;}
.ordernum{padding:0 20% 25px;}
.otherinfo{padding-bottom:10px;}
.infobox h3{font-weight: 600;font-size:14px;text-align:center;padding-bottom:5px;}
.infobox p{font-size:12px;}
.infobox.myQuguo{text-align:center;}
.tabscreen{padding:15px 15px;margin-bottom:10px;background:#fff;}
.tabscreen .tabtitle span{border-radius:5px;padding:4px 8px;float:left;margin-right:20px;color:#000;font-size:12px;}
.tabscreen .tabtitle span.active{background:#ffda44;}
.screenbox{padding:15px 0 0;}
.screencon{padding:10px 0 0;margin-top:10px;border-top:1px solid #eee;}
.screencon .el-button span{font-size:12px;}
.screencon .el-button,.screencon .el-input__inner{margin-bottom:10px;}
.line{text-align:center;line-height:28px;}
.marketbox{background:#fff;}
.marketbox .marketlist li{padding:15px;overflow:hidden;border-bottom:1px solid #DCDFE6;}
.marketlist li .itemFr{float:right;}
.itemFr .volume{font-size:15px;font-weight: 600;padding-bottom:15px;padding-top:10px;text-align:right;}
.itemFr .price{font-size:15px;font-weight: 600;padding-bottom:15px;text-align:right;}
.itemFl .userhead img{width:35px;height:35px;vertical-align: middle;margin-right:6px;}
.itemFl .userhead{padding-bottom:8px;line-height: 35px;font-size:16px;}
.itemFl .tradeVol{font-size:15px;padding:4px 0 10px;}
.itemFl .tradetype img{width:30px;height: 30px;}
</style>
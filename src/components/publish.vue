<template>
    <div class="publishcon">
      <div class="pubtop">
        <header class="pubheader">
          <router-link to="trade" class="back"><i class="el-icon-arrow-left"></i></router-link>
          <h2>发布</h2>
        </header>
        <div class="pubtab clearfix">
          <a class="pubtabbtn active">买单发布</a>
          <a class="pubtabbtn">卖单发布</a>
        </div>
      </div>
      <div class="pubbtm">
        <el-form label-position="left" label-width="80px">
          <el-form-item label="需求数量">
            <el-col :span="20"><el-input size="small" placeholder="请输入您的需求数量"></el-input></el-col>
            <el-col :span="4"><div style="text-align:right;font-size:16px;">趣果</div></el-col>
          </el-form-item>
          <el-form-item label="单价区间">
            <div style="line-height:24px;">
              <p class="pricesection clearfix">
                <span>最低：￥5.10</span>
                <span>最高：￥6.13</span>
              </p>
              <p class="pricesection clearfix">
                <span>最低：$ 0.73</span>
                <span>最高：$ 0.87</span>
              </p>
            </div>
          </el-form-item>
          <el-form-item label="单价">
            <el-col :span="20"><el-input size="small" placeholder="输入单价"></el-input></el-col>
            <el-col :span="4"><div style="text-align:right;font-size:20px;">￥</div></el-col>
          </el-form-item>
          <el-form-item label="支付方式">
            <el-checkbox-group v-model="paytype">
              <el-checkbox label="支付宝" name="type"></el-checkbox>
              <el-checkbox label="微信" name="type"></el-checkbox>
              <el-checkbox label="银行卡" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>  
          <el-form-item label="验证码">
            <el-input type="number" :class="!codeflag?'blue':'white'" placeholder="请输入6位验证码" v-model="phonecode" autocomplete="off">
              <template slot="append"><div @click="sendPhoneCode">{{!codeflag?'获取验证码':(auth_time+'s')}}</div></template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="subbtn">
        <el-button type="info">发布</el-button>
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
      paytype:[],
      codeflag:false,
      phonecode:'',
      auth_time:120,
    };
  },
  created() {
    
  },
  methods: {
    sendPhoneCode(){

    }
  },
  mounted() {
    
  }
};
</script>
<style lang="less">
.publishcon{
  position:absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
  background:#fff;
  .pubtop{
    background:#F56C6C;
    padding:0 10px 20px;
    .pubheader{
      .back{float:left;
        i{color: #fff;
          font-size: 26px;
          padding: 10px;padding-left:0;}
      }
    }
    h2{color:#fff;text-align:center;font-size:18px;font-weight: 600;line-height:50px;text-indent: -40px;}
    .pubtab{
      padding-top:30px;
      .pubtabbtn{
        float:left;
        margin-right:20px;
        padding:8px 10px;
        border-radius:25px;
        color:#fff;
        font-size:14px;
        font-weight:600;
        &.active{background:#fff;color:#F56C6C;}
      }
    }
  }
  .pubbtm{
    padding:10px 0;
    .el-form-item{border-bottom:1px solid #DCDFE6;padding:0 10px 10px;}
    .pricesection{
      border-top:1px solid #DCDFE6;
      padding:3px 0;
      height:30px;
      &:first-child{border-top:none;}
      span{float:left;width:50%;}
    } 
    .el-checkbox+.el-checkbox{margin-left:0;}
    .blue .el-input-group__append {
      background-color: #409EFF;
      color:#fff;
    } 
  }
  .subbtn{padding:30px 10px;
    button{width:100%;}
  }
}
</style>
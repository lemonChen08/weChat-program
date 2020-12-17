<template>
    <div class="tableBox">
      <el-table
        :data="inviteList"
        style="width: 100%">
        <el-table-column
          prop="ctime"
          label="时间">
        </el-table-column>
        <el-table-column
          prop="price"
          label="收益">
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="类型">
        </el-table-column>
      </el-table>
    </div>
</template>
<script>
import moment from 'moment'
import { api } from "@/api/api"
export default {
  components: {
  },
  data() {
    return {
      payData:{},
      inviteList:[],
      userInfo:null
    };
  },
  created() {
    let userInfo = localStorage.getItem('userInfo')
    this.userInfo = JSON.parse(userInfo)
    this.getInviteList()
  },
  methods: {
    async getInviteList(){
        let res = await api.getinvitelist({
            action:'user_bill',
            user_id:this.userInfo.user_id
        })
        if(res.data.code==200){
          this.inviteList = res.data.result
          this.inviteList.forEach((item,index)=>{
            item.ctime = moment(parseInt(item.ctime)*1000).format("YYYY-MM-DD")
          })
        }else{
          this.$layer.msg(res.data.msg)
        }
    },  
    
  },
  mounted() {
    
  }
};
</script>
<style scoped>
.tableBox{
  overflow: hidden;
}
</style>
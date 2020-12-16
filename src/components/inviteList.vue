<template>
    <div class="tableBox">
      <el-table
        :data="inviteList"
        style="width: 100%">
        <el-table-column
          prop="phone"
          label="用户">
        </el-table-column>
        <el-table-column
          prop="user_level"
          label="等级">
        </el-table-column>
      </el-table>
    </div>
</template>
<script>
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
            action:'recommend_user',
            user_id:this.userInfo.user_id
        })
        if(res.data.code==200){
          this.inviteList = res.data.result
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
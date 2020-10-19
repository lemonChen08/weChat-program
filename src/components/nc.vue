<template>
  <div :id="modelName" :class="[modelName]">
    <div class="nc-container"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appKey: "FFFF00000000017AA19E",
      nc_token: null,
      lang: "cn",
      NC_Opt: null,
      nc_instance: null
    };
  },
  computed: {
    modelName() {
      return ["no-captcha", new Date().getTime(), Math.random()].join("-");
    }
  },
  mounted() {
    this.init();
  },
  components: {},
  methods: {
    init() {
      var self = this;
      let isTouch = ("ontouchstart" in window) ? true : false;
      this.nc_token = [this.appKey, new Date().getTime(), Math.random()].join(
        ":"
      );
      this.NC_Opt = {
        renderTo: "#" + this.modelName,
        appkey: this.appKey,
        scene: isTouch ? "nc_login_h5" : "nc_login",
        token: this.nc_token,
        customWidth: '100%',
        // trans: { key1: "code0" },
        // elementID: ["usernameID"],
        // is_Opt: 0,
        //language: this.$i18n.locale,
        isEnabled: true,
        timeout: 3000,
        times: 5,
        // apimap: {},
        callback: data => {
          this.$emit("callback", this.nc_instance, {
            nc_token: this.nc_token,
            sessionid: data.csessionid,
            sig: data.sig,
            'scene':'nc_login'
          });
        }
      };
      this.generarte();
      this.$emit("initcallback", this.nc_instance);
    },

    generarte() {
      var nc = (this.nc_instance = new noCaptcha(this.NC_Opt));
      nc.upLang("cn", {
        _startTEXT: "请按住滑块，拖动到最右边",
        _yesTEXT: "验证通过",
        _error300:
          '哎呀，出错了，点击<a href="javascript:__nc.reset()">刷新</a>再来一次',
        _errorNetwork:
          '网络不给力，请<a href="javascript:__nc.reset()">点击刷新</a>'
      });
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.nc_wrapper {
  width: 100%!important;
}
</style>
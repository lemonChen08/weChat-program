<template>
  <div class="vue-dropdown default-theme" @click.stop>
    <div class="search-module clearfix">
      <input
        class="search-text"
        @keyup="search($event)"
        :placeholder="placeholder"
        v-model="inputText"
      />
      <span class="glyphicon glyphicon-search search-icon"></span>
    </div>
    <ul class="list-module">
      <li v-for="(item,index) in itemlist" @click="appClick(item)" :key="index">
        <span class="list-item-text">{{item.code}}</span>
        <span class="list-item-name">{{item.name}}</span>
      </li>
    </ul>
    <div class="tip__nodata" v-show="isShowNone">{{nodatatext}}</div>
  </div>
</template>
 
<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      datalist: [],
      inputText: "",
      isShowNone: false
    };
  },
  // watch:{
  //   'itemlist':function(val){ //监听屏幕宽度变化

  //   }
  // },
  props: {
    itemlist: Array,
    placeholder: String,
    nodatatext: String,
    isShow: false
  },
  watch: {
    itemlist(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (newVal.length === 0) {
          this.isShowNone = true;
          this.isShowData = false;
        } else {
          this.isShowData = true;
          this.isShowNone = false;
        }
      }
    }
  },
  methods: {
    appClick: function(data) {
      this.$emit("item-click", data);
    },
    search: function(e) {
      let searchvalue = e.currentTarget.value;
      let that = this;
      that.$emit("inputValue", searchvalue);
    },
    inputBlur() {
      this.isShowData = false;
      this.isShowNone = false;
      this.inputText = "";
    }
  },
  mounted() {}
};
</script>
 
<style lang="less" scoped>
.vue-dropdown.default-theme {
  position: relative;
  top: 50px;
  left: 0;
  margin: 0 auto;
  margin-top: 6px;
  padding: 1em;
  z-index: 10;
  background: #fff;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  box-sizing: border-box;
  &._self-show {
    display: block !important;
  }

  .search-module {
    position: relative;
    .search-text {
      width: 100%;
      height: 30px;
      border-radius: 4px;
      box-shadow: none;
      border: 1px solid #dde0eb;
      text-align: left;
      text-indent: 10px;
      &::-webkit-input-placeholder {
        font-size: 14px;
        color: rgba(51, 56, 94, 0.3);
      }
      &:focus {
        border-color: #7373f7;
      }
    }

    .search-icon {
      position: absolute;
      top: 24%;
      right: 0.5em;
      color: #aaa;
    }
  }

  .list-module {
    max-height: 200px;
    overflow-y: auto;
    li {
      &._self-hide {
        display: none;
      }
      height: 34px;
      line-height: 34px;
      &:hover {
        cursor: pointer;
        color: #33385e;
        background: #f5f7ff;
      }
      .list-item-name {
        display: none;
        float: right;
      }
      .list-item-text {
        float: left;
      }
    }
  }
}
.tip__nodata {
  font-size: 12px;
  margin-top: 1em;
}
</style>

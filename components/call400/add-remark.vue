<template>
  <div class="tj-add-remark" v-show="show">
    <div class="tj-overlay" @click="close"></div>
    <div class="remark-layer" @click.stop>
      <div class="remark-title">发布点评</div>
      <div class="remark-text">
        <textarea
          ref="remark_input"
          v-focus
          rows="4"
          maxlength="1000"
          v-model="text"
          placeholder="请输入你对该通电话录音的点评内容"
        ></textarea>
      </div>
      <div class="remark-buttom">
        <div class="remark-buttom0" @click.stop="cancel">取消</div>
        <div class="remark-buttom1" @click.stop="release">发布</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tj-add-remark",
  components: {},
  props: {
    id: Number
  },

  directives: {
    focus: function(el) {
      el.focus();
    }
  },
  mounted() {},
  destroyed() {},
  computed: {},
  methods: {
    cancel() {
      this.close();
      this.text = "";
    },
    release() {
      if(this.text.length==0){
        //提示
        this.$toast.show({
          message:'请输入点评内容',
          icon:'none',
          duration: 2000
        })
        return;
      }
      const params = {
        callCenterId: this.id,
        content: this.text
      };
      this.$emit("add", params);
    },
    open() {
      this.text = '';
      this.show = true;
      document.body.classList.add("tj-overflow-hidden");
    },
    close() {
      this.show = false;
      document.body.classList.remove("tj-overflow-hidden");
    }
  },
  async asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error
  }) {
    return {};
  },
  data() {
    return {
      show: false,
      text: ""
    };
  },
  serverCacheKey() {
    return Math.floor(Date.now() / 10000);
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/var.less";
.tj-add-remark {
}
.tj-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: @overlay-background-color;
  z-index: 99;
}
.remark-layer {
  text-align: center;
  position: fixed;
  width: 300px;
  height: 300px;
  top: 300px;
  left: 50%;
  margin-left: -150px;
  margin-top: -150px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 300;
}
.remark-title {
  font-size: @font-size-lg;
  font-weight: bold;
  margin: 12px 0;
}
.remark-text textarea {
  width: 90%;
  background: #f5f8fa;
  height: 190px;
  padding: 10px;
  border: 1px solid #e4e5e6;
  box-sizing: border-box;
}
.remark-buttom {
  display: flex;
  width: 90%;
  margin: 0 auto;
  margin-top: 5px;
  font-size: 14px;
}
.remark-buttom0 {
  flex: 2;
  background: #f5f8fa;
  padding: 10px 0;
  margin-right: 5px;
}
.remark-buttom1 {
  flex: 3;
  background: #6296fd;
  color: #fff;
  padding: 10px 0;
}
</style>

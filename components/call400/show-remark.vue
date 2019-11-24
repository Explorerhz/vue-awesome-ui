<template>
  <div class="tj-add-remark" v-show="show">
    <div class="tj-overlay" @click="close"></div>
    <div class="remark-layer" @click.stop>
      <div class="remark-title" @click="close">
        <span class="remark-close float-left">×</span>
        {{total}}条点评
      </div>
      <div class="remark-body" ref="scroll_body" @scroll="scroll_">
        <div class="i-item" v-for="item in listData" :key="'remark_'+item.commentId">
          <div class="i-line">
            <span>点评人：</span>
            <span>{{item.commentEmployeeName}}【{{item.commentEmployeeRole}}】</span>
            <span class="float-right">{{item.createTime}}</span>
          </div>
          <div class="i-line">
            <p class="comment">{{item.commentContent}}</p>
          </div>
        </div>
        <tj-bottom-loading :state="more" />
      </div>
    </div>
  </div>
</template>

<script>
import BottomLoading from "@/components/common/BottomLoading";
import { findPageRecording } from "@/api/call400";
export default {
  name: "tj-show-remark",
  components: {
    [BottomLoading.name]: BottomLoading
  },
  mounted() {
    console.log("mounted");
  },
  destroyed() {},
  computed: {},
  methods: {
    cancel() {
      this.close();
      this.text = "";
    },
    release() {
      this.close();
    },
    open(id) {
      this.id = id;
      this.initData();
      this.loadList(true);
      this.show = true;
      document.body.classList.add("tj-overflow-hidden");
    },
    close() {
      this.show = false;
      document.body.classList.remove("tj-overflow-hidden");
    },
    scroll_(e) {
      const body = this.$refs.scroll_body;
      const sh = body.scrollHeight;
      const st = body.scrollTop;
      const ch = body.clientHeight;
      if (st + ch >= sh) {
        console.log("加载。。。");
        this.loadList();
      }
    },
    initData() {
      this.pageIndex = 1;
      this.more = 1;
      this.requestState = false;
      this.listData = [];
      this.$refs.scroll_body.scrollTop = 0;
    },
    async loadList(refresh) {
      if (this.requestState || this.more == 2) {
        return;
      }
      this.requestState = true;
      this.more = 0;
      const params = {
        employeeId: this.$parent.user.userId,
        pageIndex: this.pageIndex,
        pageSize: 10,
        callCenterId: this.id,
        totalRecord: 0
      };
      let listData_ = [];
      try {
        let data = await findPageRecording(params);
        if (data.ret == 0) {
          listData_ = data.result.datas;
        }
        if (!this.listData) {
          this.listData = [];
        }
        if (refresh) {
          this.total = data.result.totalRecord;
          this.listData = listData_ ? listData_ : [];
        } else {
          this.listData = this.listData.concat(listData_);
        }
        this.pageIndex++;
      } catch (e) {
      } finally {
        if (listData_ && listData_.length < 10) {
          this.more = 2;
        } else {
          this.more = 1;
        }
        this.requestState = false;
      }
    }
  },
  data() {
    return {
      id: 0,
      show: false,
      pageIndex: 1,
      more: 1,
      requestState: false,
      listData: [],
      total: 0
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
  font-size: @font-size-sm;
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
  position: fixed;
  width: 100%;
  height: 60vh;
  bottom: 0;
  background: #fff;
  border: 1px solid #ccc;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  z-index: 300;
}
.remark-title {
  font-size: @font-size-lg;
  font-weight: bold;
  padding: 12px 0;
  border-bottom: 1px solid #ccc;
  position: relative;
  text-align: center;
}
.remark-close {
  font-weight: 500;
  position: absolute;
  left: 10px;
  top: 6px;
  display: block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  font-size: 24px;
}
.remark-body {
  height: 52vh;
  background: #f6f6f6;
  overflow-y: auto;
}
.i-item {
  padding: 10px;
  margin: 10px 0;
  background: #fff;
}
.i-item:first-child {
  margin-top: 0;
}
.i-line {
  padding: 10px 0;
  overflow: hidden;
}
.comment {
  background: #f5f8fa;
  color: #9ea4af;
  padding: 10px;
  border-radius: 3px;
}
</style>

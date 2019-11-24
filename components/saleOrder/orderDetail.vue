<template>
  <div class="detailInfo">
    <div class="nameLine">
      <span>{{data.equipmentDetail}}</span>
      <span class="redTag">{{ data.statusValue }}</span>
    </div>
    <div class="timeAddress">
      {{ data.equipmentInfo }}
    </div>
    <div class="certificate">
      <span v-if="data.invoice">发票：{{ data.invoice == 1 ? '有' : '无' }}</span>
      <span v-if="data.certificate">合格证：{{ data.certificate == 1 ? '有' : '无' }}</span>
      <span v-if="data.hammer">打锤车：{{ data.hammer == 1 ? '是' : '否' }}</span>
    </div>
    <div class="price">
      期望售价：
      <span>{{ data.equipmentPrice }}</span>
    </div>
    <div>
      工单小记：{{ data.remark }}
    </div>
    <div class="seller">
      <span>卖家：{{ data.sallerName }}</span>
      <span>管家：{{ data.ownerName }}</span>
    </div>
  </div>
</template>

<script>
import { phoneDecode } from "@/api/saleOrder";
import { execute } from "@/util/native.js"
export default {
  name: "tj-saleOrder-detail",
  props: {
    data: Object
  },
  mounted () { },
  methods: {

  },
  data () {
    return {
    };
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/css/var.less';
.detailInfo {
  font-size: @font-size-md;
  padding: 10px;
  background: @white;
  div {
    height: 30px;
    line-height: 30px;
  }
  .nameLine {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    .redTag {
      border: 1px solid @red;
      font-size: @font-size-xs;
      padding-left: 5px;
      padding-right: 5px;
      margin-top: 5px;
      display: inline-block;
      height: 20px;
      line-height: 20px;
    }
  }
  .timeAddress {
    color: @gray-dark;
    font-size: @font-size-sm;
  }
  .certificate {
    span {
      margin-right: 10px;
    }
  }
  .price {
    span {
      color: @red;
    }
  }
  .seller {
    border-top: 1px solid @gray-light;
    padding-top: 5px;
    span {
      margin-right: 15px;
    }
  }
}
</style>
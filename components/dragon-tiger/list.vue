<template>
  <div>
    <div class="rank-item recent" v-if="roleId == 4">
      <div class="line-item"><span>{{employee.sortNo}}</span></div>
      <div class="line-item">{{employee.realname}}</div>
      <div class="line-item">{{employee.dealAmount}} 万元 
        <span class="con minus" v-if="employee.gap==0">&minus;</span>
        <span class="con up" v-else-if="employee.gap<0">&uarr;</span>
        <span class="con down" v-else>&darr;</span>
      </div>
    </div>

    <div class="rank-item" v-for="(item,index) in list" :key="index +　Math.random()" >
      <div class="line-item"><span class="badge">{{item.sortNo}}</span></div>
      <div class="line-item">{{item.realname}}</div>
      <div class="line-item money">{{item.dealAmount}} 万元 
        <span class="con minus" v-if="item.gap==0">&minus;</span>
        <span class="con up" v-else-if="item.gap<0">&uarr;</span>
        <span class="con down" v-else>&darr;</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getCheckReport } from "@/api/customer";
import { execute } from "@/util/native.js"
export default {
  name: "tj-dragon-tiger-list",
  props: {
    list: Array,
    roleId: Number,
    employee: Object
  },
  mounted() {
  },
  methods: {
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/var.less";
.rank-item{
  border-bottom: 1px solid @gray-light;
  height: 30px;
  line-height: 30px;
  display: flex;
  font-size: @font-size-sm;
  &.recent{
    background: @yellow;
  }
}
.rank-item:first-child{
  border-top: 1px solid @gray-light;
}
.line-item{
  color: @black;
  flex: 1;
  text-align: center;
  &.money{
    color: @red;
  }
  .badge{
    display: inline-block;
    width: 25px;
    height: 14px;
    line-height: 14px;
    color: @white;
    background: @red;
    border-radius: 3px;
  }
  .con{
    margin-left: 15px;
    &.minus{
      color: @gray-darker;
    }
    &.up{
      color: @green;
    }
    &.down{
      color: @red;
    }
  }
}
</style>
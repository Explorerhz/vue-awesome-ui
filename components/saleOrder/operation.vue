/*
* 分类：寄售工单详情-工单操作记录
*/
<template>
  <div class="operation">
    <div v-if="noteList.length!=0">
      <div class="operationTitle">工单操作记录</div>
      <div class="peopleBox"
           v-for="(item,index) in noteList"
           :key="index">
        <div class="lineBox">
          <ul>
            <li class="up">
              <span></span>
            </li>
            <li>操作人员：{{item.managerName }}【{{item.roleName}}】</li>
            <li>
              <span>操作名称：{{ item.actionName }}</span>
              <span>{{ item.createTimeStr }}</span>
            </li>
            <li v-if="item.actionName == '预约合影' || item.actionName == '完成合影'|| item.actionName == '取消合影'">
              工单状态：由{{ item.oldStatus }}变为{{item.newStatu}}
            </li>
            <li v-else>
              工单状态：{{ item.newStatu }}
            </li>
            <li v-if="item.note">
              结果小记：{{ item.note }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="noteList.length==0">没有数据</div>
  </div>
</template>

<script>
import { phoneDecode } from "@/api/saleOrder";
import { execute } from "@/util/native.js"
export default {
  name: "tj-saleOrder-operation",
  props: {
    noteList: Array
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
.operation {
  color: @black;
  font-family: 'Microsoft YaHei', Arial, Helvetica, sans-serif;
  margin-top: 10px;
  background: @white;
  padding: 0 10px;
  margin-bottom: 45px;
  .operationTitle {
    border-bottom: 1px solid @gray-light;
    height: 47px;
    line-height: 47px;
  }
  .peopleBox {
    font-weight: 100;
    .lineBox {
      border-left: 3px solid @blue;
      padding: 10px 0 10px 22px;
      position: relative;
      li {
        height: 27px;
        line-height: 27px;
        &.up {
          position: absolute;
          top: 10px;
          left: -8px;
          background: @white;
          height: 18px;
          line-height: 18px;
          span {
            display: inline-block;
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-bottom: 10px solid #6296fd;
          }
        }
      }
    }
  }
}
</style>
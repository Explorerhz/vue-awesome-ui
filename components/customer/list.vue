<template>
  <div>
    <div
      class="customer-item"
      v-for="item in list"
      :key="'id_'+item.id"
      @click="goDetail(item.customerId,item.managerId)"
    >
      <!-- 复选框 -->
      <div v-show="showCheckedGroup" class="i-input-chk">
        <tj-checkbox v-model="selCustomers[item.id+','+item.customerId]"></tj-checkbox>
      </div>
      <!-- customer item -->
      <div class="ml0" :class="{'ml30':showCheckedGroup}">
        <div class="i-line">
          <span class="i-name" v-if="item.customerName">{{item.customerName}}</span>
          <span class="i-name" v-else >某老板</span>
          <span class="i-level" v-if="item.leveName">{{item.leveName}}</span>
          <span class="i-name" v-if="item.customerId">({{item.customerId}})</span>
          <span class="i-housekeeper" v-if="item.housekeeper">归属管家：{{item.housekeeper}}</span>
        </div>
        <div class="i-line" style="font-size:0;">
          <span class="i-tag" v-if="item.payTypeName">{{item.payTypeName}}</span>
          <span class="i-tag" v-if="item.identityType">{{item.identityType}}</span>
          <span class="i-tag" v-if="item.skipOrder">{{item.skipOrder}}</span>
        </div>
        <div class="i-line" v-if="item.intentionalEquipment">
          <span class="i-intentional">求购需求：{{item.intentionalEquipment}}</span>
        </div>
        <div class="i-line" v-if="item.followTime && item.note">
          <span class="i-intentional">最新跟进：{{item.note}}</span>
        </div>
        <div class="i-line" v-if="item.visitTime">
          <span>下次回访：{{item.visitTime}}</span>
        </div>
        <div class="i-line" v-if="item.lastName">
          呼入设备：
          <span
            class="i-lastname"
            @click.stop="goDevDetail(item.eqId?item.eqId:0,item.showCheckReport?1:0)"
          >{{item.lastName}}</span>
        </div>
        <div class="i-line" v-if="item.lastTime">
          <span>呼入时间：{{item.lastTime}}</span>
        </div>
        <a
          href="javascript:;"
          @click.stop="phoneDecoding(item.buyermobile,item.customerId)"
          v-if="item.buyermobile"
          class="i-tel"
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { getCheckReport } from "@/api/customer";
import { phoneDecode } from "@/api/common";
import Toast from "@/components/ui/toast";
import Checkbox from "@/components/ui/checkbox";
import { execute } from "@/util/native.js"
Vue.use(Toast);
export default {
  name: "tj-customer-list",
  props: {
    list: Array,
    showCheckedGroup: Boolean,
    selCustomers: Object,
    distributionType:String
  },
  components: {
    [Checkbox.name]: Checkbox
  },
  mounted() {},
  methods: {
    // 跳转客户详情
    goDetail(customerId, managerId) {
      try {
        const params0 = {
          method: "clickCurrentId",
          content: {
            id: customerId
          }
        };
        execute(params0);
        const params1 = {
          method: "openH5PlainView",
          content: {
            URL: `${this.$Origin}/res/newCustomer/customerdetail.html?id=${customerId}&managerId=${managerId}`,
            title: "客户详情"
          }
        };
        execute(params1);
      } catch (e) {
        console.log("打开客户详情异常");
      }
    },
    // 跳转车源详情（验证有没有检测报告）
    async goDevDetail(id, report) {
      let check_ = await getCheckReport({
        eqId: id
      });
      report = check_.body ? 1 : 0;
      const module_ = 2;
      try {
        const params = {
          method: "openH5PlainView",
          content: {
            URL: `${this.$Origin}/res/newEquipment/carSource.html
              ?id=${id}&module=${module_}&report=${report}`,
            title: "车源详情"
          }
        };
        execute(params);
      } catch (e) {
        console.log("跳转详情页", id, module, report);
      }
    },
    // 手机号解密
    async phoneDecoding(mobile,customerId){
      let phoneRes = await phoneDecode({
        mobile: mobile,
        source: 9,
        businessId:customerId
      });
      if (phoneRes.ret == 0) {
        var telA = document.createElement('a')
        telA.setAttribute('href','tel:'+phoneRes.result)
        telA.click()
      }else{
        this.$toast.show({
          message:phoneRes.msg,
          mark: true,
          duration: 3000
        })
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style>
.customer-item {
  padding: 10px;
  margin-top: 10px;
  background-color: #fff;
  position: relative;
}
.customer-item:first-child{
  margin-top: 0px;
}
.i-line {
  padding: 5px 0;
}
.i-line::after {
  content: "";
  height: 0;
  width: 0;
  clear: both;
}
.i-name {
  font-size: 16px;
}
.i-level {
  font-size: 12px;
  padding: 0 5px;
  background: rgba(98, 150, 253, 0.1);
  color: #6290fd;
  border: 1px solid rgba(98, 144, 253, 0.8);
}
.i-housekeeper {
  float: right;
}
.i-tag {
  font-size: 12px;
  color: #fff;
  background: rgba(245, 149, 45, 0.85);
  border-radius: 2px;
  margin-right: 5px;
  padding: 1px 6px;
}
.i-lastname {
  color: #6290fd;
}
.i-intentional {
  line-height: 20px;
}
.i-tel {
  position: absolute;
  height: 40px;
  width: 40px;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  border-radius: 50%;
  opacity: 0.6;
  background: url(../../assets/images/tel.png) center center no-repeat;
  background-size: 100%;
  z-index: 100;
  pointer-events: auto;
}
/* 列表复选框 */
.i-input-chk .tj-checkbox{
	position:absolute;
  height:100%;
  width: 100%;
	z-index: 100;
  margin-left: -10px;
  margin-top: -10px;
}
.i-input-chk .tj-checkbox .tj-icon-checked,
.i-input-chk .tj-checkbox .tj-icon-no-checked
{
	position:absolute;
	z-index: 100;
  top: 50%;
  margin-top: -12px;
  margin-left: 10px;
}
.ml30{
  margin-left: 30px;
}
.i-checked .tj-icon{
  font-size: 21px;
}
</style>
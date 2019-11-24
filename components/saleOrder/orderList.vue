<template>
  <div>
    <div class="listBox"
         v-for="(item,index) in list"
         :key="'id_'+item.id"
         @click="goDetail(item.id)">
      <div>
        <div class="line lineOne">
          <span>工单ID：{{item.id}}</span>
          <span>管家:{{item.managerName}} </span>
          <span class="redTag">{{item.statusValue}}</span>
        </div>
        <div class="line">
          <span>寄售设备：</span>
          <span class="redColor">{{item.equipmentPrice}}</span>
          <span>【{{item.equipmentDetail}}】</span>
        </div>
        <div class="line">
          合影地址：{{item.photoTimeDetail}}
        </div>
        <div class="line">
          预约时间：{{item.photoTime}}
        </div>
        <div class="line">
          工单小记：{{item.remark}}
        </div>
        <div class="line">
          更新时间：{{item.updateTime}}
        </div>
      </div>
      <div class="linksBox"
           v-if="item.contactSellerFlag || item.updateTimeFlag || item.addPhotoTimeFlag || item.finishPhotoTimeFlag || item.delPhotoTimeFlag">
        <span v-if="item.contactSellerFlag"
              @click.stop="mobileDecode(item.sallerPhone,item.id)">
          联系卖家</span>
        <span v-if="item.updateTimeFlag"
              @click="nativeJump('updateTime',item.id,item.photoTime)">修改时间</span>
        <span v-if="item.addPhotoTimeFlag"
              @click="nativeJump('orderGroupPhotoTime',item.id,'',item.photoTime,item.photoTimeDetail)">预约合影</span>
        <span v-if="item.finishPhotoTimeFlag"
              @click="nativeJump('completeGroupPhoto',item.id,'',item.photoTime,item.photoTimeDetail)">完成合影</span>
        <span v-if="item.delPhotoTimeFlag"
              @click="nativeJump('cancelGroupPhoto',item.id)">取消合影</span>
      </div>
    </div>
  </div>
</template>

<script>
import { phoneDecode } from "@/api/saleOrder";
import { execute } from "@/util/native.js"
export default {
  name: "tj-saleOrder-list",
  props: {
    list: Array
  },
  mounted () { },
  methods: {
    goDetail (saleOrderId) {//跳转到详情页
      //native打开寄售工单详情
      try {
        let params0 = { "method": "clickCurrentId", "content": { "id": saleOrderId } }
        execute(params0);
        let params1 = {
          "method": "openH5PlainView",
          "content": {
            "URL": `${this.$Origin}/res/consignmentWorklist/consignmentWorkDetail.html?saleOrderId=${saleOrderId}`,
            "title": "寄售工单详情"
          }
        }
        execute(params1);
      } catch (e) {
        console.log('跳转详情页', saleOrderId)
      }
    },
    async mobileDecode (mobile, id) {//手机号码解密
      let params = {
        employeeId: 4,
        mobile: mobile,
        source: 1,
        businessId: id
      }
      let phoneResult = await phoneDecode(params);
      if (phoneResult.ret == 0) {
        let mobileNumber = phoneResult.result;
        console.log(mobileNumber)
        let telA = document.createElement('a')
        telA.setAttribute('href', 'tel:' + mobileNumber)
        telA.click()
      }
    },
    nativeJump (type, id, oldTime, newTime, newAdd) {//点击联系买家等按钮
      let title = '';
      const params0 = { "method": "clickCurrentId", "content": { "id": id } }
      switch (type) {
        case 'updateTime':
          title = '修改时间'
          try {
            execute(params0);
            const params1 = {
              "method": "saleOrderFunction",
              "content": {
                "saleOrderId": id,
                "originalAppointmentTime": oldTime,
                "type": type,
                "title": title
              }
            }
            execute(params1);
          } catch (e) {
            console.log('跳转详情页', title, id)
          }
          break;
        case 'orderGroupPhotoTime':
          title = '预约合影'
          try {
            execute(params0);
            const params1 = {
              "method": "saleOrderFunction",
              "content": {
                "saleOrderId": id,
                "appointmentTime": newTime,
                "appointmentAddress": newAdd,
                "type": type,
                "title": title
              }
            }
            execute(params1);
          } catch (e) {
            console.log('跳转详情页', title, newTime, newAdd)
          }
          break;
        case 'completeGroupPhoto':
          title = '完成合影';
          try {
            execute(params0);
            const params1 = {
              "method": "saleOrderFunction",
              "content": {
                "saleOrderId": id,
                "type": type,
                "title": title
              }
            }
            execute(params1);
          } catch (e) {
            console.log('跳转详情页', title, id)
          }
          break;
        case 'cancelGroupPhoto':
          title = '取消合影'
          try {
            execute(params0);
            const params1 = {
              "method": "saleOrderFunction",
              "content": {
                "saleOrderId": id,
                "type": type,
                "title": title
              }
            }
            execute(params1);
          } catch (e) {
            console.log('跳转详情页', title, id)
          }
      }
    }
  },
  data () {
    return {
    };
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/css/var.less';
.listBox {
  background: #fff;
  font-size: @font-size-md;
  margin-top: 5px;
  padding: 0 15px;
  .line {
    line-height: 27px;
    .redTag {
      border: 1px solid @red;
      line-height: 18px;
      height: 18px;
      padding-left: 4px;
      padding-right: 4px;
      box-sizing: border-box;
      margin-top: 4px;
    }
    .redColor {
      color: @red;
    }
  }
  .lineOne {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
}
.linksBox {
  border-top: 1px solid @gray-light;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 10px 0;
  span {
    display: inline-block;
    width: 80px;
    height: 30px;
    line-height: 30px;
    background: @blue;
    text-align: center;
    color: #fff;
    border-radius: 5px;
  }
}
</style>
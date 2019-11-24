<template>
  <div class="foorer-nav1">
    <a href="/" v-bind:class="{act:index==0}"><i class="ficon home1"></i>
        <div>首页</div>
    </a>
    <a href="/ue" v-bind:class="{act:index==1}"><i class="ficon home2"></i>
        <div>买车</div>
    </a>
    <a href="/fastSellerCar" v-bind:class="{act:index==2}"><i class="ficon home3"></i>
        <div>卖车</div>
    </a>
    <a href="/my" v-bind:class="{act:index==3}"><i class="ficon home5"></i>
        <div>我的</div>
    </a>
  </div>
</template>

<script>
export default {
    name:'tj-tabbar',
    props:{
        index: Number,
    },
    components: {},
    data(){
      return {
        a:'abc'
      }
    }
}
</script>

<style>
.foorer-nav1 {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 10px 0 2px;
  width: 100%;
  z-index: 999;
  background: #fff;
  box-shadow: 0 -2px 10px 0 rgba(0, 0, 0, 0.06);
}

.foorer-nav1 a {
  color: #9EA4AF;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center; 
}
  .foorer-nav1 a div {
    font-size: 12px; 
    padding-top: 2px;
  }

.foorer-nav1 a.act {
  color: #486CDC; }

.foorer-nav1 a.act .ficon.home1 {
  background: url(../../assets/images/footerIcon/t_icon_home_tab_index_p@3x.png) no-repeat center;
  background-size: auto 100%; }

.foorer-nav1 a.act .ficon.home2 {
  background: url(../../assets/images/footerIcon/t_icon_home_tab_buy_car_p@3x.png) no-repeat center;
  background-size: auto 100%; }

.foorer-nav1 a.act .ficon.home3 {
  background: url(../../assets/images/footerIcon/t_icon_home_tab_sell_car_p@3x.png) no-repeat center;
  background-size: auto 100%; }

.foorer-nav1 a.act .ficon.home5 {
  background: url(../../assets/images/footerIcon/t_icon_home_tab_user_center_p@3x.png) no-repeat center;
  background-size: auto 100%; }

.foorer-nav1 .ficon {
  display: inline-block;
  height: 25px;
  width: 100%; }

.foorer-nav1 .ficon.home1 {
  background: url(../../assets/images/footerIcon/t_icon_home_tab_index_n@3x.png) no-repeat center;
  background-size: auto 100%; }

.foorer-nav1 .ficon.home2 {
  background: url(../../assets/images/footerIcon/t_icon_home_tab_buy_car_n@3x.png) no-repeat center;
  background-size: auto 100%; }

.foorer-nav1 .ficon.home3 {
  background: url(../../assets/images/footerIcon/t_icon_home_tab_sell_car_n@3x.png) no-repeat center;
  background-size: auto 100%; }

.foorer-nav1 .ficon.home5 {
  background: url(../../assets/images/footerIcon/t_icon_home_tab_user_center_n@3x.png) no-repeat center;
  background-size: auto 100%; }
</style>

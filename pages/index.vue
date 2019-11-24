<template>
  <div class="container">
    <tj-pull-refresh v-model="refreshState" @refresh="refresh">
      Index_下拉刷新....
      <div style="height:60vh">
        <tj-brand :listData="brand" :hotData="hotBrand" @change="selBrand"></tj-brand>
      </div>
      <tj-progress :percentage="percentage" :showPivot="false" :height="10"></tj-progress>
      <button @click="popupVisible = true">click</button>
      <tj-dropdown-menu >
        <tj-dropdown-item title="综合" v-model="v1" :options="option1"></tj-dropdown-item>
        <tj-dropdown-item v-model="v2" :options="option2"></tj-dropdown-item>
        <tj-dropdown-item title="筛选">abc</tj-dropdown-item>
      </tj-dropdown-menu>
      <div class="box">
        <tj-icon :name="'call-phone'" :size="16"></tj-icon>
        <tj-icon :name="'yes'" :size="16"></tj-icon>
        <tj-icon :name="'share'" :size="16"></tj-icon>
        <tj-icon :name="'comment'" :size="16"></tj-icon>
        <tj-icon :name="'video-play'" :size="16"></tj-icon>
        <tj-icon :name="'video-stop'" :size="16"></tj-icon>
        <tj-icon :name="'phone'" :size="16"></tj-icon>
        <tj-icon name="back" color="#FF00FF" :size="16"></tj-icon>
        <tj-icon name="dagou" color="#FF00FF" :size="16"></tj-icon>
      </div>
      <tj-loading></tj-loading>
      <tj-loading type="spinner"></tj-loading>

      <tj-swiper class="banner-ad" :autoplay="true" v-if="images" @change="onChange">
        <tj-swiper-item v-for="(image, index) in images" :key="index">
          <img :src="image" @click="banner(image)" />
        </tj-swiper-item>
        <div class="custom-indicator" slot="indicator">
          {{ current + 1 }}/{{images.length}}
        </div>
      </tj-swiper>
      <div class="toast">
        <span @click="toast">加载提示</span>
        <span @click="dialog">弹窗</span>
      </div>
      <div><tj-checkbox v-model="checkbox">复选框</tj-checkbox><tj-checkbox v-model="checkbox"></tj-checkbox></div>
    </tj-pull-refresh>
    <tj-popup v-model="popupVisible" ></tj-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import PullRefresh from "@/components/ui/pull-refresh";
import Progress from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import DropdownMenu from "@/components/ui/dropdown-menu";
import DropdownItem from "@/components/ui/dropdown-menu/dropdown-item";
import Toast from "@/components/ui/toast";
import Loading from "@/components/ui/loading";
import Swiper from "@/components/ui/swiper";
import SwiperItem from "@/components/ui/swiper/swiper-item";
import Popup from "@/components/ui/popup";
import Dialog from "@/components/ui/dialog";
import Checkbox from "@/components/ui/checkbox";
import Brand from "@/components/common/brand";
// import { customerPage, customerPageStatistics } from "@/api/customer";

Vue.use(Toast);
Vue.use(Dialog);

export default {
  name:'index',
  components: {
    [PullRefresh.name]: PullRefresh,
    [Progress.name]: Progress,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem,
    [Loading.name]: Loading,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Dialog.name]: Dialog,
    [Checkbox.name]: Checkbox,
    [Brand.name]: Brand
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: "description", name: "description", content: this.content }
      ],
      script: [
        //{src:'https://res.wx.qq.com/open/js/jweixin-1.3.2.js'},
        //{src:'/js/page.js'}
      ]
    };
  },
  mounted() {
    // this.banner();
  },
  destroyed() {},
  computed: {
    bottomState() {
      return 1;
    }
  },
  methods: {
    banner() {
      setTimeout(()=>{
        // console.log(this.percentage);
        if(this.percentage >= 100){
          this.percentage = 0;
        }
        this.percentage++;
        this.banner();
      },500);
    },
    refresh() {
      console.log("refresh index");
      //this.refreshState = true;
      setTimeout(() => {
        this.refreshState = false;
      }, 2000);
    },
    onChange(index) {
      this.current = index;
    },
    toast(){
      this.$toast.show({
        message:'加载中...',
        icon:'loading',
        mark: true,
        duration: 9000
      })
    },
    dialog(){
      this.$dialog.alert({
        title:'提示',
        message:'是否删除?',
        showCancel:true,
        mark:true
      }).then((val) => {
        console.log("then=",val);
      }).catch((val) => {
        console.log("catch=",val);
      });
    },
    selBrand(id){
      this.$toast.show({
        message:id,
        duration: 3000
      })
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
    let customers = [];
    let statistics = {};
    let params_ = {
      employeeId: 4,
      pageIndex: 1,
      pageSize: 10
    };

    return {
      customers: customers,
      statistics: statistics
    };
  },
  data() {
    return {
      v1:null,
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      v2:0,
      option2: [
        { text: '价格升序', value: 0 },
        { text: '价格降序', value: 1 }
      ],
      percentage:0,
      requestState: false,
      refreshState: false,
      title: "【铁甲二手机】-买卖二手挖掘机、二手工程车及二手工程机械交易平台",
      content:
        "铁甲二手机包括二手挖掘机、二手装载机、二手泵车交易信息，并涵盖二手挖掘机价格、个人买卖、市场行情、出售、转让、求购等交易信息，更多二手工程车交易信息尽在铁甲二手机。",
      images: [
        "https://upimg.tiebaobei.com/img/190802/f1f17c1b832092af0bdec91ab30a6e7c.png!640x480n",
        "https://upimg.tiebaobei.com/img/190810/d179a4f17046df7e9cf93771fb753321.png!640x480n"
      ],
      current:0,
      popupVisible:false,
      optionPop:{
        style:{
          "height":"300px"
        }
      },
      checkbox:true,
      hotBrand:[{id:1, name:'约翰迪尔', initial:'A'},
          {id:2, name:'北京市', initial:'A'},
          {id:3, name:'卡特彼勒', initial:'A'},
          {id:4, name:'北京市', initial:'A'},
          {id:5, name:'北京市', initial:'A'}],
      brand:{A:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        B:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        C:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        D:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        E:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        F:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        G:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        H:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        J:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        K:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        L:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        M:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        N:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        O:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        P:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        Q:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        I:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        S:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        T:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        U:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        V:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        W:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        X:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        Y:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
        Z:[
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
          {id:1, name:'北京市', initial:'A'},
        ],
      }
    };
  },
  // serverCacheKey() {
  //   return Math.floor(Date.now() / 10000);
  // }
};
</script>

<style lang="less">
@import '../assets/css/var.less';
*{
  font-size: @font-size-sm;
  color: @blue;
}
.tj-icon{
  font-size:18px;
}
.banner-ad{
  height: 200px;
}
.custom-indicator{
    padding: 5px 10px;
    color: #fff;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    text-align: center;
    position: absolute;
    bottom:10px;
    left:50%;
    transform: translateX(-50%);
}
.toast span{
  display: inline-block;
  height: 50px;
  line-height: 50px;
  padding: 10px 20px;
}
.tj-checkbox .tj-icon{
  font-size: 18px;
}
</style>

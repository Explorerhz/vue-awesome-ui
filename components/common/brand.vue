<template>
  <div class="tj-brand">
    <div class="tj-brand-words">
      <div>
        <span class="tj-brand-word" @click.stop="onWord('ALL')">
          #
        </span>
        <span class="tj-brand-word" v-for="(item,key) in listData" :key="'brand-'+key" @click.stop="onWord(key)">{{key}}</span>
      </div>
    </div>
    <div class="tj-brand-initial" ref="brand_scroll">
        <div v-if="hotData" class="tj-brand-hot">
            <label ref="ALL" class="tj-brand-label">热门品牌</label>
            <ul class="tj-brand-ul">
                <li class="tj-brand-hot-name" v-for="hot in hotData" :key="'brand-hot-'+hot.id"
                @click.stop="onSelect(hot.id, hot.name)">{{hot.name}}</li>
            </ul>
        </div>
      <div class v-for="(item,key) in listData" :key="'brand-'+key">
        <label :ref="key" class="tj-brand-label">{{key}}</label>
        <ul>
          <li class="tj-brand-name" v-for="item1 in item" :key="'brand0-'+item1.id"
          @click.stop="onSelect(item1.id, item1.name)">{{item1.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Icon from "@/components/ui/icon";
import Toast from "@/components/ui/toast";
Vue.use(Toast);
export default {
  name: "tj-brand",
  props: {
    listData: {
      type: Object,
      default: {}
    },
    hotData: {
      type: Array
    }
  },
  components: {
    [Icon.name]: Icon
  },
  methods: {
    onSelect(id, name) {
      this.$emit("change", id, name);
    },
    onWord(key){
        this.$toast.show({
            message:key,
            duration: 1000
        });
        const label = key == 'ALL' ? this.$refs[key] : this.$refs[key][0];
        let brand_scroll = this.$refs.brand_scroll;
        brand_scroll.scrollTop = label.offsetTop;
    }
  }
};
</script>
<style lang="less">
@import "../../assets/css/var.less";
.tj-brand {
  position: relative;
  height: inherit;
  max-height: inherit;
}
.tj-brand-words {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  height: 100%;
  overflow-y: auto;
  width: 30px;
  text-align: center;
  padding: 20px 0;
}
.tj-brand-words i.tj-icon {
  font-size: 10px;
}
.tj-brand-word {
  font-size: 14px;
  display: block;
  margin: 5px 0;
}
.tj-brand-initial {
  height: inherit;
  max-height: inherit;
  overflow-y: auto;
}
.tj-brand-label {
  height: 30px;
  line-height: 30px;
  background: @gray-light;
  font-size: 14px;
  display: block;
  padding: 0 10px;
  color: @gray-darker;
}
.tj-brand-name {
  height: 45px;
  line-height: 45px;
  font-size: 14px;
  color: @text-color;
  padding: 0 15px;
  border-bottom: solid 1px @border-color;
}
.tj-brand-hot{
    overflow: hidden;
    padding: 10px 0 10px;
}
.tj-brand-ul{
  padding: 10px;
}
.tj-brand-hot-name{
    background: @white;
    border:solid 1px @border-color;
    font-size: 14px;
    color: @text-color;
    padding: 5px 10px;
    margin:10px 5px 0;
    border-radius: 10px;
    float: left;
}
</style>
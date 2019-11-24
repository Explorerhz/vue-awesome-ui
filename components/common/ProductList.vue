<template>
    <div class="product-list">
        <ul>
            <li v-for="item in listData" :key="'p-l'+item.eqId">
                <div class="log-tap-item col2" style="display: none;">
                    <a class="TapItem" href="javascript:;" data-href="https://m.tiebaobei.com/html/similarity.html?eqId=1124901">找相似</a>
                    <a class="guanzhu-btn">关注</a>
                    <a class="xdj-btn">询价</a>
                </div>
                <a class="boutiqueEqItem" :href="item.detailUrl">
                    <div class="list-lt">
                        <img :src="item.midImageUrl" class="img-lazyload pd-img" :alt="item.eqTitle +'转让出售'">
				        <div class="down-icon">已降1.0万</div>
                    </div>
                    <div class="pd-info newPd_info_31">
                        <div class="pd-info-title">{{item.eqTitle}}</div>
                        <div class="taimAddrWrap">
                            <span class="pd-time" v-html="parseTime(item)"></span>
                        </div>
                        <div class="index-icon">
                            <span class="new_icon"><img src="https://m.tiebaobei.com/res/img/list-icon-new.png"></span>
                        </div>
                        <div class="price-icon">
                            <div class="price">
                                <span v-html="parsePrice(item.priceInfo)"></span>
                                <div class="payment-new">{{item.downPaymentStr}}</div>
                                <div class="zxs-btn">找相似</div>
                            </div>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'tj-product-list',
    props:{
        listData: Array,
    },
    computed: {
        parseTime(){
            return function (v) {
                return v.eqTimeInfo.replace(/ /g,"").replace(/\|/g,'<i>|</i>')+"<i>|</i>"+v.areaInfo;
            }
        },
        parsePrice(){
            return function(v){
                return v.replace(/万/g,'<i>万</i>');
            }
        }
    },
    methods: {
    },
    data(){
        return {
            show : true
        }
    }
}
</script>
<style scoped>
.product-list li {
    padding: 11px 0 11px 11px;
    overflow: hidden;
    position: relative;
    display: flex;
}
.log-tap-item {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    background: rgba(0,0,0,.6);
    z-index: 99;
}
.log-tap-item a {
    width: 120px;
    border-radius: 50%;
    background: #486cdc;
    color: #fff;
    font-size: 16px;
    text-align: center;
    line-height: 120px;
    margin: -38px 0 0 -38px;
}
.guanzhu-btn{
    background: #16f3f3;
}
.xdj-btn {
    background: #ff7959;
}
.boutiqueEqItem{
    display: flex;
    width: 100%;
}
.list-lt {
    width: 138px;
    margin-right: 11px;
    height: 104px;
    overflow: hidden;
    position: relative;
}
.list-lt img {
    width: 100%;
    position: absolute;
    top: 50%;
    -webkit-transform: translate3d(0,-50%,0);
    transform: translate3d(0,-50%,0);
    z-index: 0;
}
.pd-info {
    min-height: 104px;
    flex: 1;
    text-align: left;
    position: relative;
    padding-right: 11px;
}
.adr_t, .pd-info-title {
    color: #4a4a53;
    font-size: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-weight: 400;
    width: 198px;
}
 .taimAddrWrap {
    display: -webkit-box;
    margin-top: 3px;
    font-size: 0;
    height: 20px;
    line-height: 20px;
}
.pd-time {
    color: #9ea4af;
    font-size: 12px;
}
.taimAddrWrap >>> i {
    color: #dce2ee;
    font-size: 11px;
    margin: 0 6px;
    position: relative;
    top: -1.3px;
}
.adr_t {
    font-size: 12px;
    color: #9ea4af;
    width: 70px;
    display: block;
}
.index-icon {
    display: flex;
    margin-top: 5px;
}
.index-icon span {
    display: block;
    margin-right: 6px;
    height: 16px;
}
 .index-icon span img {
    width: auto;
    height: 100%;
    vertical-align: top;
}
.price-icon {
    position: absolute;
    top: 82px;
    width: 100%;
}
.price {
    color: #ff4757;
    position: relative;
}
.price span{
    font-size: 20px;
    color: #ff4757;
}
.price >>> i {
    font-size: 13px;
    color: #ff4757;
}
.payment-new {
    color: #f74d30;
    font-size: 12px;
    position: relative;
    padding-left: 8px;
    display: inline-block;
}
.zxs-btn {
    position: absolute;
    right: 11px;
    top: 50%;
    line-height: 28px;
    font-size: 12px;
    color: #486cdc;
    padding: 0 11px;
    border: 1px solid #ecf0fb;
    background: #ecf0fb;
    border-radius: 4px;
    transform: translate3d(0,-60%,0);
}
.down-icon {
    transform: translate3d(0,0,0);
    position: absolute;
    z-index: 1;
    text-align: center;
    color: #fff;
    top: 0;
    left: 0;
    min-width: 36px;
    padding: 0 11px 0 8px;
    height: 18px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALEAAAAwCAMAAABpG2uKAAAAclBMVEUAAAD/Slr/Slr/SVr/Slr/Slr/SVn/SVn/SVn/SVn/Slr/Slr/SVn/bXr/VmX/cHz/WWf/cn7/T17/ZHH/VGL/UWD/ZnP/Xmz/d4L/a3f/aHX/W2n/S1r/TVz/YG7/eYT/YnD/SFj/dYH/dID/XWv/eoa6H4UvAAAADXRSTlMA9LymO9plHA3pmnMtL5kv7QAAAWpJREFUaN7VmGlywjAMRj/b2YBuLCk0JVCX9P5XbFI7DGHqJh7XE+md4P3Rk0b46jj/cDB8tlxa1pbnnscrb5bK8GrZGj46Toa9pWmad8tLz9OVnaG0bCy15WjRHUHGlaUXjmR8nMO4+dN45218pmW8cRjre+PD0HgdwXgoHN/YZ/Cs8T7EuPYwDkhFgHE5q/EpnjG3HGtwy7EGtxxTNHbGzQBuOdaIleNw49phTCfHU4255ViDW441uOVYg1zcRowFPeORuKXglmMJbjleYixuxO55vQKZBTIxbgmY5VgAzHIsgdnj5mecETD2ipsoAF45VgD+OcfbuDlOALDKsUQLqxwnaOGUY4UORjkWuTHmk+MMJIynx03BwCbHaQEDlxwvcriMLyS/3YsH9PDI8Y0wWOQ4zRFsXEU2HgirAjfQz7HIAELG43FTOYbMkGMfY5ngHso5Fsr4DiGbYyGzAr9BL8elSOVylcDBNyfT6kH0L2lbAAAAAElFTkSuQmCC) no-repeat;
    background-size: auto;
    font-size: 12px;
    line-height: 18px;
    background-size: 100% 100%;
}
</style>


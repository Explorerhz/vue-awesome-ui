<template>
    <div class="tj-swiper-item" :style="itemStyle">
        <slot></slot>
    </div>
</template>
<script>
/**
 * 轮播项组件
 * @author 姬广达
 * @date 2019-08-15
 */
export default {
    name:'tj-swiper-item',
    beforeCreate() {
        this.$parent.swipes.push(this);
    },
    destroyed() {
        this.$parent.swipes.splice(this.$parent.swipes.indexOf(this), 1);
    },
    data() {
        return {
        offset: 0
        };
    },
    computed:{
        itemStyle(){
            const { vertical, computedWidth, computedHeight } = this.$parent;
            return {
                width: computedWidth + 'px',
                height: vertical ? computedHeight + 'px' : '100%',
                transform: `translate${vertical ? 'Y' : 'X'}(${this.offset}px)`
            };
        }
    }
}
</script>
<style scoped>
.tj-swiper-item{
    float: left;
}
.tj-swiper-item img{
    width: 100%;
    height: 100%;
}
</style>



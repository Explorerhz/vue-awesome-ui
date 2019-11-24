<template>
    <div class="bottom-loading">
        <template v-if="state===0">
            加载中...
        </template>
        <template v-else-if="state===1">
            加载完成
        </template>
        <template v-else-if="state===2">
            数据全部加载完成
        </template>
        <template v-else-if="state===3">
            暂无数据
        </template>
    </div>
</template>
<script>
export default {
    name:'tj-bottom-loading',
    props:{
        state:{
            type: Number,
            default: 0,
        }
    },
    data(){
        return {}
    }
}
</script>
<style scoped>
.bottom-loading {
    height: 45px;
    line-height: 45px;
    text-align: center;
    color: #333;
    font-size: 12px;
    background: #eee;
}
</style>


<template>
    <div class="d-tj-a" v-if="show">
            <span class="d-tj-a-c" @click="close"></span>
            <div class="d-tj-a-btn">
                <a class="d-tj-a-d" href="https://m.tiebaobei.com/html/downApp.html" target="_blank"><em></em></a>
            </div>
    </div>
</template>
<script>
export default {
    name:'tj-down-app',
    methods: {
        close(){
            this.show = false;
        }
    },
    data(){
        return {
            show : true
        }
    }
}
</script>
<style scoped>
.d-tj-a {
    width: 100%;
    height: 30px;
    background: url(../../assets/images/down/list-dwon.jpg) left top no-repeat #000;
    background-size: auto 30px;
    position: relative;
}
.d-tj-a-c {
    width: 30px;
    height: 30px;
    display: block;
    position: relative;
    z-index: 2;
}
.d-tj-a-btn {
    background: url(../../assets/images/down/list-dwon-btn.jpg) right top no-repeat;
    background-size: auto 30px;
    position: absolute;
    right: 0;
    left: 30px;
    top: 0;
    height: 100%;
    z-index: 1;
}
.d-tj-a-d {
    display: block;
    width: 100%;
    height: 100%;
    font-size: 0;
    outline: 0;
}
</style>


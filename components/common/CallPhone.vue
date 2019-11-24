<template>
    <div class="fix-btn">
        <a href="javascript:;" class="fix-free-tel"></a>
    </div>
</template>
<script>
export default {
    name:'tj-call-phone',
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
.fix-btn {
    position: fixed;
    right: 5px;
    bottom: 140px;
    z-index: 999;
}
.fix-free-tel {
    background: url(../../assets/images/fix-free-tel.png) no-repeat;
    background-size: auto;
    background-size: 100%;
    border-radius: 100%;
    box-shadow: 0 10px 30px rgba(255,71,87,.35);
    width: 52px;
    height: 52px;
    display: block;
    margin-top: .3rem;
}
</style>


<template>
    <div id="api-info">
        <div id="api-left" title="分类列表">

        </div>
        <div id="api-resize" title="收缩侧边栏"></div>
        <div id="api-right" title="接口详情"></div>
    </div>
</template>

<script setup>
    import {onMounted} from "vue"
    import commonUtils from "../../utils/commonUtils";
// -------------------公共方法区域-------------------------//


// -------------------声明周期函数-------------------------//
    onMounted(()=>{
        commonUtils.dragDiv_x("api-info","api-left","api-resize","api-right")
    })
</script>

<style scoped>
    #api-info{
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    #api-left{
        position: absolute;
        width: 300px;
        height: 100%;
        left: 0;
        bottom: 0;
        overflow: auto;
    }
    #api-resize{
        cursor: ew-resize;
        position: absolute;
        left: 300px;
        bottom: 0;
        width: 5px;
        height: 100%;
        background: linear-gradient(90deg,#d6d4d4 0,#e9e7e7 50%,#d6d4d4);
    }
    #api-resize:hover {
        background: #409EFF;
    }
    #api-right{
        position: absolute;
        height: 100%;
        left: 310px;
        right: 0;
        bottom: 0;
        top: 0;
        overflow: auto;
    }
</style>
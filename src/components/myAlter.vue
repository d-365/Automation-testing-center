<template>
    <el-dialog v-model="backAlter" title="温馨提示" width="30%" center>
<!-- 若自定义插槽内容为空，则显示mainTitle-->
        <slot name="title">
            <span>确定要不保存直接返回吗?</span>
        </slot>
        <template #footer>
              <span class="dialog-footer">
                <el-button @click="backAlter = false">取消</el-button>
                <el-button type="primary" @click="backAlter=false, $router.go(-1)">确认</el-button>
              </span>
        </template>
    </el-dialog>
</template>

<script>
    export default {
        name: "myAlter",
        props:{
            backAlter:{
                default:false
            },
        }
    }
</script>

<style scoped>

</style>
<template>
    <el-popover placement="bottom-end" trigger="hover">
        <template #reference>
            <el-icon>
                <More/>
            </el-icon>
        </template>
        <slot name="body">
            请填写内容
        </slot>
    </el-popover>
</template>

<script setup>
    import {More} from "@element-plus/icons"

</script>

<style scoped>

</style>
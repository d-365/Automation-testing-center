<template>
    <el-dropdown placement="bottom-end">
      <el-icon>
        <More />
      </el-icon>
        <template #dropdown>
            <slot name="body">
                <el-dropdown-menu>
                    <el-dropdown-item>Action 1</el-dropdown-item>
                </el-dropdown-menu>
            </slot>
        </template>
    </el-dropdown>
</template>

<script setup>
    import {More} from "@element-plus/icons"

</script>

<style scoped>

</style>
<template>
    <div>
        <el-dialog
                v-model="addCaseFolder"
                title="新增文件夹"
                width="30%"
        >
            <slot></slot>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="addCaseFolder = false">取消</el-button>
                  <slot name="submit">
                    <el-button type="primary" @click="addCaseFolder = false">确认</el-button>
                  </slot>
              </span>
            </template>
        </el-dialog>
    </div>

</template>

<script setup>
    import {defineProps} from 'vue'
    defineProps({
        addCaseFolder:{
            default:false
        }
    })
</script>

<style scoped>

</style>
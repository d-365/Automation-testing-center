<template>
    <div>
        <el-dialog v-model="show_alter" :title="title" width="30%" left>
            <slot name="myBody">默认内容</slot>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="show_alter = false">关闭</el-button>
                    <slot name="submit">
                        <el-button type="primary" @click="show_alter = false">确认</el-button>
                    </slot>
                  </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props:{
            title:{
                default:"提示"
            },
            show_alter:{
                default: false
            },
        },
        watch:{
            show_alter(newVar,oldVar){
               this.$emit("sonShowAlter",newVar)
            }
        }
    }

</script>

<style scoped>

</style>
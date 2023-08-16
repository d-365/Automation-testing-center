<template>
    <!--接口断言数据源下拉框-->
    <el-option
             v-for="item in reqAssertOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
    >
    </el-option>
</template>

<script>
    import {reactive, toRefs} from "@vue/reactivity";

    export default {
        name: "assertOption",
        setup(){
            const state = reactive({
                reqAssertOptions:[
                    {
                        value: 'bodyJson',
                        label: "响应体(json)"
                    },
                    {
                        value: 'code',
                        label: '响应码',
                    },
                    {
                        value: 'header',
                        label: '响应头',
                    },
                ],
            })
            return {
                ...toRefs(state),
            }
        },
        data(){
            return{
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <!--接口断言期望关系下拉框-->
    <el-option
            v-for="item in reqAssertExpectRelation"
            :key="item.value"
            :label="item.label"
            :value="item.value"
    >
    </el-option>
</template>

<script>
    import {reactive, toRefs} from "@vue/reactivity";

    export default {
        name: "assertExpectRelation",
         setup(){
        const state = reactive({
            reqAssertExpectRelation:[
                {
                    value: '等于',
                    label: "等于"
                },
                {
                    value: '大于',
                    label: '大于',
                },
                {
                    value: '大于等于',
                    label: '大于等于',
                },
                {
                    value: '小于',
                    label: '小于',
                },
                {
                    value: '小于等于',
                    label: '小于等于',
                },
                {
                    value: '包含',
                    label: '包含',
                },
                {
                    value: '不包含',
                    label: '不包含',
                },
                {
                    value: '长度等于',
                    label: "长度等于"
                },
                {
                    value: '长度大于',
                    label: '长度大于',
                },
                {
                    value: '长度大于等于',
                    label: '长度大于等于',
                },
                {
                    value: '长度小于',
                    label: '长度小于',
                },
                {
                    value: '长度小于等于',
                    label: '长度小于等于',
                },
            ],
        })
        return {
            ...toRefs(state),
        }
    },
    }
</script>

<style scoped>

</style>
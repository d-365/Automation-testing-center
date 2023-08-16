<template>
    <el-descriptions title="基本信息" :column="1" border>
        <el-descriptions-item
            label-align="center"
            align="center"
            width="100px"
            class-name="myContent"
        >
            <template #label>
                <span class="my_label">用例名称</span>
            </template>
                {{caseCategory.categoryName}}
        </el-descriptions-item>
        <el-descriptions-item
                label-align="center"
                align="center"
                class-name="myContent"
                width="100px"
        >
            <template #label>
                <span class="my_label">执行时间</span>
            </template>
            {{currentTime}}
        </el-descriptions-item>
        <el-descriptions-item
                label-align="center"
                align="center"
                class-name="myContent"
                width="100px"
        >
            <template #label>
                <span class="my_label">耗时</span>
            </template>
            {{caseCategory.categoryName}}
        </el-descriptions-item>
    </el-descriptions>
</template>

<script>
import getTime from "../../../../utils/date"
    export default {
        name: "caseInfo",
        props:{
            caseCategory:{
                caseGrade: null,
                casePerson: null,
                caseType: null,
                categoryId: null,
                categoryName: "",
                createTime: null,
                failContinue: null,
                id: null,
                loopCount: null,
                params: null,
                result: false,
            }
        },
        data(){
            return{
                currentTime:getTime
            }
        },
        methods:{

        }
    }
</script>

<style scoped>
    .my_label {
        color: #E6A23C;
    }
    /deep/ .myContent{
        color: #303133;
        font-size: 13px;
    }
</style>
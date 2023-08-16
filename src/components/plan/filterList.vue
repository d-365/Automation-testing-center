<template>
    <!--过滤-->
    <div style="font-size: 14px; color: #606266;font-weight:600">
        <el-row :gutter="2">
            <el-col :span="5">
                任务名称：&#12288<el-input style="width: 200px" v-model="planFilter.name"></el-input>
            </el-col>
            <el-col :span="5">
                任务状态：&#12288
                <el-select v-model="planFilter.status" placeholder="Select">
                    <el-option
                        v-for="item in filterOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
                &#12288<el-button @click="filterPlan()" type="primary">查询</el-button>
            </el-col>
            <el-col :span="1">
                <el-button type="primary" @click="planReSet()">重置</el-button>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import {reactive, toRefs} from "@vue/reactivity";

    export default {
        name: "filterList",
        setup(){
            const params = reactive({
                // 任务状态过滤
                filterOption:[
                    {
                        value: '0',
                        label: '暂停',
                    },
                    {
                        value: '1',
                        label: '正常',
                    },
                ]
            })
            return{
                ...toRefs(params),
            }
        },
        data(){
            return{
                planFilter:{
                    name:"",
                    status:""
                }
            }
        },
        methods:{
            filterPlan(){
                if(this.planFilter.name === ""){
                    this.planFilter.name = undefined
                }
                if(this.planFilter.status === ""){
                    this.planFilter.status = undefined
                }
                this.$emit("filterData",this.planFilter)
            },
            planReSet(){
                this.planFilter={}
                this.$emit("filterData",this.planFilter)
            }
        }
    }
</script>

<style scoped>

</style>
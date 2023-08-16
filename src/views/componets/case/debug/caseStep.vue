<template>
    <!--用例DEBUG测试步骤-->
    <el-table :data="stepList"
              :show-header="false"
              @row-click="rowClick"
              :row-class-name="tableRowClassName"
              border
              :highlight-current-row='true'
              ref="multipleTable"
    >
<!--        <el-table-column prop="name" label="name"/>-->
        <el-table-column label="result">
            <template #default="scope">
                <div style="text-align: right;float: left">
                    {{scope.row.name}}
                </div>
                <div style="float: right">
                    <el-tag v-if="scope.row.result === true"  effect="plain" type="success">成功</el-tag>
                    <el-tag v-else type="danger" effect="plain" plain> 失败 </el-tag>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: "caseStep",
        props:{
            stepList:{
                type:Array,
                default:[]
            }
        },
        // watch:{
        //     stepList:{
        //         handler(newVal, oldVal) {
        //             this.resStep = newVal
        //             console.log(newVal)
        //             return newVal
        //         },
        //         deep: true,
        //
        //     }
        // },
        data(){
            return{
            }
        },
        methods:{
            // 获取对应的table行坐标
            tableRowClassName({row, rowIndex}){
                row.index = rowIndex;
            },
            // 点击对应行
            rowClick(row, event, column){
                let index = row.index;
                this.$emit("stepIndex",index)
                //根据id查询模板下的通道
                this.getListChannel();

            },
            getListChannel(){
                this.$nextTick(()=>{
                    this.$refs.multipleTable.setCurrentRow(this.resStep[this.rowIndex],true)
                })
            }
        }
    }
</script>

<style scoped>

    /deep/.el-table__body tr.current-row>td{
        background-color: #64ABF5!important;
        color: #f7f2f2;
    }
</style>
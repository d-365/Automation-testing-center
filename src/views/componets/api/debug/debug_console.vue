<template>
    <!--debug接口控制台-->
    <div>
        <el-table
            :data="debugResponse.log"
            max-height="500"
            :header-cell-style="table_style()"
            :row-style="tab_row_style()"
        >
            <el-table-column width="100px" prop="success" label="success">
                <template #default="scope">
                    <span v-if="scope.row.success === true" style="color:#67C23A">{{scope.row.success}}</span>
                    <span v-else style="color: #F56C6C">{{scope.row.success}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100px" prop="location" label="location">
                <template #default="scope">
                    <span v-if="scope.row.success === true" style="color:#67C23A">{{scope.row.location}}</span>
                    <span v-else style="color: #F56C6C">{{scope.row.location}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="msg" label="msg">
                <template #default="scope">
                    <span v-if="scope.row.success === true" style="color:#67C23A">{{scope.row.msg}}</span>
                    <span v-else style="color: #F56C6C">{{scope.row.msg}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "debug_console",
        props:{
            debugResponse:{
                default:{
                    log:{
                        success:true
                    }
                }
            }
        },
        methods:{
            table_style(){
                return {background:'#eef1f6',color:'#606266'}
            },
            tab_row_style(){
                return { "color":"#3d3c3c",'font-size':'13px'}
            },
        },
    }
</script>

<style scoped>

</style>
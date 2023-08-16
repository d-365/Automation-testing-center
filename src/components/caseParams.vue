<template>
    <!--用例参数-->
    <el-badge :value="paramsLength" class="item" type="primary">
        <el-col :span="2">
            <div class="grid-content">
                <el-popover placement="bottom-start" :width="400" trigger="click">
                    <template #reference>
                        <el-button  type="text" size="small">用例参数</el-button>
                    </template>
                    <el-table :data="caseInfo.params">
                        <el-table-column prop="name" label="name">
                            <template #header>
                                <el-icon @click="caseInfo.params.push({})" style="color: #64ABF5"><Plus/></el-icon> name
                            </template>
                            <template #default="scope">
                                <el-input v-model="scope.row.name"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="value" label="Value">
                            <template #default="scope">
                                <el-input v-model="scope.row.value"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="description" label="描述">
                            <template #default="scope">
                                <el-input v-model="scope.row.description"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="right" label="操作">
                            <template #default="scope">
                                <el-icon @click="caseInfo.params.splice(scope.$index,1)"><Delete/></el-icon>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-popover>
            </div>
        </el-col>
    </el-badge>
</template>

<script>
    export default {
        name: "caseParams",
        data(){
            return{
                paramsLength:0
            }
        }
    }
</script>

<style scoped>

</style>
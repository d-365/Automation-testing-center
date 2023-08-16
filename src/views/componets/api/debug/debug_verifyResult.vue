<template>
    <!--验证结果-->
    <el-collapse>
        <!--断言结果-->
        <div class="rspAssert">
            <el-collapse-item name="1">
                <template #title>
                    <div class="myCollapse"><label>-----</label>断言结果-----</div>
                </template>
                <div class="rspAssert" v-if="debugResponse!=null" >
                    <el-table :data="debugResponse.rspAsserts"	style="width: 100%" max-height="500">
                        <el-table-column prop="dataSource" label="数据源">
                        </el-table-column>
                        <el-table-column prop="extractExpress" label="提取表达式">
                        </el-table-column>
                        <el-table-column prop="expectRelation" label="期望关系">
                            <template #default="scope">
                                <el-button type="primary"  disabled >{{scope.row.expectRelation}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="expectValue" label="期望值">
                            <template #default="scope">
                                <el-tooltip placement="top" effect="light">
                                    <template #content> <div class="short_show">{{scope.row.expectValue}}</div> </template>
                                    <el-button type="text">{{scope.row.expectValue}}</el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column prop="realValue" label="实际值">
                            <template #default="scope">
                                <el-tooltip placement="top" effect="light">
                                    <template #content>
                                        <div class="short_show" >
                                            <!-- <pre type="json">{{JSON.parse(scope.row.realValue)}}</pre>-->
                                            {{scope.row.realValue}}
                                        </div>
                                    </template>
                                    <el-button type="text"  style="width: 100px">{{scope.row.realValue  }}</el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column prop="assertResult" label="断言结果">
                            <template #default="scope">
                                <el-button v-if="scope.row.assertResult === true" type="success" disabled >{{scope.row.assertResult}}</el-button>
                                <el-button v-if="scope.row.assertResult === false" type="danger" disabled >{{scope.row.assertResult}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-collapse-item>
        </div>
        <!--参数提取-->
        <div style="padding-top: 10px">
            <el-collapse-item name="2">
                <template #title>
                    <div class="myCollapse"><label>-----</label>参数提取-----</div>
                </template>
                <div class="rspAssert" v-if="debugResponse!=null">
                    <el-table :data="debugResponse.rspExtract"	style="width: 100%" max-height="500">
                        <el-table-column prop="dataSource" label="数据源">
                        </el-table-column>
                        <el-table-column prop="extractExpress" label="提取表达式">
                        </el-table-column>
                        <el-table-column prop="varName" label="变量名称">
                        </el-table-column>
                        <el-table-column prop="realValue" label="变量值">
                            <template #default="scope">
                                <el-tooltip placement="top" effect="light">
                                    <template #content>
                                        <div class="short_show" >
                                            {{scope.row.realValue}}
                                        </div>
                                    </template>
                                    <el-button type="text"  style="width: 100px">{{scope.row.realValue  }}</el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-collapse-item>
        </div>
    </el-collapse>
</template>

<script>
    export default {
        name: "debug_verifyResult",
        props:{
            debugResponse:{
                rspAsserts:{}
            }
        }
    }
</script>

<style scoped>
    .myCollapse{
        background-color: #f2f2f2;
        width: 100%;
        height: 33px;
        text-align: left;
        font-size:15px;
        line-height:33px
    }
</style>
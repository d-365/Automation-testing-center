<template>
    <!--预览接口详情信息-->
    <el-tabs model-value="Headers" >
        <el-tab-pane label="Params" name="Params">
            <!--//请求参数params-->
            <el-table
                    :row-style="this.$root.tab_row_style()"
                    :header-cell-style="this.$root.tabStyle()"
                    border
                    :data="apiDetail.reqParams"
                    stripe
            >
                <el-table-column  prop="paramKey" label="参数名" width="180" />
                <el-table-column  prop="paramValue" label="Value" width="180" />
                <el-table-column  prop="paramExplain" label="说明" />
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="Headers" name="Headers">
            <div class="headers_check" style="margin-left: 20px">
                <!--请求headers-->
                <el-table :row-style="this.$root.tab_row_style()"
                          :header-cell-style="this.$root.tabStyle()" border  :data="apiDetail.reqHeader" stripe>
                    <el-table-column prop="HeadersKey" label="参数名" width="180" />
                    <el-table-column prop="HeadersValue" label="Value" width="180" />
                    <el-table-column prop="HeadersExplain" label="说明" />
                </el-table>
            </div>
        </el-tab-pane>
        <el-tab-pane label="Body" name="Body">
            <div  style="margin-left: 20px;padding-top: 20px">
                <!--body-->
                <el-empty description="none" v-if="apiDetail.reqBodyType==='0'"></el-empty>
                <el-table :row-style="this.$root.tab_row_style()"
                          :header-cell-style="this.$root.tabStyle()" v-if="apiDetail.reqBodyType==='1'" border :data="apiDetail.reqBodyData" stripe >
                    <el-table-column prop="dataKey" label="参数名" width="180" />
                    <el-table-column prop="dataType" label="参数类型" width="180" />
                    <el-table-column prop="dataValue" label="Value" />
                    <el-table-column prop="dataExplain" label="说明" />
                </el-table>
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4 }"
                        v-if="apiDetail.reqBodyType=== '2' "
                        v-model="apiDetail.reqBodyJson"
                />
            </div>
        </el-tab-pane>
        <el-tab-pane label="Cookies" name="Cookies">
            <div  style="margin-left: 20px">
                <!--cookies-->
                <el-table :row-style="this.$root.tab_row_style()"
                          :header-cell-style="this.$root.tabStyle()" border  :data="apiDetail.reqCookies" stripe>
                    <el-table-column prop="cookiesKey" label="参数名" width="180" />
                    <el-table-column prop="cookiesValue" label="Value" width="180" />
                    <el-table-column prop="cookiesExplain" label="说明" />
                </el-table>
            </div>
        </el-tab-pane>
        <el-tab-pane label="断言" name="assert">
            <div id="reqAssert">
                <el-table
                        :row-style="this.$root.tab_row_style()"
                        :header-cell-style="this.$root.tabStyle()"
                        :data="apiDetail.reqAssert"
                >
                    <el-table-column prop="dataSource" label="数据源">
                        <template #default="scope">
                            <el-select v-model="scope.row.dataSource" clearable placeholder="数据源">
                                <assertOption/>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="extractExpress" label="提取表达式">
                        <template #default="scope">
                            <el-input v-model="scope.row.extractExpress" placeholder="预期值"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="expectRelation" label="期望关系">
                        <template #default="scope">
                            <el-select v-model="scope.row.expectRelation" clearable placeholder="期望关系">
                                <assertExpectRelation/>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="expectValue" label="期望值">
                        <template #default="scope">
                            <el-input v-model="scope.row.expectValue" placeholder="期望值"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="right" label="操作">
                        <template #default="scope">
                            <span>
                                <el-button @click="apiDetail.reqAssert.push({})">+</el-button>
                                <el-button v-if="scope.$index!==0" @click="apiDetail.reqAssert.splice(scope.$index,1)">-</el-button>
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-tab-pane>
        <el-tab-pane label="提取参数" name="">
            <div id="reqExtract">
                <el-table :row-style="this.$root.tab_row_style()"
                          :header-cell-style="this.$root.tabStyle()"
                          :data="apiDetail.reqExtract"
                >
                    <el-table-column prop="dataSource" label="数据源">
                        <template #default="scope">
                            <el-select v-model="scope.row.dataSource" clearable placeholder="数据源">
                                <assertOption/>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="extractExpress" label="提取表达式">
                        <template #default="scope">
                            <el-input v-model="scope.row.extractExpress" placeholder="提取表达式(要解析的参数)"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="varName" label="变量名称">
                        <template #default="scope">
                            <el-input v-model="scope.row.varName" placeholder="变量名称"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="right" label="操作">
                        <template #default="scope">
                                    <span>
                                        <el-button @click="apiDetail.reqExtract.push( {} )">+</el-button>
                                        <el-button v-if="scope.$index!==0" @click="apiDetail.reqExtract.splice(scope.$index,1)">-</el-button>
                                    </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-tab-pane>
        <el-tab-pane label="前置脚本" name="">
            <setUp :roundData="apiDetail.beforeExec"/>
        </el-tab-pane>
        <el-tab-pane label="后置脚本" name="">
            <tearDown :roundData="apiDetail.afterExec"/>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import setUp from "../common/setup_teardown";
    import tearDown from "../common/setup_teardown";

    import assertExpectRelation from "./assertExpectRelation";
    import assertOption from "./assertOption";
    import beforeOperation from "./common/beforeOperation";
    import afterOperation from "./common/afterOperation";
    export default {
        name: "apiInfoViewTabs",
        components:{
            beforeOperation,afterOperation,assertOption,assertExpectRelation,setUp,tearDown
        },
        props:{
            apiDetail:{
                default:{}
            }
        },
        methods:{
            sonSetUp(){
            }
        }
    }
</script>

<style scoped>

</style>
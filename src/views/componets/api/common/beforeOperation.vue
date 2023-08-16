<template>
    <!--接口前置后置操作-->
    <div >
        <el-table
           row-key="params"
           id="preFix"
           :row-style="tab_row_style()"
           :header-cell-style="tabStyle()"
           :data="Pre_Post_Fix"
        >
            <el-table-column width="20px" prop="fill">
                <template #default="scope">
                    <el-icon :size="10" ><Sort/></el-icon>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="描述">
                <template #default="scope">
                    <el-input  v-model="scope.row.name" placeholder="描述"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="action" label="Action">
                <template #default="scope">
                    <el-cascader
                            v-model="scope.row.action"
                            :options="options"
                            filterable
                            :show-all-levels="false"
                            clearable
                    >
                        <template #default="{ node, data }">
                            <span>{{ data.label }}</span>
                            <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                        </template>
                    </el-cascader>
                </template>
            </el-table-column>
            <el-table-column prop="dbConfig" label="数据库">
                <template #default="scope">
                    <el-tooltip placement="top" effect="light">
                        <template #content>
                            <div class="short_show" >
                                <!--<pre type="json">{{JSON.parse(scope.row.realValue)}}</pre>-->
                                {{scope.row.dbConfig}}
                            </div>
                        </template>
                        <el-select clearable  v-model="scope.row.dbConfig" placeholder="数据库">
                            <el-option
                                    v-for="item in dbOptions"
                                    :key="item.dbName"
                                    :label="item.dbName"
                                    :value="item"
                            >
                            </el-option>
                        </el-select>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="params" label="参数（sql）">
                <template #default="scope">
                    <el-input :rows="1" type="textarea" v-model="scope.row.params" placeholder="SQL"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="right" label="操作">
                <template #default="scope">
                    <span>
                          <el-button @click="Pre_Post_Fix.push(apiExec)">+</el-button>
                          <el-button v-if="scope.$index!==0" @click="Pre_Post_Fix.splice(scope.$index,1)">-</el-button>
                    </span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {reactive, toRefs} from "@vue/reactivity";
    import { Sort } from "@element-plus/icons"
    import global from "../../../../global";
    import request from "../../../../utils/request";
    import Sortable from "sortablejs";
    export default {
        name: "beforeOperation",
        components:{Sort},
        props:{
            Pre_Post_Fix:{
                default:[{}]
            }
        },
        watch:{
            // 监听数据内值是否发生变化
            Pre_Post_Fix:{
                handler(newVal, oldVal) {
                    this.$emit("prePostFix",newVal)
                },
                deep: true
            },
        },
        setup(){
            const state = reactive({
                options: [
                    {
                        value: 'apiAction',
                        label: '常用操作',
                        children: [],
                    },
                    {
                        value: 'dbAction',
                        label: '数据库操作',
                        children: [
                            {
                                value: 'query',
                                label: 'query',
                            },
                            {
                                value: 'update',
                                label: 'update',
                            },
                        ],
                    }
                ],
                dbOptions:[],
                apiExec:{
                    "action": [],
                    "dbConfig": "",
                    "name": "",
                    "params": ""
                }
            })
            return {
                ...toRefs(state),
            }
        },
        data(){
            return{
            }
        },
        created(){
            this.envDetail()
        },
        mounted() {
            this.initSort()
        },
        methods:{
            tabStyle(){
                return {background:'#eef1f6',color:'#606266'}
            },
            tab_row_style(){
                return { "color":"#3d3c3c",'font-size':'13px'}
            },
            envDetail(){
                let envId = localStorage.getItem("envId");

            },
            // 表格拖拽
            initSort() {
                const tableBody = document.querySelector('#preFix tbody');
                const sortable = new Sortable(tableBody, {
                    animation: 1000,
                    onEnd: (evt) => {
                        const currRow = this.Pre_Post_Fix.splice(evt.oldIndex, 1)[0]
                        this.Pre_Post_Fix.splice(evt.newIndex, 0, currRow)
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>
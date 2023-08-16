<template>
    <!--接口后置后置操作-->
    <div >
        <el-table
                row-key="params"
                id="PostFix"
                :row-style="tab_row_style()"
                :header-cell-style="tabStyle()"
                :data="postFix"
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
                            :props="props"
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
                          <el-button @click="postFix.push(apiExec)">+</el-button>
                          <el-button v-if="scope.$index!==0" @click="postFix.splice(scope.$index,1)">-</el-button>
                    </span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {Sort} from "@element-plus/icons";
    import {reactive, toRefs} from "@vue/reactivity";
    import global from "../../../../global";
    import request from "../../../../utils/request";
    import Sortable from "sortablejs";

    export default {
        name: "afterOperation",
        components:{Sort},
        props:{
            postFix:{
            default:[{}]
            }
        },
        watch:{
            // 监听数据内值是否发生变化
            postFix:{
                handler(newVal, oldVal) {
                    this.$emit("postFix",newVal)
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
                const tableBody = document.querySelector('#PostFix tbody');
                const sortable = new Sortable(tableBody, {
                    animation: 1000,
                    onEnd: (evt) => {
                        // 这里就可以写我们需要传给后台的逻辑代码
                        // 我们有了 evt.oldIndex 和 evt.newIndex 这两个参数做索引，我们可以根据绑定在表格上面的 data 这个 Array 找到两个相应的记录。就可以针对数据进行操作啦。
                        // 下面将拖拽后的顺序进行修改
                        const currRow = this.Pre_Post_Fix.splice(evt.oldIndex, 1)[0]
                        this.Pre_Post_Fix.splice(evt.newIndex, 0, currRow)
                        // const newData = []
                        // this.Pre_Post_Fix.forEach((item, index) => {
                        //     newData[index] = {
                        //         id: item.id,
                        //         number: index+1,
                        //         caseId: item.caseId,
                        //         apiId: item.apiId,
                        //         apiInfo: item.apiInfo,
                        //         status: item.status
                        //     }
                        // })
                        // // 保存 接口用例关联信息
                        // this.Pre_Post_Fix = newData
                    }
                })
            },

        }
    }
</script>

<style scoped>

</style>
<template>
    <div style="padding: 10px; width: 100%">
        <!--    功能区-->
        <div style="margin: 0 10px">
            <el-button type="primary" @click="add">新增</el-button>
        </div>
        <!--    搜索区-->
        <div style="padding: 10px 10px">
            <el-input placeholder="Please input" style="width: 20%"/>
            <el-button type="primary" style="margin: 0 10px">查询</el-button>
        </div>
        <!--    列表区-->
        <div style="margin-left: 10px;">
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="id" label="ID" />
                <el-table-column prop="projectName" label="项目名称"/>
                <el-table-column prop="domain" label="域名" />
                <el-table-column fixed="right" label="操作">
                    <template #default="scope">
                        <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-popconfirm title="确定要删除吗" @confirm="deleteDomain(scope.row.id)">
                            <template #reference>
                                <el-button type="text" >删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog v-model="dialogVisible" title="添加域名" width="30%">
            <el-form :model="form" label-width="120px">
                <el-form-item label="项目名称">
                    <el-input v-model="form.projectName"></el-input>
                </el-form-item>
                <el-form-item label="域名">
                    <el-input v-model="form.domain"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
              </span>
            </template>
        </el-dialog>

    </div>
</template>

<script>
    import request from "../../utils/request";

    export default {
        name: 'domain',
        components: {
        },
        data(){
            return{
                form:{},
                dialogVisible:false,
                total:10,
                tableData: [
                ],
            }
        },
        created() {
            this.load()
        },
        methods:{
            deleteDomain(id){
                request.delete("/api/domain/delete/"+id).then(res=>{
                    this.$message({
                        type:"success",
                        message:"删除成功"
                    })
                    this.load()
                })
            },
            load(){
                request.get("/api/domain/list").then(res=>{
                    this.tableData = res.data
                })
            },
            handleEdit(row){
                this.form = JSON.parse(JSON.stringify(row))
                this.dialogVisible = true
            },
            add(){
                this.dialogVisible = true
                this.form = {}
            },
            save(){
                if(this.form.id){
                    request.put("/api/domain/update",this.form).then(res=>{
                        this.$message({
                            type:"success",
                            message:"更新成功"
                        })
                        this.load() //刷新数据
                        this.dialogVisible = false //关闭弹窗
                    })
                }else {
                    request.post("/api/domain/add",this.form).then(res=>{
                        this.$message({
                            type:"success",
                            message:"新增成功"
                        })
                        this.load()
                        this.dialogVisible = false //关闭弹窗

                    })

                }
            },

        }

    }

</script>

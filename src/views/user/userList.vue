<template>
    <div class="userList" style="padding: 10px; height: 100%;width: 98%;">
        <!--    功能区-->
        <div class="role-title">
            <el-row :gutter="20">
                <el-col :span="22"><div class="grid-content"  style="padding-left: 20px">角色列表</div></el-col>
                <el-col :span="2"><div class="grid-content">
                    <el-button type="primary" @click="add">添加用户</el-button>
                </div></el-col>
                <el-col :span="24"><div class="grid-content">
                    <div style="padding-top: 10px"><el-divider/></div>
                </div></el-col>
            </el-row>
        </div>
        <!--    搜索区-->
        <div style="padding: 10px 10px">
            <el-row :gutter="30">
                <el-col :span="6">
                    <div class="grid-content" style="padding-left: 20px;color: #666666">
                        用户名称: &ensp; <el-input v-model="filterAccount" placeholder="Please input" style="width: 200px"/>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content" style="padding-left: 20px;color: #666666">
                        角色名称: &ensp;
                        <el-select v-model="roleId" placeholder="Select">
                            <el-option
                                    v-for="item in roleList"
                                    :key="item.id"
                                    :label="item.roleName"
                                    :value="item.id"
                            />
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content">
                        <el-button type="primary" @click="load()" style="margin: 0 10px">查询</el-button>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content" style="padding-left: 15px"><el-button type="warning" @click="filterAccount = '', roleId=null , load()">重置</el-button></div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content" style="padding-left: 15px"><el-button type="primary" @click="userExport()">导出</el-button></div>
                </el-col>
            </el-row>
        </div>
        <!--    列表区-->
        <div style="padding:20px 0 0 10px">
            <el-table :data="tableData" stripe border :cell-style="$root.tab_row_style()" :header-cell-style="$root.tableHeaderStyle()">
                <el-table-column prop="id" label="ID" />
                <el-table-column prop="account" label="用户名"/>
                <el-table-column prop="nickName" label="昵称" />
                <el-table-column prop="locked" label="用户状态" >
                    <template  #default="scope">
                        <el-switch
                                v-model="scope.row.locked"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                :active-value = "0"
                                :inactive-value = "1"
                                @change="updateUser(scope.row)"
                        />
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template #default="scope">
                        <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-popconfirm title="确定要删除吗" @confirm="deleteUser(scope.row.id)">
                            <template #reference>
                                <el-button type="warning" >删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog v-model="dialogVisible" title="添加修改用户" width="30%">

            <el-form :model="form" label-width="120px">
                <el-form-item label="账号">
                    <el-input v-model="form.account"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="form.nickName"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select clearable v-model="form.roleId" placeholder="Select">
                        <el-option
                                v-for="item in roleList"
                                :key="item.id"
                                :label="item.roleName"
                                :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="用户状态">
                    <el-radio-group v-model="form.locked">
                        <el-radio  :label= 0 >启用</el-radio>
                        <el-radio  :label= 1 >禁用</el-radio>
                    </el-radio-group>

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
    import commonUtils from "../../utils/commonUtils";

    export default {
        name: 'userList',
        components: {
        },
        data(){
            return{
                roleId:null,
                roleList:[],
                form:{
                    locked:0
                },
                dialogVisible:false,
                total:10,
                tableData: [
                ],
                filterAccount:null
            }
        },
        created() {
            this.load()
        },
        methods:{
            // 用户数据导出
            userExport(){
                const  param = {}
                if (this.filterAccount!==null){
                    param["account"] = this.filterAccount
                }
                if (this.roleId!==null){
                    param["roleId"] = this.roleId
                }
                if (param.length !== 0 ){
                    request.get("/api/user/export", {params:param,responseType:'blob'}).then(res=>{
                        commonUtils.downloadFile(res,"vueTemp.xls")
                    })
                }else {
                    request.get("/api/user/export",{responseType:'blob'}).then(res=>{
                        commonUtils.downloadFile(res,"vueTemp.xls")
                    })
                }



            },
            deleteUser(id){
                request.delete("/api/user/deleteUser/"+id).then(res=>{
                    this.$message({
                        type:"success",
                        message:"删除成功"
                    })
                    this.load()
                })
            },
            load(){
                // 用户列表
                request.get("/api/user/userList",{params:{account:this.filterAccount,roleId:this.roleId}}).then(res=>{
                    this.tableData = res.data
                })
                // 角色列表
                request.get("/api/user/roles").then(res=>{
                    this.roleList = res.data
                })
            },
            handleEdit(row){
                this.form = JSON.parse(JSON.stringify(row))
                this.dialogVisible = true
            },
            add(){
                this.dialogVisible = true
                this.form = {
                    locked:0
                }
            },
            save(){
                if(this.form.id){
                    request.put("/api/user/updateUser",this.form).then(res=>{
                        this.$message({
                            type:"success",
                            message:"更新成功"
                        })
                        this.load() //刷新数据
                        this.dialogVisible = false //关闭弹窗
                    })
                }else {
                    request.post("/api/user/save",this.form).then(res=>{
                        if(res.code ==="1"){
                            this.$message({
                                type:"error",
                                message:res.msg
                            })
                        }else {
                            this.$message({
                                type:"success",
                                message:"新增成功"
                            })
                        }

                        this.load()
                        this.dialogVisible = false //关闭弹窗

                    })

                }
            },
            updateUser(userInfo){
                request.put("/api/user/updateUser",userInfo).then(res=>{
                    this.load() //刷新数据
                })
            }
        }

    }

</script>

<style>
    div{
        color: #409EFF;
    }
</style>
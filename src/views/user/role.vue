<!--角色管理-->
<template>
    <div class="role">
        <div class="role-title">
            <el-row :gutter="20">
                <el-col :span="22"><div class="grid-content"  style="padding-left: 20px">角色管理</div></el-col>
                <el-col :span="2"><div class="grid-content">
                    <el-button type="primary" @click="showAlter = true">添加角色</el-button>
                </div></el-col>
                <el-col :span="24"><div class="grid-content">
                    <div style="padding-top: 10px"><el-divider/></div>
                </div></el-col>
            </el-row>
        </div>
        <div class="role-filter" >
                <el-row :gutter="40">
                    <el-col :span="6">
                        <div class="grid-content" style="padding-left: 20px;color: #666666">
                            角色名称: &ensp;  <el-input placeholder="请输入角色名称" style="width: 200px" v-model="roleName"/>
                        </div>
                    </el-col>
                    <el-col :span="1">
                        <div class="grid-content"><el-button type="primary"  @click="role_init(roleName)">查询</el-button></div>
                    </el-col>
                    <el-col :span="1">
                        <div class="grid-content" ><el-button type="warning" @click="roleName = '' , role_init() ">重置</el-button></div>
                    </el-col>
                </el-row>
        </div>
        <div class="role-list">
            <el-table :data="roleList" stripe border :cell-style="$root.tab_row_style()" :header-cell-style="$root.tableHeaderStyle()">
                <el-table-column prop="id" label="序号" >
                    <template #default="scope">
                        {{scope.$index +1}}
                    </template>
                </el-table-column>
                <el-table-column prop="roleName" label="角色名称"/>
                <el-table-column fixed="right" label="操作">
                    <template #default="scope">
                        <el-button type="primary" @click="permissionAlter = true,editRole(scope.row.id)">菜单权限</el-button>
                        <el-button type="primary" v-if="scope.row.id !==1" @click="showAlter = true,editRole(scope.row.id)">编辑</el-button>
                        <el-button type="warning" v-if="scope.row.id !==1" @click="tempRoleId = scope.row.id , OpenMessageBox() ">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="role-page">
            <pagination :total="roleList.length"/>
        </div>
        <div class="hidden">
            <myDialog :show_alter="showAlter" title="添加角色" @sonShowAlter="getSonShowAlter">
                <template v-slot:myBody>
                    <el-form ref="roleForm" :rules="role_rules" :model="role">
                        <el-form-item prop="roleName" label="角色名称">
                            <el-input  clearable style="width: 250px" placeholder="角色名称" v-model="role.roleName"></el-input>
                        </el-form-item>
                    </el-form>
                </template>
                <template v-slot:submit>
                    <el-button type="primary" @click="addRole('roleForm')">确定</el-button>
                </template>
            </myDialog>
            <el-dialog
                v-model="permissionAlter"
                title="设置角色权限"
                width="30%"
                destroy-on-close
                ref="editPermission"
            >
                <div class="permissionBody" style="padding-left: 100px">
                    <el-tree
                        node-key="url"
                        :default-checked-keys="role.permissionUrl"
                        :data="permissionData"
                        show-checkbox
                        default-expand-all
                        :props="permissionProps"
                        @check="currentChecked"
                    />
                </div>

                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="permissionAlter = false">关闭</el-button>
                    <el-button type="primary" @click="saveRolePermission()">确认</el-button>
                  </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import myDialog from "../../components/common/alter/myDialog";
    import pagination from "../../components/common/pagination";
    import request from "../../utils/request";
    import {ElMessage, ElMessageBox} from "element-plus";
    export default {
        name: "role",
        components:{pagination,myDialog},
        data(){
            return{
                permissionProps:{
                    children: 'children',
                    label: 'name',
                },
                permissionData:[
                    {label:"dujun"}
                ],
                permissionAlter :false,
                showDelAlter:false,
                roleName:"",
                roleList:[],
                showAlter:false,
                // 输入框内input
                role:{
                    "roleName":"",
                    "permissionUrl":[]
                },
                role_rules: {
                    roleName:[
                        {
                            required: true,
                            message: 'Please input password',
                            trigger: 'change',
                        },
                    ]
                },
                tempRoleId: null
            }
        },
        methods:{
            role_init(roleName){
                request.get("/api/user/roleList", {params:{"roleName":roleName}}).then(res=>{
                    this.roleList = res.data
                });
                request.get("/api/user/menuList").then(res=>{
                    this.permissionData = res.data
                });
            },
            addRole(roleForm){
                this.$refs[roleForm].validate((valid) => {
                    if (valid) {
                        this.showAlter = false
                        request.post("/api/user/addRole",this.role).then(res=>{
                            this.role_init()
                        })
                    } else {
                        //校验不通过
                        return false
                    }
                })
            },
            getSonShowAlter(val){
                this.showAlter = val
            },
            editRole(roleId){
                request.get("/api/user/roleInfo/"+roleId).then(res=>{
                    this.role = res.data
                })
            },
            delRole(roleId){
                this.showDelAlter = false
                request.delete("/api/user/delRole/"+roleId).then(res=>{
                    this.role_init()
                    this.$root.toast(res)
                })
            },
            OpenMessageBox(){
                ElMessageBox.confirm(
                    '确定要进行删除吗?',
                    '提示',
                    {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'warning',
                    }
                ).then(() => {
                        this.delRole(this.tempRoleId)
                    })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: 'Delete canceled',
                    })
                })
            },
            currentChecked(nodeObj, SelectedObj){
                this.role.permissionUrl = SelectedObj.checkedKeys
            },
            // 保存角色对应的权限数据
            saveRolePermission(){
                request.post("/api/user/addRole",this.role).then(res=>{
                    this.permissionAlter = false
                })
            }
        },
        created() {
            this.role_init()
        }
    }
</script>

<style scoped>
    .role {
        padding: 5px;
        height: 100%;
        width: 98%;
    }
    .role-title {
        padding-top: 10px;
        height: 10%;
    }
    .role-filter {
        padding: 0 0 10px 0;
        height: 10%;

    }
    .role-list {
        padding: 10px 0 0 10px;
        height: 77%;
    }
    .role-page{
        position: absolute;
        bottom: 5%;
        right: 5%;
    }

</style>
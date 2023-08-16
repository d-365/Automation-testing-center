<template>
    <layout_one>
        <template v-slot:title>
            <el-col :span="22">
                <div>项目管理</div>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="emptyPrtInit(),show_alter=true">添加</el-button>
            </el-col>
        </template>
        <template v-slot:fun>
            <el-row :gutter="3">
                <el-col :span="5">
                    <div class="fun-item">
                        项目名称: &ensp; <el-input  style="width: 200px" v-model="prtName" placeholder="Please input"/>
                    </div>
                </el-col>
                <el-col :span="1">
                    <div class="fun-item">
                        <el-button type="primary" @click="filterPrtList">查询</el-button>
                    </div>
                </el-col>
                <el-col :span="1">
                    <div class="fun-item">
                        <el-button type="warning" @click="prtListInit">重置</el-button>
                    </div>
                </el-col>
            </el-row>
        </template>
        <template v-slot:list>
            <el-table
                    :row-key="(row) =>{return row.id}"
                    :expand-row-keys="expandedRowKeys"
                    :data="prtList" stripe border
                    :cell-style="tb_style" :header-cell-style="tb_style"
            >
                <el-table-column type="expand">
                    <template #default="props">
                        <div class="domain-info">
                            <el-row :gutter="1">
                                <el-col :span="2">
                                    <el-button type="warning" @click="addDomain(props.row.id,props.row.domains)">添加域名</el-button>
                                </el-col>
                                <el-col :span="2">
                                    <el-button type="primary" @click="saveDomain(props.row.domains)">保存</el-button>
                                </el-col>
                            </el-row>
                            <br>
                        </div>
                        <div class="domain-info">
                            <div v-for="(item,i) in props.row.domains">
                                <el-row :gutter="3">
                                    <el-col :span="6">
                                         <el-tag>环境信息：</el-tag><el-select v-model="item.envId" placeholder="请选择环境">
                                             <el-option
                                                     v-for="item in envList"
                                                     :key="item.id"
                                                     :label="item.envName"
                                                     :value="item.id"
                                             >
                                             </el-option>
                                         </el-select>
                                     </el-col>
                                    <el-col :span="7">
                                        <el-tag>域名：</el-tag> <el-input v-model="item.domain"  style="width: 200px"/>
                                    </el-col>
                                    <el-col :span="1">
                                        <el-button type="danger" @click="delDomain(i,item,props.row.domains)">删除</el-button>
                                    </el-col>
                                </el-row>
                                <br>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID" />
                <el-table-column prop="prtName" label="项目名"/>
                <el-table-column prop="remark" label="备注" />
                <el-table-column prop="createTime" label="创建时间" />
                <el-table-column fixed="right" label="操作">
                    <template #default="scope">
                        <el-button type="primary" @click="editPrt(scope.row)">编辑</el-button>
                        <el-button type="warning" @click="delPrt(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <template v-slot:page>
        </template>
    </layout_one>

    <myDialog title="新增项目" :show_alter="show_alter" @sonShowAlter="sonAlter">
        <template v-slot:myBody>
            <el-form :model="emptyPrt" label-width="120px">
                <el-form-item label="项目名称">
                    <el-input v-model="emptyPrt.prtName" />
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="emptyPrt.remark" clearable :rows="2" type="textarea"/>
                </el-form-item>
            </el-form>
        </template>
        <template v-slot:submit>
            <el-button type="primary" @click="addPrt(emptyPrt)">确认</el-button>
        </template>
    </myDialog>
</template>

<script setup>
    import myDialog from "components/common/alter/myDialog";
    import layout_one from "views/componets/common/layout_one"
    import {ref,reactive,onBeforeMount} from "vue"
    import commonUtils from "../../utils/commonUtils";
    import systemApi from "./systemApi";

    // -----------------公共区域-----------------------------
    const tb_style = commonUtils.tabRowStyle("left")
    let show_alter = ref(false)
    const sonAlter = (newVar)=>{
        show_alter.value = newVar
    }
    const expandedRowKeys = ref([])

    // -----------------项目管理-----------------------------
    const prtName = ref("")
    const filterPrtList = ()=>{
        if (prtName.value !== ""){
            const  payload = {
                name:prtName.value,
                size:10,
                current:1
            }
            systemApi.prtList(res=>{
                prtList.value = res.data.records
            },payload)
        }
    }
    const prtList = ref([])
    let emptyPrt = reactive({
        id:null,
        prtName:"",
        remark:"",
    })
    const emptyPrtInit = ()=>{
        emptyPrt.id = null
        emptyPrt.remark = ""
        emptyPrt.prtName =""
    }
    const prtListInit = ()=>{
        systemApi.prtList(res=>{
            prtList.value = res.data.records
        })
    }
    const addPrt = (prt)=>{
        systemApi.addPrt(prt,res=>{
            commonUtils.toast(res)
            show_alter.value = false
            prtListInit()
        })
    }
    const delPrt = (id)=>{
        commonUtils.messageBox(()=>{
            systemApi.delPrt(id,res=>{
                prtListInit()
            })
        })
    }
    const editPrt = (prt)=>{
        emptyPrt.id = prt.id
        emptyPrt.remark = prt.remark
        emptyPrt.prtName = prt.prtName
        show_alter.value = true
    }
    //项目域名配置
    const envList = ref([])
    const envListInit = ()=>{
        systemApi.envList(res=>{
            envList.value = res.data
        })
    }
    // 添加域名
    const addDomain = (prtId,domains)=>{
        const domain = {
            id:null,
            prtId:prtId,
            envId:null,
            domain:""
        }
        domains.push(domain)
    }
    // 保存域名
    const saveDomain = (domains)=>{
        systemApi.updatePrtDomain(domains,res=>{
            commonUtils.toast(res)
            envListInit()
        })
    }
    // 删除域名
    const delDomain = (index,domain,domains)=>{
        if (domain.id === null){
            domains.splice(index,1)
        }else {
            commonUtils.messageBox(res=>{
                systemApi.delPrtDomain(domain.id)
            })
        }
    }

    // -----------------生命周期方法-----------------------------
    onBeforeMount(
        ()=>{
            prtListInit()
            envListInit()
        }
    )
</script>

<style scoped>
    .domain-info{
        text-align: center;
        position:relative;
        margin-left: 200px;
    }
</style>
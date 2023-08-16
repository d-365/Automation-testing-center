<template>
    <layout>
        <template v-slot:title>
            <el-col :span="22">
                <div>执行机管理</div>
            </el-col>
        </template>
        <template v-slot:fun>
            <div><el-row :gutter="4">
                <el-col :span="6">
                    <div class="fun-item">
                        执行机状态: &ensp;
                        <el-select v-model="phone_status">
                            <el-option
                                v-for="(data,index) in phoneStatus"
                                :label="data.text"
                                :key="data.value"
                                :value="data.value"
                            ></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="fun-item">
                        <el-button type="primary" @click="queryMobilePhone()">查询</el-button>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="fun-item">
                        <el-button type="warning" @click="mobilePhoneListInit()">重置</el-button>
                    </div>
                </el-col>
            </el-row></div>
        </template>
        <template v-slot:list>
            <div id="mobile-phone" v-if="mobilePhoneList.value!==[]">
                <el-row :gutter="20">
                    <el-col
                            v-for="(data,index) in mobilePhoneList"
                            :span="8"
                            id="mobile-phone-data"
                    >
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <div>{{data.name}}</div>
                                </div>
                            </template>
                            <div>
                                <el-descriptions :column="1" border>
                                    <el-descriptions-item
                                            label="平台类型"
                                            label-align="left"
                                            align="left"
                                            width="150px"

                                    >{{data.platForm}}</el-descriptions-item>
                                    <el-descriptions-item label="平台版本" label-align="left" align="left">{{data.platVersion}}</el-descriptions-item>
                                    <el-descriptions-item label="IP地址" label-align="left" align="left">
                                        {{data.ip}}
                                    </el-descriptions-item>
                                    <el-descriptions-item label="Level" label-align="left" align="left">
                                        <el-progress
                                            :text-inside="true"
                                            :stroke-width="24"
                                            :percentage="data.level"
                                            :color="levelColor"
                                        />
                                    </el-descriptions-item>
                                </el-descriptions>
                            </div>
                            <el-divider/>
                            <div id="mobile-phone-data-bottom">
                                <div v-if="data.status ===0">上线</div>
                                <div v-if="data.status ===1">下线</div>
                                <div v-if="data.status ===2">使用中</div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </template>
        <template v-slot:page>
            <div>
                <pagination :total="dataTotal" :pageSize="pageSize"/>
            </div>
        </template>
    </layout>
</template>

<script setup>
    import layout from "../../views/componets/common/layout_one"
    import {ref,reactive,onBeforeMount,computed} from "vue"
    import systemApi from "./systemApi";
    import pagination from "../../components/common/pagination";
    // -------------------------共用静态变量信息---------------------
    const levelColor = ref([
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 50 },
        { color: '#1989fa', percentage: 80 },
        { color: '#67c23a', percentage: 100 }
    ])
    // -------------------------手机配置列表-------------------------
    const mobilePhoneList = ref([])
    const mobilePhoneListInit = (param)=>{
        systemApi.mobilePhoneList(res=>{
            mobilePhoneList.value = res.data.records
            pageSize.value = res.data.size
            dataTotal.value = res.data.total
        },param)
    }

    // 手机配置状态
    const phoneStatus = reactive([
        {text:"上线",value:0},{text:"下线",value:1},{text:"使用中",value:2}
    ])
    // 手机状态查询
    const phone_status = ref(null)
    const queryMobilePhone = ()=>{
        const query = {"status":phone_status.value}
        if (phone_status.value!=null){
            mobilePhoneListInit(query)
        }
    }

    // 分页数据
    const dataTotal = ref(0)
    const pageSize = ref(0)

    // -------------------------声明周期函数------------------------
    onBeforeMount(()=>{
        mobilePhoneListInit()
    })

</script>

<style scoped>
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .el-card{
        width: 300px !important;
    }
    #mobile-phone-data{
        margin-bottom: 20px;
    }
    #mobile-phone-data-bottom{
        text-align: center;
    }
    /deep/ .el-descriptions__content {
        color: #111111;
    }
    /deep/ .el-descriptions__label{
        width: 30%;
    }

</style>
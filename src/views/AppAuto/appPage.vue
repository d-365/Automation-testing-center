<template>
    <div class="app-page">
        <div class="my-page">
            <div class="page-top">
                <el-button  size="small" @click="addModule" plain>添加模块</el-button>
            </div>
            <div class="page-List">
                <div ><el-input v-model="filterPageName" placeholder="请输入页面名称" :prefix-icon="Search"/></div>
                <div style="padding-top: 10px">
                    <el-table
                            :data="pageList"
                            highlight-current-row
                            stripe
                            :show-header="false"
                            row-key="id"
                            :expand-row-keys="expandRowKeys"
                            :cell-style="tabRowStyle"
                            @row-click="pageListRowClick"
                            type="expand"
                    >
                        <el-table-column label="name" >
                            <template #default="scope">
                                <el-input style="margin-bottom: 20px" size="small" v-show="scope.row.show" placeholder="Please input" v-model="scope.row.name" @keyup.enter="savePageList(scope.row)"/>
                                <span style="width: 400px"   v-show="!scope.row.show">{{scope.row.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="Edit" width="">
                            <template #default="scope">
                                <div style="text-align: right">
                                    <CopyDocument v-show="!scope.row.show" style="width: 1em; height: 1em; margin-right: 8px" @click="copyPage(scope.row)" />
                                    <Edit  v-show="!scope.row.show" style="width: 1em; height: 1em; margin-right: 8px" @click="scope.row.show = true"/>
                                    <Delete v-show="!scope.row.show" style="width: 1em; height: 1em; margin-right: 8px"  @click="delPage(scope.row)"/>
                                    <Plus v-show="!scope.row.show" style="width: 1em; height: 1em; margin-right: 8px"  @click="addPage(scope.row)"/>
                                    <el-button v-show="scope.row.show" @click="savePageList(scope.row)" type="primary" size="small">save</el-button>
                                    <el-button v-show="scope.row.show" @click="removeEmptyPage(scope.row)" type="warning" size="small">close</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="page-bottom">
                <pagination :total="pageTotal" @paging="pageChange"/>
            </div>
        </div>
        <div class="my-element" v-show="showElement">
            <div class="element-function" style="display: flex;" >
                <div>
                    <el-input v-model="elementFilter" placeholder="Please input">
                        <template #append>
                            <el-button @click="elementListInit(undefined)">查询</el-button>
                        </template>
                    </el-input>
                </div>
                <div class="element-top">
                    <el-button @click="elementFilter = null">重置</el-button>
                </div>
                <div class="element-top">
                    <el-button type="primary" @click="updateAllElement">保存</el-button>
                </div>
                <div class="element-top">
                    <el-button type="success" @click="addElement">新增元素</el-button>
                </div>
            </div>
            <div class="element-list">
                <el-table
                        :data="elementList"
                        stripe
                        row-key="id"
                        :cell-style="tabRowStyle"
                        :header-row-style="tabRowStyle"
                >
                    <el-table-column label="elementName" prop="elementName" >
                        <template #default="scope">
                            <el-input v-model="scope.row.elementName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="elementType" prop="elementType" >
                        <template #default="scope">
                            <el-select v-model="scope.row.elementType" filterable>
                                <el-option
                                        v-for="item in elementType"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.value"
                                />
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="locationWay" prop="locationWay"  >
                        <template #default="scope">
                            <el-select v-model="scope.row.locationWay" filterable>
                                <el-option
                                        v-for="item in locationWay"
                                        :key="item.value"
                                        :label="item.value"
                                        :value="item.value"
                                />
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="显示等待方式" prop="conditions"  >
                        <template #default="scope">
                            <el-select v-model="scope.row.conditions" filterable>
                                <el-option
                                        v-for="item in conditionsWay"
                                        :key="item.name"
                                        :label="item.value"
                                        :value="item.name"
                                />
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="locationValue" prop="locationValue" >
                        <template #default="scope">
                            <el-input style="width: 200px" type="textarea" :rows="1" v-model="scope.row.locationValue"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="remark" prop="remark" >
                        <template #default="scope">
                            <el-tooltip effect="light" placement="top">
                                <template #content> {{scope.row.remark }}</template>
                                <el-input type="textarea" :rows="1" clearable v-model="scope.row.remark"/>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column label="Edit">
                        <template #default="scope">
                            <div>
                                <el-button-group>
                                    <el-button size="mini" type="text" @click="updateElement(scope.row)">保存&#12288;</el-button>
                                    <el-button size="mini"  type="text" @click="copyElement(scope.row)">复制&#12288;  </el-button>
                                    <el-button size="mini" type="text"  @click="delElement(scope.row.id)">删除</el-button>
                                </el-button-group>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="element-bottom">
                <pagination :total="elementsTotal" @paging="ElementPageChange" :pageSize="elementPageSize"/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import pagination from "../../components/common/pagination";
    import { CopyDocument,Edit,Delete,Plus } from "@element-plus/icons";
    import commonUtils from "../../utils/commonUtils";
    import {onBeforeMount, onMounted, ref, watch, watchEffect} from "vue";
    import {ElMessage, ElMessageBox} from 'element-plus';
    import request from "../../utils/request";

    let elementFilter = ref("")
    let showElement = ref(false)
    let pageTotal = ref(0)
    let currentPage = ref(1)
    let pageListNoReactive = []
    const pageChange= (current)=>{
        const pageListValue = pageList.value
        if (current === undefined){
            current = 1
        }
        currentPage.value = current
        pageList.value = pageListNoReactive.slice((currentPage.value-1)*10,currentPage.value*10)
    }
    const tabRowStyle = commonUtils.tabRowStyle("left")
    let filterPageName = ref('')
    // 页面列表
    let pageList = ref(null)

    // 自动展开的行数据
    let expandRowKeys = ref([])
    // 获取列表详情
    const pageListInit =()=>{
        const param = {
            type:2
        }
        request.get("/api/webPage/pageList",{params:param}).then(res=>{
            pageList.value = res.data
            pageListNoReactive = res.data
            pageTotal.value = res.data.length
        })
    }
    // 保存 pageList
    const savePageList = (row)=>{
        row.show = false
        request.post("/api/webPage/update",row).then(res=>{
            pageListInit()
            commonUtils.toast(res)
        })

    }
    //删除page
    const delPageMethod = async (row)=>{
        await request.delete("/api/webPage/delete/" + row.id).then(res=>{
            pageListInit()
        })
    }
    const  delPage = async (row)=>{
        ElMessageBox.confirm(
            '确定要进行删除吗?',
            "提示",
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(() => {
            ElMessage({
                type: 'success',
                message: 'Delete completed',
            })
            delPageMethod(row)
            if (row.id===""){
                removeEmptyPage(row)
            }
        }).catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            })
        })

    }
    const removeEmptyPage = (row)=>{
        row.show = false
        let rowIndex = 0
        let pages = pageList.value
        if (row.parentId === 0){
            pages.filter((item,i)=>{
                if (item.id === row.id){
                    rowIndex = i
                }
            })
            pages.splice(rowIndex,1)
        }else {
            let parentIndex =0
            pages.filter((item,i)=>{
                if (item.id === row.parentId){
                    parentIndex = i
                }
            })
            pages[parentIndex].children.forEach((item,i)=>{
                if (item.id === ""){
                    pages[parentIndex].children.splice(i,1)
                }
            })
        }
    }
    //复制Page
    const copyPage = (row)=>{
        let children = row.children
        children.forEach((item)=>{
            item.id = ""
            item.parentId = ""
        })
        let copyPageVal = {
            id:"",
            name: row.name,
            show: true,
            parentId: 0,
            children: children
        }
        if (row.parentId === 0){
            pageList.value.push(copyPageVal)
        }else {
            let pages = pageList.value
            let fatherIndex = 0;
            pages.filter((item,index)=> {
                if (item["id"] === row.parentId){
                    fatherIndex = index
                }
            })
            let childrenVal = {
                id: "",
                name: row.name,
                show: true,
                parentId: pages[fatherIndex]["id"],
                children: []
            }
            pages[fatherIndex]["children"].push(childrenVal)
        }
    }
    // 添加模块
    const addModule = ()=>{
        pageList.value.push({
            id:"",
            name: '',
            type:2,
            show: true,
            parentId:0,
            children: [],
        })
    }
    // 添加页面
    const addPage = (row)=>{
        expandRowKeys.value[0] = row.id.toString()
        let childrenVal = {
            id: "",
            type:2,
            name: "",
            show: true,
            parentId: row["id"],
            children: []
        }
        row.children.push(childrenVal)
    }

    // 点击table中任意一行(点击模块中页面)
    const  pageListRowClick = (row)=>{
        if (row.parentId !==0){
            showElement.value = true
            current_pageId.value = row.id
            const payload = {
                pageId:current_pageId.value,
                current:1,
                size: elementPageSize
            }
            elementListInit(payload)
        }
    }
    watch(
        () => filterPageName.value, (newVar, oldVal) => {
            pageList.value = []
        }
    )

    watchEffect(()=>{
        pageChange(currentPage.value)
    })

    //-----------------------------------element---------------------------------
    // elementList(页面元素列表）
    let elementList = ref([])
    //初始化elementList
    const elementListInit = (payload)=>{
        if (payload === undefined){
            payload = {
                "pageId":current_pageId.value,
                "current":1,
                "size": elementPageSize,
                "elementName":elementFilter.value
            }
        }
        if (current_pageId.value!==""){
            request.post("/api/element/list",payload).then(res=>{
                elementList.value = res.data.records
                elementsTotal.value = res.data.total
            })
        }
    }
    // 分页总数
    let elementsTotal = ref(0)
    // 每一页数量
    const elementPageSize = 12

    // locationWay定位方式下拉框
    const locationWay = ref([])
    // 显示等待方式
    const conditionsWay = ref([])

    // elementType元素类型下拉框
    const elementType = ref([])
    const locationWayInit = ()=>{
        request.post("/api/config/locationWay").then(res=>{
            locationWay.value = res.data
        })
        request.post("/api/config/elementType").then(res=>{
            elementType.value = res.data
        })
        request.post("/api/webPage/conditionsWay").then(res=>{
            conditionsWay.value  =res.data
        })
    }

    // 当前的PageId
    const current_pageId = ref(null)

    // element- -pagination 页面改变
    const ElementPageChange = (current)=>{
        const payload = {
            pageId:current_pageId.value,
            current:current,
            size: elementPageSize
        }
        elementListInit(payload)
    }

    //新增addElement
    const addElement = ()=>{
        // 空的elementList
        const emptyElement= {
            id:null,
            elementName: "",
            locationWay: "",
            locationValue: "",
            remark: "",
            pageId: current_pageId.value,
            conditions:"",
            type:2
        }
        elementList.value.push(emptyElement)
    }

    //保存更新所有element元素
    const updateAllElement = ()=>{
        request.post("/api/element/updateAll",elementList.value).then(res=>{
            commonUtils.toast(res)
            elementListInit()
        })
    }

    //保存更新单个element元素
    const updateElement = (element)=>{
        request.post("/api/element/update",element).then(res=>{
            commonUtils.toast(res)
            elementListInit()
        })
    }
    //复制element元素
    const copyElement = (element)=>{
        const copyElement= {
            id:null,
            type:element.type,
            elementName: element.elementName,
            locationWay: element.locationWay,
            locationValue: element.locationValue,
            remark: element.remark,
            pageId: current_pageId.value,
            conditions:element.conditions
        }
        elementList.value.push(copyElement)
    }
    //删除element元素
    const delElement = (elementId)=>{
        if (elementId == null){
            commonUtils.messageBox(()=>{elementList.value =  elementList.value.filter((item, i) => item.id !== null);},"未保存确定要删除吗？")
        }else {
            commonUtils.messageBox(()=>{request.delete("/api/element/delEle/"+elementId).then(res=>{
                elementListInit()
            })})
        }
    }

    // ----------------生命周期函数-----------
    onBeforeMount(()=>{
        pageListInit()
        locationWayInit()
    })

</script>

<style scoped>
    .app-page{
        height: 100%;
        width: 100%;
        display: flex;
    }
    .my-page{
        height: 100%;
        width: 30%;
        padding: 10px 10px 10px 10px;
    }
    .my-element{
        height: 100%;
        width: 70%;
        padding: 10px 10px 10px 10px;
    }

    .element-top{
        padding-left: 20px;
    }
    .page-List{
        padding-top: 10px;
        border: 1px solid #ebeef5;
        overflow: auto;
    }
    .element-list{
        padding-top: 20px;
        border: 1px solid #ebeef5;
        overflow:auto;
    }
    .page-bottom{
        padding-top: 50px;
    }
    .element-bottom{
        padding-top: 50px;
        position: fixed;
        right: 50px;
        bottom: 100px;
    }
    /deep/ .el-table__body tr.current-row>td{
        background-color: #69A8EA !important;
        color: #fff;
    }


</style>
<template>
    <div  id="api-box" ref="box">
<!-- 左边分类区域 -->
        <div id="api-left">
<!--            搜索框-->
            <div>
                <el-input v-model="filterText" placeholder="过滤分类名称">
                    <template #append>
                        <el-button @click="drawer = true">
                            新增分类
                        </el-button>
                    </template>
                </el-input>
            </div>
            <!--分类title-->
            <div style="padding-left: 10px">
                <el-icon><Files /></el-icon>
                <el-button type="text" @click="load" style="padding-left: 10px;font-size: 15px">全部分类</el-button>
            </div>
<!--            分类列表-->
            <div class="categoryBody" style="height: 80%;">
            <!--   分类树形结构-->
                <el-tree
                        ref="tree"
                        :data="dataSource"
                        :props="defaultProps"
                        node-key="id"
                        :expand-on-click-node="false"
                        :filter-node-method="filterNode"
                >
                    <template #default="{ node, data }">
                        <div class="custom-tree-node" style="width: 90%">
                            <div style="float: left">
                                <span v-if="data.sourceType === 0">
                                    <el-icon ><Files /></el-icon>
                                    {{ node.label }}
                                </span>
                                <span v-if="data.sourceType === 1" style="color: #64ABF5;" @click="apiInfo(node,data)">
                                    <el-icon><Coffee/></el-icon>
                                    <el-button   type="text">
                                        <span v-if="data.method==='POST'" style="font-weight: bold;font-size: 14px">{{data.method}}</span>
                                        <span v-else-if="data.method==='GET'"  style="color:rgb(224, 141, 73);font-weight: bold;font-size: 14px">{{data.method}}</span>
                                        <span v-else-if="data.method==='DELETE'"  style="color:rgb(81, 141, 238);font-weight: bold;font-size: 14px">{{data.method}}</span>
                                        <span v-else style="color:rgb(81, 141, 238);font-weight: bold;font-size: 14px">{{data.method}}</span>

                                    </el-button>
                                    <el-button   type="text"><span style="font-weight: bold;font-size: 15px;color: #666666">{{ node.label }}</span></el-button>
                                </span>
                                <span v-if="data.sourceType === 2" @click="apiInfo(node,data)">
                                    <el-icon><List/></el-icon>
                                    <el-button style="font-weight: bold;font-size: 15px;color: #666666"  type="text" ><span>{{ node.label }}</span></el-button>
                                </span>
                            </div>
                            <div style="float: right">
                                <el-dropdown v-if="data.sourceType === 0">
                                    <span class="el-dropdown-link" style="font-weight: bold; color: #64ABF5">...</span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item><el-button @click="createFolder(node,data)" style="color: #666666" type="text">新建文件夹</el-button></el-dropdown-item>
                                            <el-dropdown-item><el-button @click="categoryFormEdit(node, data)" style="color: #666666" type="text">编辑</el-button></el-dropdown-item>
                                            <el-dropdown-item>
                                                <el-popconfirm title="确认删除吗?" @confirm="categoryRemove(node, data)">
                                                    <template #reference>
                                                        <el-button type="text">删除</el-button>
                                                    </template>
                                                </el-popconfirm>
                                            </el-dropdown-item>
                                            <el-dropdown-item><el-button style="color: #666666" @click="openApiVisible(node,data)" type="text">新建接口</el-button></el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                                <el-dropdown v-else>
                                    <span class="el-dropdown-link" style="font-weight: bold; color: #64ABF5">...</span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item><el-button @click="categoryFormEdit(node, data)" style="color: #666666" type="text">编辑</el-button></el-dropdown-item>
                                            <el-dropdown-item>
                                                <el-popconfirm title="确认删除吗?" @confirm="categoryRemove(node, data)">
                                                    <template #reference>
                                                        <el-button type="text">删除</el-button>
                                                    </template>
                                                </el-popconfirm>
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                        </div>
                    </template>


                </el-tree>
            </div>

            <!-- 默认不显示--新增分类弹窗-->
            <el-drawer v-model="drawer" title="新增分类" :with-header="false">
                <el-form :model="categoryForm" label-width="120px">
                    <el-form-item label="分类名称">
                        <el-input v-model="categoryForm.name" placeholder="请输入分类名称"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="categoryForm.remark" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="备注"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="drawer = false">取消</el-button>
                        <el-button type="primary" @click="saveCategory()">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-drawer>
<!--            新增接口弹窗-->
            <el-dialog
                    v-model="apiVisible"
                    title="新增接口"
                    width="30%"
            >
                <el-form ref="form" :model="apiForm" label-width="120px">
                    <el-form-item label="接口名称">
                        <el-input v-model="apiForm.name" placeholder="请输入接口名称"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="apiForm.remark" placeholder="备注"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="apiVisible = false">取消</el-button>
                        <el-button type="primary" @click="saveApiSuite">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

        </div>
<!-- 中线 -->
        <div id="api-resize" title="收缩侧边栏"></div>
<!-- 右边列表区域-->
        <div id="api-right" style="display: none"  ref="rightDiv">
            <el-tabs type="border-card" v-model="activeName_total">
                <!-- 接口详情-->
                <el-tab-pane label="接口详情" name="first">
                    <div id="apiInfo" style="width: 100%;height: 100%">
                        <!-- 基本信息-->
                        <div class="apiInfoTop">
                            <div>
                                <span>
                                    <el-select v-model="apiDetail.method" placeholder="Select" style="width: 10%">
                                        <el-option
                                                v-for="item in methodOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        >
                                        </el-option>
                                      </el-select>
                                    <span ref="apiDomain" style="display: inline">
                                          <el-select  v-model="apiDetail.projectId" placeholder="请选择域名" style="width: 15%;">
                                                <el-option
                                                    v-for="item in prtOptions"
                                                    :key="item.id"
                                                    :label="item.prtName"
                                                    :value="item.id"
                                                >
                                                </el-option>
                                      </el-select>
                                    </span>
                                    <el-input style="width: 60%" v-model="apiDetail.path" placeholder="输入接口地址"></el-input>
                                    <el-button style="width: 5%;margin:0 50px" @click="save_api()" type="primary" round>保存</el-button>
                                </span>
                                <div>
                                    <div  class="api-info-padding"> <el-icon color="#409EFF"><Menu/></el-icon>基本信息 </div>
                                    <div class="api-info-padding">
                                        <el-switch
                                          style="padding-right: 100px"
                                          v-model="apiDetail.domainSwitch"
                                          inactive-text="引用域名"
                                          @click="operateDomainSelect"
                                          >
                                          </el-switch>
                                        接口状态：
                                        <el-select v-model="apiDetail.status" placeholder="选择状态" style="width: 10%;">
                                            <el-option
                                                    v-for="item in ApiStatus"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                            >
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div class="api-info-padding">
                                    接口名称：<el-input style="width: 60%" v-model="apiDetail.name" placeholder="输入接口名称"></el-input>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div style="height: 500px;overflow: auto">
                            <!-- 请求参数-->
                            <div class="apiInfoTop">
                                <div class="apiInfoTop">
                                    <div  class="api-info-padding"> <el-icon color="#409EFF"><Menu/></el-icon>请求参数 </div>
                                    <div>
                                        <el-tabs type="border-card">
                                            <!--//请求参数params-->
                                            <el-tab-pane>
                                                <template #label>
                                                <span>
                                                  Params<el-badge  :value="apiDetail.reqParams.length"/>
                                                </span>
                                                </template>
                                                <div >
                                                    <!-- 空行-->
                                                    <div style="font-size: 10px;font-weight: bold;color: #64ABF5">
                                                        Query参数
                                                    </div>
                                                    <!-- 表格-->
                                                    <div>
                                                        <el-form>
                                                            <el-table :data="apiDetail.reqParams" style="width: 100%">
                                                                <el-table-column prop="paramKey" label="Key">
                                                                    <template #default="scope">
                                                                        <el-input v-model="scope.row.paramKey"></el-input>
                                                                    </template>
                                                                </el-table-column>
                                                                <el-table-column prop="paramValue" label="Value">
                                                                    <template #default="scope">
                                                                        <el-input v-model="scope.row.paramValue"></el-input>
                                                                    </template>
                                                                </el-table-column>
                                                                <el-table-column prop="paramExplain" label="说明">
                                                                    <template #default="scope">
                                                                        <el-input v-model="scope.row.paramExplain"></el-input>
                                                                    </template>
                                                                </el-table-column>
                                                                <el-table-column prop="right" label="">
                                                                    <template #default="scope">
                                                                <span>
                                                                    <el-button @click="addReqParamsTr">+</el-button>
                                                                    <el-button v-if="scope.$index!==0" @click="delReqParamsTr(scope.row,scope.$index)">-</el-button>
                                                                </span>
                                                                    </template>
                                                                </el-table-column>
                                                            </el-table>
                                                        </el-form>
                                                    </div>
                                                </div>
                                            </el-tab-pane>
                                            <!-- headers-->
                                            <el-tab-pane>
                                                <template #label>
                                                <span>
                                                  Headers<el-badge  :value="this.apiDetail.reqHeader.length"/>
                                                </span>
                                                </template>
                                                <!-- 表格-->
                                                <div>
                                                    <el-form>
                                                        <el-table :data="apiDetail.reqHeader" style="width: 100%">
                                                            <el-table-column prop="HeadersKey" label="Key">
                                                                <template #default="scope">
                                                                    <el-input v-model="scope.row.HeadersKey"></el-input>
                                                                </template>
                                                            </el-table-column>
                                                            <el-table-column prop="HeadersValue" label="Value">
                                                                <template #default="scope">
                                                                    <el-input v-model="scope.row.HeadersValue"></el-input>
                                                                </template>
                                                            </el-table-column>
                                                            <el-table-column prop="HeadersExplain" label="说明">
                                                                <template #default="scope">
                                                                    <el-input v-model="scope.row.HeadersExplain"></el-input>
                                                                </template>
                                                            </el-table-column>
                                                            <el-table-column prop="right" label="">
                                                                <template #default="scope">
                                                                <span>
                                                                    <el-button @click="addReqHeadersTr">+</el-button>
                                                                    <el-button v-if="scope.$index!==0" @click="delReqHeadersTr(scope.row,scope.$index)">-</el-button>
                                                                </span>
                                                                </template>
                                                            </el-table-column>
                                                        </el-table>
                                                    </el-form>
                                                </div>
                                            </el-tab-pane>
                                            <!--body-->
                                            <el-tab-pane name="body" label="Body">
                                                <template #label>
                                                <span>
                                                  Body<el-badge  :value="this.apiDetail.reqBodyData.length"/>
                                                </span>
                                                </template>
                                                <div class="reqBody">
                                                    <el-tabs :model-value="apiDetail.reqBodyType" >
                                                        <!--none-->
                                                        <el-tab-pane name="0">
                                                            <template #label>
                                                                <span @click="bodyTabsClick('0')" >
                                                                    none
                                                                </span>
                                                            </template>
                                                            <div class="el-card">
                                                                <div class="el-card-body">
                                                                    该请求没有Body
                                                                </div>
                                                            </div>
                                                        </el-tab-pane>
                                                        <!-- form-data-->
                                                        <el-tab-pane name="1" >
                                                            <template #label>
                                                                <span @click="bodyTabsClick('1')" >
                                                                    form-data
                                                                </span>
                                                            </template>
                                                            <div class="el-card">
                                                                <div class="el-card-body">
                                                                    <el-form>
                                                                        <el-table :data="apiDetail.reqBodyData" :show-header="show_header"	style="width: 100%">
                                                                            <el-table-column prop="dataKey" label="Key">
                                                                                <template #default="scope">
                                                                                    <el-input v-model="scope.row.dataKey" placeholder="key"></el-input>
                                                                                </template>
                                                                            </el-table-column>
                                                                            <el-table-column prop="dataType" label="参数类型">
                                                                                <template #default="scope">
                                                                                    <el-select v-model="formData_type" placeholder="Text" style="width: 100px">
                                                                                        <el-option
                                                                                                v-for="item in reqFormDataSelect"
                                                                                                :key="item.value"
                                                                                                :label="item.label"
                                                                                                :value="item.value"
                                                                                        >
                                                                                        </el-option>
                                                                                    </el-select>
                                                                                </template>
                                                                            </el-table-column>
                                                                            <el-table-column prop="dataValue" label="Value">
                                                                                <template #default="scope">
                                                                                    <el-input v-model="scope.row.dataValue" placeholder="value"></el-input>
                                                                                </template>
                                                                            </el-table-column>
                                                                            <el-table-column prop="dataExplain" label="说明">
                                                                                <template #default="scope">
                                                                                    <el-input v-model="scope.row.dataExplain" placeholder="备注"></el-input>
                                                                                </template>
                                                                            </el-table-column>
                                                                            <el-table-column prop="right" label="操作">
                                                                                <template #default="scope">
                                                                                <span>
                                                                                    <el-button @click="addReqFormDataTableTr">+</el-button>
                                                                                    <el-button v-if="scope.$index!==0" @click="delReqFormDataTableTr(scope.row,scope.$index)">-</el-button>
                                                                                </span>
                                                                                </template>
                                                                            </el-table-column>
                                                                        </el-table>
                                                                    </el-form>
                                                                </div>
                                                            </div>
                                                        </el-tab-pane>
                                                        <!--json-->
                                                        <el-tab-pane name="2">
                                                            <template #label>
                                                                 <span @click="bodyTabsClick('2')" >
                                                                    Json
                                                                </span>

                                                            </template>
                                                            <div class="el-card">
                                                                <div class="el-card-body">
                                                                    <el-input
                                                                            v-model="apiDetail.reqBodyJson"
                                                                            :autosize="{ minRows: 2, maxRows: 4 }"
                                                                            type="textarea"
                                                                            placeholder="Please input json"
                                                                    >
                                                                    </el-input>
                                                                </div>
                                                            </div>
                                                        </el-tab-pane>
                                                    </el-tabs>
                                                </div>
                                            </el-tab-pane>
                                            <!--cookies-->
                                            <el-tab-pane>
                                                <template #label>
                                                <span>
                                                  Cookies<el-badge  :value="this.apiDetail.reqCookies.length"/>
                                                </span>
                                                </template>
                                                <!-- 表格-->
                                                <div>
                                                    <el-form>
                                                        <el-table :data="apiDetail.reqCookies" style="width: 100%">
                                                            <el-table-column prop="cookiesKey" label="Key">
                                                                <template #default="scope">
                                                                    <el-input v-model="scope.row.cookiesKey"></el-input>
                                                                </template>
                                                            </el-table-column>
                                                            <el-table-column prop="cookiesValue" label="Value">
                                                                <template #default="scope">
                                                                    <el-input v-model="scope.row.cookiesValue"></el-input>
                                                                </template>
                                                            </el-table-column>
                                                            <el-table-column prop="cookiesExplain" label="说明">
                                                                <template #default="scope">
                                                                    <el-input v-model="scope.row.cookiesExplain"></el-input>
                                                                </template>
                                                            </el-table-column>
                                                            <el-table-column prop="right" label="">
                                                                <template #default="scope">
                                                            <span>
                                                                <el-button @click="addReqCookiesTr">+</el-button>
                                                                <el-button v-if="scope.$index!==0" @click="delReqCookiesTr(scope.row,scope.$index)">-</el-button>
                                                            </span>
                                                                </template>
                                                            </el-table-column>
                                                        </el-table>
                                                    </el-form>
                                                </div>

                                            </el-tab-pane>
                                        </el-tabs>
                                    </div>
                                </div>
                            </div>
                            <!-- 返回数据-->
                            <div class="apiInfoTop">
                                <div  class="api-info-padding"> <el-icon color="#409EFF"><Menu/></el-icon>返回数据 </div>
                                <div>
                                    <el-tabs type="border-card">
                                        <el-tab-pane label="数据结构">
                                            <div class="el-card">
                                                <div class="el-card-body">
                                                    <el-form>
                                                        <el-table :data="apiDetail.virtualResBody" style="width: 100%">
                                                            <el-table-column prop="virtualKey" label="Key">
                                                                <template #default="scope">
                                                                    <el-input  v-model="scope.row.virtualKey" placeholder="key"></el-input>
                                                                </template>
                                                            </el-table-column>
                                                            <el-table-column prop="virtualType" label="数据类型">
                                                                <template #default="scope">
                                                                    <el-select v-model="apiDetail.virtualBodyType" placeholder="Text" style="width: 100px">
                                                                        <el-option
                                                                                v-for="item in virtualResData"
                                                                                :key="item.value"
                                                                                :label="item.label"
                                                                                :value="item.value"
                                                                        >
                                                                        </el-option>
                                                                    </el-select>
                                                                </template>
                                                            </el-table-column>
                                                            <el-table-column prop="virtualValue" label="Value">
                                                                <template #default="scope">
                                                                    <el-input  v-model="scope.row.virtualValue" placeholder="key"></el-input>
                                                                </template>
                                                            </el-table-column>
                                                            <el-table-column prop="virtualExplain" label="说明">
                                                                <template #default="scope">
                                                                    <el-input v-model="scope.row.virtualExplain" placeholder="备注"></el-input>
                                                                </template>
                                                            </el-table-column>
                                                            <el-table-column prop="right" label="操作">
                                                                <template #default="scope">
                                                                                <span>
                                                                                    <el-button @click="addVirtualResponseTableTr">+</el-button>
                                                                                    <el-button v-if="scope.$index!==0" @click="delVirtualResponseTableTr(scope.row,scope.$index)">-</el-button>
                                                                                </span>
                                                                </template>
                                                            </el-table-column>
                                                        </el-table>
                                                    </el-form>
                                                </div>
                                            </div>
                                        </el-tab-pane>
                                        <el-tab-pane label="JSON">
                                            <div class="el-card">
                                                <div class="el-card-body">
                                                    <el-input
                                                            v-model="apiDetail.virtualResBodyJson"
                                                            :autosize="{ minRows: 2, maxRows: 4 }"
                                                            type="textarea"
                                                            placeholder="Please input json"
                                                    >
                                                    </el-input>
                                                </div>
                                            </div>
                                        </el-tab-pane>
                                    </el-tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="预览" name="second">
                    <div id="checkApi" style="width: 100%;height: 100%">
                        <!-- 基本信息-->
                        <div class="baseInfo">
                            <div>
                                <div class="api-info-padding"> <el-icon color="#409EFF"><Menu/></el-icon>基本信息 </div>
                                <div>
                                    <div>
                                        <span>
                                        <!-- 接口名称-->
                                        <div style="float: left;margin-left: 15px">
                                              <el-tag>{{apiDetail.name}}</el-tag>
                                        </div>
                                        <!-- 接口类型-->
                                        <div style="float: left;margin-left: 15px">
                                              <el-tag v-if="apiDetail.method==='POST'" type="success">{{apiDetail.method}}</el-tag>
                                              <el-tag v-if="apiDetail.method==='GET'" type="info">{{apiDetail.method}}</el-tag>
                                        </div>
                                        <!-- 接口状态-->
                                        <div style="float: left;margin-left: 15px">
                                              <el-tag type="warning">{{apiDetail.status}}</el-tag>
                                        </div>
                                    </span>
                                    </div>
                                    <div style="padding-top: 50px;margin-left: 15px">
                                       <span>
                                            <el-descriptions >
                                            <el-descriptions-item label="创建人">{{apiDetail.createBy}}</el-descriptions-item>
                                            <el-descriptions-item label="最后修改人">{{apiDetail.updateBy}}</el-descriptions-item>
                                            <el-descriptions-item label="最后修改时间">{{apiDetail.updateTime}}</el-descriptions-item>
                                            </el-descriptions>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- MOCk-->
                        <div class="mock">
                            <div>
                                <div class="api-info-padding"> <el-icon color="#409EFF"><Menu/></el-icon>MOCK </div>
                                <div>
                                    <div style="margin-left: 15px">
                                       <span>
                                            <el-descriptions >
                                                <el-descriptions-item label="mock地址"></el-descriptions-item>
                                            </el-descriptions>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 请求参数-->
                        <div class="param">
                            <div class="apiInfoTop">
                                <div  class="api-info-padding"> <el-icon color="#409EFF"><Menu/></el-icon>请求参数 </div>
                                <div class="params" style="margin-left: 20px">
                                    <!--//请求参数params-->
                                    <el-table border :row-style="tableRowStyle" row-key="paramKey" :data="apiDetail.reqParams" stripe>
                                        <el-table-column prop="paramKey" label="参数名" width="180" >
                                            <template #default="scope">
                                                <span v-if="scope.row.paramKey!==null">
                                                     {{scope.row.paramKey }}
                                                </span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="paramValue" label="Value" width="180" >
                                            <template #default="scope">
                                                <span v-if="scope.row.paramValue!==null">
                                                     {{scope.row.paramValue }}
                                                </span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="paramExplain" label="说明" >
                                            <template #default="scope">
                                                <span v-if="scope.row.paramExplain!==null">
                                                     {{scope.row.paramExplain }}
                                                </span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                        <!--Body-->
                        <div class="Body" style="padding-top: 20px">
                            <div class="body_check">
                                <div> <el-icon color="#409EFF"><Menu/></el-icon>Body</div>
                                <div style="margin-left: 20px;padding-top: 20px">
                                    <!--body-->
                                    <el-empty description="none" v-if="apiDetail.reqBodyType==='0'"></el-empty>
                                    <el-table :row-style="tableRowStyle" v-if="apiDetail.reqBodyType==='1'" border :data="apiDetail.reqBodyData" stripe style="width: 100%">
                                        <el-table-column prop="dataKey" label="参数名" width="180" />
                                        <el-table-column prop="dataType" label="参数类型" width="180" />
                                        <el-table-column prop="dataValue" label="Value" />
                                        <el-table-column prop="dataExplain" label="说明" />
                                    </el-table>
                                    <el-input
                                            type="textarea"
                                            :autosize="{ minRows: 2, maxRows: 4 }"
                                            v-if="apiDetail.reqBodyType==='2'"
                                            v-model="apiDetail.reqBodyJson"
                                            disabled placeholder="Please input" />
                                </div>
                            </div>
                        </div>
                        <!-- Headers-->
                        <div class="headers">
                            <div class="apiInfoTop">
                                <div  class="api-info-padding"> <el-icon color="#409EFF"><Menu/></el-icon>Headers </div>
                                <div >
                                    <div class="headers_check" style="margin-left: 20px">
                                        <!--请求headers-->
                                        <el-table :row-style="tableRowStyle" border  :data="apiDetail.reqHeader" stripe style="width: 100%">
                                            <el-table-column prop="HeadersKey" label="参数名" width="180" />
                                            <el-table-column prop="HeadersValue" label="Value" width="180" />
                                            <el-table-column prop="HeadersExplain" label="说明" />
                                        </el-table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="运行" name="third">
                    <div class="runApi">
                        <div class="top" style="padding: 20px 0;height: 10%">
                            <span>
                                <el-tag  v-if="apiDetail.method!==''" type="warning">{{apiDetail.method}}</el-tag>
                                <el-tag  v-if="apiDetail.domain!== null" type="warning" style="margin-left: 10px">{{apiDetail.domain}}</el-tag>
                                <el-tag  v-if="apiDetail.path!==''" type="warning" style="margin-left: 10px;width: 50%">{{apiDetail.path}}</el-tag>
                                <el-button @click="sendApi" style="margin-left:10px" type="primary">发送</el-button>
                                <el-button style="width: 100px" v-if="apiDetail.type!==1" type="success" @click="isClose =true">保存为用例</el-button>

                                <el-button v-else style="width: 5%;margin:0 50px" @click="save_api()" type="primary" round>保存</el-button>
                            </span>
                            <!--保存为用例-->
                            <div>
                                <el-dialog v-model="isClose" title="保存用例" width="500px">
                                    <el-input v-model="apiDetail.name"></el-input>
                                    <template #footer>
                                            <span class="dialog-footer">
                                                <el-button @click="isClose = false">取消</el-button>
                                                <el-button type="primary" @click="saveAsCase()">确认</el-button>
                                            </span>
                                    </template>
                                </el-dialog>
                            </div>
                        </div>
                        <div class="body">
                            <apiInfoViewTabs :apiDetail="apiDetail"/>
                        </div>
                        <div ref="runBottom"  class="bottom" style="display: none;padding-top: 20px;">
                            <responseLine :debugResponse="debugResponse"/>
                            <debugApi_response :apiDetail="apiDetail" :debugResponse="debugResponse"/>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="Mock" name="fourth">待开发</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import { Files , Coffee,Menu,Sort,List} from '@element-plus/icons'
    import { ref } from 'vue'
    import request from "../../utils/request";
    import global from '../../global'
    import {reactive, toRefs} from "@vue/reactivity";
    import assertExpectRelation from "../componets/api/assertExpectRelation";
    import responseLine from "../componets/api/responseLine";
    import debugApi_response from "../componets/api/debug/debugApi_response";
    import beforeOperation from "../componets/api/common/beforeOperation";
    import afterOperation from "../componets/api/common/afterOperation";
    import apiInfoViewTabs from "../componets/api/apiInfoViewTabs";
    import interfaceApi from "./interfaceApi";
    import commonUtils from "../../utils/commonUtils";
    export default {
        setup(){
            const state = reactive({
                props: {
                    expandTrigger: 'hover',
                },
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
                apiExec:{
                    "action": [],
                    "dbConfig": "",
                    "name": "",
                    "params": ""
                },
            })
            return {
                ...toRefs(state),
            }
        },
        name: "list",
        inject:["reload"],
        //超过8个字符隐藏后面的
        filters: {
            ellipsis (value) {
                if (!value) return ''
                if (value.length > 8) {
                    return value.slice(0,8) + '...'
                }
                return value
            },
        },
        components:{
            Sort,
            Files,
            Coffee,
            Menu,
            List,
            assertExpectRelation,responseLine,debugApi_response,beforeOperation,afterOperation,apiInfoViewTabs
        },
        data(){
            return{
                currentSourceType:0,
                //debug返回对象
                debugResponse:{
                    rspBodyJson:"",
                    rspHeaders:"",
                    textBody:"",
                    rspStatusCode:404,
                    rspTime:0,
                    rspBodySize:0,
                    rspAsserts:null,
                    rspExtract:null,
                    log:null
                },
                runBottomActive:"response",
                runActive:"Params",
                activeName_total:"first",
                formData_type:"",
                apiDetail:{
                    //是否启用域名
                    "domainSwitch": true,
                    "id": null,
                    //接口名称
                    "name": "",
                    //标签
                    "labels": null,
                    "projectId": null,
                    //分类ID
                    "apiSuiteId": null,
                    //请求方法
                    "method": null,
                    "envId": null,
                    //请求域名信息
                    domain: null,
                    //请求路径
                    "path": "",
                    // '类型 0公共接口  业务流接口'
                    "type": null,
                    "remark": null,
                    //接口状态
                    "status": null,
                    //前置
                    "beforeExec": [{}],
                    //后置
                    "afterExec": [{}],
                    //请求头
                    "reqHeader": [{}],
                    //请求参数
                    "reqParams": [{}],
                    "reqBodyData": [{}],
                    "reqBodyJson": "",
                    //请求体类型(0:none 1:form-data 2: json)
                    "reqBodyType": "0",
                    //参数提取
                    reqExtract: [{
                        dataSource:"bodyJson",
                        extractExpress:"",
                        realType: null,
                        realValue: "",
                        varName: "",
                    }],
                    //接口断言
                    reqAssert: [{
                        dataSource: "bodyJson",
                        extractType: "string",
                        extractExpress: "",
                        expectRelation: "等于",
                        expectValue: "",
                    }],
                    //请求cookies
                    "reqCookies":[{}],
                    "debugRsp": null,
                    "createBy": "system",
                    "createTime": null,
                    "updateBy": "system",
                    "updateTime": null,
                    "virtualResBody":[{}],
                    "virtualResBodyJson":"",
                    "virtualBodyType":""
                },
                reqExtractOptions:[
                    {
                        value: 'bodyJson',
                        label: "响应体(json)"
                    },
                    ],
                reqAssertOptions:[
                    {
                        value: 'bodyJson',
                        label: "响应体(json)"
                    },
                    {
                        value: 'code',
                        label: '响应码',
                    },
                    {
                        value: 'header',
                        label: '响应头',
                    },
                ],
                // 断言方式下拉框
                ApiStatus:[
                    {
                        label:"开发中",
                        value:"开发中"
                    },
                    {
                        label:"已完成",
                        value:"已完成"
                    },
                    {
                        label:"已上线",
                        value:"已上线"
                    },
                    ],
                virtualResDataDefault:"String",
                virtualResData:[
                    {
                        label: 'Json',
                        value: 'Json',
                    },
                    {
                        label: 'String',
                        value: 'String',
                    },
                    {
                        label: 'Array',
                        value: 'Array',
                    },
                    {
                        label: 'List',
                        value: 'List',
                    },
                    {
                        label: 'Integer',
                        value: 'Integer',
                    },
                    {
                        label: "null",
                        value: "null"
                    }
                ],
                virtualResponseTable:[{}],
                reqFormDataSelectDefault:"Text",
                reqFormDataSelect:[
                    {
                        value: 'Text',
                        label: 'text',
                    },
                    {
                        value: 'File',
                        label: 'File',
                    },
                ],
                show_header:false,
                activeName:'apiInfo',
                apiForm:{},
                apiVisible:false,
                search:"",
                categoryForm:{
                    sourceType:0,
                },
                dialogVisible: false,
                visible: ref(false),
                drawer: ref(false),
                filterText: '',
                dataSource: [],
                defaultProps: {
                    children: 'children',
                    label: 'name',
                },
                methodOptions:[
                    {
                        value: 'GET',
                        label: 'GET',
                    },
                    {
                        value: 'POST',
                        label: 'POST',
                    },
                    {
                        value: 'DELETE',
                        label: 'DELETE',
                    },
                    {
                        value: 'PUT',
                        label: 'PUT',
                    },
                ],
                domainOptions:[
                    {
                        domainName:null,
                        domainValue:null
                    }
                ],
                dbOptions:[
                ],
                // 保存为用例弹窗
                isClose:false,
                prtOptions:[]
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val)
            },
        },
        created(){
            this.prtOptionsInit()
            this.load()
        },
        mounted () {
            commonUtils.dragDiv_x("api-box","api-left","api-resize","api-right")
        },
        methods:{
            prtOptionsInit(){
                interfaceApi.projectList(res=>{
                    this.prtOptions = res.data
                })
            },
            bodyTabsClick(data){
                if(data==='0'){
                    this.apiDetail.reqBodyType= data
                }else if (data==='1'){
                    this.apiDetail.reqBodyType= data
                }else if(data==='2'){
                    this.apiDetail.reqBodyType= data
                }

            },
            // 发送单个接口
            sendApi(){
                this.debugResponseInit()
                //保存接口
                for(const data in this.apiDetail.beforeExec){
                    if(this.apiDetail.beforeExec[data].dbConfig instanceof Object){
                        this.apiDetail.beforeExec[data].dbConfig = JSON.stringify(this.apiDetail.beforeExec[data].dbConfig)
                    }
                }
                for(const data in this.apiDetail.afterExec){
                    if(this.apiDetail.afterExec[data].dbConfig instanceof Object){
                        this.apiDetail.afterExec[data].dbConfig = JSON.stringify(this.apiDetail.afterExec[data].dbConfig)
                    }
                }
                request.post("/api/interface/save",JSON.stringify(this.apiDetail)).then(res=>{})
                // 接口请求
                let  envId = localStorage.getItem("envId")
                request.post("/api/interface/debug/"+envId,this.apiDetail).then(res=>{
                    this.debugResponse = res.data
                })
                this.$refs.runBottom.style.setProperty("display" ,"block")
            },
            //保存接口
            save_api(){
                request.post("/api/interface/save",JSON.stringify(this.apiDetail)).then(res=>{
                    commonUtils.toast(res)
                })
            },
            //关闭域名下拉框
            operateDomainSelect(){
                if(this.apiDetail.domainSwitch){
                    this.$refs.apiDomain.style.setProperty("display" ,"inline")
                }else {
                    this.$refs.apiDomain.style.setProperty("display" ,"none")
                    this.apiDetail.domain = ""
                }
            },
            // 虚拟返回体增加一行
            addVirtualResponseTableTr(){
                const list = {
                };
                this.apiDetail.virtualResBody.push(list)
            },
            delVirtualResponseTableTr(row,i){
                if (row) {
                    this.apiDetail.virtualResBody.splice(i, 1)
                    return false
                }
            },
            // fomData增加一行
            addReqFormDataTableTr(){
                const list = {
                };
                this.apiDetail.reqBodyData.push(list)
            },
            delReqFormDataTableTr(row,i){
                if (row) {
                    this.apiDetail.reqBodyData.splice(i, 1)
                    return false
                }
            },
            //cookies 增加一行
            addReqCookiesTr(){
                const list = {
                };
                this.apiDetail.reqCookies.push(list)
            },
            delReqCookiesTr(row,i){
                if (row) {
                    this.apiDetail.reqCookies.splice(i, 1)
                    return false
                }
            },
            //headers增加一行
            addReqHeadersTr(){
                const list = {
                };
                this.apiDetail.reqHeader.push(list)
            },
            delReqHeadersTr(row,i){
                if (row) {
                    this.apiDetail.reqHeader.splice(i, 1)
                    return false
                }
            },
            // 请求参数增加一行
            addReqParamsTr() {
                const list = {
                };
                this.apiDetail.reqParams.push(list);
            },
            delReqParamsTr(row,i) {
                if (row) {
                    this.apiDetail.reqParams.splice(i, 1)
                    return false
                }
            },
            //展开右侧接口详情菜单
            apiInfo(node,data){
                this.apiDetailInit()
                this.$refs.rightDiv.style.setProperty("display" ,"block")
                // 获取接口名称
                request.get("/api/categoryApi/suitDetail/",{params:{suitId:data.id}}).then(res=>{
                    this.apiDetail.name = res.data.name
                    this.apiDetail.method = res.data.method
                })
                //获取接口详情
                request.get("/api/interface/detail/",{params:{"suiteId":data.id}}).then(res=>{
                    let emptyList = [{}]
                    res.data.reqParams = res.data.reqParams==null?emptyList:res.data.reqParams
                    res.data.reqHeader = res.data.reqHeader==null?emptyList:res.data.reqHeader
                    res.data.reqBodyData = res.data.reqBodyData==null?emptyList:res.data.reqBodyData
                    res.data.reqCookies = res.data.reqCookies==null?emptyList:res.data.reqCookies
                    res.data.reqBodyData = res.data.reqBodyData==null?emptyList:res.data.reqBodyData
                    res.data.beforeExec = res.data.beforeExec==null?emptyList:res.data.beforeExec
                    res.data.afterExec = res.data.afterExec==null?emptyList:res.data.afterExec
                    if(res.data.name !== ""){
                        this.apiDetail = res.data
                    }
                    global.set_ApiId(res.data.id)
                    this.apiDetail.id = res.data.id
                    // 获取域名信息
                    let projectId = res.data.projectId
                    let envId = localStorage.getItem("envId")
                    let params = {"envId":envId,"proId":projectId}
                    if (envId!=="undefined"&&projectId!==null){
                        interfaceApi.userProDomain(params,(res)=>{
                            this.apiDetail.domain = res.data
                        })
                    }

                })
                this.apiDetail.apiSuiteId = data.id
                this.operateDomainSelect()
            },
            // 保存接口组件
            saveApiSuite(){
                request.post("/api/categoryApi/save",this.apiForm).then(res=>{
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
                })
                this.apiVisible = false
            },
            //打开新增接口弹窗
            openApiVisible(node,data){
                this.apiVisible = true
                this.apiForm['sourceType'] = 1
                this.apiForm['parentId'] =  data.id
            },
            // 新增文件夹
            createFolder(node,data){
                this.drawer = true
                this.categoryForm["parentId"] = data.id
                console.log(this.categoryForm)
            },
            //删除分类
            categoryRemove(node, data) {
                const parent = node.parent
                const children = parent.data.children || parent.data
                const index = children.findIndex((d) => d.id === data.id)
                children.splice(index, 1)
                this.dataSource = [...this.dataSource]
                this.$refs.rightDiv.style.setProperty("display" ,"none")
                // request.delete("/api/interface/delete/"+data.id).then(res=>{
                // })
                request.delete("/api/categoryApi/delete/"+data.id).then(res=>{
                    this.$message({
                        type:"success",
                        message:"删除成功"
                    })
                    this.load()
                })

            },
            //修改分类 传递数据
            categoryFormEdit(node, data){
                this.categoryForm = JSON.parse(JSON.stringify(data)),
                this.drawer = true
            },
            // 保存修改分类
            saveCategory(){
                if(this.categoryForm.id){
                    request.put("/api/categoryApi/update",this.categoryForm).then(res=>{
                        this.$message({
                            type:"success",
                            message:"更新成功"
                        })
                        this.load() //刷新数据
                        this.drawer = false //关闭弹窗
                    })
                }else {
                    request.post("/api/categoryApi/save",this.categoryForm).then(res=>{
                        commonUtils.toast(res)
                        this.load()
                        this.drawer = false //关闭弹窗
                    })
                }
            },
            // 加载分类数据
            load(){
                let envId = localStorage.getItem("envId");

                request.get("/api/categoryApi/list").then(res=>{
                    this.dataSource = res.data
                })

            },
            //实现前段分类列表动态过滤
            filterNode(value, data) {
                if (!value) return true
                return data.name.indexOf(value) !== -1
            },
            //初始化apiDetail变量
            apiDetailInit(){
                this.apiDetail={
                    "domainSwitch": true,
                    "id": null,
                        //接口名称
                        "name": "",
                        //标签
                        "labels": null,
                        "projectId": null,
                        //分类ID
                        "apiSuiteId": null,
                        //请求方法
                        "method": null,
                        "envId": null,
                        //请求域名信息
                        "domain": "",
                        //请求路径
                        "path": "",
                        // '类型 0公共接口  业务流接口'
                        "type": null,
                        "remark": null,
                        //接口状态
                        "status": null,
                        "beforeExec": [{}],
                        "afterExec": [{}],
                        //请求头
                        "reqHeader": [{}],
                        //请求参数
                        "reqParams": [{}],
                        "reqBodyData": [{}],
                        "reqBodyJson": "",
                        //请求体类型(0:none 1:form-data 2: json)
                        "reqBodyType": 0,
                        "reqExtract": [{}],
                        "reqAssert": [{}],
                        //请求cookies
                        "reqCookies":[{}],
                        "debugRsp": null,
                        "createBy": "system",
                        "createTime": null,
                        "updateBy": "system",
                        "updateTime": null,
                        "virtualResBody":[{}],
                        "virtualResBodyJson":"",
                        "virtualBodyType":""
                }
            },
            debugResponseInit(){
                this.debugResponse ={
                        resBodyJson:"",
                        resHeaders:"",
                        textBody:"",
                        rspStatusCode:404,
                        rspTime:0,
                        rspBodySize:0,
                        rspAsserts:null,
                }
            },
            tableRowStyle ({ row, rowIndex }) {
                let rowStyle = {
                    "font-size" : "14px",
                    "color": "#141415"
                }
                return rowStyle
            },
            // 保存为测试用例
            saveAsCase(){
                this.categoryForm.sourceType = 2
                this.categoryForm.id = null
                this.categoryForm.parentId = this.apiDetail.apiSuiteId
                this.categoryForm.name = this.apiDetail.name
                this.apiDetail.type = 1
                request.post("/api/categoryApi/save",this.categoryForm).then(res=>{
                    this.apiDetail.apiSuiteId = res.data.id
                    this.isClose = false
                    request.post("/api/interface/save",JSON.stringify(this.apiDetail)).then(res=>{
                        if(res.code ==="1"){
                            this.$message({
                                type:"error",
                                message:res.msg
                            })
                        }else {
                            this.$message({
                                type:"success",
                                message:"操作成功"
                            })
                        }
                    })
                })
            }
        },
        };
</script>

<style scoped>
    .api-info-padding{
        padding: 20px 0;
    }
    .el-card {
        border: 1px solid #ebeef5;
        background-color: #fff;
        color: #303133;
        -webkit-transition: .3s;
        transition: .3s;
    }
    .el-card-body{
        padding: 20px;
    }
    .short_show{
        width: 300px;
    }
    .custom-tree-node{
        color: #666666;
    }
    .responseLine{
        color: rgb(19, 206, 102);
        font-weight: bold;
        font-size: 14px
    }
    .responseLineKey{
        color: #303133;
        font-weight: bold;
        font-size: 14px
    }

    #api-box {
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    #api-left{
        position: absolute;
        width: 300px;
        height: 100%;
        left: 0;
        bottom: 0;
        overflow: auto;
    }
    #api-resize{
        cursor: ew-resize;
        position: absolute;
        left: 300px;
        bottom: 0;
        width: 5px;
        height: 100%;
        background: linear-gradient(90deg,#d6d4d4 0,#e9e7e7 50%,#d6d4d4);
    }
    #api-resize:hover{
        background: #64ABF5;
    }
    #api-right{
        position: absolute;
        height: 100%;
        left: 310px;
        right: 0;
        bottom: 0;
        top: 0;
        overflow: auto;
    }

</style>
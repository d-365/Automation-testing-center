<template>
    <div id="layout-one">
        <div id="layout-describe">
            <el-row :gutter="3">
                <slot name="title">
                    <el-col :span="22">
                        <div>描述</div>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary">添加</el-button>
                    </el-col>
                </slot>
                <el-col :span="24">
                    <el-divider/>
                </el-col>
            </el-row>
        </div>
        <div id="layout-fun">
            <slot name="fun">
                <el-row :gutter="3">
                    <el-col :span="5">
                        <div class="fun-item">
                            项目名称: &ensp; <el-input  style="width: 200px" v-model="filterAccount" placeholder="Please input"/>
                        </div>
                    </el-col>
                    <el-col :span="1">
                        <div class="fun-item">
                            <el-button type="primary">查询</el-button>
                        </div>
                    </el-col>
                    <el-col :span="1">
                        <div class="fun-item">
                            <el-button type="warning" @click="">重置</el-button>
                        </div>
                    </el-col>
                </el-row>
            </slot>
        </div>
        <div id="layout-list">
            <slot name="list">
                列表区域
            </slot>
        </div>
        <div id="layout-pag">
            <slot name="page">分页</slot>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
    #layout-one{
        /*width: calc(100vw - 230px);*/
        /*height: calc(100vh - 70px);*/
        margin: 10px 20px 20px 20px;
    }
    #layout-pag{
        position: absolute;
        right: 50%;
        bottom: 10px;
    }
    #layout-list{
        padding-top: 20px;
    }
</style>
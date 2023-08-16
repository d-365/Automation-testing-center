<template>
    <div class="tree-top">
        <el-input v-model="FilterName" placeholder="过滤分类名称"/>
    </div>
    <div class="tree-body">
        <el-tree
                 ref="myFilterTree"
                :data="treeData"
                :props="defaultProps"
                node-key="id"
                :filter-node-method="filterNode"
        >
            <template #default="{ node, data }">
                <div class="tree-node-left"  style="width: 90%">
                    {{data.name}}
                </div>
                <div class="tree-node-right">
                    <slot name="nodeRight" :nodeData="data">

                    </slot>
                </div>
            </template>
        </el-tree>
    </div>
</template>

<script setup>
    import {ref,defineProps,watch,getCurrentInstance,onBeforeMount} from "vue"
    onBeforeMount(()=>{
        const {proxy} = getCurrentInstance()
        watch(()=>FilterName.value,(newVar)=>{
            proxy.$refs.myFilterTree.filter(newVar)
        })
    })
    const props = defineProps({
        treeData:{
            default:[]
        },
        defaultProps:{
            default:{
                children: 'children',
                label: 'name'
            }
        }
    })
    // 树形结构过滤
    const FilterName = ref("")
    const filterNode = (value, data)=> {
        return data.name.includes(value) || value === "";
    }

</script>

<style scoped>
    .tree-top{
        position: absolute;
        top: 0;
        height: 40px;
        right: 0;
        left: 0;
    }
    .tree-body{
        position: absolute;
        top: 40px;
        bottom: 0;
        right: 0;
        left: 0;
    }

</style>
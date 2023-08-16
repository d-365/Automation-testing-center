<template>
    <div>
        <el-tabs class="myTabs" v-model="activePath" type="card" closable @tab-remove="removeTab"  @tab-click="clickTab">
            <el-tab-pane
                    v-for="item in tabsItem"
                    :key="item.url"
                    :label="item.name"
                    :name="item.url"
                    :closable="item.closable"
            >
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup>
    import {reactive, ref,} from 'vue'
    import {useRouter} from 'vue-router'
    // 当前路由
    const router = useRouter();
    // tabs数组
    let tabsItem = ref([
        {
            name: '首页',
            url: '/',
            closable:"false"
        }
    ]);
    // 当前选中活跃的tab
    let activePath = ref('')
    // 删除对应的tab
    const removeTab = (targetName)=>{
        let activeName = activePath.value
        // 当前选中tabs 和 删除一致
        if (targetName===activeName){
            tabsItem.value.forEach((item, index)=>{
                if (item.url === targetName){
                    let nextTab = tabsItem.value[index + 1] || tabsItem.value[index -1]

                    if (nextTab) {
                        activeName = nextTab.url
                    }
                }

            })
        }
        activePath.value = activeName
        tabsItem.value = tabsItem.value.filter(tab=> tab.url !== targetName )
        router.push(activePath.value)
    }
    // 点击对应tab
    const clickTab = ()=>{
        router.push(activePath.value)
    }
    // // 监听路由变化
    router.beforeEach((to,form,next) => {
        let flag = true //判断是否需要新增页面
        tabsItem.value.forEach((item,i)=>{
            if (item.name === to.name  || to.name === undefined){
                 flag = false
            }
        })
        if(flag){
            tabsItem.value.push({
                name: to.name,
                url: to.path,
                closable:true
            })
        }
        activePath.value = to.path
        next()
    });
</script>

<style>
</style>

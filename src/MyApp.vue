<template>
    <div id="myApp">
        <div id="appTop" >
            <Header v-if="showMenu"/>
        </div>
        <div id="appAside">
            <Aside v-if="showMenu"/>
        </div >
        <div id="appBody" >
            <router-view v-if="isRouterAlive"/>
        </div>
        <div id="advertising" >
            <el-rate v-model="rateValue" allow-half />
        </div>
    </div>
</template>

<script >
    import Header from "./components/layout/Header";
    import Aside from "components/layout/AsideAuto";
    import { reactive, toRefs } from 'vue'
    import {useRouter} from "vue-router";
    import SpecialClick from "./special/SpecialClick2"
export default {
        name :"App",
        components:{
            Header, Aside
        },
        setup() {
            // 不需要菜单的路径数组
            const noMenu = ['/user/login',"/loginPlus"]
            const router = useRouter()
            const state = reactive({
                showMenu: true, // 是否需要显示菜单
            })
            // 监听路由的变化
            router.beforeEach((to) => {
                state.showMenu = !noMenu.includes(to.path)
            })
            return {
                ...toRefs(state)
            }
        },
        data(){
            return{
                isRouterAlive:true,
                rateValue:"",
            }
        },
        mounted() {
            window.addEventListener('unload', this.saveState)
        },
        methods:{
           openDark(box) {
            let body = document.body;
            if (box.state == null) {
                box.state = false;
            }
            if (box.state) {
                body.className = "light";
            } else {
                body.className = "dark";
            }
            box.state = !box.state;
                },
            createLoves(){
                this.$refs.background.createLoves(event)
            },
            removeSmallHert(){
                this.$refs.background.removeSmallHert()
            },
            reload(){
                this.isRouterAlive = false
                this.$nextTick(function () {
                    this.isRouterAlive = true
                })
            },
            // table表头样式
            tabStyle(){
                return {background:'#eef1f6',color:'#606266'}
            },
            // table- tr 样式
            tab_row_style(){
                return { "color":"#3d3c3c",'font-size':'12px',"text-align":"center"}
            },
            saveState() {
                sessionStorage.setItem('state', JSON.stringify(this.$store.state))
            },
            // table表头样式
            tableHeaderStyle(){
                return{color:'#333131',font:'12px','text-align': 'center'}
            },
            // 全局toast提示
            toast(res){
                if (res.code === "0"){
                    this.$message({
                        type:"success",
                        message:res.msg
                    })
                }else {
                    this.$message({
                        type:"error",
                        message:res.msg
                    })
                }
            },

            my_toast(code){
                if(code === 1){
                    this.$message({
                        type:"error",
                        message:"操作失败"
                    })

                }else {
                    this.$message({
                        type:"success",
                        message:"操作成功"
                    })
                }
            }

        }
    }
</script>
<style>
    @import "./assets/css/index.css";
    #myApp{
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100vw;
        position: fixed;
        overflow:scroll;
    }
    #appAside{
        position: fixed;
        width: 200px;
        height: 100vh;
        left: 0;
        top: 0;
    }
    #appTop{
        position: absolute;
        left: 200px;
        top: 0;
        width: calc(100vw - 220px);
        height: 50px;
    }
    #appBody{
        position: fixed;
        left: 200px;
        top: 50px;
        right: 10px;
        padding: 5px;
        margin: 15px;
        width: calc(100vw - 230px);
        height: calc(100vh - 70px);
        background-color: #fff;
        border-radius: 15px;
        box-shadow: 0 21px 41px 0 rgba(0, 0, 0, 0.2);
    }
    #advertising{
        position: fixed;
        bottom: 50px;
        right: 20px;
        opacity:0.1;
        width: 120px;
        height: 50px;
        text-align: right;
    }
</style>
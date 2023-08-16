<template>
    <div id="mySide">
        <el-menu
            active-text-color="rgb(64, 158, 255)"
            background-color="rgb(43, 47, 58)"
            text-color="rgb(191, 203, 217)"
            class="myMenu"
            unique-opened="true"
        >
        <div id="mySide-title">
            <router-link to="/">测试平台</router-link>
        </div>
        <div v-for="(item,i) in userMenu">
            <el-sub-menu :index="i">
                <template #title>
                    <el-icon>
                        <Basketball v-if="item.name === '接口自动化' " />
                        <UserFilled v-else-if="item.name === '用户管理' "/>
                        <Setting v-else-if="item.name === '公共管理' "/>
                        <Star v-else-if="item.name === '工具管理' "/>
                        <Location v-else/>
                    </el-icon>
                    <span>{{item.name}}</span>
                </template>
                <el-menu-item  v-for="(child,j) in item.children" :index="child.id" @click="setTabs(child)">
                        <el-icon>
                            <Bicycle v-if="child.name === '接口管理' "/>
                            <User v-else-if="child.name === '用户列表' "/>
                            <Opportunity v-else-if="child.name === '角色管理' "/>
                            <Compass v-else-if="child.name === 'CRM测试工具' "/>
                            <Bicycle v-else/>
                        </el-icon>
                        <span @click="clickMenu(child.url)">{{child.name}}</span>
                </el-menu-item>
            </el-sub-menu>
        </div>
        </el-menu>
    </div>
</template>

<script>
    import { Compass ,Bicycle,Opportunity ,Location,Setting,Basketball,Food,Star,User,UserFilled}  from '@element-plus/icons'
    import request from "../../utils/request";
    import SeleniumPlan from "../../views/WebAuto/seleniumPlan";
    export default {
        name: "asideAuto",
        components:{
            SeleniumPlan,
            Compass,Location,Setting,Basketball,Food,Star,User,UserFilled,
            Bicycle,Opportunity
        },
        created() {
            const uId = localStorage.getItem("userId")
            this.geuUserMenu(uId)
        },
        data(){
            return{
                userMenu:[]
            }
        },
        methods:{
            geuUserMenu(userId){
              if (userId!=null){
                  request.get("/api/user/userRole/"+userId).then(res=>{
                      this.userMenu = res.data
                  })
              }
          },
            //将导航栏信息存储到tabs
            setTabs(data){},
            clickMenu(path){
              this.$router.push(path)
            }
        },
    }
</script>

<style>
    .myMenu{
        background-color: rgb(43, 47, 58);
    }
    #mySide{
        width: 200px;
        height: 100%;
        background-color: rgb(43, 47, 58);
    }
    #mySide-title{
        text-align: center;
        padding: 20px;
        color: white;
    }
    a {
        text-decoration: none;
        color: rgb(191, 203, 217);
    }
    .el-menu-item.is-active {
        background-color: #111111 !important;
    }
    .el-menu-item:hover {
        background-color: #111111;
    }

</style>
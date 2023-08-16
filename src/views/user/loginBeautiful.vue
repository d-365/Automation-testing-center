<template>
    <div id="section">
        <!-- 背景颜色 -->
        <div class="color"></div>
        <div class="color"></div>
        <div class="color"></div>
        <div class="box">
            <!-- 背景圆 -->
            <div class="circle" style="--x:0"></div>
            <div class="circle" style="--x:1"></div>
            <div class="circle" style="--x:2"></div>
            <div class="circle" style="--x:3"></div>
            <div class="circle" style="--x:4"></div>
            <div class="circle" style="--x:5"></div>
            <div class="circle" style="--x:6"></div>
            <!--登录框div-->
            <div class="login-data">
                <!--登录框头部logo部分-->
                <div class="head">
                    <img class="logo" src="https://s.weituibao.com/1582958061265/mlogo.png"  alt="图片无法加载！！！"/>
                </div>
                <!--登录表单-->
                <el-form :model="login_form" class="login-form" ref="ruleForm"  :rules="login_rules" label-position="left">
                    <el-form-item label="账号" prop="account">
                        <el-input @keyup.enter.native="login('ruleForm')" class="input-length" type="text"  v-model="login_form.account" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input @keyup.enter.native="login('ruleForm')" class="input-length" type="password" v-model="login_form.password" clearable show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div style="text-align: center;" class="login-button">
                            <el-button style="width: 150px"  type="primary" @click="login('ruleForm')">立即登录</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import request from "../../utils/request";
    export default {
        name: "login",
        components:{
        },
        data(){
            return{
                login_form:{
                    account:null,
                    password:null,
                },
                login_rules: {
                    account: [
                        {
                            required: true,
                            message: 'Please input account',
                            trigger: 'change',
                        },
                    ],
                    password:[
                        {
                            required: true,
                            message: 'Please input password',
                            trigger: 'change',
                        },
                    ]
                },
            }
        },
        methods:{
            login(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 校验通过
                        request.post("/api/user/login", this.login_form).then((res) => {
                            //这里是判断接口是否请求成功
                            this.$root.toast(res)
                            if (res.code === "0") {
                                const  userInfo = JSON.stringify(res.data)
                                //接口请求成功将token请求头存到vuex，再进行路由跳转
                                localStorage.setItem('userInfo',userInfo);
                                localStorage.setItem('token',res.data.token);
                                localStorage.setItem('userId',res.data.id);
                                localStorage.setItem('envId',res.data.envId);
                                this.loginInfo(res.data.id)
                                //登录成功之后进行页面的跳转，跳转到主页
                                // window.location.href = '/'
                                this.$router.push("/")
                            }
                        });
                    } else {
                        //校验不通过
                        return false
                    }
                })
            },
            loginInfo(userId){
                const payload = {"userId":userId}
                request.post("/api/user/loginInfo",payload).then(res=>{
                    this.$store.commit({
                        type:"setEnvId",
                        envId:res.data.envId
                    })
                    if(res.data.envId!=null){
                        localStorage.setItem('envId',res.data.envId);
                    }
                })

            }
        },
        setup(){}
    }
</script>
<style>

    #section{
        height:100vh;
        width: 100vw;
        background: linear-gradient(#F56C6C,white);
        position: fixed;
        top: 0;
        left: 0;
        overflow: hidden;
    }
    #section .color:nth-child(1){
        top: -350px;
        left: 300px;
        width: 600px;
        height: 600px;
        background: #409EFF;
    }
    #section .color:nth-child(2){
        bottom: 50px;
        right: 100px;
        width: 500px;
        height: 500px;
        background: #E6A23C;
    }
    #section .color:nth-child(3){
        bottom: -150px;
        left: 100px;
        width: 500px;
        height: 500px;
        background: #fffd87;
    }
    #section .color{
        /* 绝对定位 */
        position: absolute;
        filter: blur(200px);;
    }
    .box{
        position: relative;
    }
    .box .circle {
        position: absolute;
        background: #E6A23C;
        /* backdrop-filter属性为一个元素后面区域添加模糊效果 */
        backdrop-filter: blur(5px);
        /* 添加阴影效果*/
        box-shadow: 0 25px 500px rgba(0, 0, 0, 0.1);
        /*改成圆形*/
        border-radius: 50%;
        /*
            使用filter(滤镜) 属性，改变颜色。
            hue-rotate(deg)  给图像应用色相旋转
            calc() 函数用于动态计算长度值
            var() 函数调用自定义的CSS属性值x
        */
        filter: hue-rotate(calc(var(--x) * 70deg));
        /*!* 调用动画animate，需要10s完成动画，*/
        /*linear表示动画从头到尾的速度是相同的，*/
        /*infinite指定动画应该循环播放无限次*!*/
        animation: animate 10s linear infinite;
        /*!* 动态计算动画延迟几秒播放 *!*/
        animation-delay: calc(var(--x) * -1s);
    }
    @keyframes  animate{
        0%, 100% {
            transform: translateY(-100px);
        }
        50% {
            transform: translateY(100px);
        }
    }
    .box .circle:nth-child(1) {
        top: -30px;
        right: -30px;
        width: 100px;
        height: 100px;
    }

    .box .circle:nth-child(2) {
        top: 150px;
        left: -50px;
        width: 120px;
        height: 120px;
        z-index: 2;
    }

    .box .circle:nth-child(3) {
        bottom: 50px;
        right: -30px;
        width: 80px;
        height: 80px;
        z-index: 2;
    }

    .box .circle:nth-child(4) {
        bottom: -50px;
        left: 100px;
        width: 60px;
        height: 60px;
    }

    .box .circle:nth-child(5) {
        top: -20px;
        left: 140px;
        width: 60px;
        height: 60px;
    }
    .box .circle:nth-child(6) {
        bottom: -100vh;
        right: 0;
        width: 60px;
        height: 60px;
    }
    .box .circle:nth-child(7) {
        bottom: -100vh;
        left: 0;
        width: 60px;
        height: 60px;
    }

    .login-data{
        position: absolute;
        top: 10vh;
        left: 40vw;
    }
    .input-length{
        width: 250px;
        margin-left: -10px;
    }
    .login-button{
        margin-left: 20px
    }




</style>
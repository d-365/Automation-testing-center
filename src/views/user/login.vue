<template>
    <div class="myBody">
        <div class="login-body" >
            <!--登录框div-->
            <div class="login-container">
                <!--登录框头部logo部分-->
                <div class="head">
                    <img class="logo" src="https://s.weituibao.com/1582958061265/mlogo.png"  alt="图片无法加载！！！"/>
                    <div class="name">
                        <div class="tips"><b>测试平台</b></div>
                    </div>
                </div>
                <!--登录表单-->
                <el-form :model="login_form" class="login-form" ref="ruleForm"  :rules="login_rules" label-position="left">
                    <el-form-item label="账号" prop="account">
                        <el-input class="input-length" type="text"  v-model="login_form.account" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input class="input-length" type="password" v-model="login_form.password" clearable show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div style="text-align: center;">
                            <el-button style="width: 150px"  type="primary" @click="login('ruleForm')">立即登录</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="other">
            <div class="other-data" >
                <video style="height: 878px;width: 50vw" src="../../video/login.mp4"  playsinline loop autoplay muted></video>
            </div>
        </div>
    </div>
</template>

<script>
    import request from "../../utils/request";
    import global from "../../global";

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
                            if (res.code === "0") {
                                //接口请求成功将token请求头存到vuex，再进行路由跳转
                                localStorage.setItem('account',this.login_form.account);
                                localStorage.setItem('token',res.data.token);
                                localStorage.setItem('userId',res.data.id);
                                localStorage.setItem('envId',res.data.envId);

                                this.loginInfo(res.data.id)

                                //登录成功之后进行页面的跳转，跳转到主页
                                // window.location.href = '/'
                                this.$router.push("/")
                                this.$message({
                                    message: "登录成功",
                                    type: "success",
                                });
                            } else {
                                this.$message({
                                    message:res.msg,
                                    type: "error",
                                });
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
    }
</script>
<style scoped>

    .login-container {
        height: 100%;
        width: 30vw;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 21px 41px 0 rgba(0, 0, 0, 0.2);
    }
    .head {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30vh 0 0 0;
    }
    .head img {
        width: 100px;
        height: 100px;
        margin-right: 20px;
    }
    .head .tips {
        font-size: 12px;
        color: #999;
    }
    .login-form {
        width: 70%;
        margin: 0 auto;
    }
    .myBody {
        margin: 0;
        padding:0;
        height : 97vh ;
        width: 100vw ;
        display:flex;
    }
    .login-body{
        height: 100vh;
        width: 40vw;
        display:flex;
        flex-direction: row;
    }
    .other{
        height: 100vh;
        width: 70vw;
        display:flex;
        position: relative;
        text-align: right;
    }
    .input-length{
       width: 250px;
    }
    .other-data{
        width: 50vw;
        height: 800px;
        right:0;
        position: absolute;
        bottom: 0;
        overflow: hidden;

    }
</style>
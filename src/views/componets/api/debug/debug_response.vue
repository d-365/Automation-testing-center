<template>
    <!--接口调试响应信息页面ResponseHeaders+ResponseBody-->
    <el-collapse v-model="activeName">
        <div>
            <el-collapse-item name="first">
                <template #title>
                    <div  class="myCollapse" >ResponseHeaders</div>
                </template>
                <div v-if="debugResponse!=null">
                    <json-viewer :value="debugResponse.rspHeaders" copyable boxed sort expanded/>
                </div>
            </el-collapse-item>
        </div>
        <div style="padding-top: 10px">
            <el-collapse-item name="second">
                <template #title>
                    <div class="myCollapse">ResponseBody</div>
                </template>
                <div v-if="debugResponse!=null">
                    <div  v-if="debugResponse.rspBodyJson!==''">
                        <json-viewer :value="debugResponse.rspBodyJson" copyable boxed sort expanded/>
                    </div>
                    <div v-else>
                        {{debugResponse.textBody}}
                    </div>
                </div>

            </el-collapse-item>
        </div>
    </el-collapse>
</template>

<script>
    export default {
        name: "debug_response",
        props:{
            debugResponse:{}
        },
        data(){
            return{
                rspHeaders:[{}],
                activeName:["first","second"]
            }
        },
        watch:{
            debugResponse:{
                handle(newVar,oldVar){
                    console.log(newVar)
                },
                deep:true
            }
        }
    }
</script>

<style scoped>
    .myCollapse{
        background-color: #f2f2f2;
        width: 100%;
        height: 33px;
        text-align: left;
        font-size:15px;
        line-height:33px
    }
    /deep/ .jv-code {
        width: 100% !important;
    }
</style>
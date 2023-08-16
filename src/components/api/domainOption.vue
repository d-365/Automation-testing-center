<template>
    <el-select v-model="currentEnvId" placeholder="请选择域名">
        <el-option
                v-for="item in envList"
                :key="item.envInfo.id"
                :label="item.envInfo.envName"
                :value="item.envInfo.id"
        >
        </el-option>
    </el-select>
</template>

<script>
    import request from "../../utils/request";

    export default {
        name: "domainOption",
        props:{
            currentEnvId:{}
        },
        data(){
            return{
                envList:[
                ],
            }
        },
        created() {
            this.load()
        },
        methods:{
            load(){
                request.get("/api/env/envList").then(res=>{
                    this.envList = res.data
                    console.log(this.envList)
                })

            }
        },
        watch:{
            currentEnvId(newVar,oldVar) {
                this.$emit("newEnvId",this.currentEnvId)
            }
        }
    }
</script>

<style scoped>

</style>
export default{
    //接口ID
    apiId:0,
    //环境ID
    currentEnvId:null,
    set_ApiId(apiId){
        this.apiId = apiId;
    },
    set_currentEnv(envId){
        this.currentEnvId = envId
    },
}
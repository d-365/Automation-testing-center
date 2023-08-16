import request from "../../utils/request";

function projectList(callback) {
    request.get("/api/prt/option").then(
        function (res) {
            callback(res)
        }
    )
}

function userProDomain(params,callback) {
    request.get("/api/env/domain",{params:params}).then(
        function (res) {
            callback(res)
        }
    )
}

export default {projectList,userProDomain}
import request from "../../utils/request";

// 查询对应手机号验证码 type 0 QYH
function querySmsCode(payload,callback) {
    request.post("/api/tools/sms/code/query",payload).then(
        function (res) {
            callback(res)
        }
    )
}

// 查询对应手机号验证码 type 0 QYH
function updateSmsCode(payload,callback) {
    request.post("/api/tools/sms/code/update",payload).then(
        function (res) {
            callback(res)
        }
    )
}

export default {querySmsCode,updateSmsCode}
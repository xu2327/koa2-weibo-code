/**
 * @description user controller
 * @author 一抹晨曦
 */

const { getUserInfo } = require('../services/user')
const { SuccessModel,ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo } = require('../model/Errorinfo')
/**
 * 用户名是否存在
 * @param {string} userName  用户名
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // { error: 0, data: {.....} }
        return new SuccessModel(userInfo)
    } else {
        // { error: 10003, message: '用户名未存在 }
        return new ErrorModel(registerUserNameNotExistInfo)

    }
}


module.exports = {
    isExist
}
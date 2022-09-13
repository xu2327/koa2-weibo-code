/**
 * @description user controller
 * @author 一抹晨曦
 */

const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo
} = require('../model/Errorinfo')
const doCrypto = require('../utils/cryp')
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

/**
 * 注册
 * @param {string} userName 用户名
 * @param {number} password 密码
 * @param {string} gender 性别 (1 男，2 女，3 保密)
 */
async function register({ userName, password, gender }) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        // 用户名已存在
        return ErrorModel(registerUserNameExistInfo)
    }

    // 注册 service
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccessModel()
    } catch (ex) {
        console.error(ex.messgae, ex.stack)
        return new ErrorModel(registerFailInfo)
    }
}

/**
 * 登录
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx,userName,password) {
    // 获取用户信息
    const userInfo = await getUserInfo(userName,doCrypto(password))
    if(!userInfo) {
        // 登录失败
        return new ErrorModel(loginFailInfo)
    }

    // 登录成功
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}


module.exports = {
    isExist,
    register,
    login
}
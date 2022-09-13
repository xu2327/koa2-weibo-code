const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')

const { REDIS_CONF } = require('./conf/db')
const { isProd } = require('./utils/env')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')

// ? 引入了一些路由的注册文件 
const index = require('./routes/index')
const userViewRouter = require('./routes/view/user')
const userAPIRouter = require('./routes/api/user')
const errorViewRouter = require('./routes/view/error') 

//* error handler
let onerrorConf = {}
if (isProd) {
    onerrorConf = {
        redirect:'/error'
    }
}

onerror(app,onerrorConf) // ? 这是页面上显示报错信息


// ? 通过AJAX请求，有json或者text数据 可以通过这个解析出来
//* middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json()) // ? 可以把json转变成对象形式
// app.use(logger()) // ? 日志功能
app.use(koaStatic(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// session 配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
    key: 'weibo.sid', // cookie name 默认是 `koa.sid`
    prefix: 'weibo:sess:', // redis key 的前缀，默认是：`koa:sess:`
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 1000, // ms
    },
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))


// ? 注册路由
// routes

app.use(index.routes(), index.allowedMethods())
app.use(userViewRouter.routes(),userViewRouter.allowedMethods())
app.use(userAPIRouter.routes(),userAPIRouter.allowedMethods())
app.use(errorViewRouter.routes(),errorViewRouter.allowedMethods()) //! 404 路由一定要注册到最后面 因为匹配了 *

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)  //  这是打印 error 报错信息
})

module.exports = app

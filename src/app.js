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

// ? 引入了一些路由的注册文件 
const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app) // ? 这是页面上显示报错信息

// ? 通过AJAX请求，有json或者text数据 可以通过这个解析出来
// middlewares
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
app.keys = ['UIsdf_7878#$']
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

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// ? 注册路由
// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)  // ? 这是打印 error 报错信息
})

module.exports = app

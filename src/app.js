const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// ? 引入了一些路由的注册文件 
const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app) // ? 这是页面上显示报错信息

// ? 通过AJAX请求，有json或者text数据 可以通过这个解析出来
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json()) // ? 可以把json转变成对象形式
app.use(logger()) // ? 日志功能
app.use(require('koa-static')(__dirname + '/public')) // ? 把public目录静态化了 可以直接访问

app.use(views(__dirname + '/views', {
  extension: 'ejs'
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
});

module.exports = app

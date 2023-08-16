const path = require('path');//引入path模块
function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    // publicPath:"./",
    outputDir: 'testPlat', //打包输出目录
    assetsDir: './static', //放置生成的静态资源
    indexPath: './index.html',
    // filenameHashing: true, // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
    // lintOnSave: false, //设置是否在开发环境下每次保存代码时都启用 eslint验证
    // productionSourceMap: false,// 打包时不生成.map文件
    // 服务代理, 跨域配置
    devServer: {
        host: 'localhost',
        port: 1996,
        https: false,
        proxy: {                 //设置代理，必须填
            '/api': {              //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
                target: 'http://localhost:1997',     //代理的目标地址
                changeOrigin: true,              //是否设置同源，输入是的
                pathRewrite: {                   //路径重写
                    '^/api': ''
                }
            }
        }
    },
    // 自定义图标
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    },
    chainWebpack:(config)=>{
        config.resolve.alias
            .set('@',resolve('./src'))
            .set('components',resolve('./src/components'))
            .set('views',resolve('./src/views'))
            .set("utils",resolve("./src/utils"))
    }
}

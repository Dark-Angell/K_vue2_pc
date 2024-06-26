/**
 * 配置生产环境参数
 * 
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
let params = process.argv[4]
let baseUrl = ''
switch(params){
    case '--env=test':
        baseUrl = '"http://a.com"'
        break
    case '--env=prod':
        baseUrl= '"http://b.com"'
        break
      default:
        baseUrl = '"http://c.com"'
}
module.exports = merge(prodEnv,{
    NODE_ENV:'"development"',
    baseUrl:baseUrl
})

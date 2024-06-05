/**
 * 配置发布环境参数
 */
'use strict'
var buildType = process.argv.slice(2)[0]
var obj = {
    NODE_ENV:'"production"'
}
switch(buildType){
    case 'prod'://生产
      process.env.srconfig = 'prod'
      obj.srconfig = '"prod"'
      break;
    case 'prod_ip'://生产
      process.env.srconfig = 'prod_ip'
      obj.srconfig = '"prod_ip"'
      break;
    case 'dev'://开发
      process.env.srconfig = 'dev'
      obj.srconfig = '"dev"'
      break;
    case 'uat'://测试
      process.env.srconfig = 'uat'
      obj.srconfig = '"uat"'
      break;
    case 'pre'://预上线
      process.env.srconfig = 'pre'
      obj.srconfig = '"pre"'
      break;
    case 'beta'://外网测试
      process.env.srconfig = 'beta'
      obj.srconfig = '"beta"'
    case 'pre'://预上线
      process.env.srconfig = 'pre'
      obj.srconfig = '"pre"'
      break;
    default://默认开发
      process.env.srconfig = ''
      obj.srconfig = '""'  // 挂载在 process.env 上
      break;
}

module.exports = obj
var baseURL,appId,environment,tpbbLink;
var protocol; //判断是http or https
if(window.location.href.indexOf('https')>-1){
    protocol = 'https://'
}else{
    protocol = 'http://'
}
switch(process.env.srconfig){
    case 'dev'://开发
        baseURL = protocol + 'uattest.com';
        environment = 'test';
        appId = 'wx2d';
        signKey = 'ZYT_Tpp';
    case 'pre'://预上线
        baseURL = protocol + 'pretest.com';
        environment = 'test';
        appId = 'wx2d';
        signKey = 'ZYT_Tpp';
    case 'prod'://生产url
        baseURL = protocol + 'tppension.com';
        environment = 'test';
        appId = 'wx2d';
        signKey = 'ZYT_Tpp'; 
    default://默认开发
        baseURL = protocol + 'uattest.com';
        environment = 'test';
        appId = 'wx2d';
        signKey = 'ZYT_Tpp'; 
}
module.exports = {
    baseURL:baseURL,
    appId: appId,
    environment:  environment,
    signKey: signKey,
    staticURL: staticURL,
}
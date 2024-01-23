# 这是一个伟大的史诗级作品！！！

## 准备工作(Win10系统)

1. 下载node.js
2. `npm install moment --save` + `npm install axios --save` 下载所需要的包axios + moment
3. 执行程序 node index.js 


## 准备移植到云服务器平台，冲冲冲！！！
基本操作差不多，还是按照之前的操作即可。有问题Chatgpt或者Google


### Tip
其中./src/config/config.js文件内容已经删除，具体格式为
```Javascript
const params = {
    appid: '',// 平台ID
    secret: '',// 平台密码
    touser: '',  //自己微信号
    template_id: '',//平台模板ID
}

module.exports = {
    params
}
```

> 参考视频指路： [良心之作](https://www.bilibili.com/video/BV19P4y1Z7ix/)
> 天行数据-[骚话API](https://www.tianapi.com/list/)
> 和风天气-[天气](https://dev.qweather.com/docs/api/weather/weather-now/)
> 微信公众号-[测试地址账号](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login)

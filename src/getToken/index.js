const axios = require('axios');  //请求公众号接口
const moment = require('moment'); //处理时间
const path = require('path'); //处理路径
const fs = require('fs'); //读写处理，文件系统, 路径问题

const getToken = (params) => { // 1.获取token, 2.判断token是否过期，3.过期重新获取，4.未过期直接返回
    return new Promise((resolve, reject) => {
        const tokenFile = path.join(__dirname, 'token.json');
        fs.readFile(tokenFile, 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                if (data) {
                    console.log(data);
                    const token = JSON.parse(data);
                    if (token.expires_in > moment().unix()) {
                        resolve(token.access_token);
                        return;
                    }
                }
            }

            const appid = params.appid;
            const secret = params.secret;

            axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`)
                .then(res => {
                    if (res.data && res.data.errcode) {
                        reject(data);
                        console.log(data);
                        return;
                    }
                    resolve(res.data.access_token);
                    const t = res.data;
                    t.expires_in = t.expires_in + moment().unix() - 1200;    // 1200秒是20分钟，提前20分钟过期
                    fs.writeFile(tokenFile, JSON.stringify(t), function (err) {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                    });
                });
        });
    });
};

module.exports = {
    getToken,
}
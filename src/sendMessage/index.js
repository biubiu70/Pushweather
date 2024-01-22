const axios = require('axios');  //请求公众号接口

const sendMessage = (params) => {
    const {access_token, touser, template_id, data = {} } = params;
    return axios.post(`https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${params.access_token}`,
        {
            touser,
            template_id,
            data,
        })
};

module.exports = {
    sendMessage,
}

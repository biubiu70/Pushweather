const { params } = require('./src/config/config');
const { getToken } = require('./src/getToken/index');
const { sendMessage } = require('./src/sendMessage/index');
const { getDate, getWeather, getLoveWords } = require('./src/utils/index');

let loveDate = 999;

const start = async () => {
    let access_token = await getToken(params);
    let { low, high } = await getWeather();
    let loveWord = await getLoveWords();
    //let date = getDate();

    const data = {
        nowDate: {
            value: getDate(),
            color: '#173177'
        },
        city: {
            value: '大同',
            color: '#173177'
        },
        low: {
            value: low,
            color: '#173177'
        },
        high: {
            value: high,
            color: '#173177'
        },
        loveDate: {
            value: loveDate,
            color: '#173177'
        },
        txt: {
            value: loveWord,
            color: '#173177'
        }

    }
    console.log(data);

    sendMessage({
        access_token,
        ...params,
        data
    })
        .then(res => {
            if (res.data && res.data.errcode) {
                console.log("发送失败1", res.data);
                return;
            }
            else {
                console.log("发送成功 - 请在微信上查看对应的消息");
                loveDate++;
            }

        })
        .catch(err => {
            console.log('发送失败2', err);
        })
}

// setInterval(() => {
//     start();
// }, 1000 * 2);


start();
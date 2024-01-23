const { params } = require('./src/config/config');
const { getToken } = require('./src/getToken/index');
const { sendMessage } = require('./src/sendMessage/index');
const { getDate, getWeather, getLoveWords } = require('./src/utils/index');

let loveDate = 1;

const start = async () => {
    let access_token = await getToken(params);
    let { low, high } = await getWeather();
    let loveWord = await getLoveWords();
    //let date = getDate();

    const data = {
        nowDate: {
            value: getDate(),
        },
        city: {
            value: '合肥',
        },
        low: {
            value: low,
        },
        high: {
            value: high,
        },
        loveDate: {
            value: `${loveDate}`,
        },
        txt: {
            value: loveWord,
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

//start();

function scheduleDailyTask(hour, minute, task) {
    const now = new Date();
    const targetTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hour,
        minute,
        0
    );

    let delay = targetTime.getTime() - now.getTime();
    if (delay < 0) {
        // 如果目标时间已经过去，就计算到第二天的时间
        delay += 24 * 60 * 60 * 1000;
    }

    setTimeout(() => {
        task();
        // 设置下一次任务的执行时间，确保每天在指定的时分执行一次给定的任务
        scheduleDailyTask(hour, minute, task);
    }, delay);
}

// 设置每天 20:41 执行 start() 函数
scheduleDailyTask(21, 22, start);
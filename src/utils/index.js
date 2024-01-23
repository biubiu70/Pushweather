const axios = require('axios');

//处理星期几
const formaWeek = (week) => {
    switch (week) {
        case 0:
            return '星期日';
            break;
        case 1:
            return '星期一';
            break;
        case 2:
            return '星期二';
            break;
        case 3:
            return '星期三';
            break;
        case 4:
            return '星期四';
            break;
        case 5:
            return '星期五';
            break;
        case 6:
            return '星期六';
            break;
        default:
            break;
    }
}

//1. 获取时间
const getDate = () => {
    //xxxx年xx月xx日 星期几
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const week = new Date().getDay();

    //    console.log(year, month, day, week);
    return `是${year}年${month}月${day}日 ${formaWeek(week)}`;
}

//console.log(getDate());

//2. 获取天气
const getWeather = () => {
    return new Promise((resolve, reject) => {
    axios.get('https://devapi.qweather.com/v7/weather/now?location=101220101&key=68e3928a1a0041bd97bc312374d990ae')
        .then(res => {
            const { data } = res;
            resolve({
                low: data.now.feelsLike,
                high: data.now.temp,
            })
        })
        .catch(err => {
            reject(err);
        })
    })
}

//3. 获取每日一句
const getLoveWords = () => {
    return new Promise((resolve, reject) => {
        axios.get('https://apis.tianapi.com/saylove/index?key=1b0f7f84960e2896fdf55637d4b01b8f')
            .then(res => {
                const { data: {result} } = res;
                resolve(result.content);
                //console.log(result.content);
            })
            .catch(err => {
                reject(err);
            })
    })
}

module.exports = {
    getDate,
    getWeather,
    getLoveWords,
}



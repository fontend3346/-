/* 
  毫秒转为正常格式时间过滤器 
  编写过滤器传入需要的时间格式，例如：yyyy-MM-dd hh:mm:ss或者yyyy年MM月dd日
  注意：月MM必须大写，目的为了区分月与分，其他都为小写
  时间格式定义：
    参数为0格式：yyyy-MM-dd hh:mm:ss 
    参数为1格式：yyyy-MM-dd 
    参数为2格式：hh:mm:ss 
    参数为3格式：yyyy年MM月dd日 hh时mm分ss秒
    参数为4格式：yyyy年MM月dd日 
    参数为5格式：hh时mm分ss秒
    参数为6格式：yyyy年MM月 
    参数为7格式：yyyy
    参数为8格式：yyyy/MM/dd 
*/

let formatDate = (dateParams: Date, fmt: any) => {
  let date = new Date(dateParams);

  if (fmt == 0) {
    fmt = "yyyy-MM-dd hh:mm:ss";
  } else if (fmt == 1) {
    fmt = "yyyy-MM-dd";
  } else if (fmt == 2) {
    fmt = "hh:mm:ss";
  } else if (fmt == 3) {
    fmt = "yyyy年MM月dd日 hh时mm分ss秒";
  } else if (fmt == 4) {
    fmt = "yyyy年MM月dd日";
  } else if (fmt == 5) {
    fmt = "hh时mm分ss秒";
  } else if (fmt == 6) {
    fmt = "yyyy年MM月";
  } else if (fmt == 7) {
    fmt = "yyyy";
  } else if (fmt == 8) {
    fmt = "yyyy/MM/dd";
  } else if (fmt == 9) {
    fmt = "hh:mm";
  } else if (fmt == 10) {
    fmt = "MM-dd hh:mm";
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
};

/* 一位数两位数转换 */
let padLeftZero = (str: string) => {
  return ("00" + str).substr(str.length);
};

/* 获取当前时间戳 */
const getUnix = () => {
  let date = new Date();
  return date.getTime();
};

/* 获取今天0点0分0秒的时间戳 */
const getTodayUnix = () => {
  let date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
};

/* 获取今年1月1日0点0分0秒的时间戳 */
const getYearUnix = () => {
  let date = new Date();
  date.setMonth(0);
  date.setDate(1);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
};

/* 获取标准年月日 */
const getLastDate = (time: string) => {
  let date = new Date(parseInt(time));
  let month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return date.getFullYear() + "/" + month + "/" + day;
};

/* 
  获取发送消息时间过滤器
  还用过滤器就可以实现转换
*/

const getFormatTime = (timestamp: string) => {
  let time = Number(timestamp);
  let now = getUnix(); //当前时间戳
  let today = getTodayUnix(); //今天0点时间戳
  let year = getYearUnix(); //今年0点时间戳
  let timer = (now - time) / 1000; // 转换为秒级时间戳
  let tip = "";

  if (timer <= 0) {
    tip = "刚刚";
  } else if (Math.floor(timer / 60) <= 0) {
    tip = "刚刚";
  } else if (timer < 3600) {
    tip = Math.floor(timer / 60) + "分钟前";
  } else if (timer >= 3600 && time - today >= 0) {
    tip = Math.floor(timer / 3600) + "小时前";
  } else if (timer / 86400 <= 31) {
    tip = Math.ceil(timer / 86400) + "天前";
  } else {
    tip = getLastDate(timestamp);
  }
  return tip;
};

/* 获取周（星期） */
const getWeek = (date: number) => {
  let datelist = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  let weekDay = datelist[new Date(date).getDay()];
  return weekDay;
};

//电话号校验
const checkoutPhoneNum = (phoneNum: string) => {
  if (/^1[0-9]{7,11}$/.test(phoneNum)) {
    return true;
  } else {
    return false;
  }
};

//单位邮编校验
const checkoutZipCode = (zipCode: string) => {
  if (/^[0-9]{6}$/.test(zipCode)) {
    return true;
  } else {
    return false;
  }
};

//单位传真校验
const checkoutFax = (fax: string) => {
  if (/^[0-9]{7}$/.test(fax)) {
    return true;
  } else {
    return false;
  }
};

const compareObject = (obj1: object, obj2: object) => {
  //Object.getOwnPropertyNames():方法返回一个指定对象所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
  //对象内置属性方法:Object.keys()；该方法返回一个数组，数组内包括对象内可枚举属性以及方法名称。数组中属性名的排列顺序和使用 for...in 遍历该对象时返回的顺序一致。
  let attrs1 = Object.keys(obj1);
  let attrs2 = Object.keys(obj2);
  if (attrs1.length != attrs2.length) {
    return false;
  }
  for (let j = 0; j < attrs1.length; j++) {
    let attrNames = attrs1[j];
    if (obj1[attrNames] != obj2[attrNames]) {
      return false;
    }
  }
  return true;
};
//时间段 val代表小时 如 1 代表一小时 返回开始时间戳，结束时间戳
const timeStream = (val: number) => {
  let today = new Date().getTime();
  let startTime = today - val * 60 * 60 * 1000;
  let endTime = today;
  let timeArr = [startTime, endTime];
  return timeArr;
};

//全屏
const screenFullEnter = () => {
  const doc: any = document.documentElement;
  if (doc.requestFullscreen) {
    doc.requestFullscreen();
  }
  //FireFox
  else if (doc.mozRequestFullScreen) {
    doc.mozRequestFullScreen();
  }
  //Chrome等
  else if (doc.webkitRequestFullScreen) {
    doc.webkitRequestFullScreen();
  }
  //IE11
  else if (doc.msRequestFullscreen) {
    doc.msRequestFullscreen();
  }
};
//退出全屏
const screenFullOut = () => {
  if (!checkFull()) {
    const doc: any = document;
    // 是全屏就退出全屏
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      (doc as any).mozCancelFullScreen();
    } else if (doc.webkitCancelFullScreen) {
      doc.webkitCancelFullScreen();
    }
  }
};
// 优化： 全屏状态下，无法监听ESC按键事件，通过监听全屏事件来改变全屏状态
const checkFull = () => {
  const doc: any = document.documentElement;
  if (doc.fullscreenElement) {
    return true;
  } else {
    return false;
  }
};

//优监控全屏状况
const voidFull = (state: boolean, data: boolean) => {
  void [
    "fullscreenchange",
    "webkitfullscreenchange",
    "mozfullscreenchange",
  ].forEach((item) => {
    window.addEventListener(item, () => {
      state = data;
    });
  });
};

// 年月日时分秒转时间戳
const changeTime = (time: any) => {
  if (time !== null) {
    let s = Date.parse("1970-01-01 " + time) / 1000;
    return s;
  }
};

// 时间戳转时分秒
const timeChange = (data: any) => {
  let date = new Date(data * 1000);
  let hh =
    date.getHours() < 10 ? "0" + date.getHours() + ":" : date.getHours() + ":";
  let mm =
    date.getMinutes() < 10
      ? "0" + date.getMinutes() + ":"
      : date.getMinutes() + ":";
  let ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return hh + mm + ss;
};

// 年月日时分秒转时间戳
const getTimeFormat = (timeS: any) => {
  let time = new Date(timeS).getTime() / 1000; //除1000 是变成秒级的时间戳 不除就是毫秒级
  return time;
};

// 时间戳转年月日时分秒
const timestampToTime = (cjsj: any) => {
  //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var date = new Date(cjsj * 1000);
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  var h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  var m =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
};
/* 时间戳转时分秒 */
const timeToNormalTime = (timestamp: any) => {
  let hh = parseInt(timestamp / 3600);
  if (hh < 10) {
    hh = "0" + hh;
  }
  var mm = parseInt((timestamp - hh * 3600) / 60);
  if (mm < 10) {
    mm = "0" + mm;
  }
  var ss = parseInt((timestamp - hh * 3600) % 60);
  if (ss < 10) {
    ss = "0" + ss;
  }
  var time = hh + ":" + mm + ":" + ss;
  if (timestamp > 0) {
    return time;
  } else {
    return "00:00:00";
  }
};

/* 請求防抖 */
//time标识存放容器
let isTime: any = "";
const ajaxDebounce = (fn: any, time: any) => {
  if (isTime) {
    clearTimeout(isTime);
  }
  return (isTime = setTimeout(async () => {
    await fn();
  }, time));
};

// base64转换成formdata
function base64ToBlob(base64) {
  var arr = base64.split(",");
  var mime = arr[0].match(/:(.*?);/)[1];
  var bytes = atob(arr[1]); //对用base64编码过的二进制进行解码
  var n = bytes.length;
  var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bytes.charCodeAt(n); //将编码转换成Unicode编码
  } // 转成blob //return new Blob([u8arr], {type: mime})
  var formdata = new FormData();
  formdata.append("file", new Blob([u8arr], { type: mime }));
  // upLoadFile(formdata);
  console.log(
    formdata,
    new Blob([u8arr], { type: mime }),
    formdata.file,
    "formdata"
  );

  debugger;
  return formdata;
}

//随机生成颜色
const getRandomColor = (num: any) => {
  let randColor;
  if (num) {
    randColor = ((num * 0xffffff) << 0).toString(16);
  } else {
    randColor = ((Math.random() * 0xffffff) << 0).toString(16);
  }

  while (randColor.length < 6) {
    randColor = "0" + randColor;
  }
  return "#" + randColor;
};

// 匹配输入的值为字母、数字、-、_
const isValid = (str: string) => {
  let regex = /^[a-zA-Z0-9_-]+$/;
  let result = regex.test(str);
  return result;
}
/**
 * @description: 调整颜色更亮更暗
 * @param {string} color 六位十六禁止颜色
 * @param {number} range 正负数决定颜色更改
 * @return {string} new color
 */
const adjustColor = (color, range) => {
  let newColor = "#";
  for (let i = 0; i < 3; i++) {
    const hxStr = color.substr(i * 2 + 1, 2);
    let val = parseInt(hxStr, 16);
    val += range;
    if (val < 0) val = 0;
    else if (val > 255) val = 255;
    newColor += val.toString(16).padStart(2, "0");
  }
  return newColor;
};
export default {
  formatDate,
  getFormatTime,
  getWeek,
  checkoutPhoneNum,
  checkoutZipCode,
  checkoutFax,
  compareObject,
  timeStream,
  screenFullEnter,
  screenFullOut,
  checkFull,
  voidFull,
  changeTime,
  timeChange,
  getTimeFormat,
  timestampToTime,
  timeToNormalTime,
  ajaxDebounce,
  base64ToBlob,
  getRandomColor,
  adjustColor,
  isValid
};

// module.exports = {
//   formatDate,
//   getFormatTime,
//   getWeek,
//   checkoutPhoneNum,
//   checkoutZipCode
// }

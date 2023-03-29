
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8",
        "last 20 versions", // 所有主流浏览器最近10版本用
      ],
      grid: true,
    },
    'postcss-pxtorem': {
      rootValue: 16,
      // propList: ['*', '!padding', '!border'], // 除 border 外所有px 转 rem
      propList: ['*'],
      // selectorBlackList: ['.el-'], // 过滤掉.am-开头的class，不进行rem转换
      exclude: /node_modules/i, // 排除 node_modules 文件(node_modules 内文件禁止转换)
      // replace: true, // 转换成 rem 以后，不保留原来的 px 单位属性
      // mediaQuery: true, // 允许在媒体查询中转换px。
      minPixelValue: 2, //px小于12的不会被转换

    }
  }
}




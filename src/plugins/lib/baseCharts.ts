import * as echarts from 'echarts';


class baseCharts {
  options: any;
  myChart: any;
  constructor(dom: any) {
    // this.options = extend(Object.create(defaultOption), options)
    this.myChart = this.init(dom)
  }
  //初始化图表
  init(dom) {
    let myCharts
    if (dom) {
      if (true) {
        echarts.dispose(dom);
      }
    }
    myCharts = echarts.init(dom)
    myCharts.resize({
      width: dom.clientWidth,
      height: dom.clientHeight
    })
    return myCharts;
  }
  // 渲染数据
  setOption(options) {
    let defaultOption = {
      xAxis: {
        type: 'category',
        data: [],
        splitLine: { show: false }, //不显示网格线
        // 字体颜色
        axisLine: {
          show: true,
          lineStyle: {
            color: "#fff",
            width: 1,
            type: "solid"
          }
        },
      },
      yAxis: {
        type: 'value',
        nameTextStyle: {//y轴上方单位的颜色
          color: '#fff'
        },
        splitLine: { show: false }, //不显示网格线
        axisLabel: {//y轴文字的配置
          textStyle: {
            color: "#fff",
            margin: 0
          },
          // formatter: '{value} %'//y轴的每一个刻度值后面加上‘%’号
        },
        // 字体颜色
        axisLine: {
          show: true,
          lineStyle: {
            color: "#fff",
            width: 1,
            type: "solid"
          }
        },
      },
      series: [
        {
          data: [],
          type: 'line'
        }
      ]
    };
    let optionData = extend(defaultOption, options)
    this.myChart.setOption(optionData)
  }
}
function extend(dest, src) {
  for (const i in src) {
    if (dest[i] instanceof Object) {
      extend(dest[i], src[i]);
    } else {
      dest[i] = src[i];
    }
  }
  return dest;
}
export default baseCharts;
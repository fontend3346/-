
<template>
  <!-- 图表 -->
  <div class="echart-box">
    <div class="echart">
      <!--图表标题-->
      <span>地震发送情况</span>
      <!--图表内容-->
      <div id="main" style="width: 290px; height: 200px" ></div>
      <!-- <el-dialog title="组件传值的问题" v-model="props.showData">{{showData}}</el-dialog> -->
    </div>
  </div>
</template>
<script lang="ts">
import {ref,inject,onMounted,getCurrentInstance} from 'vue';
import { color } from 'echarts';
export default {
  name: 'data_page',
  props:{
    //showData:Boolean,
    seriesData:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  setup (props) {
    console.log(props.seriesData)
    const { proxy } = getCurrentInstance()//用proxy代替vue2中的this
    console.log(proxy)
    const trafficData = ref({})
    const seriesData=ref(Array)
    //console.log(proxy.seriesData)
    const echarts = inject('echarts')
    onMounted(() => {
      console.log(props.seriesData)
      const myChart = echarts.init(document.getElementById('main'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '数据量',
          textStyle: { // 设置颜色
          color: 'white'
          }
        },
        //鼠标经过时的气泡说明
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',

          }
        },

        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        //X轴
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true,
              // show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: 'white',  //更改坐标轴文字颜色
                fontSize : 10      //更改坐标轴文字大小
              }
            },
          }
        ],
        //Y轴
        yAxis: [
          {
            type: 'value',
            data: ['0.2', '0.4', '0.6', '0.8', '1.0'],
            splitLine:{
              show:false//Y轴背景线
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#b7b7b8',  //更改坐标轴文字颜色
                fontSize : 10     //更改坐标轴文字大小
              }
            },
          }
        ],
        series: props.seriesData,
        // [
        //   {
        //     name: '直接访问',
        //     type: 'line',
        //     barWidth: '60%',
        //     //折线的高度
        //     data: [300, 344, 310,330, 250, 450, 200,300,400,160,390, 90],
        //     showSymbol: false,
        //     itemStyle: {
        //       normal: {
        //           lineStyle: {
        //               color: '#11ebf3' //折线颜色
        //           }
        //       }
        //     },
        //   }
        // ]
      })
      window.onresize = function () {
        myChart.resize()
      }
    })
    return {
      props
    }
  }
}
</script>
<style scoped lang="less">
.echart-box{
  margin-top: 20px;
  position: fixed;
  right: 20px;
  //background-color: #08204c;
  background-color: rgba(8, 32, 76,0.6);
  height: 400px;
  width: 300px;
  color: white;
  //box-shadow: 2px 3px 20px -9px rgb(138, 209, 247,0.8);
  //border: 0.5px solid rgb(138, 209, 247,0.9);
  padding: 10px;
  //font-size: 10px;
}
</style>


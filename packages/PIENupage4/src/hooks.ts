import { Emits, Props } from './interfaces'
import { reactive, onMounted, ref, watch } from 'vue'
import baseCharts from "@/plugins/lib/baseCharts";
// 操作
export const useHandler = (props: Props, emit: Emits) => {
  // 点击事件
  const onClick = (e: MouseEvent) => {
    emit('click', e)
  }

  const option2 = {
    xAxis: {
      type: 'category',
      data: ['机1', '机2', '机3']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [
          {
            value: 10,
            itemStyle: {
              color: '#00aadd'
            }
          },
          {
            value: 20,
            itemStyle: {
              color: '#a90000'
            }
          },
          {
            value: 30,
            itemStyle: {
              color: '#00aadd'
            }
          },
        ],
        type: 'bar',
        barWidth: 20,//柱图宽度

      }
    ]
  };
  const option1 = {
    // title: {
    //   text: 'Referer of a Website',
    //   subtext: 'Fake Data',
    //   left: 'center'
    // },
    tooltip: {
      trigger: 'item'
    },
    // legend: {
    //   orient: 'vertical',
    //   left: 'left'
    // },
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        radius: ['30%', '50%'],
        color: ['#feb513', '#30ca40', '#a147eb'],
        data: [
          { value: 1048, name: '已占有' },
          { value: 735, name: '剩余' },

        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  onMounted(() => {

  })
  return { onClick, option2, option1 }
}

import { onMounted, reactive, watch } from 'vue'
import { Emits, Props } from './interfaces'
import { ref } from "vue";

// 操作
export const useHandler = (props: Props, emit: Emits) => {

  const state: any = reactive({
    headerList: [
      {
        label: "文件"
      },
      {
        label: "编辑"
      },
      {
        label: "震相"
      },
      {
        label: "编目"
      },
      {
        label: "数据分析"
      },
    ],
    dateRange: [],
    radioSelect: false,
    waveP: false,
    waveS: false,
    checkPointer: ['N', 'E', 'Z'],
    times: "6",
    typePlot: ' ',
    typePlotOptions: [
      {
        label: 'P',
        value: 'P'
      },
      {
        label: 'Pg',
        value: 'Pg'
      },
      {
        label: 'Pn',
        value: 'Pn'
      },
      {
        label: 'Pb',
        value: 'Pb'
      },
      {
        label: 'PmP',
        value: 'PmP'
      },
      {
        label: 'S',
        value: 'S'
      },
      {
        label: 'Sg',
        value: 'Sg'
      },
      {
        label: 'Sn',
        value: 'Sn'
      },
      {
        label: 'Sb',
        value: 'Sb'
      },
    ]
  })
  // 点击顶部导航栏
  const headerClick = (val: any) => {
    emit('headerClick', val);
  }
  // 通道改变事件
  const passageChange = (val: any) => {
    emit('passageChange', val);
  };
  // 波向改变事件
  const handleChangeWave = (val: any) => {
    emit('handleChangeWave', val);
  };
  // 时间改变事件
  const timeChange = (val: any) => {
    state.dateRange = val;
    emit('timeChange', val);
  };
  // 震幅改变事件
  const directionChange = (val: any) => {
    emit('directionChange', val);
  };
  // 震相选择事件
  const checkboxChange = (val: any) => {
    state.radioSelect = val;
    emit('checkboxChange', val);
  };
  // p/s波点击事件
  const wavePClick = (waveType: string) => {
    emit('wavePClick', waveType);
  };
  // 南北指针改变事件
  const checkChange = (val: any) => {
    state.checkPointer = val;
    emit('checkPointer', val);
  }
  // 标注波形
  const typePlotChange = (val: any) => {
    state.typePlot = val;
    emit('typePlotChange', val);
  }
  watch(() => props.waveP, (newVal: any) => {
    state.waveP = newVal;
  });
  watch(() => props.waveS, (newVal: any) => {
    state.waveS = newVal;
  });
  return {
    state,
    passageChange,
    handleChangeWave,
    timeChange,
    directionChange,
    checkboxChange,
    wavePClick,
    checkChange,
    typePlotChange,
    headerClick
  };
}

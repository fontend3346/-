<template>
  <div class="sample-management-admin">
    <!-- 1-2 事件管理 -->
    <div class="header-left-content">
      <div class="left-content-justify">
        <div class="left-content-item">
          <span class="left-name">事件名称</span>
          <el-input
            v-model="state.fitData"
            clearable
            placeholder="请输入事件名称"
          ></el-input>
        </div>
        <div class="left-content-item">
          <span class="left-name">事件类型</span>
          <el-select
            v-model="equipmentVal"
            clearable
            placeholder="请选择事件类型"
            @change="equipmentChange"
            filterable
          >
            <el-option
              v-for="(item, index) in state.equipmentArr"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="left-content-justify">
        <div class="left-content-item"></div>
        <div class="left-content-items">
          <button @click="searchClick">查询</button>
          <!-- <button @click="addMaintain">批量删除</button> -->
        </div>
      </div>
    </div>

    <div class="pie-tb-iscontent">
      <!-- 表格 -->
      <PIETable
        :data="state.linkageData"
        :columns="state.linkageColumns"
        :isAction="true"
        :showCheckbox="true"
        :showIndex="true"
        :deleteBtn="true"
        :lookBtn="true"
        @confirmDelete="confirmDelete"
        @on-selection-change="onSelectionChange"
        @look="lookWave"
        :header-cell-style="{
          background: 'rgba(95, 152, 255, 0.1)',
          fontSize: '16px',
          height: '50px',
          fontWeight: '200',
          letterSpacing: '3px',
        }"
        :cell-style="{
          background: 'transparent',
          fontSize: '15px',
          height: '50px',
          fontWeight: '200',
          color: '#D7D7D9',
          letterSpacing: '2px',
        }"
        :row-style="{
          borderBottom: '1px solid #13598C',
          background: 'transparent',
        }"
      >
      </PIETable>
    </div>
    <!--  -->
    <div class="pie-tb-footer">
      <PIEPage
        :total="state.total"
        :pageSize="state.pageSize"
        :currentPage="state.pageNum"
        @handleSizeChange="pageSizeChange"
        @handleNumChange="pageChange"
      ></PIEPage>
    </div>
    <!-- 波形展示 -->
    <PIEModal
      v-model:visible="state.lookEcharts"
      :title="state.title"
      width="60"
      height="60"
      :cancelBtn="false"
      :confirmBtn="false"
    >
      <template #operateItem>
        <div class="modal-wrapper">
          <div class="warn-grade" ref="warnGrade"></div>
        </div>
      </template>
    </PIEModal>
  </div>
</template>

<script lang="ts" setup>
import http from "@/api/index";
// import md5 from "js-md5";
import { ElMessage } from "element-plus";
import {
  reactive,
  toRefs,
  onMounted,
  getCurrentInstance,
  nextTick,
  ref,
} from "vue";
import { useRouter } from "vue-router";
import * as echarts from "echarts";
let equipmentVal = ref(""); //设备类型
const router = useRouter();
const {
  appContext: {
    config: { globalProperties },
  },
} = getCurrentInstance() as any;
//echarts图
let warnGrade = ref(""); //
let facilityId = ref(null); //设备id
let waveOptions: any = reactive({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      animation: false,
      // transitionDuration: 0, //[defaule:0.4] echart防止tooltip的抖动
      label: {
        backgroundColor: "#1891FF",
        color: "#98dcff",
      },
    },
  },
  color: "#1891FF",
  grid: {
    left: "3%",
    right: "8%",
    bottom: "10%",
    top: "16%",
    containLabel: true,
  },
  lineStyle: {
    width: 4,
  },
  areaStyle: {},
  xAxis: {
    type: "category",
    //刻度线
    axisTick: false,
    data: [],
    name: "时间",
    nameTextStyle: {
      padding: [0, 0, 200, 0], // 上右下左与原位置距离
      color: "#98dcff",
    },
    axisLine: {
      show: true,
      onZero: false, //不在y轴的零刻度线
      lineStyle: {
        color: "#98dcff",
      },
    },
    axisLabel: {
      show: false,
      textStyle: {
        color: "#98dcff",
      },
    },
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: "value",
    // name: "数量",
    // nameLocation: "left",
    nameTextStyle: {
      // padding: [0, 0, 80, -10], // 上右下左与原位置距离
      color: "#98dcff",
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "#98dcff",
      },
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "#98dcff",
      },
    },
    splitNumber: 10,
    splitLine: {
      show: false,
    },
  },
  series: [
    {
      type: "line",
      data: [],
      name: "",
      symbol: "none",
      itemStyle: {
        normal: {
          label: {
            show: false, // 在折线拐点上显示数据
          },
          lineStyle: {
            width: 5, // 设置虚线宽度
            type: "solid", // 虚线'dotted' 实线'solid'
          },
        },
      },
    },
  ],
  dataZoom: {
    // 放大和缩放
    type: "inside",
  },
});
const state = reactive({
  fitData: "", //样本名称
  sampleName: "",
  title: "波形展示",
  linkageData: [],
  lookEcharts: false,
  equipmentArr: [
    {
      value: "1",
      label: "地震波",
    },
    {
      value: "2",
      label: "电磁波",
    },
  ],
  linkageColumns: [
    {
      prop: "name",
      label: "事件名称",
    },
    {
      prop: "type",
      label: "事件类型",
    },
    {
      prop: "startTime",
      label: "开始时间",
    },

    {
      prop: "endTime",
      label: "结束时间",
    },
    {
      prop: "description",
      label: "描述",
    },
  ],
  total: 0, //总条数
  pageSize: 10, //分页尺寸
  pageNum: 1, //当前页
});
let showEcharts = ref(false);
//选择设备类型下拉框
const equipmentChange = () => {
  equipmentVal.value = equipmentVal.value;
};

// 切换页码
const pageChange = (i: any) => {
  state.pageNum = i;
  queryWaveTable();
};
// 分页大小
const pageSizeChange = (i: any) => {
  state.pageSize = i;
  queryWaveTable();
};
const sampleList: any = reactive({
  list: [],
});
// 确认删除
const confirmDelete = (row: any) => {
  state.sampleName = row.name;
  sampleList.list = state.sampleName.split();
  deleteData(row);
};
//删除数据接口
const deleteData = (data: any) => {
  let params = {
    id: data.id,
  };
  http.stationsInfoManage.deleteData(params).then((res: any) => {
    if (res.code == 0) {
      ElMessage.success("删除成功");
      queryWaveTable();
    } else {
      ElMessage.error(res.message);
    }
  });
};
//查看
const lookWave = (data: any) => {
  let params = {
    streamId: data.streamCode, //设备编号  30
    // startTime: "2023-01-09 15:00:00",
    // startTime: utils.formatDate(new Date().getTime() - 30000, 0),
    // endTime: "2023-01-09 15:30:00",
    // endTime: utils.formatDate(new Date().getTime(), 0),
  };
  http.stationsInfoManage.searchStreamID(params).then((res: any) => {
    if (res.code == 0) {
      state.lookEcharts = true;
      waveOptions.series[0].data = res.data.waveFormData;
      waveOptions.xAxis.data = res.data.waveFormSaveTime;
      echarts.init(warnGrade.value).setOption(waveOptions);
    } else {
      ElMessage.error(res.message);
    }
  });
};
onMounted(() => {
  queryWaveTable();
});
//查询波形样本列表
const queryWaveTable = () => {
  let params = {
    name: state.fitData,
    waveType: equipmentVal.value,
    deviceId: 1,
    pageNum: state.pageNum,
    pageSize: state.pageSize,
  };
  http.stationsInfoManage.searchWaveTable(params).then((res: any) => {
    if (res.code == 0) {
      state.linkageData = res.data.list;
      state.linkageData.map((item: any) => {
        if (item.waveType == 1) {
          item.type = "地震波";
        } else if (item.waveType == 2) {
          item.type = "电磁波";
        }
      });
      state.total = res.data.total;
    } else {
      ElMessage.error(res.message);
    }
  });
};
//根据样本名查询波形样本数据接口
//点击查看后回显
const lookEcharts = (row: any) => {};
//批量删除数据接口
const deleteWave = () => {
  let params = {
    list: sampleList.list,
  };

  http.stationsInfoManage.deleteWave(params).then((res: any) => {
    if (res.code == 0) {
      ElMessage.success("删除成功");
    } else {
      ElMessage.error(res.message);
    }
  });
};
//查询按钮
const searchClick = () => {
  queryWaveTable();
};
</script>

<style lang="less" scoped>
.sample-management-admin {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: @global-padding;
  box-sizing: border-box;
  padding-left: 20px;
  padding-top: 20px;
  // background-color:#121e51;
  .header-left-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    // justify-content: space-between;
    align-items: center;
    justify-content: space-between;
    .left-content-justify {
      display: flex;
      .left-content-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        // width: 24%;
        justify-content: flex-end;
        margin-right: @input-margin;
        .left-name {
          display: inline-block;
          // width: 90px;
          font-size: @main-font-size;
          color: @main-font-color;
          padding-right: @title-padding;
        }
        .left-name-time {
          padding-left: 2px;
          display: inline-block;
          font-size: @main-font-size;
          color: @main-font-color;
          padding-right: @title-padding;
        }
        :deep(.el-input) {
          width: @input-width;
          background: transparent;
          border-radius: 5px;
          border: 1px solid @global-border-color;
          height: 40px;
          color: @main-font-color;
        }
        :deep(.el-input__wrapper) {
          height: 40px;
          width: @input-width;
        }
        :deep(.el-date-editor) {
          width: 300px;
          height: 40px;
        }
      }
      .left-content-items {
        margin-bottom: 10px;
      }

      button {
        padding: 10px 20px;
        box-sizing: border-box;
        background: transparent;
        margin-left: 10px;
        color: @main-font-color;
        border: 1px solid @global-header-bbg;
        cursor: pointer;
        border-radius: 5px;
      }
    }
  }
  .pie-tb-iscontent {
    margin-top: 10px;
  }
  //新增
  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    .edit {
      width: 100%;
      height: 40px;
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      // align-items: center;
    }
    .modal-label-name {
      display: inline-block;
      width: 100px;
      margin-right: 10px;
      color: @main-font-color;
      font-size: @main-font-size;
    }
    .el-input,
    .el-textarea {
      width: 300px;
      background: transparent;
      border-radius: 5px;
      border: 1px solid @global-border-color;
      color: @main-font-color;
    }
    .el-input {
      height: 40px;
    }
    :deep(.el-input__wrapper) {
      height: 40px;
      width: 300px;
    }
    :deep(.el-textarea__inner) {
      background: transparent;
      color: @main-font-color;
    }
    :deep(.el-select) {
      width: 300px;
    }
  }
}
.modal-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .warn-grade {
    width: 1080px;
    height: 600px;
  }
}
</style>

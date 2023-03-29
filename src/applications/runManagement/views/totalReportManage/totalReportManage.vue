<template>
  <div class="mechanism-admin">
    <div v-show="state.statisticsShow == true" class="statistics-show">
      <!-- 2-3 统计报表管理 -->
      <div class="header-left-content">
        <div class="left-content-item">
          <span class="left-name">站点</span>
          <el-select
            :popper-append-to-body="false"
            clearable
            filterable
            v-model="state.station"
            placeholder="请选择"
          >
            <el-option
              v-for="item in state.stationArry"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              class="select-item"
            ></el-option>
          </el-select>
        </div>
        <div class="left-content-item">
          <span class="left-name">值班人</span>
          <el-input
            v-model="state.watchPer"
            placeholder="请输入"
            clearable
          ></el-input>
        </div>
        <div class="left-content-item">
          <span class="left-name-time">值班时间</span>
          <el-date-picker
            v-model="state.watchTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :popper-append-to-body="false"
          >
          </el-date-picker>
        </div>

        <div class="left-content-item">
          <span class="left-name">突发事件类型</span>
          <el-select
            :popper-append-to-body="false"
            clearable
            filterable
            v-model="state.eventType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in state.eventTypeArray"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="left-content-item">
          <span class="left-name">是否归档</span>
          <el-select
            :popper-append-to-body="false"
            clearable
            filterable
            v-model="state.isFile"
            placeholder="请选择"
          >
            <el-option
              v-for="item in state.isFileArray"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="left-content-item">
          <span class="left-name">预警级别</span>
          <el-select
            :popper-append-to-body="false"
            clearable
            filterable
            v-model="state.warnGrade"
            placeholder="请选择"
          >
            <el-option
              v-for="item in state.warnGradeArray"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="left-content-item">
          <span class="left-name">预警状态</span>
          <el-select
            :popper-append-to-body="false"
            clearable
            filterable
            v-model="state.gradeStatus"
            placeholder="请选择"
          >
            <el-option
              v-for="item in state.gradeStatusArray"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="left-content-item">
          <span class="left-name">预警信息类型</span>
          <el-select
            :popper-append-to-body="false"
            clearable
            filterable
            v-model="state.warnInfoType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in state.warnInfoArray"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="left-content-items">
          <button @click="reportCreate">报表生成</button>
          <button @click="reportDerived">报表导出</button>
          <button @click="reportAnalyze">报表分析</button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="pie-tb-iscontent">
        <PIETable
          :maxHeight="510"
          :data="state.linkageData"
          :columns="state.linkageColumns"
          :isAction="true"
          :deleteBtn="true"
          :editBtn="true"
          :showIndex="true"
          @edit="update"
          @confirmDelete="confirmDelete"
          @onSelectAll="onSelectAll"
          @select="select"
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
      <!-- 分页 -->
      <div class="pie-tb-footer">
        <PIEPage
          :total="state.total"
          :pageSize="state.pageSize"
          :currentPage="state.pageNum"
          @handleSizeChange="sizeChange"
          @handleNumChange="pageChange"
        ></PIEPage>
      </div>
    </div>
    <div v-show="state.statisticsShow == false" class="statistics-show">
      <reportAnalyse @backStatistics="backStatistics"></reportAnalyse>
    </div>
    <!-- 新建弹窗 -->
    <PIEModal
      :title="state.title"
      v-model:visible="state.showAdd"
      :resetBtn="false"
      width="30"
      height="50"
      @cancel="cancel"
      @confirm="confirm(ruleForm)"
      class="add-modal"
    >
      <template #operateItem>
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">台站名称:</span>
            <el-input v-model="modifyData.fullName"></el-input>
          </div>

          <div class="modal-content">
            <span class="modal-label-name">运管单位:</span>
            <el-input v-model="modifyData.shortName"></el-input>
          </div>

          <div class="modal-content">
            <span class="modal-label-name">管理方式:</span>
            <el-input v-model="modifyData.fullName"></el-input>
          </div>

          <div class="modal-content">
            <span class="modal-label-name">台站性质:</span>
            <el-input v-model="modifyData.address"></el-input>
          </div>

          <div class="modal-content">
            <span class="modal-label-name">台站类型:</span>
            <el-input v-model="modifyData.postalCode"></el-input>
          </div>

          <div class="modal-content">
            <span class="modal-label-name">台站岩性</span>
            <el-input v-model="modifyData.description"></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">经度</span>
            <el-input v-model="modifyData.description"></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">纬度</span>
            <el-input v-model="modifyData.description"></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">高程</span>
            <el-input v-model="modifyData.description"></el-input>
          </div>
        </div>
      </template>
    </PIEModal>
    <!-- 修改弹窗 -->
    <PIEModal
      :title="state.title"
      v-model:visible="state.showModify"
      width="30"
      height="50"
      @cancel="cancel"
      @confirm="modifyConfirm(modifyData)"
      class="modify-modal"
    >
      <template #operateItem>
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">台站名称:</span>
            <el-input v-model="modifyData.fullName"></el-input>
          </div>

          <div class="modal-content">
            <span class="modal-label-name">运管单位:</span>
            <el-input v-model="modifyData.shortName"></el-input>
          </div>

          <div class="modal-content">
            <span class="modal-label-name">管理方式:</span>
            <el-input v-model="modifyData.fullName"></el-input>
          </div>

          <div class="modal-content">
            <span class="modal-label-name">台站性质:</span>
            <el-input v-model="modifyData.address"></el-input>
          </div>

          <div class="modal-content">
            <span class="modal-label-name">台站类型:</span>
            <el-input v-model="modifyData.postalCode"></el-input>
          </div>

          <div class="modal-content">
            <span class="modal-label-name">台站岩性</span>
            <el-input v-model="modifyData.description"></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">经度</span>
            <el-input v-model="modifyData.description"></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">纬度</span>
            <el-input v-model="modifyData.description"></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">高程</span>
            <el-input v-model="modifyData.description"></el-input>
          </div>
        </div>
      </template>
    </PIEModal>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import reportAnalyse from "./reportAnalyse.vue";
const router = useRouter();
const {
  appContext: {
    config: { globalProperties },
  },
} = getCurrentInstance() as any;
const state = reactive({
  statisticsShow: true, //列表显隐
  station: "", //站点
  stationArry: [
    { label: "测试", value: "0" },
    { label: "测试2", value: "1" },
  ], //站点
  watchPer: "", //值班人
  watchTime: [], //值班时间
  eventType: "", //突发事件类型
  eventTypeArray: [
    { label: "是", value: "0" },
    { label: "否", value: "1" },
  ],
  isFile: "", //是否归档
  isFileArray: [
    { label: "是", value: "0" },
    { label: "否", value: "1" },
  ],
  warnInfoType: "", //预警信息类型
  warnInfoArray: [
    { label: "是", value: "0" },
    { label: "否", value: "1" },
  ],
  warnGrade: "", //预警级别
  warnGradeArray: [
    { label: "一级", value: "0" },
    { label: "二级", value: "1" },
  ],
  gradeStatus: "",
  gradeStatusArray: [
    { label: "完成", value: "0" },
    { label: "警告", value: "1" },
  ],
  total: 10, //总条数
  pageSize: 10, //分页尺寸
  pageNum: 1, //当前页
  title: "新增",
  showAdd: false, //新增弹框
  showModify: false, //修改弹框
  linkageColumns: [
    {
      prop: "stationName",
      label: "预警信息名称",
    },
    {
      prop: "runCompany",
      label: "预警信息类型",
    },

    {
      prop: "manageWay",
      label: "预警级别",
    },
    {
      prop: "stationQuality",
      label: "登记人员",
    },

    {
      prop: "stationType",
      label: "填写时间",
    },
    {
      prop: "content",
      label: "内容",
    },
    {
      prop: "stationPro",
      label: "内容",
    },
    {
      prop: "latitude",
      label: "状态",
    },
  ], // table栏

  linkageData: [
    {
      stationName: "有断电风险",
      runCompany: "供电设备",
      manageWay: "一类",
      stationQuality: "张三",
      stationType: "2022-12-1",
      content: "2022-12-1",
      stationPro: "未发布",
      latitude: 39.76,
    },
  ], // table数据
});
// 虚拟数据
const ruleForm = reactive({
  address: "", //详细地址
  cityCode: "", //城市code码
  countryCode: "", //城市code码
  description: "", //备注
  fullName: "", //机构全名
  postalCode: "", //邮编
  provinceCode: "", //省份码
  regionCode: "", //源码
  shortName: "", //机构简称
  newLyadded: "", //添加数据
});
// 修改数据
const modifyData = reactive({
  teamId: "", //id
  address: "", //地址
  cityCode: "", //城市coed
  countryCode: "", //城市coed
  description: "", //备注
  fullName: "", //机构全名
  postalCode: "", //邮编
  provinceCode: "", //省份码
  regionCode: "", //源码
  shortName: "", //机构简称
  modifyArray: [], //修改数据
});

onMounted(() => {
  getList();
});
// 取消弹出框
const cancel = () => {
  state.showAdd = false;
  state.showModify = false;
};
// 新增配置
const addConfig = () => {
  state.title = "新增";
  state.showModify = false;
  state.showAdd = true;
  //问题
  // state.ruleForm.provinceCode = null;
  // state.ruleForm.fullName = null;
  // state.ruleForm.shortName = null;
  // state.ruleForm.address = null;
  // state.ruleForm.newLyadded = null;
  // state.ruleForm.description = null;
  // state.ruleForm.postalCode = null;
};
// 请求机构数据
const getList = () => {
  let params = {
    pageNum: state.pageNum,
    pageSize: state.pageSize,
  };
};
// 修改提交表单
const modifyConfirm = () => {};
//  新增提交表单
const confirm = (f: any) => {};
//修改任务
const update = (row: any) => {
  state.title = "修改";
  state.showModify = true;
  // state.modifyData.teamId = row.row.teamId;
  // state.modifyData.address = row.row.address;
  // state.modifyData.fullName = row.row.fullName;
  // state.modifyData.shortName = row.row.shortName;
  // state.modifyData.description = row.row.description;
  // state.modifyData.postalCode = row.row.postalCode;
  // state.modifyData.provinceCode = row.row.provinceCode;
  // state.modifyData.regionCode = row.row.regionCode;
  // state.modifyData.cityCode = row.row.cityCode;
};
// 删除
const confirmDelete = (row: any) => {};
const onSelectAll = (row: any) => {};
const select = (row: any) => {};

// 报表生成
const reportCreate = () => {};
// 报表导出
const reportDerived = () => {};
// // 报表分析
const reportAnalyze = () => {
  state.statisticsShow = false;
};
// 返回
const backStatistics = () => {
  state.statisticsShow = true;
};
// 切换页
const pageChange = (pageNum: any) => {
  state.pageNum = pageNum;
  getList();
};
//分页大小
const sizeChange = (pageSize: any) => {
  state.pageSize = pageSize;
  getList();
};
</script>

<style lang="less" scoped>
.mechanism-admin {
  width: 100%;
  height: 100%;
  .statistics-show {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
  }
  .header-left-content {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    .left-content-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      width: 24%;

      justify-content: flex-end;
      .left-name {
        display: inline-block;
        // width: 90px;
        font-size: @main-font-size;
        color: @main-font-color;
        padding-right: @title-padding;
      }
      .left-name-time {
        padding-left: 32px;
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
        width: @input-width;
        .el-input__inner {
          background: #fff !important;
        }
      }
      :deep(.el-date-editor) {
        width: @input-width;
        height: 40px;
      }
    }
    .left-content-items {
      display: flex;
      align-items: center;
      // margin: 10px 0;
      // margin-top: 10px;
      margin-bottom: 10px;
      width: 100%;
      justify-content: flex-end;
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

  //新增
  .modal-content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    .modal-label-name {
      display: inline-block;
      width: 100px;
      color: @main-font-color;
      font-size: @main-font-size;
    }
    .el-input,
    .el-textarea {
      width: 300px;
      background: transparent;
      border-radius: 5px;
      border: 1px solid @global-border-color;
      // height: 35px;
      color: @main-font-color;
    }
    :deep(.el-textarea__inner) {
      background: transparent;
      color: @main-font-color;
    }
    :deep(.el-cascader) {
      width: 300px;
    }
  }
  .pie-tb-iscontent {
    margin-top: 10px;
  }
}
</style>

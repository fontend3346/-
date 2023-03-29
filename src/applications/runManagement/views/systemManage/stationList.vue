<template>
  <div class="mechanism-admin">
    <!-- 1-1 站点信息管理 -->
    <div class="header-left-content">
      <div class="left-content-item">
        <span class="left-name">国家级</span>
        <el-select
          :popper-append-to-body="false"
          clearable
          v-model="state.overseas"
          placeholder="请选择国家级"
          class="style-select"
          @change="foreignChang"
        >
          <el-option
            v-for="item in state.localList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            class="select-item"
          ></el-option>
        </el-select>
      </div>
      <div class="left-content-item">
        <span class="left-name">省级</span>
        <el-select
          :popper-append-to-body="false"
          clearable
          filterable
          v-model="state.selectNetwork"
          placeholder="请选择省级"
          class="style-select"
          @change="networkChange"
        >
          <el-option
            v-for="item in state.selectNetList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            class="select-item"
          ></el-option>
        </el-select>
      </div>
      <div class="left-content-item">
        <span class="left-name">台阵</span>
        <el-select
          :popper-append-to-body="false"
          clearable
          filterable
          v-model="state.stationArray"
          placeholder="请选择"
          class="style-select"
        >
          <el-option
            v-for="item in state.stationArrayList"
            :key="item.id"
            :label="item.typeName"
            :value="item.id"
            class="select-item"
          ></el-option>
        </el-select>
      </div>
      <div class="left-content-item">
        <span class="left-name">台站名称</span>
        <el-input
          v-model="state.fitData"
          placeholder="请输入"
          clearable
        ></el-input>
      </div>
      <div class="btn">
        <button @click="search">查询</button>
        <button @click="addConfig">新增</button>
        <!-- <button @click="backConfig">切换地图</button> -->
      </div>
    </div>
    <!-- -->
    <div class="pie-tb-iscontent">
      <PIETable
        :maxHeight="510"
        :data="state.linkageData"
        :columns="state.linkageColumns"
        :isAction="true"
        :editBtnIcon="true"
        :deleteBtnIcon="true"
        :showIndex="true"
        :detailBtnIcon="true"
        @edit="update"
        @confirmDelete="confirmDelete"
        @detail="detail"
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
          color: '@main-font-color',
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
        @handleSizeChange="sizeChange"
        @handleNumChange="pageChange"
      ></PIEPage>
    </div>
    <!-- 新建弹窗 -->
    <PIEModal
      :title="state.title"
      v-model:visible="state.showAdd"
      :resetBtn="false"
      width="55"
      height="35"
      @cancel="cancel"
      @confirm="confirm"
      class="add-modal"
    >
      <template #operateItem>
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">台站名称</span>
            <el-input v-model="ruleForm.stationName"></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">台站编码</span>
            <el-input v-model="ruleForm.stationCode"></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">经度:</span>
            <el-input v-model="ruleForm.longitude"></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">纬度:</span>
            <el-input v-model="ruleForm.latitude"></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">高程:</span>
            <el-input v-model="ruleForm.elevation"></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">台网</span>
            <el-select
              :popper-append-to-body="false"
              clearable
              v-model="ruleForm.unit"
              placeholder="请选择台网"
              class="style-select"
              @change="networkChange"
            >
              <el-option
                v-for="item in state.selectNetList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                class="select-item"
              ></el-option>
            </el-select>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">台阵</span>
            <el-select
              :popper-append-to-body="false"
              clearable
              v-model="ruleForm.stationType"
              placeholder="请选择台阵"
              class="style-select"
            >
              <el-option
                v-for="item in state.stationArrayList"
                :key="item.id"
                :label="item.typeName"
                :value="item.id"
                class="select-item"
              ></el-option>
            </el-select>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">台站级别</span>
            <el-select
              :popper-append-to-body="false"
              clearable
              v-model="ruleForm.stationProperty"
              placeholder="请选择台站级别"
              class="style-select"
            >
              <el-option
                v-for="item in ruleForm.stationPropertyList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                class="select-item"
              ></el-option>
            </el-select>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">详细信息</span>
            <el-input v-model="ruleForm.stationAddress"></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">管理方式</span>
            <el-select
              :popper-append-to-body="false"
              clearable
              v-model="ruleForm.supervisorMode"
              placeholder="请选择管理方式"
              class="style-select"
            >
              <el-option
                v-for="item in ruleForm.supervisorModeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                class="select-item"
              ></el-option>
            </el-select>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">台站岩性</span>
            <el-input v-model="ruleForm.stationLithology"></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">是否境内外</span>
            <el-radio-group v-model="ruleForm.overseas" class="ml-4">
              <el-radio label="0" size="large">境内</el-radio>
              <el-radio label="1" size="large">境外</el-radio>
            </el-radio-group>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">描述</span>
            <el-input v-model="ruleForm.description"></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">开启检测</span>
            <el-radio-group v-model="ruleForm.testStatus" class="ml-4">
              <el-radio label="0" size="large">开启</el-radio>
              <el-radio label="1" size="large">关闭</el-radio>
            </el-radio-group>
          </div>
        </div>
      </template>
    </PIEModal>
    <!-- 修改弹窗 -->
    <PIEModal
      :title="state.title"
      v-model:visible="state.showModify"
      :resetBtn="false"
      width="55"
      height="35"
      @cancel="cancel"
      @confirm="updatConfirm"
      class="add-modal"
    >
      <template #operateItem>
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">台站名称</span>
            <el-input v-model="updateForm.stationName"></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">台站编码</span>
            <el-input v-model="updateForm.stationCode"></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">经度:</span>
            <el-input v-model="updateForm.longitude"></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">纬度:</span>
            <el-input v-model="updateForm.latitude"></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">高程:</span>
            <el-input v-model="updateForm.elevation"></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">台网</span>
            <el-select
              :popper-append-to-body="false"
              clearable
              v-model="updateForm.unit"
              placeholder="请选择台网"
              class="style-select"
              @change="networkChange"
            >
              <el-option
                v-for="item in state.selectNetList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                class="select-item"
              ></el-option>
            </el-select>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">台阵</span>
            <el-select
              :popper-append-to-body="false"
              clearable
              v-model="updateForm.stationType"
              placeholder="请选择台阵"
              class="style-select"
            >
              <el-option
                v-for="item in state.stationArrayList"
                :key="item.id"
                :label="item.typeName"
                :value="item.id"
                class="select-item"
              ></el-option>
            </el-select>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">台站级别</span>
            <el-select
              :popper-append-to-body="false"
              clearable
              v-model="updateForm.stationProperty"
              placeholder="请选择台站级别"
              class="style-select"
            >
              <el-option
                v-for="item in updateForm.stationPropertyList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                class="select-item"
              ></el-option>
            </el-select>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">详细信息</span>
            <el-input v-model="updateForm.stationAddress"></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">管理方式</span>
            <el-select
              :popper-append-to-body="false"
              clearable
              v-model="updateForm.supervisorMode"
              placeholder="请选择管理方式"
              class="style-select"
            >
              <el-option
                v-for="item in updateForm.supervisorModeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
                class="select-item"
              ></el-option>
            </el-select>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">台站岩性</span>
            <el-input v-model="updateForm.stationLithology"></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">是否境内外</span>
            <el-radio-group v-model="updateForm.overseas" class="ml-4">
              <el-radio label="0" size="large">境内</el-radio>
              <el-radio label="1" size="large">境外</el-radio>
            </el-radio-group>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">描述</span>
            <el-input v-model="updateForm.description"></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">开启检测</span>
            <el-radio-group v-model="updateForm.testStatus" class="ml-4">
              <el-radio label="0" size="large">开启</el-radio>
              <el-radio label="1" size="large">关闭</el-radio>
            </el-radio-group>
          </div>
        </div>
      </template>
    </PIEModal>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, getCurrentInstance, defineEmits } from "vue";
import { ElMessage } from "element-plus";
import http from "@/api/index";
const {
  appContext: {
    config: { globalProperties },
  },
} = getCurrentInstance() as any;
const emit = defineEmits<{
  (event: "backConfig", e: MouseEvent): void;
  (event: "detail", e: MouseEvent): void;
}>();
// 返回
const backConfig = () => {
  emit("backConfig");
};
// 详情按钮
const detail = (row: any) => {
  emit("detail", row);
};
const state = reactive({
  fitData: "", //单位名称
  overseas: "", // 境内外
  localList: [], // 国家级
  selectNetwork: "", // 台网
  selectNetList: [], // 台网列表
  stationArray: "", //台阵
  stationArrayList: [], //台阵列表

  newLableArr: [], //获取新增城市的lable
  modifyLableArr: [], //获取修改城市的lable
  selectionList: [], //批量数据
  teamIdArray: [], //批量删除数据

  total: 10, //总条数
  pageSize: 10, //分页尺寸
  pageNum: 1, //当前页
  title: "新增",
  showAdd: false, //新增弹框
  showModify: false, //修改弹框
  // 虚拟select列表
  label: [],
  // cityList: cityList.cityList, //所有城市数据
  // 联动设备table栏
  linkageColumns: [
    {
      prop: "stationName",
      label: "台站名称",
    },
    {
      prop: "stationCode",
      label: "编码",
    },
    {
      prop: "unitName",
      label: "台网",
    },
    {
      prop: "stationTypeName",
      label: "台阵",
    },

    {
      prop: "supervisorModes",
      label: "管理方式",
    },
    {
      prop: "stationPropertys",
      label: "台站性质",
    },

    // {
    //   prop: "stationType",
    //   label: "台站类型",
    // },
    // {
    //   prop: "stationPro",
    //   label: "台站岩性",
    // },
    {
      prop: "latitude",
      label: "纬度(ON)",
    },
    {
      prop: "longitude",
      label: "经度(E)",
    },
    {
      prop: "elevation",
      label: "高程(M)",
    },
    // {
    //   prop: "elevation",
    //   label: "观测手段",
    // },
  ],
  // 联动设备数据
  linkageData: [],

  updateId: "", //更新id
});
// 新增数据
const ruleForm = reactive({
  stationName: "", //台站名称
  stationCode: "", //台站编码
  longitude: "", //经度
  latitude: "", //纬度
  elevation: "", //高程
  unit: "", //台网（下拉框）
  unitList: [], //台网数据
  stationAddress: "", //详细地址
  stationProperty: "", //台站级别（下拉框）
  stationPropertyList: [
    {
      id: 1,
      name: "地方台",
    },
    {
      id: 2,
      name: "区域台",
    },
    {
      id: 3,
      name: "国家台",
    },
  ], //台站级别（下拉框）
  supervisorMode: "", //管理方式（下拉框）
  supervisorModeList: [
    {
      id: 1,
      name: "无人值守",
    },
    {
      id: 2,
      name: "有人值守",
    },
  ], //管理方式（下拉框）
  stationLithology: "", //：台站岩性
  overseas: "0", //：是否境内
  description: "", //：描述
  stationType: "", //：台阵（下拉框）
  stationArrayList: [], //：台阵（下拉框）
  testStatus: "0", //开启检测
});
// 修改数据
const updateForm = reactive({
  stationName: "", //台站名称
  stationCode: "", //台站编码
  longitude: "", //经度
  latitude: "", //纬度
  elevation: "", //高程
  unit: "", //台网（下拉框）
  unitList: [], //台网数据
  stationAddress: "", //详细地址
  stationProperty: "", //台站级别（下拉框）
  stationPropertyList: [
    {
      id: 1,
      name: "地方台",
    },
    {
      id: 2,
      name: "区域台",
    },
    {
      id: 3,
      name: "国家台",
    },
  ], //台站级别（下拉框）
  supervisorMode: "", //管理方式（下拉框）
  supervisorModeList: [
    {
      id: 1,
      name: "无人值守",
    },
    {
      id: 2,
      name: "有人值守",
    },
  ], //管理方式（下拉框）
  stationLithology: "", //：台站岩性
  overseas: "0", //：是否境内
  description: "", //：描述
  stationType: "", //：台阵（下拉框）
  stationArrayList: [], //：台阵（下拉框）
  testStatus: "0", //开启检测
});

onMounted(() => {
  getUnitList(); //获取省级列表
  getTaiwanese(); //获取台阵列表
  getCountry(); //获取国家级列表
  getList();
});
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

// 取消弹出框
const cancel = () => {
  state.showAdd = false;
  state.showModify = false;
};
//选择国家级
const foreignChang = (val: any) => {
  state.selectNetwork = ""; //省级
  state.stationArray = ""; //台阵
  state.fitData = ""; //台站名称
  getUnitList(); //点击国家级查询省级
  // 点击省级查询台阵
  let data = {
    unitId: state.selectNetwork ? state.selectNetwork : val,
  };
  provinceTaiwanese(data);
};
//选择省级
const networkChange = (val: any) => {
  state.stationArray = ""; //台阵
  state.fitData = ""; //台站名称
  // 点击省级查询台阵
  let params = {
    unitId: state.selectNetwork ? state.selectNetwork : state.overseas, //省级
  };
  provinceTaiwanese(params);
};

// 获取省级列表
const getUnitList = () => {
  let selectNetwork: any;
  if (state.overseas) {
    selectNetwork = state.overseas;
  } else {
    selectNetwork = 32;
  }
  let params = {
    parentId: selectNetwork,
  };
  http.stationsInfoManage.getCountry(params).then((res: any) => {
    if (res.code == 0) {
      state.selectNetList = res.data;
    } else {
      ElMessage.error(res.message);
    }
  });
};
// 获取台阵列表
const getTaiwanese = () => {
  let data = {
    unitId: "",
  };
  provinceTaiwanese(data);
};
// 台阵api
const provinceTaiwanese = (data: any) => {
  http.stationsInfoManage.getTaiwanese(data).then((res: any) => {
    if (res.code == 0) {
      state.stationArrayList = res.data;
    } else {
      ElMessage({
        message: res.message,
        type: "error",
      });
    }
  });
};
// 获取国家级
const getCountry = () => {
  let params = {
    parentId: 0,
  };
  http.stationsInfoManage.getCountry(params).then((res: any) => {
    if (res.code == 0) {
      state.localList = res.data;
    } else {
      ElMessage.error(res.message);
    }
  });
};
// 请求机构数据
const getList = () => {
  let params = {
    // overseas: state.overseas, //境内外
    unit: state.selectNetwork ? state.selectNetwork : state.overseas, //台网
    stationType: state.stationArray, //台阵
    stationName: state.fitData, //台站名称
    pageNum: state.pageNum,
    pageSize: state.pageSize,
  };
  http.stationsInfoManage.getStations(params).then((res: any) => {
    if (res.code == 0) {
      state.total = res.data.total;
      state.linkageData = res.data.list;
      state.linkageData.forEach((item) => {
        if (item.supervisorMode == 1) {
          item.supervisorModes = "无人值守";
        } else if (item.supervisorMode == 2) {
          item.supervisorModes = "有人值守";
        }
        if (item.stationProperty == 1) {
          item.stationPropertys = "地方台";
        } else if (item.stationProperty == 2) {
          item.stationPropertys = "区域台";
        } else {
          item.stationPropertys = "国家台";
        }
      });
    } else {
      ElMessage.error(res.message);
    }
  });
};
//查询
const search = () => {
  getList();
};
//添加
const addConfig = () => {
  state.title = "新增";
  state.showModify = false;
  state.showAdd = true;
  state.selectNetwork = "";
  state.stationArray = "";
};
// 添加-确定
const confirm = () => {
  if (ruleForm.stationName == "") {
    ElMessage.error("台/阵名称不能为空");
    return;
  }
  if (ruleForm.stationCode == "") {
    ElMessage.error("编码不能为空");
    return;
  }
  let params = {
    stationName: ruleForm.stationName,
    stationCode: ruleForm.stationCode,
    longitude: ruleForm.longitude,
    latitude: ruleForm.latitude,
    elevation: ruleForm.elevation,
    unit: ruleForm.unit,
    stationAddress: ruleForm.stationAddress,
    stationProperty: Number(ruleForm.stationProperty),
    supervisorMode: Number(ruleForm.supervisorMode),
    stationLithology: ruleForm.stationLithology,
    overseas: Number(ruleForm.overseas),
    description: ruleForm.description,
    stationType: ruleForm.stationType,
    testStatus: Number(ruleForm.testStatus),
  };
  // let imageFile = "";
  // let files = new FormData();
  // files.append("detectionStationInfo", detectionStationInfo);
  // files.append("imageFile", imageFile);
  http.stationsInfoManage.addStations(params).then((res: any) => {
    if (res.code == 0) {
      state.showAdd = false;
      getList();
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message);
    }
  });
};
//修改
const update = (row: any) => {
  state.updateId = row.id;
  state.showModify = true;
  state.title = "修改";
  updateForm.stationName = row.stationName; //台站名称
  updateForm.stationCode = row.stationCode; //台站编码
  updateForm.longitude = row.longitude; //经度
  updateForm.latitude = row.latitude; //纬度
  updateForm.elevation = row.elevation; //高程
  updateForm.unit = row.unit; //台网（下拉框）
  updateForm.stationAddress = row.stationAddress; //详细地址
  updateForm.stationProperty = row.stationProperty; //台站级别（下拉框）
  updateForm.supervisorMode = row.supervisorMode; //管理方式（下拉框）
  updateForm.stationLithology = row.stationLithology; //：台站岩性
  updateForm.overseas = row.overseas + ""; //：是否境内
  updateForm.description = row.description; //：描述
  updateForm.stationType = row.stationType; //：台阵（下拉框）
  updateForm.testStatus = row.testStatus + ""; //开启检测
};
//修改确认
const updatConfirm = () => {
  if (updateForm.stationName == "") {
    ElMessage.error("台/阵名称不能为空");
    return;
  }
  if (updateForm.stationCode == "") {
    ElMessage.error("编码不能为空");
    return;
  }
  let params = {
    stationName: updateForm.stationName,
    stationCode: updateForm.stationCode,
    longitude: updateForm.longitude,
    latitude: updateForm.latitude,
    elevation: updateForm.elevation,
    unit: updateForm.unit,
    stationAddress: updateForm.stationAddress,
    stationProperty: Number(updateForm.stationProperty),
    supervisorMode: Number(updateForm.supervisorMode),
    stationLithology: updateForm.stationLithology,
    overseas: Number(updateForm.overseas),
    description: updateForm.description,
    stationType: updateForm.stationType,
    testStatus: Number(updateForm.testStatus),
    id: state.updateId,
  };
  // let imageFile = "";
  // let files = new FormData();
  // files.append("detectionStationInfo", detectionStationInfo);
  // files.append("imageFile", imageFile);
  state.showModify = false;
  http.stationsInfoManage.editStations(params).then((res: any) => {
    if (res.code == 0) {
      state.showAdd = false;
      getList();
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message);
    }
  });
};
// 删除
const confirmDelete = (row: any) => {
  let params = {
    stationIdList: row.id,
  };
  http.stationsInfoManage.delStations(params).then((res: any) => {
    if (res.code == 0) {
      getList();
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message);
    }
  });
};
</script>

<style lang="less" scoped>
.mechanism-admin {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
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
      // width: 24%;
      justify-content: space-around;
      .left-name {
        display: inline-block;
        // width: 90px;
        font-size: @main-font-size;
        color: @main-font-color;
        padding-right: @title-padding;
        box-sizing: border-box;
      }
      ::v-deep .el-input {
        width: 300px;
        background: transparent;
        border-radius: 5px;
        border: 1px solid @global-border-color;
        height: 40px;
        color: @main-font-color;
      }
      :deep(.el-input__wrapper) {
        width: 300px;
      }
    }
    .left-content-items {
      justify-content: flex-end;
    }
    .btn {
      display: flex;
      justify-content: flex-end;
      width: 100%;
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
  .modal-wrapper {
    display: flex;
    width: 100%;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  //新增
  .modal-content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    .modal-label-name {
      display: inline-block;
      width: 120px;
      color: @main-font-color;
      font-size: @main-font-size;
      margin-right: 8px;
      text-align: right;
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
    :deep(.el-radio-group) {
      width: 300px;
    }
    :deep(.el-radio) {
      margin-right: 50px;
    }
    :deep(.el-select) {
      width: 300px;
    }
  }
  .pie-tb-iscontent {
    margin-top: 20px;
  }
}
</style>

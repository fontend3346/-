<template>
  <PIEPlaneSelect
    class="select-main"
    v-model:visible="props.facility"
    :width="17"
    :height="0"
    :cancelBtn="false"
    :confirmBtn="false"
  >
    <template v-slot:operateItem>
      <span
        class="iconfont icon-guanbi icon-location"
        @click="cancelSelect"
      ></span>
      <!-- 台站类型 -->
      <div v-show="!state.isShowOldSearch">
        <div class="station-style">
          <div class="title">
            <div @click="cutFun" class="type-style">
              <span v-show="state.cutActive == 0">台站类型</span>
              <span v-show="state.cutActive == 1">学科类型</span>
              <span class="iconfont icon-qiehuan cut"></span>
            </div>
            <hr />
          </div>
          <div v-show="state.cutActive == 0" class="station-total">
            <div class="station-total-item">
              <span class="green-icon"></span>
              <span>正常{{ props.stationTotalInfo.normalCount }}个</span>
            </div>
            <div class="station-total-item">
              <span class="red-icon"></span>
              <span>异常{{ props.stationTotalInfo.notNormalCount }}个</span>
            </div>
          </div>
          <!-- 台站类型 -->
          <div class="buttons" v-show="state.cutActive == 0">
            <button
              v-for="(item, index) in props.stationTypeAll"
              :key="index"
              :class="state.active == index ? 'button-border' : 'button'"
              @click="statinoTypeClick(item, index)"
            >
              {{ item.typeName }}
            </button>
          </div>
          <!-- 学科类型 -->
          <div class="buttons" v-show="state.cutActive == 1">
            <button
              v-for="(item, index) in props.subjectTypeList"
              :key="index"
              :class="state.activeSubject == index ? 'button-border' : 'button'"
              @click="subjectTypeClick(item.id, index)"
            >
              {{ item.name }}
            </button>
          </div>
        </div>
      </div>
      <div :class="state.isShowStation ? 'btn-show' : 'btn-show-fold'">
        <div class="title-box" @click="isShowSearch(state.isShowOldSearch)">
          <span>高级检测</span>
          <i
            class="iconfont icon-zhankai unfold"
            v-show="!state.isShowOldSearch"
          ></i>
          <i class="iconfont icon-z045 fold" v-show="state.isShowOldSearch"></i>
        </div>
      </div>
      <div v-if="state.isShowOldSearch">
        <div class="top-border"></div>
        <el-tabs v-model="props.activeName" @tab-click="handleClick">
          <!--台网-->
          <el-tab-pane label="台网" name="first" v-if="props.roleLevel != 4">
            <div class="select-station">
              <div class="station-top">
                <div class="station-top-item">
                  <div class="station-title">台网名称</div>
                  <el-select
                    v-model="state.selectNetwork"
                    clearable
                    filterable
                    placeholder="请选择台网名称"
                    @change="networkChange1"
                    value-key="networkId"
                  >
                    <el-option
                      v-for="item in props.selectNetList"
                      :key="item"
                      :label="item.cname"
                      :value="item"
                      class="select-item"
                    ></el-option>
                  </el-select>
                </div>
                <div class="station-top-item">
                  <div class="station-title">台网编号</div>
                  <el-select
                    v-model="state.netCode"
                    clearable
                    filterable
                    placeholder="请选择台网编号"
                    @change="netCodeChange"
                    value-key="code"
                  >
                    <el-option
                      v-for="item in props.selectNetList"
                      :key="item"
                      :label="item.code"
                      :value="item"
                      class="select-item"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <!--台站-->
          <el-tab-pane label="台站" name="second">
            <div class="select-station">
              <div class="station-top">
                <!-- <div class="station-top-item">
                <div class="station-title">国家级</div>
                <el-select
                  v-model="state.foreignValue"
                  clearable
                  placeholder="请选择国家级"
                  @change="foreignChang"
                >
                  <el-option
                    v-for="item in props.foreignList"
                    :key="item.networkId"
                    :label="item.cname"
                    :value="item.networkId"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="station-top-item">
                <div class="station-title">省级</div>
                <el-select
                  v-model="state.selectStationPro"
                  clearable
                  filterable
                  placeholder="请选择省级"
                  @change="networkChange"
                  value-key="networkId"
                >
                  <el-option
                    v-for="item in props.selectNetLists"
                    :key="item.networkId"
                    :label="item.cname"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </div> -->
                <div class="station-top-item">
                  <div class="station-title">隶属台网</div>
                  <el-select
                    v-model="state.selectNetwork"
                    clearable
                    filterable
                    placeholder="请选择台网名称"
                    @change="stationNetworkChange"
                    value-key="networkId"
                  >
                    <el-option
                      v-for="item in props.selectNetList"
                      :key="item"
                      :label="item.cname"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="station-top-item">
                  <div class="station-title">学科类型</div>
                  <el-select
                    v-model="state.subjectType"
                    clearable
                    filterable
                    placeholder="请选择学科类型"
                    @change="subjectTypeChange"
                  >
                    <el-option
                      v-for="item in props.subjectTypeList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="station-top-item">
                  <div class="station-title">台站类型</div>
                  <el-select
                    v-model="state.subjectList"
                    clearable
                    filterable
                    placeholder="请选择台站类型"
                    @change="subjectListChange"
                  >
                    <el-option
                      v-for="item in props.subjectListList"
                      :key="item.id"
                      :label="item.typeName"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="station-top-item">
                  <div class="station-title">台站名称</div>
                  <el-select
                    v-model="state.stationChild"
                    clearable
                    filterable
                    placeholder="请选择台站名称"
                    @change="stationChildChange"
                    value-key="stationId"
                  >
                    <el-option
                      v-for="item in props.stationChildList"
                      :key="item"
                      :label="item.name"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="station-top-item">
                  <div class="station-title">台站编号</div>
                  <el-select
                    v-model="state.stationCode"
                    clearable
                    filterable
                    placeholder="请选择台站编号"
                    @change="stationCodeChange"
                    value-key="code"
                  >
                    <el-option
                      v-for="item in props.stationChildList"
                      :key="item"
                      :label="item.code"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <!--观测点-->
          <!-- <el-tab-pane label="观测点" name="third">
            <div class="select-station">
              <div class="station-top">
                <div class="station-top-item">
                  <el-input
                    v-model="state.watchPoint"
                    placeholder="请输入观测点名称"
                    clearable
                    @input="inputChange"
                  ></el-input>
                </div>
                <div class="station-query">
                  <el-input
                    v-model="state.watchPointCode"
                    placeholder="请输入观测点编号"
                    clearable
                  ></el-input>
                </div>
              </div>
            </div>
          </el-tab-pane> -->
          <!--设备-->
          <el-tab-pane label="设备" name="fourth">
            <div class="select-station">
              <div class="station-top">
                <div class="station-top-item">
                  <div class="station-title">隶属台网</div>
                  <el-select
                    v-model="state.selectNetwork"
                    clearable
                    filterable
                    placeholder="请选择台网名称"
                    @change="equipNetworkChange"
                    value-key="networkId"
                  >
                    <el-option
                      v-for="item in props.selectNetList"
                      :key="item"
                      :label="item.cname"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="station-top-item">
                  <div class="station-title">隶属台站</div>
                  <el-select
                    v-model="state.stationChild"
                    clearable
                    filterable
                    placeholder="请选择台站名称"
                    @change="stationEquipChange"
                    value-key="stationId"
                  >
                    <el-option
                      v-for="item in props.stationChildList2"
                      :key="item"
                      :label="item.name"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="station-top-item">
                  <div class="station-title">设备类型</div>
                  <el-select
                    v-model="state.equipmentType"
                    clearable
                    filterable
                    placeholder="请选择设备类型"
                    @change="equipmentTypeChange"
                  >
                    <el-option
                      v-for="item in props.equipmentTypeList"
                      :key="item.properties.cate_id"
                      :label="item.properties.name"
                      :value="item.properties.cate_id"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="station-top-item">
                  <div class="station-title">设备名称</div>
                  <el-select
                    v-model="state.deviceName"
                    clearable
                    filterable
                    placeholder="请选择设备名称"
                    @change="queryDeviceName"
                    value-key="inst_id"
                  >
                    <el-option
                      v-for="item in props.deviceList"
                      :key="item"
                      :label="item.name"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </div>
                <!-- <div class="station-top-item">
                <div class="station-title">设备名称</div>
                <el-input
                  v-model="state.deviceName"
                  placeholder="请输入设备名称"
                  clearable
                  @input="queryDeviceName"
                ></el-input>
              </div> -->
                <!-- <div class="station-top-item">
                  <div class="station-title">设备类型</div>
                  <el-select
                    v-model="equipmentType"
                    class="m-2"
                    placeholder="请选择设备类型"
                    clearable
                  >
                    <el-option
                      v-for="item in state.equipmentModelList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div> -->
                <div class="station-top-item">
                  <div class="station-title">设备编号</div>
                  <el-select
                    v-model="state.equipmentCode"
                    clearable
                    filterable
                    placeholder="请选择设备编号"
                    @change="deviceCodeChange"
                    value-key="inst_code"
                  >
                    <el-option
                      v-for="item in props.deviceList"
                      :key="item"
                      :label="item.inst_code"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <PIETable
          v-if="props.stationTableShow"
          :maxHeight="200"
          :data="props.stationTableList"
          :columns="props.stationColumns"
          :operationWidth="110"
          @onRowClick="TestSelect"
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
        <PIETable
          v-if="seePointShow"
          :maxHeight="200"
          :data="props.seeList"
          :columns="props.seeColumns"
          :operationWidth="110"
          :isTableShow="false"
          :isSpecilShow="true"
          @onRowClick="stationSelect"
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
    </template>
  </PIEPlaneSelect>
</template>
<script lang="ts" setup>
import { useHandler } from "./hooks";
const emit = defineEmits<{
  (event: "cancelSelect", e: MouseEvent): void;
  (event: "handleClick", e: MouseEvent): void;
  (event: "stationNetworkChange", e: MouseEvent): void;
  (event: "networkChange1", e: MouseEvent): void;
  (event: "netCodeChange", e: MouseEvent): void;
  (event: "foreignChang", e: MouseEvent): void;
  (event: "networkChange", e: MouseEvent): void;
  (event: "stationChildChange", e: MouseEvent): void;
  (event: "subjectListChange", e: MouseEvent): void;
  (event: "stationEquipChange", e: MouseEvent): void;
  (event: "equipNetworkChange", e: MouseEvent): void;
  (event: "stationCodeChange", e: MouseEvent): void;
  (event: "inputChange", e: MouseEvent): void;
  (event: "queryDeviceName", e: MouseEvent): void;
  (event: "deviceCodeChange", e: MouseEvent): void;
  (event: "TestSelect", e: MouseEvent): void;
  (event: "stationSelect", e: MouseEvent): void;
  (event: "subjectTypeChange", e: MouseEvent): void;
  (event: "equipmentTypeChange", e: MouseEvent): void;
  (event: "statinoTypeClick", e: MouseEvent): void;
  (event: "isShowSearch", e: MouseEvent): void;
  (event: "subjectTypeClick", e: MouseEvent): void;
  (event: "cutFun", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    facility: boolean;
    activeName: any;
    roleLevel: number;
    selectNetwork: any;
    selectNetList: any;
    foreignValue: any;
    foreignList: any;
    selectStationPro: any;
    stationChild: any;
    stationChildList: any;
    subjectListList: any;
    stationTypeAll: any;
    stationChildList2: any;
    deviceList: any;
    watchPoint: any;
    equipmentCode: any;
    stationTableShow: boolean;
    seePointShow: boolean;
    selectNetLists: any;
    stationTableList: any;
    stationColumns: any;
    subjectTypeList: any;
    equipmentTypeList: any;
    stationTotalInfo: any;
  }>(),
  {
    facility: true,
    activeName: "first",
    roleLevel: 1,
    selectNetwork: "",
    selectNetList: [],
    foreignValue: "",
    foreignList: [],
    selectStationPro: "",
    stationChild: "", // 台站名称
    stationChildList: [], // 台站列表
    subjectListList: [], // 台站类型台网下的
    stationTypeAll: [], // 台站类型所有的
    stationChildList2: [], // 设备中的台站
    deviceList: [], // 台站列表
    watchPoint: "", // 台站编号
    deviceName: "", // 设备名称
    equipmentCode: "", // 设备编号
    stationTableShow: false, // 台站表格
    stationTableList: [], // 台站表格数据
    stationColumns: [], // 台站表格表头
    seePointShow: false, // 设备表格
    seeList: [], // 设备列表
    seeColumns: [], // 设备表头
    selectNetLists: [],
    subjectTypeList: [], //学科类型
    equipmentTypeList: [], //设备类型
    stationTotalInfo: {}, //台站总数
  }
);
const {
  cutFun,
  subjectTypeClick,
  cancelSelect,
  handleClick,
  networkChange1,
  stationNetworkChange,
  netCodeChange,
  foreignChang,
  networkChange,
  stationChildChange,
  subjectListChange,
  stationEquipChange,
  equipNetworkChange,
  stationCodeChange,
  inputChange,
  queryDeviceName,
  deviceCodeChange,
  TestSelect,
  stationSelect,
  subjectTypeChange,
  equipmentTypeChange,
  isShowSearch,
  statinoTypeClick,
  state,
} = useHandler(props, emit);
</script>

<template>
  <div class="left-dialog">
    <div class="main-title" value="mainTitle">{{ mainTitle }}</div>
    <div class="big-button">
      <div
        class="my-button"
        v-for="(item, index) in selectList"
        :key="item"
        :class="{ actives: activeIndex === index }"
      >
        <div
          class="button-inner"
          :class="{ actives: activeIndex === index }"
          :activeIndex="activeIndex"
        >
          <span @click="activeDown(index, item)">{{ item.label }}</span>
        </div>
      </div>
    </div>
    <div class="table-top">
      <div class="table-content">
        <!-- <div>省</div> -->
        <el-select
          v-model="props.provinceValue"
          placeholder="选择台网"
          @change="provinceChange($event, activeIndex)"
          clearable
          filterable
        >
          <el-option
            v-for="item in provinceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="table-content">
        <!-- <div>台阵</div> -->
        <el-select
          v-model="props.taiwaneseValue"
          clearable
          placeholder="台阵/台站"
          filterable
          @change="taiwaneseChange($event, activeIndex)"
        >
          <el-option
            v-for="item in taiwaneseList"
            :key="item.id"
            :label="item.typeName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="table-content">
        <!-- <div>台站</div> -->
        <el-select
          v-model="props.stationsValue"
          clearable
          placeholder="选择子台站"
          filterable
          @change="stationsChange($event, activeIndex)"
        >
          <el-option
            v-for="item in stationsList"
            :key="item.id"
            :label="item.stationName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="table-content" v-if="activeIndex == 1">
        <!-- <div>设备</div></div> -->
        <el-select
          v-model="props.equipmentValue"
          clearable
          placeholder="设备类型"
          filterable
          @change="equipmentChange"
        >
          <el-option
            v-for="item in equipmentList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="table-content">
        <div class="btn" @click="searchOne(activeIndex)">添加</div>
      </div>
    </div>
    <div class="main-table" v-if="activeIndex == 0">
      <!-- 关闭接口 @activeOpen="activeOpen"   :activationBtn="true"-->
      <PIETable
        ref="dataCollectOne"
        highlight-current-row
        class="left-table"
        :data="tableData"
        :columns="fields"
        :isAction="true"
        :detailBtn="true"
        :deleteBtnPopout="true"
        :isTableShow="isTableShow"
        :isSpecilShow="isSpecilShow"
        @deletedPopout="deleteReceive1"
        @detail="detailData"
        @on-row-click="rowClickOne"
        :max-height="600"
        :header-cell-style="{
          background: '#053276',
          fontSize: '16px',
          height: '50px',
          fontWeight: '200',
          letterSpacing: '3px',
          color: '#fff',
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
        <template v-slot:status="status">
          <div v-if="status.row.properties.status == '1'" class="status-open">
            激活
          </div>
          <div v-else class="status-close">关闭</div>
        </template>
      </PIETable>

      <div class="table-more">
        <div class="more-font">
          <div @click="moreClick('task')">>>>更多详情</div>
        </div>
        <PIEPage
          :pagerCount="3"
          :total="pageTotal"
          :isSmall="isSmall"
          :pageSize="pageSize"
          :currentPage="pageNum"
          @handleSizeChange="handleSizeChange"
          @handleNumChange="handleNumChange"
        ></PIEPage>
      </div>
    </div>
    <div class="main-table" v-else-if="activeIndex == 1">
      <PIETable
        ref="dataCollectTwo"
        highlight-current-row
        class="left-table"
        :data="tableDataCopy"
        :columns="fieldsCopy"
        :isAction="false"
        @on-row-click="rowClick"
        :isTableShow="isTableShow"
        :isSpecilShow="isSpecilShow"
        :max-height="600"
        :header-cell-style="{
          background: '#053276',
          fontSize: '16px',
          height: '50px',
          fontWeight: '200',
          letterSpacing: '3px',
          color: '#fff',
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
        <!-- <template v-slot:status="status">
          <div v-if="status.row.properties.status == '1'" class="status-open">
            激活
          </div>
          <div v-else class="status-close">关闭</div>
        </template> -->
        <template v-slot:status="status">
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="
              status.row.properties.status == 1
                ? '运行'
                : status.row.properties.status == 2
                ? '关闭'
                : '异常'
            "
            placement="top"
          >
            <div
              v-if="status.row.properties.status == 1"
              class="status-open-circle"
            ></div>
            <div
              v-else-if="status.row.properties.status == 2"
              class="status-close-circle"
            ></div>
            <div v-else class="status-error"></div>
          </el-tooltip>
        </template>
      </PIETable>
      <div class="table-more">
        <div class="more-font">
          <div @click="moreClick('equip')">>>>更多详情</div>
        </div>
        <PIEPage
          :pagerCount="3"
          :total="pageTotalCopy"
          :isSmall="isSmall"
          :pageSize="pageSizeCopy"
          :currentPage="pageNumCopy"
          @handleSizeChange="handleSizeChangeCopy"
          @handleNumChange="handleNumChangeCopy"
        ></PIEPage>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, defineProps } from "vue";
import { useHandler } from "./hooks";
import myTable from "@/components/table/my-table.vue";

onMounted(() => {});

const props = withDefaults(
  defineProps<{
    mainTitle: string;
    selectList: any;
    tableData: any;
    tableDataCopy: any;
    fields: any;
    fieldsCopy: any;
    pageTotal: number;
    pageTotalCopy: number;
    pageSizeCopy: number;
    pageNumCopy: number;
    pageNum: number;
    pageSize: number;
    activeIndex: any;
    isTableShow: any;
    isSpecilShow: any;
    provinceValue: any;
    provinceList: any;
    taiwaneseValue: any;
    taiwaneseList: any;
    stationsValue: any;
    equipmentValue: any;
    stationsList: any;
    equipmentList: any;
    isSmall: any;
  }>(),
  {
    mainTitle: "实时数据汇集子系统", // 组件标题
    selectList: [], // 按钮
    tableData: [], // 表格数据
    tableDataCopy: [], // 表格数据
    fields: [], // 表头
    fieldsCopy: [], // 表头
    pageTotal: 10, // 总页数
    pageTotalCopy: 10, // 总页数
    pageSizeCopy: 10, // 总页数
    pageNumCopy: 1, // 总页数
    pageNum: 1,
    pageSize: 10,
    activeIndex: 0,
    isTableShow: false,
    isSpecilShow: true,
    provinceValue: "", //省
    provinceList: [], //省
    taiwaneseValue: "", //台阵
    taiwaneseList: [], //台阵
    stationsValue: "", //台站
    equipmentValue: "", //设备
    stationsList: [], //台站
    equipmentList: [], //设备
    isSmall: "total, prev, pager, next,jumper", //台站
  }
);

const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
  (event: "handleSizeChange", e: MouseEvent): void;
  (event: "handleSizeChangeCopy", e: MouseEvent): void;
  (event: "handleNumChange", e: MouseEvent): void;
  (event: "handleNumChangeCopy", e: MouseEvent): void;
  (event: "activeOpen", e: MouseEvent): void;
  (event: "detailData", e: MouseEvent): void;
  (event: "activeDown", e: MouseEvent): void;
  (event: "rowClick", e: MouseEvent): void;
  (event: "rowClickOne", e: MouseEvent): void;
  (event: "moreClick", e: MouseEvent): void;
  (event: "searchOne", e: MouseEvent): void;
  (event: "searchTwo", e: MouseEvent): void;
  (event: "provinceChange", e: MouseEvent): void;
  (event: "taiwaneseChange", e: MouseEvent): void;
  (event: "stationsChange", e: MouseEvent): void;
  (event: "equipmentChange", e: MouseEvent): void;
  (event: "deleteReceive1", e: MouseEvent): void;
}>();

const {
  activeDown,
  activeIndex,
  handleSizeChange,
  handleSizeChangeCopy,
  handleNumChange,
  handleNumChangeCopy,
  activeOpen,
  detailData,
  rowClick,
  rowClickOne,
  moreClick,
  dataCollectOne,
  dataCollectTwo,
  searchOne,
  searchTwo,
  provinceChange,
  taiwaneseChange,
  stationsChange,
  equipmentChange,
  deleteReceive1,
} = useHandler(props, emit);
</script>

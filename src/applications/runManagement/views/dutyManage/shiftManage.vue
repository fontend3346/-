<template>
  <div class="instrument-admin">
    <!-- 2-2 交接班管理 -->
    <div class="header-left-content">
      <div class="left-content-item">
        <span class="left-name">值班人</span>
        <el-input
          v-model="state.siteName"
          placeholder="请输入值班人"
          clearable
        ></el-input>
      </div>
      <div class="left-content-item">
        <span class="left-name">值班时间</span>
        <el-date-picker
          v-model="state.dutyTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions1"
        >
        </el-date-picker>
      </div>
      <div class="left-content-item">
        <span class="left-name">交接状态</span>
        <el-input
          v-model="state.status"
          placeholder="请输入交接状态"
          clearable
        ></el-input>
      </div>
      <div class="left-content-item">
        <span class="left-name">交接人员</span>
        <el-input
          v-model="state.connectPeople"
          placeholder="请输入交接人员"
          clearable
        ></el-input>
      </div>

      <div class="left-content-items">
        <button @click="searchList">查询</button>
      </div>
    </div>
    <!--  -->
    <div class="pie-tb-iscontent">
      <PIETable
        :maxHeight="500"
        :data="state.linkageData"
        :columns="state.linkageColumns"
        :isAction="true"
        :showCheckbox="true"
        :showIndex="true"
        :dynamicShow="true"
        :dynamicBtnName="state.dynamicBtnName"
        @dynamicBtn="dynamicBtn"
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
        @handleSizeChange="sizeChange"
        @handleNumChange="pageChange"
      ></PIEPage>
    </div>

    <!-- 日报交接弹框 -->
    <PIEModal
      :title="state.title"
      v-model:visible="state.showHandover"
      width="30"
      height="50"
      @confirm="handover()"
      class="modify-modal"
    >
      <template #operateItem>
        <div class="modal-wrapper">
          <div class="modal-content">
            <span class="modal-label-name">选择日期:</span>
            <el-date-picker
              v-model="state.handoverData.date"
              type="date"
              :size="size"
            />
          </div>

          <div class="modal-content">
            <span class="modal-label-name">交接人员:</span>
            <el-input
              v-model="state.handoverData.content"
              type="textarea"
              placeholder="请输入备注"
            ></el-input>
          </div>
        </div>
      </template>
    </PIEModal>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const {
  appContext: {
    config: { globalProperties },
  },
} = getCurrentInstance() as any;
const state = reactive({
  title: "新建", //新建
  siteName: "", //站点名称
  fillPeople: "", //填写人
  dutyTime: "", //开始 截止 时间
  status: "", //状态
  connectPeople: "", //交接人员
  linkageData: [
    {
      site: "台站1-1-1",
      dutyPeople: "张三",
      startTime: "2022-10-06",
      endTime: "2022-10-07",
      dailyTime: "2022-10-07",
      content: "内容xxxxx",
      handoverName: "张三三",
      status: "已审核",
    },
  ], //表格数据
  linkageColumns: [
    {
      prop: "site",
      label: "站点",
    },
    {
      prop: "dutyPeople",
      label: "值班人",
    },
    {
      prop: "startTime",
      label: "值班开始时间",
    },
    {
      prop: "endTime",
      label: "值班结束时间",
    },
    {
      prop: "dailyTime",
      label: "日报时间",
    },
    {
      prop: "content",
      label: "日报内容",
    },
    {
      prop: "handoverName",
      label: "交接人员",
    },
    {
      prop: "status",
      label: "交接状态",
    },
  ], //表头

  total: 10,
  pageSize: 10,
  pageNum: 1,

  dynamicBtnName: [{ value: "日报交接", label: "日报交接" }], //动态按钮名

  editRow: {}, //编辑/新建的数据
  showHandover: false, //交接弹窗
  handoverData: {
    date: "",
    content: "",
  }, //交接弹框数据
});

//动态按钮方法
const dynamicBtn = (row: any, index: any, item: any) => {
  if (item.value == "日报交接") {
    handover(row);
  }
};
// 查询 （不要接收参数
const searchList = () => {};

//查询接口

// 交接
const handover = (row: any) => {
  // console.log(row);
  state.title = "日报交接";
  state.showHandover = true;
  state.handoverData.date = row.time;
};
//确定交接
const handoverConfirm = () => {
  console.log("确认交接");
  state.showHandover = false;
};

// 分页
const pageChange = () => {};
// 分页
const sizeChange = () => {};

onMounted(() => {});
</script>

<style lang="less" scoped>
.instrument-admin {
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
      width: 24%;
      justify-content: flex-end;
      margin-bottom: 10px;
      .left-name {
        display: inline-block;
        // width: 90px;
        font-size: @main-font-size;
        color: @main-font-color;
        padding-right: @title-padding;
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
      :deep(.el-date-editor) {
        width: 300px;
        height: 40px;
      }
    }
    .left-content-items {
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      margin-bottom: 10px;
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

    :deep(.el-date-editor) {
      width: 300px;
      height: 40px;
    }
  }
  .pie-tb-iscontent {
    margin-top: 10px;
  }
}
</style>

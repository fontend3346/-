<template>
  <!-- 3-2 组织管理 -->

  <div class="institution-manage-content">
    <div class="safety-domain-header">
      <div class="domain-header-left">
        <div class="header-left-content">
          <span>单位名称</span>
          <el-input
            v-model="state.fitData"
            clearable
            placeholder="请输入组织全名"
          ></el-input>
        </div>
      </div>
      <div class="domain-header-right">
        <button title="查询" @click="search">查询</button>
        <!-- <button title="批量删除" @click="batchDelete">批量删除</button> -->
        <button title="新增" @click="addConfig">新增</button>
      </div>
    </div>
    <div class="pie-tb-iscontent">
      <!-- 表格 -->
      <PIETable
        :columns="state.linkageColumns"
        :data="state.linkageData"
        :isAction="true"
        :deleteBtn="true"
        :showCheckbox="true"
        :editBtn="true"
        :showIndex="true"
        :groupBtn="true"
        @group="groupEvent"
        @edit="update"
        @confirmDelete="confirmDelete"
        @onSelectAll="onSelectAll"
        @on-select="select"
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
    <div class="pie-tb-footer">
      <PIEPage
        :total="state.total"
        :pageSize="state.pageSize"
        :currentPage="state.pageNum"
        @handleSizeChange="sizeChange"
        @handleNumChange="pageChange"
      ></PIEPage>
    </div>
    <!-- 新增弹框 -->
    <PIEModal
      v-model:visible="state.showAdd"
      :title="state.title"
      :resetBtn="false"
      @confirm="confirm(state.ruleForm)"
      width="40"
      height="35"
      iconShow="true"
      @cancel="cancel"
    >
      <template v-slot:operateItem>
        <div class="modal-wrapper">
          <div class="modal-content modal-content1">
            <span class="modal-label-name">组织全名:</span>
            <el-input
              v-model="state.ruleForm.fullName"
              placeholder="请输入组织全名"
            ></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">组织简称:</span>
            <el-input
              type="textarea"
              v-model="state.ruleForm.shortName"
              placeholder="请输入组织简称"
            ></el-input>
          </div>
          <!-- <div class="modal-content">
            <span class="modal-label-name">省份:</span>
            <el-cascader
              placeholder="请选择省份"
              v-model="state.ruleForm.newLyadded"
              :options="state.cityList"
              @change="handleChange"
              ref="cascaderAdd"
            ></el-cascader>
          </div>

          <div class="modal-content">
            <span class="modal-label-name">详细地址:</span>
            <el-input
              type="textarea"
              v-model="state.ruleForm.address"
              placeholder="请输入详细地址"
            ></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">邮编:</span>
            <el-input
              type="textarea"
              v-model="state.ruleForm.postalCode"
              placeholder="请输入组织邮编"
            ></el-input>
          </div> -->
          <div class="modal-content">
            <span class="modal-label-name">描述:</span>
            <el-input
              type="textarea"
              v-model="state.ruleForm.description"
              placeholder="请输入组织描述"
            ></el-input>
          </div>
        </div>
      </template>
    </PIEModal>
    <!-- 修改弹框 -->
    <PIEModal
      v-model:visible="state.showModify"
      :title="state.title"
      :resetBtn="false"
      @confirm="modifyConfirm(state.modifyData)"
      width="40"
      height="35"
      iconShow="true"
      @cancel="cancel"
    >
      <template v-slot:operateItem>
        <div class="modal-wrapper">
          <div class="modal-content modal-content1">
            <span class="modal-label-name">组织全名:</span>
            <el-input
              v-model="state.modifyData.fullName"
              placeholder="请输入组织全名"
            ></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">组织简称:</span>
            <el-input
              type="textarea"
              v-model="state.modifyData.shortName"
              placeholder="请输入组织简称"
            ></el-input>
          </div>
          <!-- <div class="modal-content">
            <span class="modal-label-name">省份:</span>
            <el-cascader
              placeholder="请选择省份"
              v-model="state.modifyData.modifyArray"
              :options="state.cityList"
              @change="modifyChange"
              ref="cascaderUpdate"
            ></el-cascader>
          </div>

          <div class="modal-content">
            <span class="modal-label-name">详细地址:</span>
            <el-input
              type="textarea"
              v-model="state.modifyData.address"
              placeholder="请输入详细地址"
            ></el-input>
          </div>
          <div class="modal-content">
            <span class="modal-label-name">邮编:</span>
            <el-input
              type="textarea"
              v-model="state.modifyData.postalCode"
              placeholder="请输入组织邮编"
            ></el-input>
          </div> -->
          <div class="modal-content">
            <span class="modal-label-name">描述:</span>
            <el-input
              type="textarea"
              v-model="state.modifyData.description"
              placeholder="请输入组织描述"
            ></el-input>
          </div>
        </div>
      </template>
    </PIEModal>
    <!-- 用户弹框 -->
    <PIEModal
      width="40"
      height="40"
      :title="'用户'"
      v-model:visible="state.groupModal"
      :resetBtn="false"
      :confirmBtn="false"
      :cancelBtn="false"
      @cancel="usercancel"
      class="group-role"
    >
      <template v-slot:operateItem>
        <div class="modal-box">
          <div class="header-line">
            <div class="text">用户:</div>
            <el-select
              :popper-append-to-body="false"
              v-model="state.groupName"
              class="input-style"
              clearable
            >
              <el-option
                v-for="item in state.groupNameList"
                :key="item.userId"
                :label="item.account"
                :value="item.userId"
              ></el-option>
            </el-select>
            <button @click="insertRoleGroup">添加</button>
          </div>
          <!-- 表格 -->
          <PIETable
            :maxHeight="300"
            :data="state.groupTableData"
            :columns="state.groupColumns"
            :isAction="true"
            :showIndex="true"
            :deleteBtn="true"
            @confirmDelete="deleteRoleGroup"
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
      </template>
    </PIEModal>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, getCurrentInstance, nextTick } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import http from "@/api/index";
import cityList from "@/utils/city";
import store from "@/store";
import { AnyColumns } from "element-plus/es/components/table-v2/src/types";

// const router = useRouter();
const {
  appContext: {
    config: { globalProperties },
  },
} = getCurrentInstance() as any;
let cascaderAdd = ref("");
let cascaderUpdate = ref("");
const state: any = reactive({
  groupModal: false,
  groupName: "", //用户名称
  groupNameList: [], //群组列表
  groupTableData: [], //用户名称数据
  groupColumns: [
    {
      prop: "account",
      label: "用户名称",
    },
  ], //用户名称
  roleCode: "",

  remark: "组织管理是天基授权管理服务的",
  fitData: "", //单位名称
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
  // 新增数据
  ruleForm: {
    address: "", //详细地址
    cityCode: "", //城市code码
    countryCode: "", //城市code码
    description: "", //备注
    fullName: "", //组织全名
    postalCode: "", //邮编
    provinceCode: "", //省份码
    regionCode: "", //源码
    shortName: "", //组织简称
    newLyadded: [], //添加数据
  },
  // 修改数据
  modifyData: {
    teamId: "", //id
    address: "", //地址
    cityCode: "", //城市coed
    countryCode: "", //城市coed
    description: "", //备注
    fullName: "", //组织全名
    postalCode: "", //邮编
    provinceCode: "", //省份码
    regionCode: "", //源码
    shortName: "", //组织简称
    modifyArray: [], //修改数据
  },
  // 虚拟select列表
  label: [],
  cityList: cityList, //所有城市数据
  // 表头
  linkageColumns: [
    {
      prop: "fullName",
      label: "组织全名",
    },
    {
      prop: "realFullName",
      label: "组织简称",
    },

    // {
    //   prop: "provinceName",
    //   label: "省份",
    // },
    // {
    //   prop: "address",
    //   label: "详细地址",
    // },

    {
      prop: "description",
      label: "描述",
    },
    // {
    //   prop: "postalCode",
    //   label: "邮政编码",
    // },
  ],
  // 表格组织数据
  linkageData: [],
});

//增加弹框事件
onMounted(() => {
  getList();
});
// 取消弹出框
const usercancel = () => {
  state.groupModal = false;
};
//新增部门下用户
const insertRoleGroup = () => {
  if (!state.groupName) {
    ElMessage.error("请选择用户");
  } else {
    let params = {
      emplDept: {
        deptId: state.roleCode,
        teamId: localStorage.getItem("engine-teamid"),
        userId: state.groupName,
      },
    };
    http.departManagement.addTeamUser(params).then((res: any) => {
      if (res.code == 0) {
        ElMessage.success("操作成功");
        getRoleGroup();
        getGroupList(); //查询用户列表
        state.groupName = "";
      } else {
        ElMessage.error(res.message);
      }
    });
  }
};
//删除部门下的用户
const deleteRoleGroup = (row: any) => {
  let param = {
    deptId: state.roleCode,
    teamId: localStorage.getItem("engine-teamid"),
    userId: row.userId,
  };
  http.departManagement.deleteTeamUser(param).then((res: any) => {
    if (res.code == 0) {
      ElMessage.success("操作成功");
      getRoleGroup();
      getGroupList(); //查询用户列表
    } else {
      ElMessage.error(res.message);
    }
  });
};
//用户
const groupEvent = (row: any) => {
  state.groupModal = true;
  state.roleCode = row.deptId;
  state.groupName = "";
  getRoleGroup(); //查询部门下用户
  getGroupList(); //查询用户列表
};
//获取部门下用户
const getRoleGroup = () => {
  let param = {
    deptId: state.roleCode,
    teamId: localStorage.getItem("engine-teamid"),
  };
  http.departManagement.getTeamUser(param).then((res: any) => {
    if (res.code == 0) {
      state.groupTableData = res.data.result;
    } else {
      ElMessage.error(res.message);
    }
  });
};
//查询用户列表
const getGroupList = () => {
  http.departManagement.getNoneUser().then((res: any) => {
    if (res.code == 0) {
      state.groupNameList = res.data;
    } else {
      ElMessage.error(res.message);
    }
  });
};
// 删除
const confirmDelete = (row: any) => {
  let param = {
    deptId: row.deptId,
    teamId: row.teamId,
  };
  http.departManagement.removeTeam(param).then((res: any) => {
    if (res.code === 0) {
      getList();
      ElMessage.success("删除成功");
    } else {
      ElMessage.error(res.message);
    }
  });
};
// 批量删除
const batchDelete = () => {
  if (state.selectionList.length !== 0) {
    state.selectionList.map((item: any) => {
      return state.teamIdArray.push(item.teamId);
    });
    http.organizationalManagement
      .removeTeam({
        teamIds: state.teamIdArray.toString(),
      })
      .then((res: any) => {
        if (res.code == 0) {
          ElMessage.success("批量删除成功");
          state.fitData = "";
          getList();
        } else {
          ElMessage.error(res.message);
        }
      });
    state.teamIdArray = [];
    state.selectionList = [];
  } else {
    ElMessage.error("请勾选要删除的组织");
  }
};
// 修改提交表单
const modifyConfirm = () => {
  let params = {
    // address: state.modifyData.address,
    // cityCode: state.modifyData.cityCode,
    description: state.modifyData.description,
    fullName: state.modifyData.fullName,
    // postalCode: state.modifyData.postalCode,
    // provinceCode: state.modifyData.provinceCode,
    // regionCode: state.modifyData.regionCode,
    realFullName: state.modifyData.shortName,
    deptId: state.modifyData.deptId,
    teamId: localStorage.getItem("engine-teamid"),
  };
  http.departManagement.updateTeam(params).then((res: any) => {
    if (res.code == 0) {
      ElMessage.success("修改成功");
      getList();
    } else {
      ElMessage.error(res.message);
    }
  });
  state.showModify = false;
};
//  新增提交表单
const confirm = (f: any) => {
  if (f.fullName === null) {
    ElMessage.error("组织全名不能为空");
  } else if (f.shortName === null) {
    ElMessage.error("组织简称不能为空");
  }
  // else if (f.address === null) {
  //   ElMessage.error("详细地址不能为空");
  // }
  else if (f.description === null) {
    ElMessage.error("描述不能为空");
  } else {
    let code: any;
    if (store.state.user.roleInfo) {
      code = JSON.parse(store.state.user.roleInfo).code;
    }
    let params = {
      // address: state.ruleForm.address,
      // cityCode: state.ruleForm.cityCode,
      description: state.ruleForm.description,
      fullName: state.ruleForm.fullName,
      // postalCode: state.ruleForm.postalCode,
      // provinceCode: state.ruleForm.provinceCode,
      // regionCode: state.ruleForm.regionCode,
      realFullName: state.ruleForm.shortName,
      teamId: localStorage.getItem("engine-teamid"),
      // createUid: localStorage.getItem("userId"),
      roleCode: code,
    };

    http.departManagement.createTeam(params).then((res: any) => {
      if (res.code == 0) {
        ElMessage.success("新增成功");
        getList();
      } else {
        ElMessage.error(res.message);
      }
    });
    state.showAdd = false;
  }
};
//修改任务
const update = (row: any) => {
  state.title = "修改";
  state.showModify = true;
  state.modifyData.deptId = row.deptId;
  state.modifyData.address = row.address;
  state.modifyData.fullName = row.fullName;
  state.modifyData.shortName = row.realFullName;
  state.modifyData.description = row.description;
  state.modifyData.postalCode = row.postalCode;
  state.modifyData.provinceCode = row.provinceCode;
  state.modifyData.regionCode = row.regionCode;
  state.modifyData.cityCode = row.cityCode;
  nextTick(() => {
    state.modifyData.modifyArray = [];
    if (row.provinceCode !== "undefined,undefined") {
      state.modifyData.modifyArray.push(
        parseInt(row.provinceCode.split(",")[0])
      );
    }
    if (row.cityCode !== "undefined,undefined") {
      state.modifyData.modifyArray.push(parseInt(row.cityCode.split(",")[0]));
    }

    if (row.regionCode !== "undefined,undefined") {
      state.modifyData.modifyArray.push(parseInt(row.regionCode.split(",")[0]));
    }
  });
};
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

  state.ruleForm.provinceCode = null;
  state.ruleForm.fullName = null;
  state.ruleForm.shortName = null;
  state.ruleForm.address = null;
  state.ruleForm.newLyadded = null;
  state.ruleForm.description = null;
  state.ruleForm.postalCode = null;
};
// 请求组织数据
const getList = () => {
  let params = {
    pageNum: state.pageNum,
    pageSize: state.pageSize,
    teamName: state.fitData,
  };
  http.organizationalManagement.getTeamInfoList(params).then((res: any) => {
    if (res.code == 0) {
      state.total = res.data.total;
      state.linkageData = res.data.teamInfoList;
      // state.linkageData.forEach((item: any) => {
      //   item.regionName = item.regionCode.split(",")[1];
      //   item.provinceName = item.provinceCode.split(",")[1];
      //   item.cityName = item.cityCode.split(",")[1];
      // });
    } else {
      ElMessage.error(res.message);
    }
  });
};
// 模糊搜索
const search = () => {
  if (state.fitData) {
    state.pageSize = 10;
    state.pageNum = 1;
  }
  getList();
};

//  新增切换城市事件
const handleChange = (value: any) => {
  state.newLableArr = cascaderAdd.value.getCheckedNodes()[0].pathLabels;
  let newArr: any = [];
  for (var i = 0; i < value.length; i++) {
    newArr.push(value[i]);
    newArr.push(state.newLableArr[i]);
  }
  var newObj: any = {};
  for (var j = 0; j < newArr.length; j++) {
    if (j % 2 === 0) {
      newObj[newArr[j]] = newArr[j + 1];
    }
  }
  let key: any = {};
  key = Object.keys(newObj);
  newObj = Object.values(newObj);
  state.ruleForm.newLyadded = value;
  state.ruleForm.provinceCode = `${key[0]},${newObj[0]}`;
  state.ruleForm.cityCode = `${key[1]},${newObj[1]}`;
  state.ruleForm.regionCode = `${key[2]},${newObj[2]}`;
};
// 修改切换城市事件
const modifyChange = (value: any) => {
  nextTick(() => {
    state.modifyLableArr = cascaderUpdate.value.getCheckedNodes()[0].pathLabels;
    let modifyArr: any = [];
    for (var i = 0; i < value.length; i++) {
      modifyArr.push(value[i]);
      modifyArr.push(state.modifyLableArr[i]);
    }
    var modifyObj: any = {};
    for (var j = 0; j < modifyArr.length; j++) {
      if (j % 2 === 0) {
        modifyObj[modifyArr[j]] = modifyArr[j + 1];
      }
    }
    let key: any = {}; //创建新的对象来放对象的键
    key = Object.keys(modifyObj);
    modifyObj = Object.values(modifyObj);

    state.modifyData.provinceCode = `${key[0]},${modifyObj[0]}`;
    if (state.modifyData.cityCode !== "undefined,undefined") {
      state.modifyData.cityCode = `${key[1]},${modifyObj[1]}`;
    }
    if (
      state.modifyData.regionCode !== "undefined,undefined" ||
      state.modifyData.regionCode !== null
    ) {
      state.modifyData.regionCode = `${key[2]},${modifyObj[2]}`;
    }
  });
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
// 全选
const onSelectAll = (selectionAll: any) => {
  state.selectionList = selectionAll;
};
// 单选
const select = (selection: any) => {
  state.selectionList = selection;
};
</script>

<style lang="less" scoped>
.institution-manage-content {
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: @global-padding;
  box-sizing: border-box;
  .safety-domain-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    .domain-header-left {
      display: flex;
      justify-content: left;
      .header-left-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: 20px;
        border-radius: 5px;
        :deep(.el-input) {
          width: 300px;
          background: transparent;
          border-radius: 5px;
          height: 40px;
          color: @main-font-color;
        }
        span {
          flex-shrink: 0;
          // margin-right: 20px;
          padding-right: @title-padding;
          font-size: @main-font-size;
          color: @main-font-color;
          text-align: center;
        }
      }
    }
  }
  .pie-tb-iscontent {
    margin-top: 20px;
  }
  //用户弹框
  .modal-box {
    .header-line {
      display: flex;
      align-items: center;
      color: @main-font-color;
      align-items: center;
      margin-bottom: 20px;
      .text {
        // width: 80px;
        padding-right: @title-padding;
      }
      :deep(.el-select) {
        width: 300px;
        height: 40px;
      }
      .el-input {
        height: 40px;
      }
      :deep(.el-input__wrapper) {
        width: 300px;
        flex-grow: 0;
        height: 40px;
      }
    }
  }
  //新增
  .modal-content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    :deep(.el-transfer-panel),
    :deep(.el-transfer-panel .el-transfer-panel__header) {
      background: transparent;
      color: @main-font-color;
    }
    :deep(.el-input__inner),
    :deep(.el-checkbox__inner) {
      background: transparent;
      color: @main-font-color;
    }
    :deep(.el-checkbox__label) {
      color: @main-font-color;
    }
    .style-transfer {
      width: 300px;
      color: @main-font-color;
      font-size: @main-font-size;
    }
    .modal-label-name {
      display: inline-block;
      width: 100px;
      text-align: right;
      padding-right: @title-padding;
      color: @main-font-color;
      font-size: @main-font-size;
    }
    .el-input,
    .el-textarea {
      width: 300px;
      background: transparent;
      border-radius: 5px;
      color: @main-font-color;
    }
    .el-input {
      height: 40px;
      border: 1px solid @global-border-color;
    }
    :deep(.el-input__wrapper) {
      width: 300px;
      flex-grow: 0;
      height: 40px;
    }
    :deep(.el-textarea__inner) {
      background: transparent;
      color: @main-font-color;
    }
    :deep(.el-cascader) {
      width: 300px;
    }
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
  .el-textarea {
    --el-input-placeholder-color: @special-font-color;
  }
}
</style>

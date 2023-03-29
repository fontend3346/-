<template>
  <!-- 查看模板详情 -->
  <div>
    <my-modal
      width="30"
      height="60"
      title="详情"
      @confirm="lookOver"
      v-model="isModal"
      :resetBtn="false"
      :cancelBtn="false"
      :close="false"
    >
      <div v-solt:operateItem class="look">
        <template>
          <div class="look-item" v-for="item in tableTitle" :key="item.key">
            <div class="look-item-title">{{ item.title }}:</div>
            <div class="look-item-dsc">{{ dataObject[item.key] }}</div>
          </div>
        </template>
      </div>
    </my-modal>
  </div>
</template>
<script lang="ts">
import myModal from "@/components/modals/modal.vue";
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  getCurrentInstance,
  watch,
} from "vue";
export default {
  components: {
    myModal,
  },
  props: {
    tableTitle: {
      type: Array,
      default: () => {
        return [
          { title: "单位名称", key: "address" },
          { title: "单位名称", key: "createTime" },
          { title: "备注", key: "memo" },
        ];
      },
    },
    dataObject: {
      type: Object,
      default: () => {
        return {
          address: "朝阳",
          code: "2",
          createTime: "2020-12-07 12:18:45",
          createUser: "",
          endTime: "",
          fax: "",
          id: 8,
          lastModifierUser: "",
          lastModifyTime: "",
          memo: "朝阳",
          name: "朝阳",
          pageNum: "",
          pageSize: "",
          row: 1,
          startTime: "",
          zipcode: "110000",
          _index: 0,
          _rowKey: 210,
        };
      },
    },
    isModal: {
      //控制是否弹出框
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const {
      appContext: {
        config: { globalProperties },
      },
    } = getCurrentInstance() as any;
    const state = reactive({
      isShow: true,
    });
    const lookOver = () => {
      state.isShow = false;
      emit("lookOver");
    };
    watch(globalProperties.isModal, (newVal, oldVal) => {
      globalProperties.isShow = newVal;
    });
    return {
      ...toRefs(state),
      lookOver,
    };
  },
};
</script>

<style lang="less" scoped>
.look-item {
  display: flex;
  margin: 16px;

  .look-item-title {
    font-size: 20px;
    width: 35%;
    text-align: right;
  }

  .look-item-dsc {
    font-size: 18px;
    margin-left: 12px;
  }
}
</style>
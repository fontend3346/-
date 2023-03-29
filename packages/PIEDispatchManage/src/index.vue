<template>
  <div class="pie-dispatch-manage">
    <!-- 左边 -->
    <div class="dispatch-manage-left">
      <div class="left-title">{{ props.dispatchMainTitle }}</div>
      <div class="card-con">
        <div
          class="left-content"
          v-for="(item, index) in props.dispatchMainList"
          :key="index"
          @click="workTickets(item, index)"
          :class="{ actives: state.activeIndex === index }"
        >
          <div class="content-item item">
            <span class="content-item-title">{{ item.workOrderId }}</span>
            <span class="iconfont icon-haofangtuo400iconfontpai"></span>
          </div>
          <div class="item">{{ item.workOrderName }}</div>
          <div class="item">{{ item.measurementName }}</div>
          <!-- <div class="item">{{ item.ticketsName }}</div> -->
          <div class="content-end item">
            <span class="iconfont icon-renyuanguanli"></span>
            <span class="">{{ item.handlerPhone }}</span>
          </div>
        </div>
        <div class="left-title" v-if="props.dispatchMainList.length == 0">
          暂无数据
        </div>
      </div>
      <!-- 分页 -->
      <PIEPage
        class="page-style"
        :pagerCount="3"
        :total="props.total"
        :isSmall="isSmall"
        :pageSize="state.pageSize"
        :currentPage="state.pageNum"
        @handleSizeChange="sizeChange"
        @handleNumChange="pageChange"
      ></PIEPage>
    </div>
    <!-- 右边 -->
    <div class="dispatch-manage-right">
      <div class="right-top">
        <div class="right-top-title">
          <span class="title-name">{{ props.detailShowList.workOrderId }}</span>
          <span>{{ props.detailShowList.stationName }}</span>
        </div>
        <!-- <div class="right-top-item">描述 : {{ props.detailShowList.desc }}</div>
        <div class="right-top-item">
          原因 : {{ props.detailShowList.cause }}
        </div> -->
        <div class="right-top-bot">
          <div class="item-content">
            <span>描述：</span>
            <span>{{ props.detailShowList.description }}</span>
          </div>
          <div class="item-content">
            <span>原因：</span>
            <span>{{ props.detailShowList.faultPhenomenon }}</span>
          </div>
          <div class="item-content">
            <span>台站名称：</span>
            <span>{{ props.detailShowList.stationName }}</span>
          </div>
          <div class="item-content">
            <span>处理人：</span>
            <span>{{ props.detailShowList.handlerPhone }}</span>
          </div>
          <div class="item-content">
            <span>台站地址：</span>
            <span>{{ props.detailShowList.networkName }}</span>
          </div>
          <div class="item-content">
            <span>派单时间：</span>
            <span>{{ props.detailShowList.createTime }}</span>
          </div>
          <div class="item-content">
            <span>台站测项：</span>
            <span>{{ props.detailShowList.measurementName }}</span>
          </div>
          <div class="item-content">
            <span>派单人：</span>
            <span>{{ props.detailShowList.dispatcherName }}</span>
          </div>
          <div class="item-content"></div>
        </div>
      </div>
      <!-- 步骤条 -->
      <div class="right-bot">
        <div class="right-bot-title">
          <span class="title-name">{{ props.detailShowList.duration }}</span>
        </div>
        <div class="steps-style">
          <el-steps :active="props.activeStep" direction="vertical">
            <el-step
              v-for="(item, index) in props.stepsInfo"
              :key="index"
              :title="item.title"
            >
              <template v-slot:icon>
                <i>{{ item.processStep }}</i>
              </template>
              <template v-slot:description>
                <div class="description-style">
                  <span>{{ item.info }}</span>
                  <div class="steps-info" v-if="item.processStep != 1">
                    故障是否解决：
                    <span class="is-Resolve">{{
                      item.resolve ? "解决" : "未解决"
                    }}</span>
                  </div>
                  <div class="steps-info" v-if="item.processStep != 1">
                    处理说明：<span class="is-Resolve">{{
                      item.solution
                    }}</span>
                  </div>
                  <!-- <img :src="item.images" alt="" v-if="item.processStep != 1" /> -->
                  <div
                    @click="imagesModal(item.images)"
                    class="file-modal"
                    v-if="
                      item.processStep != 1 &&
                      item.images &&
                      item.images.length > 0
                    "
                  >
                    查看图片({{ item.images.length }})>>
                  </div>
                  <!-- <div v-for="(items, index) in item.images" :key="index">
                    <img
                      :src="items.imagePath"
                      alt=""
                      v-if="item.processStep != 1"
                    />
                  </div> -->
                  <br />
                  <div>{{ item.time }}</div>
                  <div
                    @click="fileModal(item.files)"
                    class="file-modal"
                    v-if="
                      item.processStep != 1 &&
                      item.files &&
                      item.files.length > 0
                    "
                  >
                    查看附件({{ item.files.length }})>>
                  </div>
                </div>
              </template>
            </el-step>
          </el-steps>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useHandler } from "./hooks";

const emit = defineEmits<{
  (event: "workTickets", e: MouseEvent): void;
  (event: "fileModal", e: MouseEvent): void;
  (event: "imagesModal", e: MouseEvent): void;
  (event: "sizeChange", e: MouseEvent): void;
  (event: "pageChange", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    dispatchMainList?: any;
    stepsInfo?: any;
    detailShowList?: any;
    activeIndex: Number;
    dispatchMainTitle: String;
    activeStep: String;
    total: Number;
    isSmall: String;
  }>(),
  {
    dispatchMainList: [],
    stepsInfo: [],
    detailShowList: {},
    activeIndex: 0,
    dispatchMainTitle: "",
    activeStep: "",
    total: 10,
    isSmall: " prev, pager, next,jumper",
  }
);
const { state, workTickets, imagesModal, fileModal, pageChange, sizeChange } =
  useHandler(props, emit);
</script>

<style scoped lang="less"></style>

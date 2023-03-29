<template>
  <div class="station-box" v-show="showStation">
    <div class="title-box">
      <div class="title-trape"></div>
      <span class="title-text">{{ titleName }}</span>
    </div>
    <div class="icon-box">
      <template v-for="(item, index) in stationList" :key="item.name">
        <div class="icon-box-response">
          <div class="icon-one" :class="{ activeicon: activeIndex == index }" @click="selectActive(item, index)">
            <span class="iconfont" :class="iconName"></span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHandler } from "./hooks";

const emit = defineEmits<{
  (event: "click", e: MouseEvent): void;
  (event: "selectActive", e: MouseEvent): void;
}>();

const props = withDefaults(
  defineProps<{
    stationList: any,
    titleName: string,
    iconName: string,
    showStation: boolean,
  }>(),
  {
    stationList: [],
    titleName: '地震台站',
    iconName: '',
    showStation: true,
  }
);


const { activeIndex, selectActive } = useHandler(props, emit);
</script>

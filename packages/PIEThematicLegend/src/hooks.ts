import { Emits, Props } from "./interfaces";
import { reactive, onMounted, ref } from "vue";
import baseCharts from "@/plugins/lib/baseCharts";
// 操作
export const useHandler = (props: Props, emit: Emits) => {
  const state = reactive({
    thematicList: [
      {
        color: "rgba(0,0,128,0.3)",
        num: "0~20万"
      },
      {
        color: "rgba(0,0,205,0.3)",
        num: "20~40万"
      },
      {
        color: "rgba(0,0,255,0.3)",
        num: "40~60万"
      },
      {
        color: "rgba(65,105,225,0.3)",
        num: "60~80万"
      },
      {
        color: "rgba(30,144,255,0.3)",
        num: "80~100万"
      },
      {
        color: "rgba(0,191,255,0.3)",
        num: "100~200万"
      },
      {
        color: "rgba(135,206,210,0.3)",
        num: "200~300万"
      },
      {
        color: "rgba(135, 206, 250,0.3)",
        num: "300~400万"
      },
      {
        color: "rgba(173,216,230,0.3)",
        num: "400~2000万"
      },
      {
        color: "rgba(240,248,255,0.3)",
        num: "2000万以上"
      },
    ],//数据
  });
  onMounted(() => {
  });
  const close = (e: any) => {
    emit("close", e)
  }
  return { state, close };
};

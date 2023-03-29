import { Emits, Props } from "./interfaces";

// 操作
export const useHandler = (props: Props, emit: Emits) => {
  //每页显示条数改变时触发
  const handleSizeChange = (e: MouseEvent) => {
    emit("handleSizeChange", e);
  };
  //改变选中页数时触发
  const handleNumChange = (e: MouseEvent) => {
    emit("handleNumChange", e);
  };
  return {
    handleSizeChange,
    handleNumChange,
  };
};

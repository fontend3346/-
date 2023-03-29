function subThread () {
  postMessage('webWorker1:我在子线程发送消息执行了！');
  self.onmessage=(event) => {
    console.log(event.data);
  };
}
export default subThread;

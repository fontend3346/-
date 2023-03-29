import cement3 from "@/assets/images/measureModel/cement3.png";
import cement from "@/assets/images/measureModel/cement.png";
import cement2 from "@/assets/images/measureModel/cement2.png";
import cement4 from "@/assets/images/measureModel/cement4.png";
import wang from "@/assets/images/measureModel/wang.png";
import wang3 from "@/assets/images/measureModel/wang3.png";
import wang1 from "@/assets/images/measureModel/wang1.png";
import earthquake from "@/assets/images/measureModel/earthquake.png";
import earthquake2 from "@/assets/images/measureModel/earthquake2.png";
import inner from "@/assets/images/measureModel/inner.jpg";
import inner2 from "@/assets/images/measureModel/inner2.png";
import inner3 from "@/assets/images/measureModel/inner3.jpg";
import ploe from "@/assets/images/measureModel/ploe.png";
import ploe2 from "@/assets/images/measureModel/ploe2.png";
import tiepi1 from "@/assets/images/measureModel/tiepi1.png";
import posx from "@/assets/images/measureModel/posx.jpg";
import negx from "@/assets/images/measureModel/negx.jpg";
import posy from "@/assets/images/measureModel/posy.jpg";
import negy from "@/assets/images/measureModel/negy.jpg";
import posz from "@/assets/images/measureModel/posz.jpg";
import negz from "@/assets/images/measureModel/negz.jpg";
import cy1 from "@/assets/images/measureModel/cy1.png";
import grass from "@/assets/images/measureModel/grass.jpg";
let state = {
  wangData: [ // 铁丝网
    {
      id: 1,
      position: {
        x: -250,
        y: 150,
        z: 500
      },
      size: {
        width: 500,
        height: 300,
        length: 1
      },
      rotate: 0,
      skin: wang3
    },
    {
      id: 2,
      position: {
        x: 260,
        y: 150,
        z: 500
      },
      size: {
        width: 500,
        height: 300,
        length: 1
      },
      rotate: 0,
      skin: wang3
    },
    {
      id: 3,
      position: {
        x: 500,
        y: 150,
        z: 350
      },
      size: {
        width: 300,
        height: 300,
        length: 1
      },
      name: '门',
      rotate: -Math.PI / 2,
      skin: wang1
    },
    {
      id: 4,
      position: {
        x: 500,
        y: 150,
        z: -150
      },
      size: {
        width: 700,
        height: 300,
        length: 1
      },
      rotate: -Math.PI / 2,
      skin: wang3
    },
    {
      id: 5,
      position: {
        x: -250,
        y: 150,
        z: -500
      },
      size: {
        width: 500,
        height: 300,
        length: 1
      },
      rotate: 0,
      skin: wang3
    },
    {
      id: 6,
      position: {
        x: 260,
        y: 150,
        z: -500
      },
      size: {
        width: 500,
        height: 300,
        length: 1
      },
      rotate: 0,
      skin: wang3
    },
    {
      id: 7,
      position: {
        x: -500,
        y: 150,
        z: 250
      },
      size: {
        width: 500,
        height: 300,
        length: 1
      },
      rotate: Math.PI / 2,
      skin: wang3
    },
    {
      id: 8,
      position: {
        x: -500,
        y: 150,
        z: -250
      },
      size: {
        width: 500,
        height: 300,
        length: 1
      },
      rotate: Math.PI / 2,
      skin: wang3
    },
  ],
  tubeData: [ // 管道模型
    {
      id: 1,
      position: {
        x: 160,
        y: 15,
        z: 0
      },
      rotateZ: -Math.PI / 4,
      rotateY: 0,
      rotateX: 0
    },
    {
      id: 2,
      position: {
        x: 150,
        y: 15,
        z: 60
      },
      rotateZ: -Math.PI / 4,
      rotateY: 0,
      rotateX: 0
    },
    {
      id: 3,
      position: {
        x: 150,
        y: 15,
        z: -60
      },
      rotateZ: -Math.PI / 4,
      rotateY: 0,
      rotateX: 0
    },
    {
      id: 4,
      position: {
        x: -160,
        y: 15,
        z: 0
      },
      rotateZ: Math.PI / 4,
      rotateY: 0,
      rotateX: 0
    },
    {
      id: 5,
      position: {
        x: -150,
        y: 15,
        z: 60
      },
      rotateZ: Math.PI / 4,
      rotateY: 0,
      rotateX: 0
    },
    {
      id: 6,
      position: {
        x: -150,
        y: 15,
        z: -60
      },
      rotateZ: Math.PI / 4,
      rotateY: 0,
      rotateX: 0
    },
  ],
  tripodData: [ // 三脚架
    {
      id: 1,
      position: {
        x: -400,
        y: 100,
        z: 10,
      },
      rotateX: Math.PI / 8,
      rotateY: 0,
      rotateZ: 0
    },
    {
      id: 2,
      position: {
        x: -440,
        y: 100,
        z: 100,
      },
      rotateX: -Math.PI / 10,
      rotateY: 0,
      rotateZ: -Math.PI / 12
    },
    {
      id: 3,
      position: {
        x: -360,
        y: 100,
        z: 100,
      },
      rotateX: -Math.PI / 10,
      rotateY: 0,
      rotateZ: Math.PI / 12
    },
  ],
  deviceData: [ // 设备盒子
    {
      id: 1,
      size: {
        width: 80,
        height: 40,
        length: 3,
      },
      position: {
        x: -330,
        y: 70,
        z: -300,
      },
      skin: tiepi1,
      rotate: {
        y: 0,
        x: 0,
        z: 0
      }
    },
    {
      id: 2,
      size: {
        width: 80,
        height: 40,
        length: 3,
      },
      position: {
        x: -330,
        y: 70,
        z: -380,
      },
      skin: tiepi1,
      rotate: {
        y: 0,
        x: 0,
        z: 0
      }
    },
    {
      id: 3,
      size: {
        width: 80,
        height: 40,
        length: 3,
      },
      position: {
        x: -370,
        y: 70,
        z: -340,
      },
      skin: tiepi1,
      rotate: {
        y: Math.PI / 2,
        x: 0,
        z: 0
      }
    },
    {
      id: 4,
      size: {
        width: 80,
        height: 40,
        length: 3,
      },
      position: {
        x: -290,
        y: 70,
        z: -340,
      },
      skin: tiepi1,
      rotate: {
        y: -Math.PI / 2,
        x: 0,
        z: 0
      }
    },
    {
      id: 5,
      size: {
        width: 80,
        height: 80,
        length: 1,
      },
      position: {
        x: -330,
        y: 50,
        z: -340,
      },
      skin: inner,
      rotate: {
        y: 0,
        x: Math.PI / 2,
        z: 0
      }
    },
    {
      id: 6,
      size: {
        width: 80,
        height: 80,
        length: 3,
      },
      position: {
        x: -330,
        y: 90,
        z: -340,
      },
      skin: tiepi1,
      name: '仪器盖子',
      rotate: {
        y: 0,
        x: Math.PI / 2,
        z: 0
      }
    },
  ],
  conectData: [ // 地震通讯盒子
    { // 前
      id: 1,
      size: {
        width: 100,
        height: 70,
        length: 2,
      },
      position: {
        x: 450,
        y: 200,
        z: -390,
      },
      skin: earthquake,
      skin2: earthquake2,
      rotate: {
        y: 0,
        x: 0,
        z: 0
      },
      name: '地震盒子前'
    },
    { // 后
      id: 2,
      size: {
        width: 100,
        height: 70,
        length: 2,
      },
      position: {
        x: 450,
        y: 200,
        z: -445,
      },
      skin: earthquake2,
      rotate: {
        y: 0,
        x: 0,
        z: 0
      }
    },
    { // 左
      id: 3,
      size: {
        width: 55,
        height: 70,
        length: 2,
      },
      position: {
        x: 400,
        y: 200,
        z: -417.5,
      },
      skin: earthquake2,
      rotate: {
        y: -Math.PI / 2,
        x: 0,
        z: 0
      },
    },
    { // 右
      id: 4,
      size: {
        width: 55,
        height: 70,
        length: 2,
      },
      position: {
        x: 500,
        y: 200,
        z: -417.5,
      },
      skin: earthquake2,
      rotate: {
        y: -Math.PI / 2,
        x: 0,
        z: 0
      },
    },
    { // 上
      id: 5,
      size: {
        width: 100,
        height: 55,
        length: 2,
      },
      position: {
        x: 450,
        y: 235,
        z: -417.5,
      },
      skin: earthquake2,
      rotate: {
        y: 0,
        x: Math.PI / 2,
        z: 0
      },
    },
    { // 下
      id: 6,
      size: {
        width: 100,
        height: 55,
        length: 2,
      },
      position: {
        x: 450,
        y: 165,
        z: -417.5,
      },
      skin: earthquake2,
      rotate: {
        y: 0,
        x: Math.PI / 2,
        z: 0
      },
    },
  ],
  movePosition: {
    left: 0,
    top: 0
  },
  meshInfo: ''
}
export {
  state,
  cement3,
  cement,
  cement2,
  cement4,
  wang,
  wang1,
  earthquake,
  earthquake2,
  inner,
  inner2,
  inner3,
  ploe,
  ploe2,
  posx,
  negx,
  posy,
  negy,
  posz,
  negz,
  cy1,
  tiepi1,
  grass
}
export default {
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
      skin: 'image/wang3.png'
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
      skin: 'image/wang3.png'
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
      skin: 'image/wang1.png'
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
      skin: 'image/wang3.png'
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
      skin: 'image/wang3.png'
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
      skin: 'image/wang3.png'
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
      skin: 'image/wang3.png'
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
      skin: 'image/wang3.png'
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
      skin: 'image/tiepi1.png',
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
      skin: 'image/tiepi1.png',
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
      skin: 'image/tiepi1.png',
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
      skin: 'image/tiepi1.png',
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
      skin: 'image/inner.jpg',
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
      skin: 'image/tiepi1.png',
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
      skin: 'image/earthquake.png',
      skin2: 'image/earthquake2.png',
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
      skin: 'image/earthquake2.png',
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
      skin: 'image/earthquake2.png',
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
      skin: 'image/earthquake2.png',
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
      skin: 'image/earthquake2.png',
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
      skin: 'image/earthquake2.png',
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
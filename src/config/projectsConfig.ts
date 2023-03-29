const { name } = require("../../package.json");
const config = {
  // 数据汇集与管理分系统
  dataManage: {
    pages: {
      index: {
        entry: "src/applications/dataManage/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  // 数据质量与监测能力分析分系统
  dataMonitor: {
    pages: {
      index: {
        entry: "src/applications/dataMonitor/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  // 数据公报与服务分系统
  dataServer: {
    pages: {
      index: {
        entry: "src/applications/dataServer/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  // ****综合研判分系统
  comAnalysis: {
    pages: {
      index: {
        entry: "src/applications/comAnalysis/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  // ****综合研判分系统
  coringQB: {
    pages: {
      index: {
        entry: "src/applications/coringQB/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      hot: true,
      disableHostCheck: true,
      overlay: {
        warnings: false,
        errors: true,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  },
  // HFHZC数据管理
  hProtection: {
    pages: {
      index: {
        entry: "src/applications/hProtection/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  // 运行监控与综合显示分系统
  operationMonitoring: {
    pages: {
      index: {
        entry: "src/applications/operationMonitoring/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  // 系统管理分系统
  systemManagement: {
    pages: {
      index: {
        entry: "src/applications/systemManagement/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  // 运行管理分系统
  runManagement: {
    pages: {
      index: {
        entry: "src/applications/runManagement/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  // XX分系统
  subSystem: {
    pages: {
      index: {
        entry: "src/applications/subSystem/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  // xh警告分系统
  xhAlarmSys: {
    pages: {
      index: {
        entry: "src/applications/xhAlarmSys/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  // 地图可视化分系统
  visualization: {
    pages: {
      index: {
        entry: "src/applications/visualization/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  // HFHZC数据处理
  nuclearProtective: {
    pages: {
      index: {
        entry: "src/applications/nuclearProtective/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  qbDistribute: {
    pages: {
      index: {
        entry: "src/applications/qbDistribute/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
  },
  //HFHZC数据接收
  npZJdata: {
    pages: {
      index: {
        entry: "src/applications/npZJdata/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
  },
  // GNSS分系统
  gnssServer: {
    pages: {
      index: {
        entry: "src/applications/gnssServer/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  // 地震业务综合处理分系统设计
  busDispose: {
    pages: {
      index: {
        entry: "src/applications/busDispose/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  // 地震信息精化细化
  infoRefinement: {
    pages: {
      index: {
        entry: "src/applications/infoRefinement/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  //探测数据在线/离线质量评估
  detectionData: {
    pages: {
      index: {
        entry: "src/applications/detectionData/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  // 业务处理质量评估
  qualityAssess: {
    pages: {
      index: {
        entry: "src/applications/qualityAssess/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  // 业务处理监控
  serviceMonitor: {
    pages: {
      index: {
        entry: "src/applications/serviceMonitor/main.ts",
        template: "src/applications/serviceMonitor/public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  // 地震台阵
  earthStage: {
    pages: {
      index: {
        entry: "src/applications/earthStage/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  // 火山台阵
  volcanoStage: {
    pages: {
      index: {
        entry: "src/applications/volcanoStage/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  // 地磁台
  geomagnetism: {
    pages: {
      index: {
        entry: "src/applications/geomagnetism/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  // 重力台
  gravityTable: {
    pages: {
      index: {
        entry: "src/applications/gravityTable/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  // 机动车组
  motorUnits: {
    pages: {
      index: {
        entry: "src/applications/motorUnits/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  // 深井台
  deepWell: {
    pages: {
      index: {
        entry: "src/applications/deepWell/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  // 登录
  login: {
    pages: {
      index: {
        entry: "src/applications/login/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
  //  IOT agent分系统
  equipPluglet: {
    pages: {
      index: {
        entry: "src/applications/equipPluglet/main.ts",
        template: "public/index.html",
        filename: "index.html",
      },
    },
    devServer: {
      port: 8080, // 端口地址
      disableHostCheck: true,
      hot: true,
      open: true,
      // 设置代理
      proxy: {
        "/eopenhapi": {
          target: "http://open.jdpay.com",
          changeOrigin: true,
        },
      },
    },
  },
};
module.exports = config;

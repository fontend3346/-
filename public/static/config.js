window.gateway = {
    // baseUrl: "http://172.16.40.166:30922", //基础路径 30922
    baseUrl: "https://piecloud.piesat.cn/earthquake-server/dev", //客户线上-打包地址
    // baseUrl: "https://10.2.203.185:30843/earthquake-server", // 球所
    // mapUrl: "http://wprd04.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=2&style=7",
    mapUrl: "https://webst03.is.autonavi.com/appmaptile?style=6&z={z}&y={y}&x={x}", //地图链接
    mapUrlData: 'https://iserver.supermap.io/iserver/services/map-china400/rest/maps/ChinaDark/zxyTileImage.png?z={z}&x={x}&y={y}',
    mapUrlPIE: "https://engine.piesat.cn/hr_data/wmts?tilematrix={z}&layer=wmts_ifile&style=wmts_satellite&tilecol={x}&tilerow={y}&tilematrixset=Global_ifile&format=image%2Fjpeg&service=WMTS&version=1.0.0&request=GetTile",
    // mapUrl: "https://engine.piesat.cn/hr_data/wmts?tilematrix={z}&layer=wmts_ifile&style=wmts_satellite&tilerow={y}&tilecol={x}&tilematrixset=Global_ifile&format=image%2Fjpeg&service=WMTS&version=1.0.0&request=GetTile",
    //piesatUrl: "https://piecloud.piesat.cn/hq-server",
    // dataUrl: "http://10.1.52.38:8099/earthquake",
    // homeUrl: "http://10.1.52.38:11000",
    // dataEngine: "http://172.16.40.166:30922", //数据引擎专用8082
    // productsConvergence: "http://124.70.59.55:30080/portal/#/Application/DataImport", //产品汇聚服务子系统
    // dataDistribute: "http://124.70.59.55:30080/#/datas/MyDatas", //遥感数据分发子系统
    // mineTailings: "https://engine-dev.piesat.cn/deeplearning/modelevaluate/rsmonitor/platform", //矿山与尾矿库遥感监测子系统
    publishUrl: "http://10.1.30.236:18082", //等值线
    monitorUrl: "https://piecloud.piesat.cn/new_monitors", //资源监控模块
    loginUrl: "https://piecloud.piesat.cn/dz-server/dev/login/#/logins?ReturnUrl=https://piecloud.piesat.cn/dz-server/dev/main/#/home", //登录
    sourceUrl: "http://10.1.7.133:8084", // 数据源管理模块
    agentUrl: " https://piecloud.piesat.cn/iot-platform",//IOT-agent分系统
};
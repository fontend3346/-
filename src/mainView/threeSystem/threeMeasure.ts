import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import state from "./threeDatas";
import {
  reactive,
  nextTick,
  onMounted,
  ref,
  getCurrentInstance,
  watch,
} from "vue";
export const useHandlerThree = (threeRefs: any) => {
  let scene: any = null; // 场景容器
  let camera: any = null; // 相机对象
  let light: any = null; // 灯光1
  let light2: any = null; // 灯光2
  let renderer: any = null; // 渲染对象
  let controls: any = null; // 控件对象
  let helpGrid: any = null; // 网格对象
  let loader: any = null; // 纹理贴图对象
  let composer: any = null; // 创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
  let renderPass: any = null; // 新建一个场景通道  为了覆盖到原理来的场景上
  let outlinePass: any = null; // 物体边缘发光通道
  let curHoverUUID: any = null;
  let threeRef: any = null;
  let position = null;
  let moveShow = ref(false);
  let treePanelRef: any = ref(null);
  let moonLabel: any = null;
  let threeData: any = reactive({
    meshInfo: "",
    movePosition: {
      left: 0,
      top: 0,
    },
  });
  let composerPole: any = null; // 摄像头发光体
  let renderPassPole: any = null;
  // 初始化场景
  const initScene = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x225f93);
  };
  // 初始化相机
  const initCamera = () => {
    camera = new THREE.PerspectiveCamera(
      45, // 角度
      // window.innerWidth / window.innerHeight, // 渲染窗口的长宽比
      threeRef.value.clientWidth / threeRef.value.clientHeight,
      1, // 距离相机多选的位置开始渲染
      5000000 // 距离相机多远的位置截至渲染
    );
    camera.name = "mainCamera";
    // 相机位置
    camera.position.x = 500;
    camera.position.z = 800;
    camera.position.y = 800;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt({ x: 0, y: 0, z: 0 }); // 设置相机方向(指向的场景对象)
  };
  // 设置灯光
  const initLight = () => {
    light = new THREE.AmbientLight(0xffffff);
    light.position.set(0, 0, 0);
    scene.add(light);

    let spotLight: any = new THREE.SpotLight(0xffffff, 0.4); //聚光灯
    spotLight.position.set(800, 1000, 800);
    spotLight.castShadow = true; //表示这个光是可以产生阴影的
    spotLight.shadow.mapSize.width = 400;
    spotLight.shadow.mapSize.height = 400;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 5000;
    scene.add(spotLight);

    // let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5) //方向光
    // directionalLight.position.set(150, 300, 200);
    // // 对灯光设置
    // directionalLight.castShadow = true;
    // //设置阴影分辨率
    // directionalLight.shadow.mapSize.width = 2048;
    // directionalLight.shadow.mapSize.height = 2048;
    // scene.add(directionalLight);
  };
  let labelRenderer: any = null;
  // 创建渲染器
  const createRender = () => {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(threeRef.value.clientWidth, threeRef.value.clientHeight); // 设置渲染区域的展示
    threeRef.value.appendChild(renderer.domElement); // 将渲染对象插入到容器中
    //告诉渲染器需要阴影效果
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // renderer.outputEncoding = THREE.sRGBEncoding;

    // labelRenderer = new CSS2DRenderer();
    // labelRenderer.setSize(treePanelRef.value.clientWidth, treePanelRef.value.clientHeight);
    // labelRenderer.domElement.style.position = 'absolute';
    // labelRenderer.domElement.style.top = 0;
    //创建控件对象
    controls = new OrbitControls(camera, renderer.domElement);
    render();

    threeRef.value.addEventListener("click", onModelDown); // 鼠标点击事件
    threeRef.value.addEventListener("mousemove", onModelMove); // 鼠标移入事件
  };
  const render = () => {
    // labelRenderer.render(scene, camera);
    renderer.render(scene, camera);
    if (composer) {
      composer.render();
    }
    if (composerPole) {
      composerPole.render();
    }
    requestAnimationFrame(render); //请求再次执行渲染函数render
  };
  // 创建测点底部水泥半球
  const createHalfBall = () => {
    const geometry = new THREE.RingGeometry(150, 300, 30, 8, 0, Math.PI * 2);
    const material = textureLoader("image/cement2.png");
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 2, 0);
    sphere.rotateX(Math.PI / 2); // 旋转
    scene.add(sphere);
  };
  // 创建地板
  const createFloor = () => {
    let geometry = new THREE.BoxGeometry(3000, 1, 2600);
    const material1 = new THREE.MeshLambertMaterial({ color: 0x64b5d6 });
    const material2 = textureLoader("image/cement3.png");
    let materialArry: any = [
      material1,
      material1,
      material2,
      material1,
      material1,
      material1,
    ];
    const mesh = new THREE.Mesh(geometry, materialArry);
    mesh.receiveShadow = true;
    mesh.name = "土地";
    scene.add(mesh);
  };
  // 创建单个围栏
  const createWall = (obj: any) => {
    let geometry = new THREE.BoxGeometry(
      obj.size.width,
      obj.size.height,
      obj.size.length
    );
    loader = new THREE.TextureLoader();
    let texture = loader.load(obj.skin);
    texture.repeat.set(1, 1);
    let material = new THREE.MeshLambertMaterial({
      map: texture,
      color: 0xffffff,
    });
    let material2 = new THREE.MeshLambertMaterial({ color: 0xffffff });
    material.transparent = true;
    // material.opacity = 0.8;
    const mesh = new THREE.Mesh(geometry, [
      material,
      material,
      material,
      material,
      material,
      material,
    ]);
    mesh.castShadow = true;
    if (obj.name) {
      mesh.name = obj.name;
    } else {
      mesh.name = "围栏";
    }
    mesh.position.set(obj.position.x, obj.position.y, obj.position.z);
    mesh.rotateY(obj.rotate); // 旋转
    scene.add(mesh);
  };
  // 创建围栏
  const createWalls = () => {
    state.wangData.forEach((item: any) => {
      // debugger
      createWall(item);
    });
  };
  // 创建圆柱
  const createCylinder = () => {
    const geometry = new THREE.CylinderGeometry(150, 150, 100, 64, 1, true);
    const material = textureLoader("image/cy1.png");
    // const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(0, 50, 0);
    cylinder.name = "中心圆柱";
    cylinder.castShadow = true;
    scene.add(cylinder);
  };
  let shaperGroup: any = null;
  // 创建半球盖子
  const createLid = () => {
    const geometry = new THREE.CircleGeometry(150, 32);
    const material = textureLoader("image/cy1.png");
    // const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 98, 0);
    sphere.rotateX(Math.PI / 2);
    sphere.castShadow = true;
    sphere.name = "半球盖子";

    shaperGroup = new THREE.Group();
    shaperGroup.position.set(0, 0, 0); // 设置外层对象的中心为原本想要旋转的位置
    shaperGroup.add(sphere); // 把'门'添加进外层对象中
    scene.add(shaperGroup);
  };
  // 创建单个管道
  const createTube = (item: any) => {
    //创建管道成型的路径(3D样条曲线)
    let path = null;
    if (item.name == "设备管道") {
      path = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-20, 0, 0),
        new THREE.Vector3(20, 0, 0),
      ]);
    } else {
      path = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-20, 0, 0),
        new THREE.Vector3(0, 20, 0),
        new THREE.Vector3(20, 0, 0),
      ]);
    }
    // path:路径   40：沿着轨迹细分数  2：管道半径   25：管道截面圆细分数
    let geometry = new THREE.TubeGeometry(path, 40, 10, 25);
    const material = textureLoader("image/cy1.png");
    // const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const tube = new THREE.Mesh(geometry, material);
    tube.position.set(item.position.x, item.position.y, item.position.z);
    tube.rotateY(item.rotateY);
    tube.rotateZ(item.rotateZ);
    tube.rotateX(item.rotateX);
    // tube.name = 'tube';
    scene.add(tube);
  };
  // 创建管道
  const createTubes = () => {
    state.tubeData.forEach((item: any) => {
      createTube(item);
    });
  };
  // 创建三脚架
  const createTripod = () => {
    state.tripodData.forEach((item: any) => {
      const geometry = new THREE.CylinderGeometry(5, 5, 200, 64);
      const material = textureLoader("image/cement4.png");
      const cylinder = new THREE.Mesh(geometry, material);
      cylinder.position.set(item.position.x, item.position.y, item.position.z);
      cylinder.rotateX(item.rotateX);
      cylinder.rotateZ(item.rotateZ);
      cylinder.rotateY(item.rotateY);
      cylinder.name = "三脚架";
      scene.add(cylinder);
    });
    // 顶部
    let geometry1 = new THREE.BoxGeometry(50, 20, 50);
    let material1 = new THREE.MeshLambertMaterial({ color: 0xe58686 });
    let material2 = new THREE.MeshLambertMaterial({ color: 0xdbb5b5 });
    const mesh1 = new THREE.Mesh(geometry1, [
      material2,
      material2,
      material2,
      material2,
      material1,
      material1,
    ]);
    mesh1.position.set(-400, 200, 60);
    scene.add(mesh1);
  };
  // 创建仪器
  const createDevice = () => {
    const group = new THREE.Group();
    // 仪器底部
    const geometry = new THREE.CylinderGeometry(25, 25, 50, 64, 1, true);
    // const material = textureLoader('/image/tube.png');
    const material = new THREE.MeshLambertMaterial({
      color: 0xc9bfac,
      side: THREE.DoubleSide,
    });
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.rotateY(Math.PI / 2);
    cylinder.position.set(-340, 25, -340);
    cylinder.name = "仪器底部";
    cylinder.castShadow = true;
    // scene.add(cylinder);
    group.add(cylinder);
    // 仪器管道
    const geometry2 = new THREE.CylinderGeometry(5, 5, 50, 64, 1);
    const material2 = textureLoader("/image/cy1.png");
    // const material2 = new THREE.MeshBasicMaterial({ color: 0xD9D0BE });
    const cylinder2 = new THREE.Mesh(geometry2, material2);
    cylinder2.position.set(-300, 25, -310);
    cylinder2.castShadow = true;
    // scene.add(cylinder2);
    group.add(cylinder2);
    // 仪器盒子
    state.deviceData.forEach((item: any) => {
      let geometry2 = new THREE.BoxGeometry(
        item.size.width,
        item.size.height,
        item.size.length
      );
      // const material2 = new THREE.MeshLambertMaterial({ color: 0x64B5D6 });
      const material2 = textureLoader(item.skin);
      // let materialArry = [material1, material1, material2, material1, material1, material1];
      const mesh2 = new THREE.Mesh(geometry2, material2);
      mesh2.position.set(item.position.x, item.position.y, item.position.z);
      mesh2.rotateY(item.rotate.y);
      mesh2.rotateX(item.rotate.x);
      mesh2.rotateZ(item.rotate.z);
      mesh2.castShadow = true;
      if (item.name) {
        mesh2.name = item.name;
      } else {
        mesh2.name = "仪器外壳";
      }
      group.add(mesh2);
    });
    group.position.set(0, -1, 80);
    group.rotateY(Math.PI / 2);
    group.castShadow = true;
    scene.add(group);
  };
  // 创建电线杆
  const createPole = () => {
    const group = new THREE.Group();
    // 电线杆子
    const geometry5 = new THREE.CylinderGeometry(5, 5, 500, 64, 1);
    const material5 = textureLoader("image/tiepi1.png");
    // const material2 = new THREE.MeshBasicMaterial({ color: 0xD9D0BE });
    const cylinder5 = new THREE.Mesh(geometry5, material5);
    cylinder5.position.set(450, 250, -450);
    cylinder5.castShadow = true;
    group.add(cylinder5);
    // scene.add(cylinder5);

    // 顶部
    const geometry = new THREE.CylinderGeometry(10, 10, 10, 6, 1);
    const material = textureLoader("image/tiepi1.png");
    // const material2 = new THREE.MeshBasicMaterial({ color: 0xD9D0BE });
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(450, 490, -450);
    cylinder.castShadow = true;
    group.add(cylinder);
    // scene.add(cylinder);

    // // 摄像头
    // const geometry2 = new THREE.BoxGeometry(50, 30, 1);
    // let material2: any = textureLoader('/image/ploe.png');
    // let material3: any = textureLoader('/image/ploe2.png');
    // material2.transparent = true;
    // material3.transparent = true;
    // const cone = new THREE.Mesh(geometry2, [material2, material2, material2, material2, material2, material3]);
    // cone.position.set(430, 400, -430);
    // cone.rotateY(Math.PI / 4);
    // group.add(cone);

    // // 摄像头灯光
    // const geometryLight = new THREE.SphereGeometry(1);
    // const materialLight = new THREE.MeshBasicMaterial({ color: 0x14FF00 });
    // const coneLight = new THREE.Mesh(geometryLight, materialLight);
    // coneLight.position.set(415, 400, -415);
    // // scene.add(coneLight);
    // // outlineObj([coneLight]);
    // group.add(coneLight);

    // 地震通讯器
    state.conectData.forEach((item: any) => {
      const box = new THREE.BoxGeometry(
        item.size.width,
        item.size.height,
        item.size.length
      );
      let materialBox: any = null;
      let material = textureLoader(item.skin);
      let material2 = null;
      if (item.id == 1) {
        // 如果是盒子门
        material2 = textureLoader(item.skin2);
        materialBox = [
          material2,
          material2,
          material2,
          material2,
          material,
          material2,
        ];
      } else {
        materialBox = [
          material,
          material,
          material,
          material,
          material,
          material,
        ];
      }
      const meshBox = new THREE.Mesh(box, materialBox);
      meshBox.position.set(item.position.x, item.position.y, item.position.z);
      if (item.name) {
        meshBox.name = item.name;
      } else {
        meshBox.name = "地震盒子";
      }
      meshBox.rotateX(item.rotate.x);
      meshBox.rotateY(item.rotate.y);
      meshBox.rotateZ(item.rotate.z);
      group.add(meshBox);
    });

    // scene.add(cone);
    group.position.set(-50, 0, 50);
    scene.add(group);
  };
  // 创建内部仪器
  const createInnerDevice = () => {
    const geometry3 = new THREE.CylinderGeometry(20, 20, 50, 64, 1);
    const material3: any = textureLoader("image/inner2.png");
    const material4: any = textureLoader("image/inner3.jpg", 6, 1);
    // const material2 = new THREE.MeshBasicMaterial({ color: 0xD9D0BE });
    const cylinder3: any = new THREE.Mesh(geometry3, [
      material4,
      material3,
      material4,
    ]);
    cylinder3.position.set(-340, 25, 410);
    cylinder3.name = "仪器in";
    cylinder3.info = {
      uuid: "仪器",
    };
    cylinder3.hover = function (o: any) {
      // 鼠标移入设备
      moveShow.value = true;
      threeData.meshInfo = o.info;
      openHover(o.info.uuid, function () {
        // outlineObj([o]);
      });
    };
    // moonLabel.position.set(0, 20, 0);
    // cylinder3.add(moonLabel);
    scene.add(cylinder3);
  };
  // 创建纹理材质
  const textureLoader = (imgUrl: string, x?, y?) => {
    let material = null;
    loader = new THREE.TextureLoader();
    let texture = loader.load(imgUrl);
    if (x && y) {
      texture.repeat.set(x, y);
    } else {
      texture.repeat.set(1, 1);
    }
    material = new THREE.MeshLambertMaterial({
      map: texture,
      side: THREE.DoubleSide,
      color: 0xced0d1,
    });
    return material;
  };
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  // 点击事件
  const onModelDown = (event: any) => {
    // console.log(position);
    // console.log('dom距离浏览器的距离', threeRef.value.getBoundingClientRect().left, threeRef.value.getBoundingClientRect().top);
    let PX = threeRef.value.getBoundingClientRect().left;
    let PY = threeRef.value.getBoundingClientRect().top;
    // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    // mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    mouse.x = ((event.clientX - PX) / threeRef.value.clientWidth) * 2 - 1;
    mouse.y = -((event.clientY - PY) / threeRef.value.clientHeight) * 2 + 1;
    // let PX =
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length !== 0 && intersects[0].object.type === "Mesh") {
      console.log(intersects[0].object);

      switch (intersects[0].object.name) {
        case "半球盖子":
          intersects[0].object.position.set(0, 250, -150);
          intersects[0].object.rotateX(Math.PI / 2);
          intersects[0].object.name = "半球盖子2";
          break;
        case "半球盖子2":
          intersects[0].object.position.set(0, 98, 0);
          intersects[0].object.rotateX(-Math.PI / 2);
          intersects[0].object.name = "半球盖子";
          break;
        case "仪器in":
          intersects[0].object.position.set(-340, 60, 410);
          intersects[0].object.name = "仪器out";
          break;
        case "仪器out":
          intersects[0].object.position.set(-340, 25, 410);
          intersects[0].object.name = "仪器in";
          break;
        case "门":
          intersects[0].object.position.set(650, 150, 500);
          intersects[0].object.rotateY(Math.PI / 2);
          intersects[0].object.name = "门open";
          break;
        case "门open":
          intersects[0].object.position.set(500, 150, 350);
          intersects[0].object.rotateY(-Math.PI / 2);
          intersects[0].object.name = "门";
          break;
        case "地震盒子前":
          intersects[0].object.position.set(450, 235, -355);
          intersects[0].object.rotateX(-Math.PI / 2);
          intersects[0].object.name = "地震盒子前open";
          break;
        case "地震盒子前open":
          intersects[0].object.position.set(450, 200, -390);
          intersects[0].object.rotateX(Math.PI / 2);
          intersects[0].object.name = "地震盒子前";
          break;
        case "仪器盖子":
          intersects[0].object.position.set(-330, 130, -380);
          intersects[0].object.rotateX(-Math.PI / 2);
          intersects[0].object.name = "仪器盖子open";
          break;
        case "仪器盖子open":
          intersects[0].object.position.set(-330, 90, -340);
          intersects[0].object.rotateX(Math.PI / 2);
          intersects[0].object.name = "仪器盖子";
          break;
        default:
          break;
      }
      if (intersects[0].object.parent?.name == "摄像头") {
        if (composer) {
          composer = null;
        } else {
          outlineObj([intersects[0].object]);
        }
      }
    } else {
      console.log("未选中 Mesh!");
    }
  };
  // 鼠标移入高亮显示模型
  const outlineObj = (selectedObjects: any) => {
    // 创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
    composer = new EffectComposer(renderer);
    // 新建一个场景通道  为了覆盖到原理来的场景上
    renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    // 物体边缘发光通道
    outlinePass = new OutlinePass(
      new THREE.Vector2(
        threeRef.value.clientWidth,
        threeRef.value.clientHeight
      ),
      scene,
      camera,
      selectedObjects
    );
    outlinePass.selectedObjects = selectedObjects;
    outlinePass.edgeStrength = 10.0; // 边框的亮度
    outlinePass.edgeGlow = 1; // 光晕[0,1]
    outlinePass.usePatternTexture = false; // 是否使用父级的材质
    outlinePass.edgeThickness = 1.0; // 边框宽度
    outlinePass.downSampleRatio = 1; // 边框弯曲度
    outlinePass.pulsePeriod = 5; // 呼吸闪烁的速度
    outlinePass.visibleEdgeColor.set(parseInt("0x3BFF00")); // 呼吸显示的颜色
    outlinePass.hiddenEdgeColor = new THREE.Color(0, 0, 0); // 呼吸消失的颜色
    outlinePass.clear = true;
    composer.addPass(outlinePass);
    // 自定义的着色器通道 作为参数
    let effectFXAA: any = new ShaderPass(FXAAShader);
    effectFXAA.uniforms.resolution.value.set(
      1 / threeRef.value.clientWidth,
      1 / threeRef.value.clientHeight
    );
    effectFXAA.renderToScreen = true;
    composer.addPass(effectFXAA);
  };
  // 移入事件
  const onModelMove = (event: any) => {
    let PX = threeRef.value.getBoundingClientRect().left;
    let PY = threeRef.value.getBoundingClientRect().top;
    pointer.x = ((event.clientX - PX) / threeRef.value.clientWidth) * 2 - 1;
    pointer.y = -((event.clientY - PY) / threeRef.value.clientHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length !== 0 && intersects[0].object.type === "Mesh") {
      let o: any = intersects[0].object;
      if (typeof o.hover == "function") {
        threeData.movePosition.left = event.clientX - PX;
        threeData.movePosition.top = event.clientY - PY;
        o.hover(o);
      } else {
        // infoShow.value = false;
        closeHover();
      }
    }
  };
  // 鼠标Hover时的通用方法
  const openHover = (hoverUUID: any, callback: any) => {
    if (curHoverUUID == hoverUUID) return;
    curHoverUUID = hoverUUID;
    // 回调
    callback();
  };
  const closeHover = () => {
    moveShow.value = false;
    curHoverUUID = null;
    // composer = null;
  };

  // 加载摄像头模型
  const ploeModel = () => {
    let OBJLoaders = new OBJLoader(); //obj加载器
    let MTLLoaders = new MTLLoader(); //材质文件加载器
    MTLLoaders.load("model/pole/file.mtl", function (materials) {
      console.log(materials); //返回一个包含材质的对象MaterialCreator
      OBJLoaders.setMaterials(materials); //obj模型会和MaterialCreator包含的材质对应起来
      OBJLoaders.load("model/pole/file.obj", function (obj) {
        obj.scale.set(5, 5, 5); //设置obj模型的大小
        obj.position.set(400, 400, -369);
        obj.name = "摄像头";
        outlineObj([obj]);
        scene.add(obj); //将载入的obj模型添加到场景中
      });
    });
  };
  // 初始化模型
  const initModel = () => {
    initScene(); // 初始化场景
    initCamera(); // 初始化相机
    initLight(); // 灯光
    createHalfBall(); // 创建半球
    createFloor(); // 创建土地
    createWalls(); // 创建围栏
    createCylinder(); // 创建圆柱
    createLid(); // 创建盖子
    createTubes(); // 创建管道
    // createTripod(); // 创建三脚架
    createDevice(); // 创建仪器
    createInnerDevice(); // 创建内部仪器
    createPole(); // 创建电线杆
    ploeModel(); // 摄像头模型
    createRender(); // 创建渲染器
    // threeRef.value.addEventListener('click', onModelDown); // 鼠标点击事件
  };
  onMounted(() => {});
  // export default {
  //   initModel,
  //   THREE
  // };

  threeRef = threeRefs;

  return {
    initModel,
    moveShow,
    treePanelRef,
    threeData,
  };
};

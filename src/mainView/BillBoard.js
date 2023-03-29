function DivGraphic({
  globecanvas,
  position,
  style,
  scale
}, callBack) {
  let screenX = position[0];
  let screenY = position[1];
  let html = style.html;
  let id = "box";
  if (typeof style.id !== 'undefined') {
    id = "index" + style.id;
  } else id = "index" + guid();
  let scaleX = 1;
  let scaleY = 1;

  if (typeof scale[0] !== 'undefined') {
    scaleX = scale[0];
  }
  if (typeof scale[1] !== 'undefined') {
    scaleY = scale[1];
  }


  // let divGraphic = `<div class=\"pie3d-divGraphic\"  style=\"pointer-events: none;display: block;` +
  //   "transform: matrix(" + scaleX + ",0,0," + scaleY + "," + screenX + "," + screenY + ");" +
  //   "transform-origin: left bottom 0px;" +
  //   "z-index: auto;\">\n" +
  //   html +
  //   "</div>";

  let divGraphic = `<div class="pie3d-divGraphic" id="${id}" style="display: block;transform: matrix( ${scaleX} ,0,0,${scaleY} ,${screenX}, ${screenY});transform-origin: left bottom 0px;z-index: auto;width:${style.size};height:${style.size}"> 
       ${html}</div>`
  GraphicBreastplateLayer({
      globecanvas,
      divGraphic,
      id,
      screenX,
      screenY,
      style,
      scale
    },
    callBack);
  return divGraphic;
}

function DivBoderLabel({
  globecanvas,
  position,
  style,
  scale
}) {
  let text = style.text;
  let font_size = style.font_size;
  let font_family = style.font_family;
  let color = style.color;
  let backgroundcolor = style.backgroundcolor;
  let boderColor = style.boderColor;
  let rgbColor = fromHex(boderColor);

  let result = textSize(font_size, font_family, text);
  let width = result.width + 8;
  let width_1 = width + 6;
  let width_2 = width + 6 - 2;
  let height = result.height;
  let height_1 = height + 4;
  let height_2 = height + 8 - 2;
  let html = "<div class=\"pie3d-divBoderLabel\" style=\"--text-font-size:" + font_size + 'px' + ";\n" +
    "    --boder-width: " + width + "px;\n" +
    "    --clip-width-1: " + width_1 + "px;\n" +
    "    --clip-width-2: " + width_2 + "px;\n" +
    "    --boder-height: " + height + "px;\n" +
    "    --clip-height-1: " + height_1 + "px;\n" +
    "    --clip-height-2: " + height_2 + "px;\n" +
    "    --text-color: " + color + ";\n" +
    "   --text-backgroundcolor: " + backgroundcolor + ";\n" +
    "    --border-color: " + boderColor + ";\n" +
    "    --box-shadow-color: rgba(" + rgbColor.r + "," + rgbColor.g + "," + rgbColor.b + ",0.56);\">\n" +
    "        <div class=\"pie3d-divBoderLabel-boder\">\n" +
    "            <span class=\"pie3d-divBoderLabel-text\" style=\"font-family: " + font_family + ";\">" + text + "</span>\n" +
    "        </div>\n" +
    "    </div>\n";

  let htmlnew = DivGraphic({
    globecanvas: globecanvas,
    position: position,
    style: {
      id: style.id,
      html: html
    },
    scale: scale
  })

  return htmlnew;
}

//内置扩展的竖立文本 DivUpLabel
function DivUpLabel({
  globecanvas,
  position,
  style,
  scale
}) {
  let text = style.text;
  let color = style.color;
  let font_size = style.font_size;
  let font_family = style.font_family;
  let lineHeight = style.lineHeight;
  let circleSize = style.circleSize;

  let html = "<div class=\"pie3d-divUpLabel\" style=\"color: " + color + ";\">\n" +
    "      <div class=\"pie3d-divUpLabel-text\" style=\"font-family:" + font_family + ";font-size: " + font_size + "px;\">" + text + "</div>\n" +
    "      <div class=\"pie3d-divUpLabel-line\" style=\"\n" +
    "          height: " + lineHeight + "px;\n" +
    "          background-color: " + color + ";\"></div>\n" +
    "      <div style=\"border-radius: 50%;\n" +
    "          width: " + circleSize + "px;\n" +
    "          height: " + circleSize + "px;\n" +
    "          background-color: " + color + ";\"></div>\n" +
    "    </div>";

  let newHtml = DivGraphic({
    globecanvas: globecanvas,
    position: position,
    style: {
      id: style.id,
      html: html
    },
    scale: scale
  })

  return newHtml;
}

//加css动画的扩散点 DivLightPoint
function DivLightPoint({
  globecanvas = null,
  position,
  style,
  scale
}, callBack) {
  let color = style.color;
  let size = "10px";
  if (typeof style.size !== 'undefined') {
    size = style.size;
  }
  //   let html = " <span class=\"pie3d-animation-point\"  @click=\"onClick\"  id=\"pindex" + style.id + " \" style=\"color:" + color + ";width: " + size + ";height: " + size + "\">\n" +
  //     "        <p></p>\n" +
  //     "    </div>";
  let html = `<span class="pie3d-animation-point"  id="pindex${style.id}"  style="color:${color};width:${size};height:${size}"></span>  <p></p></span>     `
  let htmlnew = DivGraphic({
    globecanvas: globecanvas,
    position: position,
    style: {
      id: style.id,
      html: html,
      size: size,
      data: style.data
    },
    scale: scale
  }, callBack)
  return htmlnew;
}

// 类似popup/toolitp的自定义html
function Popup({
  globecanvas = null,
  position,
  style,
  scale
}) {
  let html = "<div class=\"pie3d-popup \">\n" +
    "        <div class=\"pie3d-popup-content-wrapper pie3d-popup-background\">\n" +
    "          <div class=\"pie3d-popup-content pie3d-popup-color\" style=\"\">" + style.html + "</div>\n" +
    "        </div>\n" +
    "        <div class=\"pie3d-popup-tip-container\">\n" +
    "          <div class=\"pie3d-popup-tip pie3d-popup-background\"></div>\n" +
    "        </div>\n" +
    "      </div>";


  let htmlnew = DivGraphic({
    globecanvas: globecanvas,
    position: position,
    style: {
      id: style.id,
      html: html
    },
    scale: scale
  })

  return htmlnew;
}

//更新div坐标位置
function UpdateDivCoordinate(x, y, div_id) {
  let documentElement = document.getElementById(div_id);
  if (typeof documentElement !== 'undefined') {
    documentElement.style.transform = "translate(" + x + "px," + y + "px)";
  }
}

//缩放div
function Scale(x, y, div_id) {
  let documentElement = document.getElementById(div_id);
  if (typeof documentElement !== 'undefined') {
    documentElement.style.transform = "scale(" + x + "," + y + ")";
  }
}

//移除div
function DelDiv(div_id) {
  let divboxid = document.getElementById(div_id);
  if (divboxid) {
    divboxid.parentNode.removeChild(divboxid);
  }
}

function HiddenDIV(div_id) {
  var isdidden = document.getElementById(div_id);
  if (isdidden) {
    isdidden.style.visibility = 'hidden'; // 隐藏元素
  }
}

function clearDIV() {
  if (document.all || document.getElementById) {
    let arrayOfDocFonts = document.getElementsByTagName("div");
    for (let i = 0; i < arrayOfDocFonts.length; i++) {
      if (arrayOfDocFonts[i].id.match("index")) {
        try {
          var divboxid = document.getElementById(arrayOfDocFonts[i].id);
          if (divboxid) {
            divboxid.parentNode.removeChild(divboxid);
          }
        } catch (e) {
          console.log(e);
        }

      }
    }
  }
}

function remoAllDiv(dorenderid) {
  // requestAnimationFrame(remoAllDiv);
  try {
    cancelAnimationFrame(dorenderid);
  } catch (e) {

  }
  // clearDIV();
  // pie3d-divGraphic
  if (document.all || document.getElementsByName) {
    let arrayOfDocFonts = document.getElementsByName("pie3d-divGraphicName")
    const nameArr = Array.prototype.slice.call(arrayOfDocFonts);

    for (let i = 0; i < nameArr.length; i++) {
      if (nameArr[i]) {
        nameArr[i].parentNode.removeChild(nameArr[i]);
      }
    }
  }
}

//生成唯一id
function guid() {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

//求文字的长度及宽度
function textSize(fontSize, fontFamily, text) {

  let span = document.createElement("span");
  let result = {
    width: span.offsetWidth,
    height: span.offsetHeight,
  };
  span.style.visibility = "hidden";
  span.style.fontSize = fontSize + "px";
  span.style.position = 'absolute'
  document.body.appendChild(span);
  if (typeof span.textContent != "undefined") {
    span.textContent = text;
  } else {
    span.innerText = text;
  }
  result.width = span.offsetWidth - result.width;
  result.height = span.offsetHeight - result.height;
  span.parentNode.removeChild(span);
  return result
}

//将css的属性值，转变为rgb格式的对像
function fromHex(color) {

  var t = {},
    bits = (color.length == 4) ? 4 : 8, //假设是shorthand。 #fff, 那么bits为4位, 每一位代表的个属性, 其他的为8位 每两位代表一个属性 #ffffff00
    mask = (1 << bits) - 1; //表示字节占位符。 向左移4位或8位，var a = (1 << 4 ) - 1 -> 10000 - 1,  a.toString(2); // 1111。或者 8位的 1111 1111
  color = Number("0x" + color.substr(1)); //#ff0000 转变为16进制0xff0000;
  if (isNaN(color)) {
    return null; // Color
  }
  ["b", "g", "r"].forEach(function (x) {
    var c = color & mask;
    color >>= bits;
    t[x] = bits == 4 ? 17 * c : c; // 0xfff ， 一个f应该代表 255, 应该当[0-255]，按15等份划分，每一等份间隔 17。
    //所以获得的值须要乘以17, 才干表示rgb中255的值
  });

  return t; // Color
}
var _billcontainer = null;

function GraphicBreastplateLayer({
  globecanvas,
  divGraphic,
  id = "box",
  screenX = 1200,
  screenY = 800,
  style,
  scale = []
}, callBack) {
  let iscreat = document.getElementById(id);

  if (iscreat) {

    if (screenX == 0 || screenX == 'undefined') screenX = iscreat.getBoundingClientRect().right;
    if (screenY == 0 || screenY == 'undefined') screenY = iscreat.getBoundingClientRect().top;
    // iscreat.parentNode.removeChild(iscreat);
    iscreat.innerHTML = divGraphic;
    iscreat.id = id;
    iscreat.name = "pie3d-divGraphicName";

    const canvas = globecanvas
    if (screenX + 150 >= canvas.width || screenY + 50 >= canvas.height || screenX <= 10 || screenY <= 120) {
      iscreat.style.visibility = 'hidden'; // 隐藏元素
      return; //超出屏幕不在创建
    } else {

      if (iscreat.style.visibility = 'hidden')
        iscreat.style.visibility = 'visible'; // 显示元素
    }
    return;

  }


  _billcontainer = document.createElement("div");
  _billcontainer.id = id;
  _billcontainer.style.width = style.size
  _billcontainer.style.height = style.size

  // var globe = globeControl.getGlobe();
  // _billcontainer.setAttribute("id",id);
  // _billcontainer.name="pie3d-divGraphicName";
  _billcontainer.setAttribute("name", "pie3d-divGraphicName");

  // const canvas = globeControl.canvas;
  const canvas = globecanvas
  if (screenX + 150 >= canvas.width || screenY + 50 >= canvas.height || screenX <= 10 || screenY <= 120) {
    return; //超出屏幕不在创建
  }
  // this._globe = globeControl;

  _billcontainer.innerHTML = divGraphic;
  // canvas.parentNode.appendChild(document.createRange().createContextualFragment(divGraphic));
  canvas.parentNode.appendChild(_billcontainer);
  document.getElementById(`${id}`).addEventListener('click', (e) => {
    callBack(style.data)
  })

}
Object.assign(GraphicBreastplateLayer.prototype, {
  add: function (html) {
    _billcontainer.appendChild(html);
  },
  remove: function () {
    var _this = this;
    if (_billcontainer.parentNode)
      _billcontainer.parentNode.removeChild(_billcontainer);
    this.globecanvas = undefined;
  },
  resize: function () {
    const _this = this;
    window.onresize = function () {
      if (_billcontainer != null && _this.globecanvas != null) {
        _billcontainer.style.width = _this.globecanvas.clientWidth + "px";
        _billcontainer.style.height = _this.globecanvas.clientHeight + "px";
      }
    };
  }
})

// function towDevice(globe,x, y, z) {
//     let worldPoint = globe.geoToWorld([x, y], z);
//     let arrsrcenxyz = globe.worldToDevice(worldPoint);
//     return arrsrcenxyz;
// }
// function aotuRemoveBox(globe,x,y,z,id) {
//     let isDispay = true;
//     var worldPoint = globe.geoToWorld([x, y], z); // 设置面板的地理位置
//     var cameraPosition = globe.getWorldCamera().getCameraPosition(); // 获取相机位置
//
//     if (worldPoint.dot(cameraPosition.sub(worldPoint)) <= 0.0 && globe.getSceneMode() == 1) {
//         DelDiv("index" + id);
//         isDispay = false;
//     }
//     return isDispay;
// }

export {
  DivGraphic,
  DivBoderLabel,
  DivUpLabel,
  DivLightPoint,
  Popup,
  DelDiv,
  HiddenDIV,
  remoAllDiv,
  GraphicBreastplateLayer,
};

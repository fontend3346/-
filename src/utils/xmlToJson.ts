let xmlFilter= (xml: string) => {
//   console.log(decodeURI(xml))
    // let parser = new DOMParser();
    // let xmlDoc = parser.parseFromString(xml,"text/xml");
    // let root=xmlDoc.getElementsByTagName("root")[0];
    let node = xml.getElementsByTagName('entity');
    //循环块
    let heightDiff=0;
    for(var i=0;i<node.length;i++){
      //获取高度差值
      let yHeight=node[i].lastElementChild.firstChild.getAttribute("y");
      if(i==0&&yHeight>1){
        heightDiff=yHeight-1;
      }
      let id=node[i].getAttribute("id");
      // node[i].lastElementChild.setAttribute("id",id)
      node[i].lastElementChild.setAttribute("value",decodeURI(node[i].getAttribute("label")))
      node[i].lastElementChild.firstChild.setAttribute("y",yHeight-heightDiff)
    }
    //拼接节点关联线
    let Edge = xml.getElementsByTagName('Edge');
    for(var i=0;i<Edge.length;i++){
      //console.log( Edge[i].lastElementChild)
      Edge[i].lastElementChild.setAttribute("value",'')
    }
    // let XML=new XMLSerializer().serializeToString(root);
    return xml;
  }
  export {xmlFilter}
// 前端预览文件
import axios from "axios";
PDFJS.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/legacy/build/pdf.worker.entry.js");
// word--docx
const pre = {
    docData(url) {
        return axios({
            method: "get",
            responseType: "blob",
            url: window.gateway.dataDisplayUrl + `${url}`,
        })
    },
    // pdf
    loadFile(data) {
        PDFJS.getDocument(data).promise.then((pdfDoc) => {
            const numPages = pdfDoc.numPages; // pdf的总页数
            // 获取第1页的数据
            pdfDoc.getPage(1).then((page) => {
                // 设置canvas相关的属性
                const canvas = document.getElementById("canvasPdf");
                const ctx = canvas.getContext("2d");
                const dpr = window.devicePixelRatio || 1;
                const bsr =
                    ctx.webkitBackingStorePixelRatio ||
                    ctx.mozBackingStorePixelRatio ||
                    ctx.msBackingStorePixelRatio ||
                    ctx.oBackingStorePixelRatio ||
                    ctx.backingStorePixelRatio ||
                    1;
                const ratio = dpr / bsr;
                const viewport = page.getViewport({ scale: 1 });
                canvas.width = viewport.width * ratio;
                canvas.height = viewport.height * ratio;
                canvas.style.width = viewport.width + "px";
                canvas.style.height = viewport.height + "px";
                ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport,
                };
                // 数据渲染到canvas画布上
                page.render(renderContext);
            });
        });
    },
}


export default pre
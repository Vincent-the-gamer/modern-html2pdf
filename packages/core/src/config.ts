import { GetPdfOptions } from "../types"

export const defaultConfig: GetPdfOptions = {
  fileName: "demo",
  domToCanvasConfig: {
    backgroundColor: "white",
    style: {
      color: "black"
    }
  },
  margin: {
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
  },
  jsPDFConfig: {
    orientation: "p",
    unit: "mm",
    format: "a4"
  },
  imageType: 'image/jpeg',
  imageQuality: 1,
  autoResize: true,
  init: function () {},
  success: function (pdf) {
    pdf.save(`${this.fileName}.pdf`)
  }
}
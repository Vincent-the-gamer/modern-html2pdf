import { jsPDF } from "jspdf"
import type { jsPDFOptions } from "jspdf"
import { domToCanvas } from "modern-screenshot"

export class ModernHtml2Pdf {
    el: HTMLElement
    constructor(el: HTMLElement) {
        this.el = el
    }

    toCanvas = async (domToCanvasOptions?: Record<string, any>) => {
        if (!domToCanvasOptions) {
            // default options
            return await domToCanvas(this.el, {
                backgroundColor: "#ffffff",
                style: {
                    color: "black"
                }
            })
        } else {
            return await domToCanvas(this.el, domToCanvasOptions)
        }
    }
    toJSPdf = (jsPDFOptions: jsPDFOptions) => new jsPDF({ ...jsPDFOptions })
}
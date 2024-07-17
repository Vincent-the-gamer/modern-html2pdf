import { jsPDF } from "jspdf"
import type { jsPDFOptions } from "jspdf"
import { domToCanvas } from "modern-screenshot"

export class ModernHtml2Pdf {
    el: HTMLElement
    constructor(el: HTMLElement) {
        this.el = el
    }

    toCanvas = async (domToCanvasOptions: Record<string, any>) => await domToCanvas(this.el, domToCanvasOptions)
    toJSPdf = (jsPDFOptions: jsPDFOptions) => new jsPDF({ ...jsPDFOptions })
}
import { jsPDF } from "jspdf"
import type { jsPDFOptions } from "jspdf"
import { domToCanvas, domToPng } from "modern-screenshot"
import { QuickGenerateOptions } from "./types"

export class ModernHtml2Pdf {
    el: HTMLElement
    constructor(el: HTMLElement) {
        this.el = el
    }
    domToPng = async (domToPngOptions?: Record<string, any>) => {
        if (!domToPngOptions) {
            // default options
            return await domToPng(this.el)
        } else {
            return await domToPng(this.el, domToPngOptions)
        }
    }
    domToCanvas = async (domToCanvasOptions?: Record<string, any>) => {
        if (!domToCanvasOptions) {
            // default options
            return await domToCanvas(this.el)
        } else {
            return await domToCanvas(this.el, domToCanvasOptions)
        }
    }
    jsPDF = (jsPDFOptions?: jsPDFOptions) => {
        if (!jsPDFOptions) {
            return new jsPDF()
        } else {
            return new jsPDF({ ...jsPDFOptions })
        }
    }
    quickGenerate = async (options: QuickGenerateOptions) => {
        const canvas = await this.domToCanvas(options.domToCanvasConfig || {})
        // a4 paper
        const pdf = this.jsPDF(options.jsPDFConfig || {})
        const imgData = canvas.toDataURL("image/png", 1)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()

        // Calculate image dimensions based on aspect ratio
        const imgWidth = pdfWidth
        const imgHeight = (canvas.height * pdfWidth) / canvas.width

        let heightLeft = imgHeight
        let position = 0

        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight)
        heightLeft -= pdfHeight

        while (heightLeft >= 0) {
            position = heightLeft - pdfHeight
            pdf.addPage()
            pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight)
            heightLeft -= pdfHeight
        }

        pdf.save(`${options.fileName}.pdf`)
    }
}
import { jsPDF } from "jspdf"
import type { jsPDFOptions } from "jspdf"
import { domToCanvas, domToForeignObjectSvg, domToPng, domToSvg } from "modern-screenshot"
import type { 
    GetPdfOptions, 
    PdfInstance, 
    DomToPngFunc, 
    DomToCanvasFunc, 
    DomToSvgFunc, 
    domToForeignObjectSvgFunc 
} from "../types"
import getPageData from "../utils/getPageData"
import images from "../utils/images"
import joinObject from "../utils/joinObject"
import { defaultConfig } from "./config"

const _ = undefined

export class ModernHtml2Pdf {
    el: HTMLElement | HTMLElement[]

    constructor(el: HTMLElement | HTMLElement[]) {
        this.el = el
    }

    // domToPng returns png dataurl
    domToPng: DomToPngFunc = async (el = this.el, domToPngOptions?) => {
        // multi pages by nodes
        if ("length" in el!) {
            const pngs = []
            for (let i = 0; i < el.length; i++) {
                if (!domToPngOptions) {
                    // default options
                    pngs.push(await domToPng(el[i]))
                } else {
                    pngs.push(await domToPng(el[i], domToPngOptions))
                }
            }
            return pngs
        } else {
            // single page for one node
            if (!domToPngOptions) {
                // default options
                return await domToPng(el!)
            } else {
                return await domToPng(el!, domToPngOptions)
            }
        }
    }

    domToCanvas: DomToCanvasFunc = async (el = this.el, domToCanvasOptions?) => {
        if ("length" in el!) {
            const canvases: HTMLCanvasElement[] = []
            for (let i = 0; i < el.length; i++) {
                if (!domToCanvasOptions) {
                    canvases.push(await domToCanvas(el[i]))
                } else {
                    canvases.push(await domToCanvas(el[i], domToCanvasOptions))
                }
            }
            return canvases
        } else {
            if (!domToCanvasOptions) {
                return await domToCanvas(el!)
            } else {
                return await domToCanvas(el!, domToCanvasOptions)
            }
        }
    }

    // domToSvg returns svg dataurl
    domToSvg: DomToSvgFunc = async (el = this.el, domToSvgOptions?) => {
        if ("length" in el!) {
            const svgDataUrls: string[] = []
            for (let i = 0; i < el.length; i++) {
                if (!domToSvgOptions) {
                    svgDataUrls.push(await domToSvg(el[i]))
                } else {
                    svgDataUrls.push(await domToSvg(el[i], domToSvgOptions))
                }
            }
            return svgDataUrls
        } else {
            if (!domToSvgOptions) {
                return await domToSvg(el!)
            } else {
                return await domToSvg(el!, domToSvgOptions)
            }
        }
    }

    // domToForeignObjectSvg returns SVGElement
    domToForeignObjectSvg: domToForeignObjectSvgFunc = async (el = this.el, domToForeignObjectSvgOptions?) => {
        if ("length" in el!) {
            const svgs: SVGElement[] = []
            for (let i = 0; i < el.length; i++) {
                if (!domToForeignObjectSvgOptions) {
                    svgs.push(await domToForeignObjectSvg(el[i]))
                } else {
                    svgs.push(await domToForeignObjectSvg(el[i], domToForeignObjectSvgOptions))
                }
            }
            return svgs
        } else {
            if (!domToForeignObjectSvgOptions) {
                return await domToForeignObjectSvg(el!)
            } else {
                return await domToForeignObjectSvg(el!, domToForeignObjectSvgOptions)
            }
        }
    }

    jsPDF = (jsPDFOptions?: Partial<jsPDFOptions>) => new jsPDF(jsPDFOptions)

    getPdf: (options: GetPdfOptions) => PdfInstance = (options) => {
        const { margin } = options
        const pdf = this.jsPDF(options.jsPDFConfig)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const pdfContentWidth = pdfWidth - (margin.left + margin.right)
        const pdfContentHeight = pdfHeight - (margin.top + margin.bottom)
        const position = 0
        const currentPage = 1
        const pageOfCurrentNode = 1
        return {
            pdf,
            pdfWidth,
            pdfHeight,
            pdfContentWidth,
            pdfContentHeight,
            position,
            currentPage,
            pageOfCurrentNode,
        }
    }
    quickGenerate = async (options: Partial<GetPdfOptions> = {}) => {
        const _opts = joinObject<GetPdfOptions>(defaultConfig, options)
        const pdfInstance = this.getPdf(_opts)
        // init pdf
        _opts.init.call(_opts, pdfInstance.pdf)

        if ('length' in this.el) {
            for (let i = 0; i < this.el.length; i++) {
                const canvas = await this.domToCanvas(this.el[i], _opts.domToCanvasConfig || {})
                renderCanvas(canvas as HTMLCanvasElement, pdfInstance, _opts)
            }
        } else {
            const canvas = await this.domToCanvas(this.el, _opts.domToCanvasConfig || {})
            renderCanvas(canvas as HTMLCanvasElement, pdfInstance, _opts)
        }

        // save pdf
        _opts.success.call(_opts, pdfInstance.pdf)

        return pdfInstance.pdf
    }
}

function setPdf(
    pdfInstance: PdfInstance,
    pdf: jsPDF,
    position: number,
    currentPage: number,
    pageOfCurrentNode: number,
) {
    pdfInstance.pdf = pdf
    pdfInstance.position = position
    pdfInstance.currentPage = currentPage
    pdfInstance.pageOfCurrentNode = pageOfCurrentNode
}

function renderCanvas(
    canvas: HTMLCanvasElement,
    pdfInstance: PdfInstance,
    opts: GetPdfOptions,
) {
    let {
        pdf,
        pdfContentWidth,
        pdfContentHeight,
        pdfWidth,
        pdfHeight,
        position,
        currentPage,
        pageOfCurrentNode } = pdfInstance
    const { pageData, printWidth, printHeight } = getPageData({ canvas, pdf, pdfContentWidth, opts })

    // height which not yet print to PDF.
    let leftHeight = printHeight

    // check if need reset position(change node)
    if (position < 0) {
        pdf.addPage()
        currentPage += 1
        pageOfCurrentNode = 1
        position = 0
    }

    // check if content needs multi pages
    const { margin } = opts
    while (leftHeight > 0) {
        // add content
        pdf.addImage(
            pageData,
            images(opts.imageType),
            margin.left,
            position +
            margin.top * pageOfCurrentNode +
            margin.bottom * (pageOfCurrentNode - 1),
            printWidth,
            printHeight,
        )
        // add margin top/bottom
        pdf.setFillColor(255, 255, 255)
        pdf.rect(0, 0, pdfWidth, margin.top, 'F')
        pdf.rect(0, pdfHeight - margin.bottom, pdfWidth, margin.bottom, 'F')
        // check left content
        if (leftHeight < pdfContentHeight) {
            position -= leftHeight
            break
        } else {
            leftHeight -= pdfContentHeight
            position -= pdfHeight
            pdf.addPage()
            currentPage += 1
            pageOfCurrentNode += 1
        }
    }

    setPdf(pdfInstance, pdf, position, currentPage, pageOfCurrentNode)
}
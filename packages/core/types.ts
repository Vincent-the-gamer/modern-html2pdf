import type { jsPDF, jsPDFOptions } from "jspdf"

export type DomToPngFunc = (el: HTMLElement | HTMLElement[] | void, domToPngOptions?: Record<string, any>) => Promise<string | string[]>
export type DomToCanvasFunc = (el: HTMLElement | HTMLElement[] | void, domToCanvasOptions?: Record<string, any>) => Promise<HTMLCanvasElement | HTMLCanvasElement[]>
// domToSvg returns svg dataurl
export type DomToSvgFunc = (el: HTMLElement | HTMLElement[] | void, domToSvgOptions?: Record<string, any>) => Promise<string | string[]>
// domToForeignObjectSvg returns SVGElement
export type domToForeignObjectSvgFunc = (el: HTMLElement | HTMLElement[] | void, domToForeignObjectSvgOptions?: Record<string, any>) => Promise<SVGElement | SVGElement[]>

export interface PdfInstance {
    pdf: jsPDF
    pdfWidth: number
    pdfHeight: number
    pdfContentWidth: number
    pdfContentHeight: number
    position: number // page's start position
    currentPage: number // current page number of total pdf
    pageOfCurrentNode: number // current page of current node
}

export interface GetPdfOptions {
    fileName: string,
    domToCanvasConfig: Record<string, any>,
    jsPDFConfig: Partial<jsPDFOptions>,
    margin: {
        right: number
        top: number
        bottom: number
        left: number
    },
    imageType: string,
    imageQuality: number,
    autoResize: boolean,
    init: (this: GetPdfOptions, pdf: jsPDF) => Promise<void> | void
    success: (pdf: jsPDF) => Promise<void> | void
}
import type { jsPDF } from 'jspdf';
import type { GetPdfOptions } from '../types';

const pixelRatio = window.devicePixelRatio;

// canvas to DataUrl
function getPageData({ canvas, pdf, pdfContentWidth, opts }: {
  canvas: HTMLCanvasElement;
  pdf: jsPDF;
  pdfContentWidth: number;
  opts: GetPdfOptions;
}) {
  const pageData = canvas.toDataURL(opts.imageType, opts.imageQuality);
  const imgProps = pdf.getImageProperties(pageData);
  const printWidth = !!opts.autoResize
    ? pdfContentWidth
    : imgProps.width / pixelRatio;
  const printHeight = !!opts.autoResize
    ? pdfContentWidth / imgProps.width * imgProps.height
    : imgProps.height / pixelRatio;
  return {
    pageData,
    printWidth,
    printHeight,
  };
}

export default getPageData;
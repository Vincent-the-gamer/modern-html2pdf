<h1 align="center">modern-html2pdf</h1>

<p align="center">
    <b>
        <i>Converts any HTML element to PDF using modern-screenshot and jsPDF.</i>
    </b>
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/modern-html2pdf" target="_blank">
        <img src="https://img.shields.io/npm/v/modern-html2pdf?style=flat-square" alt="npm"/>
    </a>
    <a href="https://github.com/Vincent-the-gamer/modern-html2pdf/blob/master/LICENSE" target="_blank">
        <img src="https://img.shields.io/github/license/Vincent-the-gamer/modern-html2pdf?style=flat-square" alt="GitHub"/>
    </a>
</p>


## Why?

This repo is inspired by [html2pdf.js](https://github.com/eKoopmans/html2pdf.js), which uses `html2canvas` and `jsPDF` to generate PDFs. 

But it has too much problem with `html2canvas`:

- SVGs are not supported
- Custom fonts couldn't show correctly.
- ...

These can be gracefully fixed using [modern-screenshot](https://github.com/qq15725/modern-screenshot).

That's why I created this repo.

## Usage
Get package from npm:
```shell
npm i modern-html2pdf
```

### Quickly Generate PDF
This will screenshot your HTML Element, then generate a PDF file with a simple process.

[Preview](#preview)

to customize your process, see [Customize your process](#customize-your-process)

```typescript
import { ModernHtml2Pdf } from "modern-html2pdf"

const el = document.getElementById("el")
const convertor = new ModernHtml2Pdf(el)
await convertor.quickGenerate({
    fileName: "demo",  // transform to: demo.pdf
    // these options are type definitions of `domToCanvas` function in modern-screenshot
    // https://github.com/qq15725/modern-screenshot/blob/main/src/options.ts
    domToCanvasConfig: {
        backgroundColor: "white",
        style: {
            color: "black"
        }
    },
    // these options are type definitions of `jsPDF`, see below.
    jsPDFConfig: {
        orientation: "p",
        unit: "mm",
        format: "a4"
    },
    margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
})
```

jsPDFOptions: 
```typescript
export interface jsPDFOptions {
    orientation?: "p" | "portrait" | "l" | "landscape";
    unit?: "pt" | "px" | "in" | "mm" | "cm" | "ex" | "em" | "pc";
    format?: string | number[];
    compress?: boolean;
    precision?: number;
    filters?: string[];
    userUnit?: number;
    encryption?: EncryptionOptions;
    putOnlyUsedFonts?: boolean;
    hotfixes?: string[];
    floatPrecision?: number | "smart";
}
```

`v0.1.1` supports multi pages PDF generating!

[Preview multi pages result](#preview)

```html
<div class="area">
    <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <HelloWorld msg="Vite + Vue" />
</div>

<div class="area">
    <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <HelloWorld msg="Vite + Vue" />
    <button @click="exportPDF">Export PDF</button>
</div>
```

```typescript
async function exportPDF() {
  const pages = Array.from(document.getElementsByClassName("area"))
  const convertor = new ModernHtml2Pdf(pages)
  await convertor.quickGenerate({
    fileName: "demo",
    domToCanvasConfig: {
      backgroundColor: "white",
      style: {
        color: "black"
      }
    },
    margin: {
      left: 1,
      right: 1,
      top: 1,
      bottom: 1
    }
  })
}
```

### Customize your process
You can get each function of `jsPDF` or `modern-screenshot` from `ModernHtml2Pdf` instance.

```typescript
import { ModernHtml2Pdf } from "modern-html2pdf"
const el = document.getElementById("el")!
const convertor = new ModernHtml2Pdf(el)

// domToCanvas
const canvas = await convertor.domToCanvas({
    // domToCanvas options
    ...
})

// jsPDF
const pdf = convertor.jsPDF({
    // jsPDF options
    ...
})

// domToPng
const png = await convertor.domToPng({
    // domToPng options
    ...
})
...
```

So that, you can handle every single component to get more customizations.

Example: 
```typescript
const canvas = await convertor.domToCanvas({
    // domToCanvas options
    ...
})

const ctx = canvas.getContext('2d')

// blah blah blah
...
```

## Preview

You can generate it yourself in `packages/playground`.

Single Page:

![preview](.github/preview.png)

Multi pages:

![preview2](.github/preview2.png)

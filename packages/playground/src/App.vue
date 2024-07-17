<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { ModernHtml2Pdf } from "modern-html2pdf"

async function exportPDF() {
  const area = document.getElementById("area")!
  const convertor = new ModernHtml2Pdf(area)
  const canvas = await convertor.toCanvas({
    backgroundColor: "white",
    style: {
      color: "black",
      width: 800,
      height: 600
    }
  })
  const pdf = convertor.toJSPdf({
    orientation: "p",
    unit: "mm",
    format: "a4"
  })
  let a4w = 190
  let a4h = 277
  pdf.addImage(
    canvas.toDataURL("image/jpeg", 1),
    "JPEG", 10, 10, a4w, a4h
  )
  pdf.save("test.pdf")
}
</script>

<template>
  <div id="area">
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <HelloWorld msg="Vite + Vue" />
    <button @click="exportPDF">Export PDF</button>
  </div>
</template>

<style scoped>
#area {
  width: fit-content;
  height: fit-content;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

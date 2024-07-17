<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { ModernHtml2Pdf } from "modern-html2pdf"

async function exportPDF() {
  const area = document.getElementById("area")!
  const convertor = new ModernHtml2Pdf(area)
  await convertor.quickGenerate({
    fileName: "demo",
    domToCanvasConfig: {
      backgroundColor: "#ffffff",
      style: {
        color: "black"
      }
    },
    jsPDFConfig: {
      orientation: "p",
      unit: "mm",
      format: "a4"
    }
  })
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

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { ModernHtml2Pdf } from "modern-html2pdf"

async function exportPDF() {
  const pages = Array.from(document.getElementsByClassName("area"))
  const convertor = new ModernHtml2Pdf(pages as HTMLElement[])
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
</script>

<template>
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
</template>

<style scoped>
.area {
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

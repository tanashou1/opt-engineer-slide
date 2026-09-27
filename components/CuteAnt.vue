<script setup>
import { computed } from 'vue'

const props = defineProps({
  facing: { type: String, default: 'right' },
  size: { type: Number, default: 64 },
  tone: { type: String, default: 'blue' },
})

const palettes = {
  blue: { abdomen: '#79b9f5', thorax: '#a9d5ff', head: '#8bc7fb', shine: '#d8edff' },
  coral: { abdomen: '#ef887d', thorax: '#ffc5ae', head: '#ffa99b', shine: '#ffe1d6' },
  mint: { abdomen: '#58bd9b', thorax: '#a9e6cc', head: '#7fd5b3', shine: '#d5f5e8' },
  violet: { abdomen: '#a088dc', thorax: '#c9b8f2', head: '#b09ae8', shine: '#e2d9fc' },
  gold: { abdomen: '#edae32', thorax: '#f8d77c', head: '#f5c456', shine: '#fff0c1' },
}
const palette = computed(() => palettes[props.tone] ?? palettes.blue)
</script>

<template>
  <svg :width="size" :height="size * 0.69" viewBox="0 0 92 64" role="img" aria-label="かわいいアリ">
    <g :transform="facing === 'left' ? 'translate(92 0) scale(-1 1)' : undefined">
      <!-- antennae -->
      <path d="M68 21 C67 12 69 7 75 5 M75 5 C81 2 85 5 84 9" fill="none" stroke="#173e72" stroke-width="3" stroke-linecap="round" />
      <path d="M72 23 C76 16 81 15 86 17" fill="none" stroke="#173e72" stroke-width="3" stroke-linecap="round" />
      <!-- legs -->
      <g fill="none" stroke="#173e72" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M35 38 L27 48 L20 49 M43 42 L41 53 L34 57 M53 42 L57 52 L65 55" />
        <path d="M38 30 L30 22 L23 23 M48 28 L47 17 L41 13 M56 32 L63 24 L70 25" />
      </g>
      <!-- body -->
      <ellipse cx="22" cy="35" rx="14" ry="12" :fill="palette.abdomen" stroke="#173e72" stroke-width="3" />
      <ellipse cx="47" cy="36" rx="10" ry="9" :fill="palette.thorax" stroke="#173e72" stroke-width="3" />
      <circle cx="68" cy="34" r="13" :fill="palette.head" stroke="#173e72" stroke-width="3" />
      <!-- face -->
      <ellipse cx="66" cy="32" rx="1.6" ry="2.2" fill="#173e72" />
      <ellipse cx="75" cy="32" rx="1.6" ry="2.2" fill="#173e72" />
      <circle cx="63" cy="38" r="2.1" fill="#ff9eaa" />
      <circle cx="78" cy="38" r="2.1" fill="#ff9eaa" />
      <path d="M68 38 Q71 41 74 38" fill="none" stroke="#173e72" stroke-width="1.8" stroke-linecap="round" />
      <path d="M12 29 Q8 34 12 39" fill="none" :stroke="palette.shine" stroke-width="2" stroke-linecap="round" opacity=".9" />
    </g>
  </svg>
</template>

<script setup>
const labels = ['A₁', 'B₁', 'A₂', 'B₂', 'A₃', 'B₃']
const edges = [[0, 0], [0, 1], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]]
const selected = [[0, 1], [1, 0], [2, 2]]
const colors = ['#2f6fed', '#478dae', '#707dc3']
</script>
<template>
  <svg class="matching-svg" viewBox="0 0 900 365" role="img" aria-label="2行3列の市松模様を二部グラフに変換し、3本の辺から3台の駐車枠を得る図">
    <text x="17" y="30" class="heading">01　マスを2色に分ける</text>
    <text x="334" y="30" class="heading">02　隣接を辺にする</text>
    <text x="670" y="30" class="heading">03　ペアを枠に戻す</text>
    <g v-for="(label, i) in labels" :key="label">
      <rect :x="24 + i % 3 * 65" :y="133 + Math.floor(i / 3) * 65" width="65" height="65" :fill="label.startsWith('A') ? '#d7e7ff' : '#315c97'" stroke="#ffffff" stroke-width="2" />
      <text :x="56.5 + i % 3 * 65" :y="172 + Math.floor(i / 3) * 65" text-anchor="middle" style="font-size:22px" :fill="label.startsWith('A') ? '#234369' : '#ffffff'">{{ label }}</text>
    </g>
    <text x="121" y="104" text-anchor="middle" class="caption">隣り合うのは必ず A と B</text>
    <path d="M250 195 H293 L283 188 M293 195 L283 202" class="arrow" />
    <text x="377" y="80" text-anchor="middle" class="caption">A側</text><text x="557" y="80" text-anchor="middle" class="caption">B側</text>
    <line v-for="([a, b], i) in edges" :key="i" x1="377" :y1="112 + a * 80" x2="557" :y2="112 + b * 80" stroke="#c4d3e8" stroke-width="2" />
    <line v-for="([a, b], i) in selected" :key="`selected-${i}`" x1="377" :y1="112 + a * 80" x2="557" :y2="112 + b * 80" :stroke="colors[i]" stroke-width="6" />
    <g v-for="i in 3" :key="i">
      <circle cx="377" :cy="112 + (i - 1) * 80" r="23" fill="#d7e7ff" stroke="#9dbce8" /><text x="377" :y="118 + (i - 1) * 80" text-anchor="middle" fill="#234369" style="font-size:18px">A{{ ['₁', '₂', '₃'][i - 1] }}</text>
      <circle cx="557" :cy="112 + (i - 1) * 80" r="23" fill="#315c97" /><text x="557" :y="118 + (i - 1) * 80" text-anchor="middle" fill="#ffffff" style="font-size:18px">B{{ ['₁', '₂', '₃'][i - 1] }}</text>
    </g>
    <path d="M605 195 H648 L638 188 M648 195 L638 202" class="arrow" />
    <rect x="676" y="133" width="62" height="127" rx="8" :fill="colors[0]" />
    <rect x="741" y="133" width="127" height="62" rx="8" :fill="colors[1]" />
    <rect x="741" y="198" width="127" height="62" rx="8" :fill="colors[2]" />
    <g fill="white" style="font-size:18px" text-anchor="middle"><text x="707" y="171">A₁</text><text x="707" y="236">B₂</text><text x="773" y="171">B₁</text><text x="838" y="171">A₂</text><text x="773" y="236">A₃</text><text x="838" y="236">B₃</text></g>
    <text x="772" y="104" text-anchor="middle" class="caption">3ペア = 3台分</text>
    <line x1="342" y1="313" x2="373" y2="313" stroke="#c4d3e8" stroke-width="2" /><text x="382" y="318" class="caption">候補</text>
    <line x1="452" y1="313" x2="483" y2="313" stroke="#2f6fed" stroke-width="5" /><text x="491" y="318" class="caption">選んだペア</text>
    <text x="450" y="358" text-anchor="middle" fill="#234369" style="font-size:17px" font-weight="600">各マスを1回まで使い、選べる辺を最大にする → 最大二部マッチング</text>
  </svg>
</template>
<style scoped>
.matching-svg { display:block; width:100%; height:350px; font-family: sans-serif; }
.heading { font-size:17px; font-weight:700; fill:#234369; }
.caption { font-size:14px; fill:#6b809c; }
.arrow { fill:none; stroke:#8ea5c5; stroke-width:2; }
</style>

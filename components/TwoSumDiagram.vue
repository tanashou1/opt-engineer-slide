<script setup>
import { ref } from 'vue'
const revealed = ref(false)
const nodes = [{ x: 93, y: 103, value: 420 }, { x: 279, y: 103, value: 130 }, { x: 93, y: 265, value: 250 }, { x: 279, y: 265, value: 170 }]
const edges = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]]
</script>
<template>
  <div class="sum-diagram">
    <svg viewBox="0 0 900 365" role="img" aria-label="4つの数字の全6組と、300から170を引いて必要な相方130を探す図">
      <rect x="1" y="1" width="370" height="346" rx="18" fill="#ffffff" stroke="#cfddf1" />
      <text x="27" y="36" class="heading">① 全部のペアを比べる</text>
      <line v-for="([a, b], i) in edges" :key="i" :x1="nodes[a].x" :y1="nodes[a].y" :x2="nodes[b].x" :y2="nodes[b].y" stroke="#bfcde1" stroke-width="2" />
      <line v-if="revealed" x1="279" y1="103" x2="279" y2="265" stroke="#3478ef" stroke-width="7" />
      <g v-for="(node, i) in nodes" :key="i">
        <circle :cx="node.x" :cy="node.y" r="33" :fill="revealed && (i === 1 || i === 3) ? '#d7e6ff' : '#e8f0fb'" :stroke="revealed && (i === 1 || i === 3) ? '#3478ef' : '#c6d6ed'" stroke-width="2" />
        <text :x="node.x" :y="node.y + 7" text-anchor="middle" class="number">{{ node.value }}</text>
      </g>
      <g v-if="revealed"><rect x="253" y="170" width="52" height="26" rx="13" fill="#3478ef" /><text x="279" y="189" text-anchor="middle" style="font-size:15px" fill="white">300</text></g>
      <text x="186" y="324" text-anchor="middle" class="caption">4個なら6組。n個なら n(n−1) / 2 組。</text>
      <path d="M390 181 H432 L422 174 M432 181 L422 188" fill="none" stroke="#8ea5c5" stroke-width="2" />
      <text x="459" y="36" class="heading">② 必要な相手だけを探す</text>
      <text x="470" y="89" class="caption">いまの数字</text>
      <rect x="464" y="104" width="103" height="67" rx="14" fill="#193d6e" />
      <text x="515" y="148" fill="#ffffff" style="font-size:31px" font-weight="700" text-anchor="middle">170</text>
      <path d="M580 137 H625 L615 130 M625 137 L615 144" fill="none" stroke="#8ea5c5" stroke-width="2" />
      <text x="651" y="89" class="caption">探す相方</text>
      <rect x="644" y="104" width="233" height="67" rx="14" :fill="revealed ? '#dceaff' : '#e9eef6'" />
      <text x="760" y="147" text-anchor="middle" style="font-size:25px" font-weight="700" fill="#2f6fed">300 − 170 = {{ revealed ? '130' : '?' }}</text>
      <text x="470" y="220" class="caption">すでに見た数字を集合に記憶</text>
      <rect x="464" y="235" width="414" height="59" rx="12" fill="#ffffff" stroke="#cfddf1" />
      <text x="485" y="273" style="font-size:27px" fill="#829abb">{</text><text x="850" y="273" style="font-size:27px" fill="#829abb">}</text>
      <text x="554" y="272" text-anchor="middle" class="number">420</text>
      <rect v-if="revealed" x="633" y="245" width="72" height="38" rx="9" fill="#dceaff" stroke="#2f6fed" />
      <text x="669" y="272" text-anchor="middle" class="number">130</text>
      <text x="784" y="272" text-anchor="middle" class="number">250</text>
      <text v-if="revealed" x="670" y="326" text-anchor="middle" fill="#2f6fed" style="font-size:17px" font-weight="700">130 は見た。だから 130 + 170 = 300！</text>
    </svg>
    <button type="button" :aria-pressed="revealed" @click="revealed = !revealed">{{ revealed ? '答えを隠す' : '相方を表示' }}</button>
  </div>
</template>
<style scoped>
.sum-diagram { position: relative; }
svg { width: 100%; height: 338px; display: block; font-family: sans-serif; }
.heading { fill: #234369; font-size: 18px; font-weight: 700; }
.number { fill: #234369; font-size: 24px; font-weight: 700; font-family: Arial,sans-serif; }
.caption { fill: #6b809c; font-size: 14px; }
button { float: right; padding: 7px 18px; border-radius: 20px; border: 1px solid #2f6fed; background: #2f6fed; color: white; font-size: 12px; cursor: pointer; }
</style>

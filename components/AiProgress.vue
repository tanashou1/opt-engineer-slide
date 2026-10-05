<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'

type Point = { name: string; date: string; score: number }
type Series = { name: string; color: string; mutedColor: string; points: Point[] }

// ALE-Bench Leaderboard, results_summary.json: self-refine x16,
// performance.long.mean. Release dates come from the leaderboard metadata.
const series: Series[] = [
  { name: 'GPT', color: '#2869df', mutedColor: 'rgba(40, 105, 223, 0.5)', points: [
    { name: 'GPT-4.1', date: '2025-04-14', score: 870 },
    { name: 'GPT-5', date: '2025-08-07', score: 1090 },
    { name: 'GPT-5.2 high', date: '2025-12-11', score: 1445 },
    { name: 'GPT-5.3 Codex xhigh', date: '2026-02-05', score: 1649 },
    { name: 'GPT-5.5 xhigh', date: '2026-04-23', score: 1782 },
    { name: 'GPT-5.6 Sol max', date: '2026-07-09', score: 1982 },
    { name: 'GPT-6 Astra max', date: '2026-09-03', score: 2738 },
  ] },
  { name: 'Claude', color: '#d47b42', mutedColor: 'rgba(212, 123, 66, 0.5)', points: [
    { name: 'Claude 4 Sonnet', date: '2025-05-22', score: 1049 },
    { name: 'Claude 4.5 Opus', date: '2025-11-24', score: 1288 },
    { name: 'Claude 4.6 Sonnet medium', date: '2026-02-17', score: 1464 },
    { name: 'Claude 4.8 Opus high', date: '2026-05-28', score: 1885 },
    { name: 'Claude Fable 5 high', date: '2026-06-09', score: 2167 },
    { name: 'Claude Opus 5.5 high', date: '2026-09-22', score: 2354 },
  ] },
  { name: 'Grok', color: '#677c92', mutedColor: 'rgba(103, 124, 146, 0.5)', points: [
    { name: 'Grok Code Fast 1', date: '2025-08-28', score: 836 },
    { name: 'Grok 4.1 Fast', date: '2025-11-19', score: 1088 },
    { name: 'Grok 4.20 beta', date: '2026-02-17', score: 1234 },
    { name: 'Grok 4.5 high', date: '2026-07-08', score: 1404 },
    { name: 'Grok 4.6 xhigh', date: '2026-08-12', score: 1542 },
  ] },
  { name: 'Gemini', color: '#16807a', mutedColor: 'rgba(22, 128, 122, 0.5)', points: [
    { name: 'Gemini 2.5 Pro Thinking', date: '2025-06-17', score: 1052 },
    { name: 'Gemini 3 Pro Preview High', date: '2025-11-18', score: 1465 },
    { name: 'Gemini 3.1 Pro Preview High', date: '2026-02-19', score: 1777 },
    { name: 'Gemini 3.5 Flash High', date: '2026-05-19', score: 1431 },
    { name: 'Gemini 3.6 Flash High', date: '2026-07-21', score: 1638 },
    { name: 'Gemini 3.7 Flash High', date: '2026-08-13', score: 1646 },
    { name: 'Gemini 3.8 Flash High', date: '2026-09-02', score: 1722 },
  ] },
]

const months = Array.from({ length: 19 }, (_, i) => {
  const date = new Date(Date.UTC(2025, 2 + i + 1, 0))
  return date.toISOString().slice(0, 10)
})
const step = ref(0)
const playing = ref(false)
const showModelLabels = ref(true)
const enabledSeries = ref(series.map(s => s.name))
let timer: ReturnType<typeof setInterval> | undefined

const currentDate = computed(() => months[step.value])
const visible = computed(() => series.filter(s => enabledSeries.value.includes(s.name)).map(s => ({
  ...s,
  points: step.value === 0 ? [] : s.points.filter(p => p.date <= currentDate.value),
})))

const left = 44, right = 820, top = 17, bottom = 265
const minDate = Date.parse('2025-03-01'), maxDate = Date.parse('2026-09-30')
const x = (date: string) => left + (Date.parse(date) - minDate) / (maxDate - minDate) * (right - left)
const y = (score: number) => bottom - score / 3300 * (bottom - top)
const path = (points: Point[]) => points.map((p, i) => `${i ? 'L' : 'M'}${x(p.date).toFixed(1)},${y(p.score).toFixed(1)}`).join(' ')
const ticks = Array.from({ length: 9 }, (_, i) => i * 400)
const dateTicks = [
  ['2025-03-01', '2025.03'], ['2025-07-01', '07'], ['2025-11-01', '11'],
  ['2026-03-01', '2026.03'], ['2026-07-01', '07'],
]
const humans = [
  { score: 3087, label: 'chokudai · 3,087', color: '#ff0000' },
  { score: 2200, label: 'm_m · 2,200', color: '#c0c000', labelOffset: -9 },
  { score: 2012, label: 'tanashou1 · 2,012', color: '#c0c000', labelOffset: 10 },
  { score: 1300, label: '競技者平均 · 1,300', color: '#00c0c0' },
  { score: 600, label: 'ITエンジニア平均 · 600', color: '#804000' },
]

const displayName = (name: string) => name.replace(/\s+(?:low|medium|high|xhigh|max)$/i, '')
// Keep every data point, and label each family's latest visible model.
const modelLabels = computed(() => {
  const placed: { left: number; right: number; top: number; bottom: number }[] = []
  const points = visible.value.flatMap(group => group.points.slice(-1).map(point => ({
    ...point,
    color: group.color,
    pointX: x(point.date),
    pointY: y(point.score),
    displayName: displayName(point.name),
    width: displayName(point.name).length * 8.1 + 8,
  }))).sort((a, b) => a.pointY - b.pointY)
  return points.map(point => {
    const anchor = point.pointX + point.width + 12 > right ? 'end' : 'start'
    const labelX = point.pointX + (anchor === 'end' ? -9 : 9)
    const leftEdge = anchor === 'end' ? labelX - point.width : labelX
    const rightEdge = anchor === 'end' ? labelX : labelX + point.width
    let labelY = point.pointY - 12
    for (const offset of [-12, 24, -32, 44]) {
      const baseline = point.pointY + offset
      if (baseline < top + 16 || baseline > bottom - 2) continue
      const box = { left: leftEdge, right: rightEdge, top: baseline - 16, bottom: baseline + 4 }
      if (placed.every(other => box.right < other.left || box.left > other.right || box.bottom < other.top || box.top > other.bottom)) {
        labelY = baseline
        break
      }
    }
    placed.push({ left: leftEdge, right: rightEdge, top: labelY - 16, bottom: labelY + 4 })
    return { ...point, labelX, labelY, anchor }
  })
})

function stop() {
  if (timer) clearInterval(timer)
  timer = undefined
  playing.value = false
}
function togglePlay() {
  if (playing.value) return stop()
  if (step.value === months.length - 1) step.value = 0
  playing.value = true
  timer = setInterval(() => {
    if (step.value < months.length - 1) step.value++
    else stop()
  }, 700)
}
function changeStep(value: string) {
  stop()
  step.value = Number(value)
}
function toggleSeries(name: string) {
  enabledSeries.value = enabledSeries.value.includes(name)
    ? enabledSeries.value.filter(item => item !== name)
    : [...enabledSeries.value, name]
}
onUnmounted(stop)
</script>

<template>
  <div class="ai-progress">
    <div class="ai-chart-wrap">
      <svg class="ai-chart" viewBox="0 0 1040 300" role="img" aria-label="縦軸0からのALE-Bench Long問題の平均Performanceと人間のレート目安をモデル公開日ごとに表示したグラフ">
        <g v-for="tick in ticks" :key="tick">
          <line :x1="left" :x2="right" :y1="y(tick)" :y2="y(tick)" class="ai-grid" />
          <text x="43" :y="y(tick) + 4" class="ai-axis-number" text-anchor="end">{{ tick.toLocaleString() }}</text>
        </g>
        <g v-for="human in humans" :key="human.score">
          <line :x1="left" :x2="right" :y1="y(human.score)" :y2="y(human.score)" :stroke="human.color" stroke-width="1.5" stroke-dasharray="5 5" opacity=".8" />
          <text x="842" :y="y(human.score)+(human.labelOffset ?? 3)" class="ai-human-label" :fill="human.color">{{ human.label }}</text>
        </g>
        <g v-for="tick in dateTicks" :key="tick[0]">
          <line :x1="x(tick[0])" :x2="x(tick[0])" :y1="bottom" :y2="bottom+5" stroke="#9aabc0" />
          <text :x="x(tick[0])" y="285" class="ai-axis-date" text-anchor="middle">{{ tick[1] }}</text>
        </g>
        <line :x1="x(currentDate)" :x2="x(currentDate)" :y1="top" :y2="bottom" stroke="#667c9c" stroke-width="1" stroke-dasharray="3 5" opacity=".6" />
        <g v-for="group in visible" :key="group.name">
          <path v-if="group.points.length > 1" :d="path(group.points)" fill="none" :stroke="group.color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity=".75" />
        </g>
        <text v-for="point in modelLabels" v-show="showModelLabels" :key="point.name" :x="point.labelX" :y="point.labelY" :text-anchor="point.anchor" :fill="point.color" class="ai-model-label">{{ point.displayName }}</text>
        <g v-for="group in visible" :key="`${group.name}-points`">
          <circle v-for="point in group.points" :key="point.name" :cx="x(point.date)" :cy="y(point.score)" r="4.5" :fill="group.color" stroke="white" stroke-width="2" />
        </g>
      </svg>
    </div>
    <div class="ai-controls">
      <button class="ai-play" type="button" @click="togglePlay">{{ playing ? '一時停止' : '▶ 再生' }}</button>
      <button class="ai-label-toggle" type="button" :aria-pressed="showModelLabels" @click="showModelLabels = !showModelLabels">モデル名 {{ showModelLabels ? 'ON' : 'OFF' }}</button>
      <input class="ai-slider" type="range" min="0" :max="months.length - 1" :value="step" aria-label="表示する公開月" @input="changeStep(($event.target as HTMLInputElement).value)" />
      <span class="ai-date">{{ currentDate.slice(0, 7).replace('-', '.') }}</span>
      <div class="ai-legend">
        <button v-for="group in series" :key="group.name" class="ai-legend-button" type="button" :aria-pressed="enabledSeries.includes(group.name)" @click="toggleSeries(group.name)">
          <i :style="{ background: group.color }" />{{ group.name }}
        </button>
      </div>
    </div>
    <div class="ai-source">出典: <a href="https://sakanaai.github.io/ALE-Bench-Leaderboard/" target="_blank" rel="noopener noreferrer">ALE-Bench Leaderboard</a>（2026-09-24 · Self-refine ×16 · Long）</div>
  </div>
</template>

<style scoped>
.ai-progress { font-family: 'Noto Sans JP', 'Hiragino Sans', sans-serif; }
.ai-chart-wrap { height: 315px; padding: 4px 4px 0; border: 1px solid #d6e2f0; border-radius: 13px; background: #fff; }
.ai-chart { display: block; width: 100%; height: 100%; }
.ai-grid { stroke: #e4eaf2; stroke-width: 1; }
.ai-axis-number,.ai-axis-date { fill: #7488a2; font: 15px Arial, sans-serif; }
.ai-human-label { font: 700 16px 'Noto Sans JP', sans-serif; }
.ai-model-label { font: 700 16px 'Noto Sans JP', Arial, sans-serif; paint-order: stroke; stroke: #fff; stroke-width: 1.25px; stroke-linejoin: round; pointer-events: none; }
.ai-controls { display: flex; align-items: center; gap: 10px; margin-top: 12px; }
.ai-play { flex: none; border: 0; border-radius: 7px; padding: 7px 12px; color: #fff; background: #2f6fed; font-size: 14px; font-weight: 700; cursor: pointer; }
.ai-label-toggle { flex: none; border: 1px solid #b9cbe1; border-radius: 7px; padding: 6px 9px; color: #345476; background: #fff; font-size: 13px; font-weight: 700; cursor: pointer; }
.ai-label-toggle[aria-pressed="false"] { color: #8494a7; background: #f3f6fa; }
.ai-label-toggle:focus-visible { outline: 2px solid #2f6fed; outline-offset: 2px; }
.ai-slider { flex: 1; accent-color: #2f6fed; }
.ai-date { width: 60px; color: #345476; font: 700 14px Arial, sans-serif; }
.ai-legend { display: flex; gap: 11px; color: #536b88; font-size: 13px; white-space: nowrap; }
.ai-legend-button { display: flex; align-items: center; gap: 4px; padding: 0; border: 0; color: inherit; background: transparent; font: inherit; cursor: pointer; }
.ai-legend-button[aria-pressed="false"] { opacity: .38; text-decoration: line-through; }
.ai-legend-button:focus-visible { outline: 2px solid #2f6fed; outline-offset: 3px; border-radius: 3px; }
.ai-legend i { width: 7px; height: 7px; border-radius: 50%; }
.ai-source { margin-top: 5px; color: #8494a7; font-size: 12px; }
.ai-source a { color: #496c9c; text-decoration: underline; }
</style>

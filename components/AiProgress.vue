<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'

type Point = { name: string; date: string; score: number }
type Series = { name: string; color: string; points: Point[] }

// ALE-Bench Leaderboard, results_summary.json: self-refine x16,
// performance.long.mean. Release dates come from the leaderboard metadata.
const series: Series[] = [
  { name: 'GPT / Codex', color: '#2869df', points: [
    { name: 'GPT-4.1', date: '2025-04-14', score: 870 },
    { name: 'GPT-5', date: '2025-08-07', score: 1090 },
    { name: 'GPT-5.2 high', date: '2025-12-11', score: 1445 },
    { name: 'GPT-5.3 Codex xhigh', date: '2026-02-05', score: 1649 },
    { name: 'GPT-5.5 xhigh', date: '2026-04-23', score: 1782 },
    { name: 'GPT-5.6 Sol max', date: '2026-07-09', score: 1982 },
    { name: 'GPT-6 Astra max', date: '2026-09-03', score: 2738 },
  ] },
  { name: 'Claude', color: '#d47b42', points: [
    { name: 'Claude 4 Sonnet', date: '2025-05-22', score: 1049 },
    { name: 'Claude 4.5 Opus', date: '2025-11-24', score: 1288 },
    { name: 'Claude 4.6 Sonnet medium', date: '2026-02-17', score: 1464 },
    { name: 'Claude 4.8 Opus high', date: '2026-05-28', score: 1885 },
    { name: 'Claude Fable 5 high', date: '2026-06-09', score: 2167 },
    { name: 'Claude Opus 5.5 high', date: '2026-09-22', score: 2354 },
  ] },
  { name: 'Grok', color: '#677c92', points: [
    { name: 'Grok Code Fast 1', date: '2025-08-28', score: 836 },
    { name: 'Grok 4.1 Fast', date: '2025-11-19', score: 1088 },
    { name: 'Grok 4.20 beta', date: '2026-02-17', score: 1234 },
    { name: 'Grok 4.5 high', date: '2026-07-08', score: 1404 },
    { name: 'Grok 4.6 xhigh', date: '2026-08-12', score: 1542 },
  ] },
]

const months = Array.from({ length: 18 }, (_, i) => {
  const date = new Date(Date.UTC(2025, 3 + i + 1, 0))
  return date.toISOString().slice(0, 10)
})
const step = ref(months.length - 1)
const selected = ref<Point>(series[0].points.at(-1)!)
const playing = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

const currentDate = computed(() => months[step.value])
const visible = computed(() => series.map(s => ({
  ...s,
  points: s.points.filter(p => p.date <= currentDate.value),
})))
const leader = computed(() => visible.value.flatMap(s => s.points).sort((a, b) => b.score - a.score)[0])

const left = 52, right = 738, top = 17, bottom = 265
const minDate = Date.parse('2025-04-01'), maxDate = Date.parse('2026-09-30')
const x = (date: string) => left + (Date.parse(date) - minDate) / (maxDate - minDate) * (right - left)
const y = (score: number) => bottom - (score - 600) / (3300 - 600) * (bottom - top)
const path = (points: Point[]) => points.map((p, i) => `${i ? 'L' : 'M'}${x(p.date).toFixed(1)},${y(p.score).toFixed(1)}`).join(' ')
const ticks = [800, 1200, 1600, 2000, 2400, 2800, 3200]
const dateTicks = [
  ['2025-04-01', '2025.04'], ['2025-08-01', '08'], ['2025-12-01', '12'],
  ['2026-04-01', '2026.04'], ['2026-08-01', '08'],
]
const humans = [
  { score: 2000, label: 'メンバー A', color: '#c49a38' },
  { score: 2400, label: 'メンバー B', color: '#aa747d' },
  { score: 3200, label: 'メンバー C', color: '#8069a8' },
]

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
  if (selected.value.date > currentDate.value && leader.value) selected.value = leader.value
}
onUnmounted(stop)
</script>

<template>
  <div class="ai-progress">
    <div class="ai-chart-wrap">
      <svg class="ai-chart" viewBox="0 0 920 300" role="img" aria-label="ALE-Bench Long問題の平均Performanceをモデル公開日ごとに表示したグラフ">
        <g v-for="tick in ticks" :key="tick">
          <line :x1="left" :x2="right" :y1="y(tick)" :y2="y(tick)" class="ai-grid" />
          <text x="43" :y="y(tick) + 4" class="ai-axis-number" text-anchor="end">{{ tick.toLocaleString() }}</text>
        </g>
        <g v-for="human in humans" :key="human.score">
          <line :x1="left" :x2="right" :y1="y(human.score)" :y2="y(human.score)" :stroke="human.color" stroke-width="1.5" stroke-dasharray="5 5" opacity=".8" />
          <circle cx="754" :cy="y(human.score)" r="4" :fill="human.color" />
          <text x="766" :y="y(human.score)-2" class="ai-human-label">{{ human.label }}</text>
          <text x="766" :y="y(human.score)+13" class="ai-human-score">レート {{ human.score.toLocaleString() }}</text>
        </g>
        <g v-for="tick in dateTicks" :key="tick[0]">
          <line :x1="x(tick[0])" :x2="x(tick[0])" :y1="bottom" :y2="bottom+5" stroke="#9aabc0" />
          <text :x="x(tick[0])" y="285" class="ai-axis-date" text-anchor="middle">{{ tick[1] }}</text>
        </g>
        <line :x1="x(currentDate)" :x2="x(currentDate)" :y1="top" :y2="bottom" stroke="#667c9c" stroke-width="1" stroke-dasharray="3 5" opacity=".6" />
        <g v-for="group in visible" :key="group.name">
          <path v-if="group.points.length > 1" :d="path(group.points)" fill="none" :stroke="group.color" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity=".75" />
          <circle v-for="point in group.points" :key="point.name" :cx="x(point.date)" :cy="y(point.score)" :r="selected.name === point.name ? 7 : 4.5" :fill="group.color" stroke="white" stroke-width="2" class="ai-point" tabindex="0" role="button" :aria-label="`${point.name}、${point.score}、${point.date}`" @click="selected = point" @keydown.enter="selected = point" @keydown.space.prevent="selected = point" />
        </g>
      </svg>
    </div>
    <div class="ai-controls">
      <button class="ai-play" type="button" @click="togglePlay">{{ playing ? '一時停止' : '▶ 再生' }}</button>
      <input class="ai-slider" type="range" min="0" :max="months.length - 1" :value="step" aria-label="表示する公開月" @input="changeStep(($event.target as HTMLInputElement).value)" />
      <span class="ai-date">{{ currentDate.slice(0, 7).replace('-', '.') }}</span>
      <div class="ai-legend"><span v-for="group in series" :key="group.name"><i :style="{ background: group.color }" />{{ group.name }}</span></div>
    </div>
    <div class="ai-detail">
      <div><small>選択したモデル</small><strong>{{ selected.name }}</strong><span>{{ selected.date }}</span></div>
      <div><small>Long 問題の平均 Performance</small><b>{{ selected.score.toLocaleString() }}</b></div>
      <p>人間の線はレートの目安。モデルの数値は問題ごとの Performance の平均で、同一指標ではありません。</p>
    </div>
    <div class="ai-source">出典: <a href="https://sakanaai.github.io/ALE-Bench-Leaderboard/" target="_blank" rel="noopener noreferrer">ALE-Bench Leaderboard</a>（2026-09-24 公開データ、Self-refine ×16、Long）。線は代表モデルの公開日順に接続。</div>
  </div>
</template>

<style scoped>
.ai-progress { font-family: 'Noto Sans JP', 'Hiragino Sans', sans-serif; }
.ai-chart-wrap { height: 250px; padding: 5px 6px 0; border: 1px solid #d6e2f0; border-radius: 13px; background: #fff; }
.ai-chart { display: block; width: 100%; height: 100%; }
.ai-grid { stroke: #e4eaf2; stroke-width: 1; }
.ai-axis-number,.ai-axis-date { fill: #7488a2; font: 11px Arial, sans-serif; }
.ai-human-label { fill: #435b78; font: 700 11px 'Noto Sans JP', sans-serif; }
.ai-human-score { fill: #7589a2; font: 10px Arial, sans-serif; }
.ai-point { cursor: pointer; outline: none; }
.ai-point:focus-visible { stroke: #172f52; stroke-width: 3; }
.ai-controls { display: flex; align-items: center; gap: 12px; margin-top: 10px; }
.ai-play { flex: none; border: 0; border-radius: 7px; padding: 7px 12px; color: #fff; background: #2f6fed; font-size: 11px; font-weight: 700; cursor: pointer; }
.ai-slider { flex: 1; accent-color: #2f6fed; }
.ai-date { width: 48px; color: #345476; font: 700 11px Arial, sans-serif; }
.ai-legend { display: flex; gap: 11px; color: #536b88; font-size: 10px; white-space: nowrap; }
.ai-legend span { display: flex; align-items: center; gap: 4px; }
.ai-legend i { width: 7px; height: 7px; border-radius: 50%; }
.ai-detail { display: flex; align-items: center; gap: 20px; margin-top: 9px; padding: 8px 13px; border-radius: 9px; background: #e8f0fb; }
.ai-detail > div { display: flex; align-items: baseline; gap: 8px; white-space: nowrap; }
.ai-detail small { color: #7488a2; font-size: 9px; }
.ai-detail strong { color: #1d426f; font-size: 12px; }
.ai-detail span { color: #7488a2; font: 10px Arial, sans-serif; }
.ai-detail b { color: #2869df; font: 700 20px Arial, sans-serif; }
.ai-detail p { margin: 0 0 0 auto; max-width: 260px; color: #70849d; font-size: 9px; line-height: 1.4; }
.ai-source { margin-top: 5px; color: #8494a7; font-size: 9px; }
.ai-source a { color: #496c9c; text-decoration: underline; }
</style>

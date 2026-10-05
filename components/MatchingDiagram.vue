<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const phase = ref(0)
const playing = ref(false)
let timer

const boardX = 37
const boardY = 151
const cellSize = 58
const cellPitch = 64
const boardLabels = ['A₁', 'B₁', 'A₂', 'B₂', 'A₃', 'B₃', 'A₄', 'B₄', 'A₅']
const cells = computed(() => Array.from({ length: 9 }, (_, id) => ({
  id,
  row: Math.floor(id / 3),
  col: id % 3,
  isA: (Math.floor(id / 3) + id % 3) % 2 === 0,
  x: boardX + (id % 3) * cellPitch,
  y: boardY + Math.floor(id / 3) * cellPitch,
  label: boardLabels[id],
})))

const aNodes = [
  { id: 'A1', label: 'A₁', x: 485, y: 116 },
  { id: 'A2', label: 'A₂', x: 485, y: 174 },
  { id: 'A3', label: 'A₃', x: 485, y: 232 },
  { id: 'A4', label: 'A₄', x: 485, y: 290 },
  { id: 'A5', label: 'A₅', x: 485, y: 348 },
]
const bNodes = [
  { id: 'B1', label: 'B₁', x: 715, y: 145 },
  { id: 'B2', label: 'B₂', x: 715, y: 213 },
  { id: 'B3', label: 'B₃', x: 715, y: 281 },
  { id: 'B4', label: 'B₄', x: 715, y: 349 },
]
const source = { id: 'S', label: 'S', x: 310, y: 232 }
const sink = { id: 'T', label: 'T', x: 875, y: 232 }
const graphNodes = [...aNodes.map(node => ({ ...node, kind: 'a' })), ...bNodes.map(node => ({ ...node, kind: 'b' })), { ...source, kind: 'terminal' }, { ...sink, kind: 'terminal' }]
const adjacency = [
  ['A1', 'B1'], ['A1', 'B2'],
  ['A2', 'B1'], ['A2', 'B3'],
  ['A3', 'B1'], ['A3', 'B2'], ['A3', 'B3'], ['A3', 'B4'],
  ['A4', 'B2'], ['A4', 'B4'],
  ['A5', 'B3'], ['A5', 'B4'],
]
const pointById = Object.fromEntries(graphNodes.map(node => [node.id, node]))
const graphEdges = [
  ...aNodes.map((node, i) => ({ id: `s-a${i + 1}`, from: source, to: node })),
  ...adjacency.map(([a, b]) => ({ id: `${a.toLowerCase()}-${b.toLowerCase()}`, from: pointById[a], to: pointById[b] })),
  ...bNodes.map((node, i) => ({ id: `b${i + 1}-t`, from: node, to: sink })),
].map(edge => {
  const startX = edge.from.x + 25
  const endX = edge.to.x - 25
  const span = endX - startX
  return {
    ...edge,
    d: `M ${startX} ${edge.from.y} C ${startX + span * .36} ${edge.from.y}, ${endX - span * .36} ${edge.to.y}, ${endX} ${edge.to.y}`,
  }
})
const visibleGraphEdges = computed(() => phase.value === 0
  ? graphEdges.filter(edge => edge.from.id !== 'S' && edge.to.id !== 'T')
  : graphEdges)
const visibleGraphNodes = computed(() => phase.value === 0
  ? graphNodes.filter(node => node.kind !== 'terminal')
  : graphNodes)

const firstFlow = ['s-a3', 'a3-b1', 'b1-t']
const reroutedFlow = ['s-a1', 'a1-b1', 'b1-t', 's-a3', 'a3-b2', 'b2-t']
const flowEdges = computed(() => {
  if (phase.value === 1 || phase.value === 2) return firstFlow
  if (phase.value === 3) return [...reroutedFlow, 's-a2', 'a2-b3', 'b3-t']
  if (phase.value === 4) return [...reroutedFlow, 's-a2', 'a2-b3', 'b3-t', 's-a4', 'a4-b4', 'b4-t']
  return []
})
const augmentEdges = computed(() => {
  if (phase.value === 2) return ['s-a1', 'a1-b1', 'a3-b2', 'b2-t']
  if (phase.value === 3) return ['s-a2', 'a2-b3', 'b3-t']
  if (phase.value === 4) return ['s-a4', 'a4-b4', 'b4-t']
  return []
})
const flowNodes = computed(() => {
  if (phase.value === 1) return ['S', 'A3', 'B1', 'T']
  if (phase.value === 2) return ['S', 'A1', 'A3', 'B1', 'B2', 'T']
  if (phase.value === 3) return ['S', 'A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'T']
  if (phase.value === 4) return graphNodes.map(node => node.id)
  return []
})
const flowValue = computed(() => phase.value === 0 ? '—' : ['0', '1', '1 → 2', '3', '4 / 最大'][phase.value])
const stepLabel = computed(() => ['再生前', '1組目を確保', '増加路で付け替え', '3組目を追加', '最大流に到達'][phase.value])
const stepText = computed(() => [
  '再生を押すと、最大流の流れが動き始めます。',
  'S → A₃ → B₁ → T に1単位流す。',
  '残余辺 B₁ → A₃ を使って組み替え、流量を2に増やす。',
  'S → A₂ → B₃ → T に流し、流量3へ。',
  'S → A₄ → B₄ → T に流す。B側4ノードを使い切り、最大流4。',
][phase.value])

const resultGridX = 1002
const resultGridY = 151
const tileSize = 68
const tilePitch = 74
const resultCells = Array.from({ length: 9 }, (_, id) => ({
  id,
  x: resultGridX + (id % 3) * tilePitch,
  y: resultGridY + Math.floor(id / 3) * tilePitch,
}))
const tiles = [
  { id: 'pair1', x: resultGridX, y: resultGridY, width: tileSize * 2 + 6, height: tileSize, cells: ['A₁', 'B₁'], horizontal: true, color: '#2f6fed' },
  { id: 'pair2', x: resultGridX + tilePitch * 2, y: resultGridY, width: tileSize, height: tileSize * 2 + 6, cells: ['A₂', 'B₃'], horizontal: false, color: '#478dae' },
  { id: 'pair3', x: resultGridX, y: resultGridY + tilePitch, width: tileSize * 2 + 6, height: tileSize, cells: ['B₂', 'A₃'], horizontal: true, color: '#707dc3' },
  { id: 'pair4', x: resultGridX, y: resultGridY + tilePitch * 2, width: tileSize * 2 + 6, height: tileSize, cells: ['A₄', 'B₄'], horizontal: true, color: '#28589c' },
]

function advance() { phase.value = phase.value >= 4 ? 1 : phase.value + 1 }
function start() {
  if (timer) window.clearInterval(timer)
  timer = window.setInterval(advance, 2600)
}
function togglePlayback() {
  if (playing.value) {
    playing.value = false
    if (timer) window.clearInterval(timer)
    return
  }
  playing.value = true
  if (phase.value === 0) phase.value = 1
  start()
}
function restart() {
  if (playing.value) {
    phase.value = 1
    start()
  } else {
    phase.value = 0
  }
}

onMounted(() => { if (playing.value) start() })
onUnmounted(() => { if (timer) window.clearInterval(timer) })
</script>

<template>
  <div class="matching-demo">
    <svg class="matching-svg" viewBox="0 0 1280 465" role="img" aria-label="再生前はA・Bの二部グラフを表示し、再生後にS・Tを加えて最大流を求め、右側に4組のマッチング結果を示す図">
      <defs>
        <marker id="arrow-muted" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="#aebdd1" /></marker>
        <marker id="arrow-flow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="#2f6fed" /></marker>
        <marker id="arrow-augment" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="#ef8d43" /></marker>
      </defs>

      <text x="23" y="39" class="panel-title">3×3盤面</text>
      <text x="23" y="62" class="panel-subtitle">全9マスをA側・B側に分類</text>
      <text v-for="n in 3" :key="`col-${n}`" :x="boardX + (n - 1) * cellPitch + cellSize / 2" y="141" class="grid-number" text-anchor="middle">{{ n }}</text>
      <text v-for="n in 3" :key="`row-${n}`" x="25" :y="boardY + (n - 1) * cellPitch + 33" class="grid-number" text-anchor="middle">{{ n }}</text>
      <rect x="31" y="144" width="200" height="200" rx="8" class="board-frame" />
      <g v-for="cell in cells" :key="cell.id">
        <rect :x="cell.x" :y="cell.y" :width="cellSize" :height="cellSize" rx="5" :class="['board-cell', cell.isA ? 'cell-a' : 'cell-b']" />
        <text :x="cell.x + cellSize / 2" :y="cell.y + 36" text-anchor="middle" :class="['cell-label', cell.isA ? 'label-a' : 'label-b']">{{ cell.label }}</text>
      </g>
      <rect x="28" y="380" width="16" height="16" rx="3" class="legend-a" /><text x="52" y="393" class="legend-label">A側</text>
      <rect x="112" y="380" width="16" height="16" rx="3" class="legend-b" /><text x="136" y="393" class="legend-label">B側</text>

      <text x="267" y="39" class="panel-title">マッチング問題を最大流問題として解く</text>
      <text x="267" y="62" class="panel-subtitle">二部マッチング問題は、最大流として効率的に解ける。</text>
      <g v-if="phase > 0" class="flow-badge">
        <rect x="782" y="21" width="112" height="49" rx="11" />
        <text x="796" y="41" class="badge-caption">流量</text>
        <text x="852" y="62" text-anchor="middle" class="badge-value">{{ flowValue }}</text>
      </g>
      <text x="485" y="91" text-anchor="middle" class="side-label">A側</text>
      <text x="715" y="91" text-anchor="middle" class="side-label">B側</text>
      <text v-if="phase > 0" x="600" y="389" text-anchor="middle" class="network-note">S → A → B → T の流量 ＝ 選べるペア数 ／ 各辺の容量は1</text>

      <g class="network-edges">
        <path v-for="edge in visibleGraphEdges" :key="edge.id" :d="edge.d" class="edge-candidate" :marker-end="'url(#arrow-muted)'" />
        <path v-for="edge in visibleGraphEdges.filter(e => flowEdges.includes(e.id))" :key="`flow-${edge.id}`" :d="edge.d" class="edge-flow" :marker-end="'url(#arrow-flow)'" />
        <path v-for="edge in visibleGraphEdges.filter(e => augmentEdges.includes(e.id))" :key="`augment-${edge.id}`" :d="edge.d" class="edge-augment" :marker-end="'url(#arrow-augment)'" />
        <path v-if="phase === 2" d="M 690 137 C 630 148 575 205 510 232" class="edge-reverse" :marker-end="'url(#arrow-augment)'" />
      </g>

      <g v-for="node in visibleGraphNodes" :key="node.id" :class="['network-node', `node-${node.kind}`, { 'node-in-flow': flowNodes.includes(node.id) }]">
        <circle :cx="node.x" :cy="node.y" r="22" />
        <text :x="node.x" :y="node.y + 5" text-anchor="middle">{{ node.label }}</text>
      </g>
      <text v-if="phase > 0" x="310" y="269" text-anchor="middle" class="terminal-label">source</text>
      <text v-if="phase > 0" x="875" y="269" text-anchor="middle" class="terminal-label">sink</text>

      <text x="948" y="39" class="panel-title">マッチング結果</text>
      <text x="948" y="62" class="panel-subtitle">4組をタイルに戻す</text>
      <g>
        <rect v-for="cell in resultCells" :key="cell.id" :x="cell.x" :y="cell.y" :width="tileSize" :height="tileSize" rx="7" class="result-cell" />
        <g v-for="tile in tiles" :key="tile.id">
          <rect :x="tile.x" :y="tile.y" :width="tile.width" :height="tile.height" rx="9" :fill="tile.color" class="result-tile" />
          <line v-if="tile.horizontal" :x1="tile.x + tileSize + 3" :x2="tile.x + tileSize + 3" :y1="tile.y + 8" :y2="tile.y + tile.height - 8" class="tile-divider" />
          <line v-else :x1="tile.x + 8" :x2="tile.x + tile.width - 8" :y1="tile.y + tileSize + 3" :y2="tile.y + tileSize + 3" class="tile-divider" />
          <text v-if="tile.horizontal" :x="tile.x + tileSize / 2" :y="tile.y + tile.height / 2 + 4" text-anchor="middle" class="tile-label">{{ tile.cells[0] }}</text>
          <text v-if="tile.horizontal" :x="tile.x + tileSize + 6 + tileSize / 2" :y="tile.y + tile.height / 2 + 4" text-anchor="middle" class="tile-label">{{ tile.cells[1] }}</text>
          <text v-if="!tile.horizontal" :x="tile.x + tile.width / 2" :y="tile.y + tileSize / 2 + 4" text-anchor="middle" class="tile-label">{{ tile.cells[0] }}</text>
          <text v-if="!tile.horizontal" :x="tile.x + tile.width / 2" :y="tile.y + tileSize + 6 + tileSize / 2 + 4" text-anchor="middle" class="tile-label">{{ tile.cells[1] }}</text>
        </g>
        <text :x="resultGridX + tilePitch * 2 + tileSize / 2" :y="resultGridY + tilePitch * 2 + 40" text-anchor="middle" class="unmatched-label">A₅</text>
      </g>
      <text x="1112" y="393" text-anchor="middle" class="result-caption">4ペアを配置、A₅が1マス残る</text>

      <rect x="267" y="407" width="627" height="47" rx="11" class="step-card" />
      <circle v-if="phase > 0" cx="289" cy="430" r="13" class="step-number" />
      <text v-if="phase > 0" x="289" y="434" text-anchor="middle" class="step-number-text">{{ phase }}</text>
      <text x="311" y="426" class="step-label">{{ stepLabel }}</text>
      <text x="311" y="443" class="step-copy">{{ stepText }}</text>
    </svg>

    <div class="matching-controls">
      <span class="animation-indicator"><i :class="{ running: playing }"></i>{{ playing ? '最大流の流れを再生中' : phase === 0 ? '再生待ち' : '一時停止中' }}</span>
      <div class="matching-buttons">
        <button type="button" @click="togglePlayback">{{ playing ? '一時停止' : '再生' }}</button>
        <button type="button" @click="restart">最初から</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.matching-demo { width: 100%; color: #234369; }
.matching-svg { display: block; width: 100%; height: auto; overflow: visible; font-family: 'Noto Sans JP', sans-serif; }
.panel-title { fill: #234369; font-size: 22px; font-weight: 750; }
.panel-subtitle { fill: #7186a2; font-size: 15px; }
.grid-number { fill: #8b9db6; font-size: 14px; }
.board-frame { fill: #f4f7fc; stroke: #d7e1ef; stroke-width: 1.5; }
.board-cell { stroke: #fff; stroke-width: 2; }
.cell-a, .legend-a { fill: #4b78b9; }
.cell-b, .legend-b { fill: #dce9fa; }
.cell-label { font-size: 19px; font-weight: 800; }
.label-a { fill: #fff; }
.label-b { fill: #244b7d; }
.legend-b { stroke: #bfd0e7; }
.legend-label { fill: #6f83a0; font-size: 14px; }
.flow-badge rect { fill: #edf4ff; stroke: #d1e1fa; }
.badge-caption { fill: #6981a1; font-size: 12px; }
.badge-value { fill: #2867c2; font-size: 16px; font-weight: 800; }
.network-note { fill: #8394aa; font-size: 14px; }
.side-label { fill: #4e6f9b; font-size: 14px; font-weight: 750; }
.edge-candidate, .edge-flow, .edge-augment, .edge-reverse { fill: none; stroke-width: 2; stroke-linecap: round; transition: stroke .25s ease; }
.edge-candidate { stroke: #c7d3e2; }
.edge-flow { stroke: #2f6fed; }
.edge-augment, .edge-reverse { stroke: #ef8d43; }
.network-node circle { fill: #fff; stroke: #aebdd1; stroke-width: 1.7; transition: fill .25s, stroke .25s; }
.network-node text { fill: #657d9d; font-size: 15px; font-weight: 750; transition: fill .25s; }
.network-node.node-a circle { fill: #e9f1fc; stroke: #9fbce2; }
.network-node.node-b circle { fill: #f6f9fe; stroke: #b6c8df; }
.network-node.node-terminal circle { fill: #eef3fa; stroke: #91a6c2; }
.network-node.node-in-flow circle { fill: #2f6fed; stroke: #1f56b8; }
.network-node.node-in-flow text { fill: #fff; }
.terminal-label { fill: #8394aa; font-size: 11px; }
.step-card { fill: #f5f8fd; stroke: #e1e9f4; }
.step-number { fill: #2f6fed; }
.step-number-text { fill: #fff; font-size: 13px; font-weight: 800; }
.step-label { fill: #2d558a; font-size: 13px; font-weight: 750; }
.step-copy { fill: #607998; font-size: 12px; }
.result-cell { fill: #eef3f9; stroke: #dae3ef; stroke-width: 1.5; }
.result-tile { stroke: #fff; stroke-width: 2; }
.tile-divider { stroke: #fff; stroke-width: 2; stroke-opacity: .8; }
.tile-label { fill: #fff; font-size: 15px; font-weight: 750; }
.unmatched-label { fill: #7186a2; font-size: 16px; font-weight: 750; }
.result-caption { fill: #6f83a0; font-size: 13px; }
.matching-controls { display: flex; align-items: center; justify-content: center; gap: 14px; min-height: 34px; margin-top: 2px; }
.animation-indicator { display: inline-flex; align-items: center; gap: 8px; color: #6a7f9b; font-size: 13px; }
.animation-indicator i { width: 8px; height: 8px; border-radius: 50%; background: #aebdd1; }
.animation-indicator i.running { background: #2f6fed; }
.matching-buttons { display: flex; gap: 7px; }
.matching-buttons button { min-width: 78px; padding: 7px 13px; border: 1px solid #cfdbeb; border-radius: 6px; color: #42628a; background: #fff; font-family: inherit; font-size: 13px; font-weight: 600; line-height: 1.2; cursor: pointer; }
.matching-buttons button:hover { border-color: #8eb4ef; background: #f4f8ff; }
</style>

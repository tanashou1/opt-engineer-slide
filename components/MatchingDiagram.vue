<script setup>
import { computed, onUnmounted, ref } from 'vue'

const phase = ref(0)
const playing = ref(false)
let timer

const boardX = 42
const boardY = 83
const cellSize = 60
const cellPitch = 64
const blockedCells = new Set([1, 8, 16, 24])
const subscript = value => String(value).replace(/\d/g, digit => '₀₁₂₃₄₅₆₇₈₉'[Number(digit)])

let countA = 0
let countB = 0
const cells = Array.from({ length: 25 }, (_, cellId) => {
  const row = Math.floor(cellId / 5)
  const col = cellId % 5
  const isObstacle = blockedCells.has(cellId)
  const isA = (row + col) % 2 === 0
  const sideIndex = isObstacle ? 0 : isA ? ++countA : ++countB
  return {
    id: cellId,
    row,
    col,
    isObstacle,
    isA,
    label: isObstacle ? '×' : `${isA ? 'A' : 'B'}${subscript(sideIndex)}`,
    x: boardX + col * cellPitch,
    y: boardY + row * cellPitch,
  }
})

const freeCells = cells.filter(cell => !cell.isObstacle)
const aNodes = freeCells.filter(cell => cell.isA).map((cell, index) => ({
  id: `a-${cell.id}`,
  cellId: cell.id,
  label: `A${subscript(index + 1)}`,
  x: 693,
  y: 101 + index * 29,
  kind: 'a',
}))
const bNodes = freeCells.filter(cell => !cell.isA).map((cell, index) => ({
  id: `b-${cell.id}`,
  cellId: cell.id,
  label: `B${subscript(index + 1)}`,
  x: 1000,
  y: 94 + index * 27.5,
  kind: 'b',
}))
const source = { id: 'S', label: 'S', x: 535, y: 245, kind: 'terminal' }
const sink = { id: 'T', label: 'T', x: 1175, y: 245, kind: 'terminal' }
const aByCell = new Map(aNodes.map(node => [node.cellId, node]))
const bByCell = new Map(bNodes.map(node => [node.cellId, node]))
const neighborIds = cell => [
  [cell.row - 1, cell.col], [cell.row + 1, cell.col],
  [cell.row, cell.col - 1], [cell.row, cell.col + 1],
].filter(([row, col]) => row >= 0 && row < 5 && col >= 0 && col < 5)
  .map(([row, col]) => row * 5 + col)
  .filter(id => !blockedCells.has(id))

const candidates = aNodes.flatMap(from => neighborIds(cells[from.cellId])
  .map(cellId => bByCell.get(cellId))
  .filter(Boolean)
  .map(to => ({ id: `${from.id}-${to.id}`, from, to })))

const selectedCellPairs = [
  [0, 5], [2, 3], [12, 7], [4, 9], [6, 11],
  [18, 13], [10, 15], [22, 17], [14, 19], [20, 21],
].map(([aCell, bCell]) => ({ a: aByCell.get(aCell), b: bByCell.get(bCell) }))
const maxFlow = selectedCellPairs.length
const activeCount = computed(() => [0, 1, 4, maxFlow][phase.value])
const activePairs = computed(() => selectedCellPairs.slice(0, activeCount.value))
const activeNodeIds = computed(() => new Set(activePairs.value.flatMap(pair => [pair.a.id, pair.b.id])))
const activeEdgeIds = computed(() => new Set(activePairs.value.map(pair => `${pair.a.id}-${pair.b.id}`)))
const activeSourceIds = computed(() => new Set(activePairs.value.map(pair => pair.a.id)))
const activeSinkIds = computed(() => new Set(activePairs.value.map(pair => pair.b.id)))
const graphNodes = [...aNodes, ...bNodes]
const visibleNodes = computed(() => phase.value === 0 ? graphNodes : [source, ...graphNodes, sink])
const sourceEdges = aNodes.map(to => ({ id: `S-${to.id}`, from: source, to }))
const sinkEdges = bNodes.map(from => ({ id: `${from.id}-T`, from, to: sink }))
const terminalEdges = computed(() => phase.value === 0 ? [] : [...sourceEdges, ...sinkEdges])

const edgePath = edge => {
  const startX = edge.from.x + (edge.from.kind === 'terminal' ? 15 : 14)
  const endX = edge.to.x - (edge.to.kind === 'terminal' ? 15 : 14)
  const middleX = (startX + endX) / 2
  return `M ${startX} ${edge.from.y} C ${middleX} ${edge.from.y}, ${middleX} ${edge.to.y}, ${endX} ${edge.to.y}`
}
const flowEdges = computed(() => {
  if (phase.value === 0) return []
  return [
    ...candidates.filter(edge => activeEdgeIds.value.has(edge.id)),
    ...sourceEdges.filter(edge => activeSourceIds.value.has(edge.to.id)),
    ...sinkEdges.filter(edge => activeSinkIds.value.has(edge.from.id)),
  ]
})
const pairFrames = computed(() => activePairs.value.map((pair, index) => {
  const first = cells[pair.a.cellId]
  const second = cells[pair.b.cellId]
  const minCol = Math.min(first.col, second.col)
  const minRow = Math.min(first.row, second.row)
  const maxCol = Math.max(first.col, second.col)
  const maxRow = Math.max(first.row, second.row)
  return {
    id: `pair-${index}`,
    x: boardX + minCol * cellPitch - 2,
    y: boardY + minRow * cellPitch - 2,
    width: (maxCol - minCol) * cellPitch + cellSize + 4,
    height: (maxRow - minRow) * cellPitch + cellSize + 4,
  }
}))
const flowValue = computed(() => phase.value === 0 ? '—' : String(activeCount.value))
const stepLabel = computed(() => [
  '盤面を二部グラフにする',
  '置けるペアに1単位流す',
  'ペアを増やして流量を上げる',
  '最大流10 ＝ 2マス枠10台',
][phase.value])
const stepText = computed(() => [
  '隣り合う空きマスは、必ずA側とB側に分かれる。',
  'A₁―B₂の辺を選び、2マス枠を1台置く。',
  '各マスは1回だけ使う。重ならない辺を追加する。',
  '各辺の容量を1にした最大流で、配置数の上限を求める。',
][phase.value])

function pausePlayback() {
  playing.value = false
  if (timer) window.clearInterval(timer)
  timer = undefined
}
function advance() {
  phase.value = Math.min(phase.value + 1, 3)
  if (phase.value === 3) pausePlayback()
}
function togglePlayback() {
  if (playing.value) {
    pausePlayback()
    return
  }
  playing.value = true
  if (phase.value === 0 || phase.value === 3) phase.value = 1
  timer = window.setInterval(advance, 2600)
}
function restart() {
  pausePlayback()
  phase.value = 0
}

onUnmounted(pausePlayback)
</script>

<template>
  <div class="matching-demo">
    <svg class="matching-svg" viewBox="0 0 1280 500" role="img" aria-label="障害物のある5×5盤面を二色に塗り分け、同時に置ける隣接マスを辺で結んで最大流・最大マッチングとして解く図">
      <defs>
        <marker id="match-arrow-muted" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="#aebdd1" /></marker>
        <marker id="match-arrow-flow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="#2f6fed" /></marker>
      </defs>

      <text x="28" y="34" class="panel-title board-title">5×5盤面を2色に分ける</text>
      <text x="29" y="59" class="panel-subtitle">空きマスはA・Bに交互に分かれる</text>
      <rect x="35" y="76" width="332" height="332" rx="11" class="board-frame" />
      <g v-for="cell in cells" :key="cell.id">
        <rect :x="cell.x" :y="cell.y" :width="cellSize" :height="cellSize" rx="5" :class="['board-cell', cell.isObstacle ? 'cell-obstacle' : cell.isA ? 'cell-a' : 'cell-b']" />
      </g>
      <g v-for="frame in pairFrames" :key="frame.id">
        <rect :x="frame.x" :y="frame.y" :width="frame.width" :height="frame.height" rx="9" class="matched-pair" />
      </g>
      <g v-for="cell in cells" :key="`label-${cell.id}`">
        <text :x="cell.x + cellSize / 2" :y="cell.y + 36" text-anchor="middle" :class="['cell-label', cell.isObstacle ? 'obstacle-label' : cell.isA ? 'label-a' : 'label-b']">{{ cell.label }}</text>
      </g>
      <rect x="46" y="424" width="18" height="18" rx="4" class="legend-a" /><text x="72" y="439" class="legend-label">A側</text>
      <rect x="143" y="424" width="18" height="18" rx="4" class="legend-b" /><text x="169" y="439" class="legend-label">B側</text>
      <rect x="247" y="424" width="18" height="18" rx="4" class="legend-obstacle" /><text x="273" y="439" class="legend-label">障害物</text>

      <text x="824" y="34" text-anchor="middle" class="panel-title">最大マッチングを最大流問題として解く</text>
      <text x="693" y="73" text-anchor="middle" class="side-label">A側のマス</text>
      <text x="1000" y="73" text-anchor="middle" class="side-label">B側のマス</text>
      <g v-if="phase > 0" class="flow-badge">
        <rect x="1103" y="46" width="111" height="42" rx="10" />
        <text x="1115" y="72" class="badge-caption">流量</text>
        <text x="1184" y="74" text-anchor="middle" class="badge-value">{{ flowValue }}</text>
      </g>

      <g class="candidate-edges">
        <path v-for="edge in candidates" :key="edge.id" :d="edgePath(edge)" class="edge-candidate" />
      </g>
      <g v-if="phase > 0" class="terminal-edges">
        <path v-for="edge in terminalEdges" :key="edge.id" :d="edgePath(edge)" class="edge-terminal" marker-end="url(#match-arrow-muted)" />
      </g>
      <g class="active-edges">
        <path v-for="edge in flowEdges" :key="`active-${edge.id}`" :d="edgePath(edge)" class="edge-active" marker-end="url(#match-arrow-flow)" />
      </g>
      <g v-for="node in visibleNodes" :key="node.id" :class="['network-node', `node-${node.kind}`, { 'node-selected': activeNodeIds.has(node.id) }]">
        <circle :cx="node.x" :cy="node.y" :r="node.kind === 'terminal' ? 17 : 15" />
        <text :x="node.x" :y="node.y + 4" text-anchor="middle">{{ node.label }}</text>
      </g>
      <text x="855" y="424" text-anchor="middle" class="network-note">各辺の容量1 · 最大流＝重ならずに置ける枠数</text>

      <rect x="28" y="451" width="1224" height="43" rx="10" class="step-card" />
      <circle v-if="phase > 0" cx="51" cy="472" r="13" class="step-number" />
      <text v-if="phase > 0" x="51" y="477" text-anchor="middle" class="step-number-text">{{ phase }}</text>
      <text :x="phase > 0 ? 74 : 48" y="470" class="step-label">{{ stepLabel }}</text>
      <text :x="phase > 0 ? 74 : 48" y="488" class="step-copy">{{ stepText }}</text>
    </svg>

    <div class="matching-controls">
      <span class="animation-indicator"><i :class="{ running: playing }"></i>{{ playing ? '再生中' : phase === 0 ? '再生待ち' : '一時停止中' }}</span>
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
.panel-title { fill: #234369; font-size: 25px; font-weight: 800; }
.board-title { font-size: 27px; }
.panel-subtitle { fill: #7186a2; font-size: 17px; }
.board-frame { fill: #f4f7fc; stroke: #d7e1ef; stroke-width: 1.5; }
.board-cell { stroke: #fff; stroke-width: 3; }
.cell-a, .legend-a { fill: #3976c6; }
.cell-b, .legend-b { fill: #dce9fa; }
.cell-obstacle, .legend-obstacle { fill: #000; }
.cell-label { font-size: 18px; font-weight: 800; }
.label-a { fill: #fff; }
.label-b { fill: #244b7d; }
.obstacle-label { fill: #fff; font-size: 24px; }
.matched-pair { fill: #f6a443; fill-opacity: .13; stroke: #e68a2e; stroke-width: 4; }
.legend-label { fill: #526d8f; font-size: 17px; font-weight: 650; }
.side-label { fill: #4e6f9b; font-size: 18px; font-weight: 750; }
.edge-candidate, .edge-terminal, .edge-active { fill: none; stroke-linecap: round; }
.edge-candidate { stroke: #91a4bc; stroke-opacity: .43; stroke-width: 1.5; }
.edge-terminal { stroke: #bbc8d7; stroke-width: 1.3; }
.edge-active { stroke: #2f6fed; stroke-width: 3.5; }
.network-node circle { fill: #fff; stroke: #aebdd1; stroke-width: 1.5; }
.network-node text { fill: #587293; font-size: 13px; font-weight: 750; }
.network-node.node-a circle { fill: #3976c6; stroke: #285b9c; }
.network-node.node-a text { fill: #fff; }
.network-node.node-b circle { fill: #dce9fa; stroke: #aec7e6; }
.network-node.node-b text { fill: #244b7d; }
.network-node.node-terminal circle { fill: #fff; stroke: #91a6c2; stroke-width: 2; }
.network-node.node-terminal text { fill: #234369; font-size: 18px; }
.network-node.node-selected circle { stroke: #ed8b31; stroke-width: 3; }
.flow-badge rect { fill: #edf4ff; stroke: #d1e1fa; }
.badge-caption { fill: #6981a1; font-size: 16px; }
.badge-value { fill: #2867c2; font-size: 19px; font-weight: 800; }
.network-note { fill: #6f83a0; font-size: 17px; font-weight: 650; }
.step-card { fill: #f5f8fd; stroke: #e1e9f4; }
.step-number { fill: #2f6fed; }
.step-number-text { fill: #fff; font-size: 17px; font-weight: 800; }
.step-label { fill: #2d558a; font-size: 16px; font-weight: 750; }
.step-copy { fill: #607998; font-size: 15px; }
.matching-controls { display: flex; align-items: center; justify-content: center; gap: 14px; min-height: 34px; margin-top: 2px; }
.animation-indicator { display: inline-flex; align-items: center; gap: 8px; color: #6a7f9b; font-size: 18px; }
.animation-indicator i { width: 8px; height: 8px; border-radius: 50%; background: #aebdd1; }
.animation-indicator i.running { background: #2f6fed; }
.matching-buttons { display: flex; gap: 7px; }
.matching-buttons button { min-width: 78px; padding: 7px 13px; border: 1px solid #cfdbeb; border-radius: 6px; color: #42628a; background: #fff; font-family: inherit; font-size: 18px; font-weight: 600; line-height: 1.2; cursor: pointer; }
.matching-buttons button:hover { border-color: #8eb4ef; background: #f4f8ff; }
</style>

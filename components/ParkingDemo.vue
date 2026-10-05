<script setup>
import { computed, ref } from 'vue'

const rows = 6
const cols = 8
const total = rows * cols
const blocked = ref(Array(total).fill(false))
const pairAt = ref({})
const solved = ref(false)
const pairCount = ref(0)

const boardRows = computed(() => Array.from({ length: rows }, (_, row) =>
  Array.from({ length: cols }, (_, col) => ({ row, col, id: row * cols + col })),
))
const obstacleCount = computed(() => blocked.value.filter(Boolean).length)
const openCount = computed(() => total - obstacleCount.value)
const unmatchedCount = computed(() => solved.value ? openCount.value - pairCount.value * 2 : null)
const carsByAnchor = computed(() => {
  const pairs = new Map()
  for (const [cellId, pairId] of Object.entries(pairAt.value)) {
    const cells = pairs.get(pairId) ?? []
    cells.push(Number(cellId))
    pairs.set(pairId, cells)
  }
  const cars = {}
  for (const [pairId, cells] of pairs) {
    const anchor = Math.min(...cells)
    cars[anchor] = { pairId, vertical: Math.abs(cells[0] - cells[1]) === cols }
  }
  return cars
})

function toggleObstacle(id) {
  const next = blocked.value.slice()
  next[id] = !next[id]
  blocked.value = next
  pairAt.value = {}
  pairCount.value = 0
  solved.value = false
}

function neighbors(id) {
  const row = Math.floor(id / cols)
  const col = id % cols
  const result = []
  if (col + 1 < cols) result.push(id + 1)
  if (col > 0) result.push(id - 1)
  if (row + 1 < rows) result.push(id + cols)
  if (row > 0) result.push(id - cols)
  return result
}

function solve() {
  // 左側を市松模様の偶数マス、右側を奇数マスとして増加路を探す。
  const owner = new Map()
  function augment(leftId, visited) {
    for (const rightId of neighbors(leftId)) {
      if (blocked.value[rightId] || visited.has(rightId)) continue
      visited.add(rightId)
      const previousLeft = owner.get(rightId)
      if (previousLeft === undefined || augment(previousLeft, visited)) {
        owner.set(rightId, leftId)
        return true
      }
    }
    return false
  }

  let count = 0
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const leftId = row * cols + col
      if ((row + col) % 2 !== 0 || blocked.value[leftId]) continue
      if (augment(leftId, new Set())) count++
    }
  }

  const result = {}
  let pairId = 0
  for (const [rightId, leftId] of owner) {
    pairId++
    result[leftId] = pairId
    result[rightId] = pairId
  }
  pairAt.value = result
  pairCount.value = count
  solved.value = true
}

function clearObstacles() {
  blocked.value = Array(total).fill(false)
  pairAt.value = {}
  pairCount.value = 0
  solved.value = false
}

</script>

<template>
  <div class="parking-demo">
    <div class="parking-board" role="grid" aria-label="障害物を置ける駐車場のグリッド">
      <div v-for="(row, rowIndex) in boardRows" :key="rowIndex" class="parking-row" role="row">
        <button
          v-for="cell in row"
          :key="cell.id"
          type="button"
          role="gridcell"
          :aria-label="`行${cell.row + 1} 列${cell.col + 1}${blocked[cell.id] ? ' 障害物' : pairAt[cell.id] ? ` 車${pairAt[cell.id]}` : ' 空きマス'}`"
          :aria-pressed="blocked[cell.id]"
          :class="['parking-cell', { obstacle: blocked[cell.id], paired: pairAt[cell.id], 'car-anchor': carsByAnchor[cell.id] }]"
          @click="toggleObstacle(cell.id)"
        >
          <span v-if="blocked[cell.id]" class="obstacle-mark">×</span>
          <svg v-else-if="carsByAnchor[cell.id]" :class="['car-icon', { vertical: carsByAnchor[cell.id].vertical }]" :viewBox="carsByAnchor[cell.id].vertical ? '0 0 58 120' : '0 0 120 58'" aria-hidden="true">
            <g :transform="carsByAnchor[cell.id].vertical ? 'translate(58 0) rotate(90)' : undefined">
              <rect x="24" y="5" width="19" height="8" rx="3" fill="#193c70" />
              <rect x="77" y="5" width="19" height="8" rx="3" fill="#193c70" />
              <rect x="24" y="45" width="19" height="8" rx="3" fill="#193c70" />
              <rect x="77" y="45" width="19" height="8" rx="3" fill="#193c70" />
              <rect x="12" y="10" width="96" height="38" rx="15" fill="#2f6fed" stroke="#17488e" stroke-width="2" />
              <path d="M43 13 Q35 29 43 45 M78 13 Q86 29 78 45" fill="none" stroke="#17488e" stroke-width="2" />
              <rect x="45" y="15" width="31" height="28" rx="8" fill="#b8d9ff" />
              <path d="M16 19 L16 39 M104 19 L104 39" stroke="#dbeaff" stroke-width="3" stroke-linecap="round" />
            </g>
          </svg>
          <span v-else class="cell-mark"></span>
        </button>
      </div>
    </div>

    <div class="parking-controls">
      <div class="parking-status" aria-live="polite">
        <template v-if="solved">
          <strong>{{ pairCount }}<small>枠</small></strong>
          <span>最大 {{ pairCount }} 台分<b v-if="unmatchedCount">空き{{ unmatchedCount }}マス</b></span>
        </template>
        <template v-else>
          <strong>{{ obstacleCount }}<small>個</small></strong>
          <span>空き{{ openCount }}マス</span>
        </template>
      </div>
      <div class="parking-actions">
        <button class="clear-button" type="button" @click="clearObstacles">障害物クリア</button>
        <button class="solve-button" type="button" @click="solve">最適化を実行 <span>↗</span></button>
      </div>
      <p class="parking-instruction">1台は縦・横の2マス。<br>クリックで障害物を置く・消す。</p>
    </div>
  </div>
</template>

<style scoped>
.parking-demo { display: grid; grid-template-columns: minmax(430px, 1.1fr) minmax(250px, .9fr); gap: 36px; align-items: center; }
.parking-board { display: flex; flex-direction: column; gap: 4px; padding: 13px; background: #dce7f7; box-shadow: 7px 8px 0 #c1d3ec; }
.parking-row { display: grid; grid-template-columns: repeat(8, 1fr); gap: 4px; }
.parking-cell { position: relative; display: grid; aspect-ratio: 1; place-items: center; padding: 0; border: 1px solid #c5d5ed; border-radius: 2px; color: #244c7e; background: #ffffff; cursor: pointer; transition: background-color .12s ease, transform .12s ease; }
.parking-cell:hover { z-index: 1; border-color: #e77949; transform: scale(1.06); }
.parking-cell.car-anchor { z-index: 2; }
.parking-cell.obstacle { border-color: #203b63; background: #203b63; }
.cell-mark { width: 4px; height: 4px; border-radius: 50%; background: #c3d3ea; }.obstacle-mark { color: #a4d2ff; font: 400 22px/1 Arial,sans-serif; }
.parking-cell.paired .cell-mark { opacity: 0; }
.car-icon { position: absolute; top: 0; left: 0; width: calc(200% + 4px); height: 100%; overflow: visible; pointer-events: none; }
.car-icon.vertical { width: 100%; height: calc(200% + 4px); }
.parking-controls { display: flex; flex-direction: column; align-items: stretch; gap: 18px; }.parking-status { display: flex; align-items: center; gap: 14px; min-height: 64px; padding-bottom: 13px; border-bottom: 1px solid #d5e1f2; }.parking-status strong { color: #2867c2; font: 700 35px Arial,sans-serif; }.parking-status strong small { padding-left: 4px; font-size: 14px; }.parking-status span { color: #6d83a2; font-size: 17px; line-height: 1.6; }.parking-status b { display: block; color: #5275a3; font-weight: 500; }
.parking-actions { display: flex; flex-direction: column; gap: 9px; }.parking-actions button { min-height: 43px; padding: 10px 14px; cursor: pointer; font-family: inherit; font-weight: 600; font-size: 18px; }.clear-button { border: 1px solid #c6d5ed; color: #45658b; background: transparent; }.clear-button:hover { background: #ffffff; }.solve-button { display: flex; justify-content: space-between; align-items: center; border: 1px solid #2f6fed; color: #ffffff; background: #2f6fed; box-shadow: 4px 4px 0 #c5d9fa; }.solve-button:hover { background: #2457bd; }.solve-button span { color: #c2e0ff; font-size: 17px; }
.parking-instruction { margin: 0; color: #6d83a2; font-size: 16px; line-height: 1.7; }
@media (max-width: 800px) { .parking-demo { grid-template-columns: 1fr; gap: 20px; }.parking-controls { display: grid; grid-template-columns: 1fr 1fr; align-items: center; }.parking-status,.parking-instruction { grid-column: 1 / -1; } }
</style>

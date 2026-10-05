<script setup>
defineProps({
  number: { type: String, required: true },
  title: { type: String, required: true },
})

const surfaceSteps = 18
const surfaceTicks = Array.from({ length: surfaceSteps + 1 }, (_, index) => -1 + 2 * index / surfaceSteps)
const surfacePalette = [
  [15, 38, 96],
  [23, 62, 126],
  [34, 88, 157],
  [57, 119, 184],
  [116, 163, 216],
]
const surfaceHeight = (x, y) => Math.cos(3 * Math.PI * x)
  + .78 * Math.cos(3 * Math.PI * y + .55)
  + .27 * Math.sin(2 * Math.PI * (x + .65 * y))
  + .32 * Math.exp(-((x + .42) ** 2 + (y - .25) ** 2) / .18)
  - .26 * Math.exp(-((x - .45) ** 2 + (y + .36) ** 2) / .13)
const projectSurface = (x, y) => {
  const z = surfaceHeight(x, y)
  return { x: 280 + 120 * (x - y), y: 270 + 74 * (x + y) - 30 * z, z }
}
const pointText = point => `${point.x.toFixed(1)},${point.y.toFixed(1)}`
const surfaceFrame = `${[[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([x, y], index) => `${index ? 'L' : 'M'}${pointText(projectSurface(x, y))}`).join(' ')}Z`
function surfaceColor(height) {
  const position = Math.max(0, Math.min(3.999, (height + 2.5) / 5 * 4))
  const stop = Math.floor(position)
  const fraction = position - stop
  const channels = surfacePalette[stop].map((channel, index) => Math.round(channel + (surfacePalette[stop + 1][index] - channel) * fraction))
  return `rgb(${channels.join(',')})`
}

const surfaceCells = []
for (let row = 0; row < surfaceSteps; row++) {
  for (let column = 0; column < surfaceSteps; column++) {
    const x0 = surfaceTicks[column]
    const x1 = surfaceTicks[column + 1]
    const y0 = surfaceTicks[row]
    const y1 = surfaceTicks[row + 1]
    const corners = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]].map(([x, y]) => projectSurface(x, y))
    const averageHeight = corners.reduce((sum, point) => sum + point.z, 0) / corners.length
    surfaceCells.push({
      id: `${row}-${column}`,
      depth: (x0 + x1 + y0 + y1) / 4,
      points: corners.map(pointText).join(' '),
      fill: surfaceColor(averageHeight),
    })
  }
}
surfaceCells.sort((a, b) => a.depth - b.depth)

const surfaceMesh = []
for (let index = 0; index <= surfaceSteps; index++) {
  const tick = surfaceTicks[index]
  const alongX = surfaceTicks.map(value => pointText(projectSurface(tick, value))).join(' ')
  const alongY = surfaceTicks.map(value => pointText(projectSurface(value, tick))).join(' ')
  surfaceMesh.push({ id: `x-${index}`, points: alongX }, { id: `y-${index}`, points: alongY })
}
</script>

<template>
  <div class="section-divider" :class="`section-divider-${number}`">
    <svg class="section-divider-pattern" viewBox="0 0 560 520" aria-hidden="true">
      <g v-if="number === '00'" class="pattern-intro">
        <g transform="rotate(-5 280 260)">
          <rect class="profile-card-outline" x="85" y="83" width="390" height="344" rx="22" />
          <rect class="profile-card-inset" x="102" y="100" width="356" height="310" rx="15" />
          <circle class="profile-card-avatar" cx="174" cy="190" r="45" />
          <circle class="profile-card-person" cx="174" cy="177" r="13" />
          <path class="profile-card-person" d="M148 218c3-17 13-25 26-25s23 8 26 25" />
          <rect class="profile-card-line" x="244" y="150" width="148" height="11" rx="5.5" />
          <rect class="profile-card-line profile-card-line-secondary" x="244" y="174" width="112" height="7" rx="3.5" />
          <rect class="profile-card-line profile-card-line-secondary" x="244" y="194" width="174" height="7" rx="3.5" />
          <path class="profile-card-rule" d="M124 252H435" />
          <rect class="profile-card-chip" x="126" y="273" width="91" height="34" rx="17" />
          <rect class="profile-card-chip" x="230" y="273" width="91" height="34" rx="17" />
          <rect class="profile-card-chip" x="334" y="273" width="91" height="34" rx="17" />
          <circle class="profile-card-dot" cx="151" cy="290" r="4" />
          <circle class="profile-card-dot" cx="255" cy="290" r="4" />
          <circle class="profile-card-dot" cx="359" cy="290" r="4" />
          <path class="profile-card-rule" d="M126 332H420 M126 353H365 M126 374H393" />
        </g>
      </g>

      <g v-else-if="number === '01'" class="pattern-surface">
        <polygon v-for="cell in surfaceCells" :key="cell.id" class="surface-cell" :points="cell.points" :fill="cell.fill" />
        <polyline v-for="line in surfaceMesh" :key="line.id" class="surface-mesh" :points="line.points" />
        <path class="surface-frame" :d="surfaceFrame" />
        <text class="surface-axis-label" x="526" y="344">x</text>
        <text class="surface-axis-label" x="26" y="344">y</text>
      </g>

      <g v-else-if="number === '02'" class="pattern-contest" transform="rotate(-10 280 260)">
        <rect class="pattern-grid" x="100" y="80" width="360" height="360" rx="4" />
        <path class="pattern-grid" d="M172 80V440 M244 80V440 M316 80V440 M388 80V440 M100 152H460 M100 224H460 M100 296H460 M100 368H460" />
        <rect class="pattern-cell" x="172" y="80" width="72" height="72" />
        <rect class="pattern-cell" x="316" y="224" width="72" height="72" />
        <rect class="pattern-cell" x="100" y="368" width="72" height="72" />
        <path class="pattern-route" d="M136 116H208V188H352V260H424V332H136V404H208" />
        <circle class="pattern-node-active" cx="136" cy="116" r="7" />
        <circle class="pattern-node-active" cx="208" cy="404" r="7" />
      </g>

      <g v-else-if="number === '03'" class="pattern-ai">
        <path class="pattern-grid" d="M100 100L280 145 M100 100L280 260 M100 100L280 375 M100 220L280 145 M100 220L280 260 M100 220L280 375 M100 340L280 145 M100 340L280 260 M100 340L280 375 M280 145L460 190 M280 145L460 310 M280 145L460 430 M280 260L460 190 M280 260L460 310 M280 260L460 430 M280 375L460 190 M280 375L460 310 M280 375L460 430" />
        <path class="pattern-route" d="M100 220L280 260L460 310" />
        <circle class="pattern-node" cx="100" cy="100" r="10" />
        <circle class="pattern-node-active" cx="100" cy="220" r="11" />
        <circle class="pattern-node" cx="100" cy="340" r="10" />
        <circle class="pattern-node" cx="280" cy="145" r="10" />
        <circle class="pattern-node-active" cx="280" cy="260" r="13" />
        <circle class="pattern-node" cx="280" cy="375" r="10" />
        <circle class="pattern-node" cx="460" cy="190" r="10" />
        <circle class="pattern-node-active" cx="460" cy="310" r="11" />
        <circle class="pattern-node" cx="460" cy="430" r="10" />
      </g>
    </svg>
    <div class="section-divider-main">
      <span class="section-divider-number" aria-hidden="true">{{ number }}</span>
      <h1><slot name="title">{{ title }}</slot></h1>
    </div>
  </div>
</template>

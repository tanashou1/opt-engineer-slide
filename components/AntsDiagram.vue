<script setup>
import { onBeforeUnmount, ref } from 'vue'
import CuteAnt from './CuteAnt.vue'

const props = defineProps({
  pointsOnly: { type: Boolean, default: false },
})

const initialAnts = () => [
  { id: 'A', x: 1, dir: 1, tone: 'blue', fallen: false, turning: false },
  { id: 'B', x: 3, dir: -1, tone: 'coral', fallen: false, turning: false },
  { id: 'C', x: 5, dir: 1, tone: 'mint', fallen: false, turning: false },
  { id: 'D', x: 7, dir: -1, tone: 'violet', fallen: false, turning: false },
  { id: 'E', x: 9, dir: -1, tone: 'gold', fallen: false, turning: false },
]
const initialPositions = initialAnts().map(ant => ant.x)

const ants = ref(initialAnts())
const impacts = ref([])
const playing = ref(false)
const finished = ref(false)
const elapsedTime = ref(0)
const showElapsed = ref(true)
const stageElement = ref(null)
const PLAYBACK_RATE = 0.9
const ANT_WIDTH_PX = 52
const ROD_WIDTH_RATIO = 0.88
const HEAD_REACH_RATIO = 36.5 / 92
const contact = (x) => `${6 + x / 10 * 88}%`
let frame = 0
let lastTime = 0
let impactId = 0

function getAntGeometry() {
  const stageWidth = stageElement.value?.clientWidth ?? 800
  const pixelsPerUnit = stageWidth * ROD_WIDTH_RATIO / 10
  return {
    headContactDistance: props.pointsOnly ? 0 : 2 * ANT_WIDTH_PX * HEAD_REACH_RATIO / pixelsPerUnit,
    turnDuration: ANT_WIDTH_PX / pixelsPerUnit / PLAYBACK_RATE * 1000,
  }
}

function animate(now) {
  if (!playing.value) return

  const previousTime = lastTime
  const frameDuration = Math.min(now - previousTime, 50)
  const dt = frameDuration / 1000 * PLAYBACK_RATE
  lastTime = now
  elapsedTime.value += dt
  const { headContactDistance, turnDuration } = getAntGeometry()
  const before = ants.value
  const moved = before.map(ant => ({
    ...ant,
    x: ant.fallen ? ant.x : ant.x + ant.dir * dt,
    turnProgress: ant.turning ? Math.min(1, (now - ant.turnStartedAt) / turnDuration) : 0,
    turning: ant.turning && now - ant.turnStartedAt < turnDuration,
  }))

  const startTurn = (ant, fromDir, startedAt) => {
    ant.turnFromDir = fromDir
    ant.turnStartedAt = startedAt
    ant.turnProgress = Math.min(1, Math.max(0, (now - startedAt) / turnDuration))
    ant.turning = true
  }

  for (let i = 0; i < moved.length - 1; i++) {
    const leftBefore = before[i]
    const rightBefore = before[i + 1]
    const left = moved[i]
    const right = moved[i + 1]
    const wereApproaching = !leftBefore.fallen && !rightBefore.fallen
      && leftBefore.dir === 1 && rightBefore.dir === -1
    const gapBefore = rightBefore.x - leftBefore.x
    const gapAfter = right.x - left.x

    if (wereApproaching && gapBefore > headContactDistance && gapAfter <= headContactDistance) {
      const fraction = (gapBefore - headContactDistance) / (gapBefore - gapAfter)
      const point = (leftBefore.x + (left.x - leftBefore.x) * fraction
        + rightBefore.x + (right.x - rightBefore.x) * fraction) / 2
      const contactTime = previousTime + frameDuration * fraction
      if (!left.turning) startTurn(left, leftBefore.dir, contactTime)
      if (!right.turning) startTurn(right, rightBefore.dir, contactTime)
      impacts.value.push({ id: impactId++, x: point, at: contactTime })
    }

    if (wereApproaching && gapBefore > 0 && gapAfter <= 0) {
      const fraction = gapBefore / (gapBefore - gapAfter)
      const point = leftBefore.x + (left.x - leftBefore.x) * fraction
      const remaining = dt * (1 - fraction)
      left.x = point - remaining
      right.x = point + remaining
      if (!left.turning) startTurn(left, leftBefore.dir, previousTime + frameDuration * fraction)
      if (!right.turning) startTurn(right, rightBefore.dir, previousTime + frameDuration * fraction)
      left.dir = -1
      right.dir = 1
    }
  }

  for (const ant of moved) {
    if (!ant.fallen && (ant.x <= 0 || ant.x >= 10)) {
      ant.x = ant.x <= 0 ? -0.12 : 10.12
      ant.fallen = true
    }
  }

  ants.value = moved
  impacts.value = impacts.value.filter(hit => now - hit.at < 420)

  if (moved.every(ant => ant.fallen)) {
    playing.value = false
    finished.value = true
    frame = 0
    return
  }

  frame = requestAnimationFrame(animate)
}

function play() {
  if (playing.value) return
  if (finished.value) {
    ants.value = initialAnts()
    impacts.value = []
    elapsedTime.value = 0
    finished.value = false
  }
  playing.value = true
  lastTime = performance.now()
  frame = requestAnimationFrame(animate)
}

function stop() {
  playing.value = false
  finished.value = false
  cancelAnimationFrame(frame)
  frame = 0
  ants.value = initialAnts()
  impacts.value = []
  elapsedTime.value = 0
}

onBeforeUnmount(() => cancelAnimationFrame(frame))
</script>

<template>
  <section class="ants-question" aria-label="棒の上の5匹のアリが動く図">
    <div ref="stageElement" class="ants-stage" :class="{ 'points-only': props.pointsOnly }">
      <div class="length-marker" aria-hidden="true">
        <span class="measure left-end"></span><span class="measure-line"></span><span class="measure right-end"></span>
        <b>棒の長さ 10 cm</b>
      </div>
      <div v-if="showElapsed" class="elapsed-readout" role="timer">
        <span>経過時間</span><strong>{{ elapsedTime.toFixed(1) }}<small>秒</small></strong>
      </div>

      <div class="rod" aria-hidden="true"></div>
      <div class="ruler" aria-hidden="true">
        <span class="end-tick left-tick"></span><span class="end-tick right-tick"></span>
        <span class="end-number left-number">0</span><span class="end-number right-number">10</span>
        <template v-for="position in initialPositions" :key="position">
          <span class="position-tick" :style="{ left: `${position * 10}%` }"></span>
          <span class="position-number" :style="{ left: `${position * 10}%` }">{{ position }}</span>
        </template>
        <span class="ruler-caption">初期位置 (cm)</span>
      </div>

      <div
        v-for="ant in ants"
        :key="ant.id"
        class="runner"
        :class="[ant.tone, { fallen: ant.fallen, turning: ant.turning, 'points-only': props.pointsOnly }]"
        :style="{ left: contact(ant.x) }"
      >
        <span class="runner-id">{{ ant.id }}</span>
        <span
          class="direction-arrow"
          :style="{ transform: ant.turning ? `scaleX(${1 - 2 * ant.turnProgress})` : undefined }"
          aria-hidden="true"
        >{{ (ant.turning ? ant.turnFromDir : ant.dir) === 1 ? '→' : '←' }}</span>
        <div v-if="props.pointsOnly" class="point-mark" aria-hidden="true"></div>
        <div v-else class="ant-turn" :style="{ transform: ant.turning ? `scaleX(${1 - 2 * ant.turnProgress})` : undefined }">
          <CuteAnt :size="52" :facing="(ant.turning ? ant.turnFromDir : ant.dir) === 1 ? 'right' : 'left'" :tone="ant.tone" />
        </div>
      </div>

      <span
        v-for="hit in impacts"
        :key="hit.id"
        class="impact"
        :style="{ left: contact(hit.x) }"
        aria-hidden="true"
      >✦</span>
    </div>
    <div class="control-bar">
      <div class="ant-legend" aria-label="色でアリを見分ける">
        <span>色＝個体</span>
        <b class="blue">A</b><b class="coral">B</b><b class="mint">C</b><b class="violet">D</b><b class="gold">E</b>
      </div>
      <div class="transport-controls">
        <button class="play-button" type="button" :disabled="playing" @click="play">▶ 再生</button>
        <button class="stop-button" type="button" :disabled="!playing && !finished" @click="stop">■ 停止</button>
        <button
          class="timer-toggle"
          type="button"
          :aria-pressed="showElapsed"
          :aria-label="`経過時間表示を${showElapsed ? 'OFF' : 'ON'}にする`"
          @click="showElapsed = !showElapsed"
        >時間表示 {{ showElapsed ? 'ON' : 'OFF' }}</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ants-question { display: grid; grid-template-rows: 302px 38px; gap: 8px; width: 100%; height: 348px; color: #17375f; }
.ants-stage { position: relative; height: 302px; overflow: hidden; border: 1px solid #d5e3f2; border-radius: 18px; background: radial-gradient(ellipse at 50% 52%, #fff 0, #f7faff 68%, #eef5fd 100%); }
.length-marker { position: absolute; top: 15px; left: 6%; width: 88%; height: 38px; color: #7187a2; }
.measure-line { position: absolute; top: 11px; left: 0; width: 100%; border-top: 1px solid #a8bfd9; }
.measure { position: absolute; top: 6px; height: 11px; border-left: 1px solid #a8bfd9; }
.left-end { left: 0; }
.right-end { right: 0; }
.length-marker b { position: absolute; top: 17px; left: 50%; transform: translateX(-50%); padding: 0 9px; background: #f8fbff; color: #6f86a2; font-size: 11px; font-weight: 600; white-space: nowrap; }
.elapsed-readout { position: absolute; top: 59px; right: 18px; z-index: 2; display: flex; align-items: baseline; gap: 8px; padding: 4px 10px; border: 1px solid #d5e3f2; border-radius: 9px; color: #607995; background: #ffffffed; font-size: 10px; box-shadow: 0 3px 10px #54759a12; }
.elapsed-readout strong { color: #245b9e; font: 700 14px/1 Arial,sans-serif; font-variant-numeric: tabular-nums; }
.elapsed-readout small { margin-left: 2px; font-size: 9px; }
.rod { position: absolute; top: 170px; left: 6%; width: 88%; height: 20px; border: 1px solid #87a7cd; border-radius: 13px; background: linear-gradient(180deg, #deecfb, #c4dcf5); box-shadow: 0 8px 18px #b9d1eb38; }
.ruler { position: absolute; top: 191px; left: 6%; width: 88%; height: 38px; }
.end-tick { position: absolute; top: 0; height: 9px; border-left: 1px solid #7494b9; }
.left-tick { left: 0; }
.right-tick { right: 0; }
.end-number { position: absolute; top: 11px; transform: translateX(-50%); color: #7389a4; font: 600 11px Arial,sans-serif; }
.left-number { left: 0; }
.right-number { left: 100%; }
.position-tick { position: absolute; top: 0; height: 5px; border-left: 1px solid #91a9c5; }
.position-number { position: absolute; top: 11px; transform: translateX(-50%); color: #506f94; font: 700 10px Arial,sans-serif; }
.ruler-caption { position: absolute; top: 25px; left: 50%; transform: translateX(-50%); color: #91a3b8; font-size: 8px; white-space: nowrap; }
.runner { position: absolute; top: 112px; z-index: 2; width: 60px; height: 68px; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; transition: top .25s ease, opacity .22s ease; }
.runner.fallen { top: 168px; opacity: 0; }
.runner-id { display: grid; place-items: center; width: 14px; height: 14px; border-radius: 50%; color: white; font: 700 8px Arial,sans-serif; }
.direction-arrow { height: 18px; color: #4c86cd; font: 700 16px/18px Arial,sans-serif; }
.blue .runner-id, .ant-legend .blue { background: #347ac4; }
.coral .runner-id, .ant-legend .coral { background: #d96d62; }
.mint .runner-id, .ant-legend .mint { background: #288a70; }
.violet .runner-id, .ant-legend .violet { background: #795fba; }
.gold .runner-id, .ant-legend .gold { background: #aa7410; }
.blue .direction-arrow { color: #347ac4; }
.coral .direction-arrow { color: #d96d62; }
.mint .direction-arrow { color: #288a70; }
.violet .direction-arrow { color: #795fba; }
.gold .direction-arrow { color: #aa7410; }
.runner.turning { z-index: 4; }
.runner.turning .runner-id { box-shadow: 0 0 0 3px #fff, 0 0 0 5px #ffc15e; }
.ant-turn { display: flex; transform-origin: center center; }
.point-mark { position: absolute; top: 58px; left: 50%; width: 18px; height: 18px; transform: translateX(-50%); border: 3px solid #fff; border-radius: 50%; box-shadow: 0 3px 8px #17375f35; }
.blue .point-mark { background: #347ac4; }
.coral .point-mark { background: #d96d62; }
.mint .point-mark { background: #288a70; }
.violet .point-mark { background: #795fba; }
.gold .point-mark { background: #aa7410; }
.impact { position: absolute; top: 141px; z-index: 3; transform: translateX(-50%); color: #f3a449; font-size: 29px; line-height: 1; animation: pop .42s ease-out forwards; pointer-events: none; }
.control-bar { display: flex; align-items: center; justify-content: space-between; }
.ant-legend, .transport-controls { display: flex; align-items: center; gap: 6px; }
.ant-legend { color: #7c90a9; font-size: 10px; }
.ant-legend b { display: grid; place-items: center; width: 17px; height: 17px; border-radius: 50%; color: #fff; font: 700 8px Arial,sans-serif; }
.transport-controls { gap: 8px; }
.transport-controls button { min-width: 82px; height: 32px; padding: 0 12px; border: 1px solid #cbdcf0; border-radius: 8px; color: #315c91; background: #fff; font: 700 11px 'Noto Sans JP', sans-serif; cursor: pointer; }
.transport-controls .play-button { color: white; border-color: #2f6fed; background: #2f6fed; }
.transport-controls button:disabled { opacity: .45; cursor: default; }
.transport-controls button:focus-visible { outline: 3px solid #8cb8f1; outline-offset: 2px; }
.transport-controls .timer-toggle { min-width: 100px; color: #315c91; background: #f7faff; }
@keyframes pop { 0% { opacity: 0; transform: translateX(-50%) scale(.5); } 25% { opacity: 1; transform: translateX(-50%) scale(1.25); } 100% { opacity: 0; transform: translateX(-50%) scale(.8); } }
@media (prefers-reduced-motion: reduce) { .runner, .impact { transition: none; animation-duration: .01ms; } }
</style>

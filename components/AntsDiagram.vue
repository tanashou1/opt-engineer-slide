<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import CuteAnt from './CuteAnt.vue'

const initialAnts = () => [
  { id: 1, x: 1, dir: 1, fallen: false },
  { id: 2, x: 3, dir: -1, fallen: false },
  { id: 3, x: 5, dir: 1, fallen: false },
  { id: 4, x: 7, dir: -1, fallen: false },
  { id: 5, x: 9, dir: 1, fallen: false },
]

const ants = ref(initialAnts())
const impacts = ref([])
const CONTACT = 0.015
const contact = (x) => `${6 + x / 10 * 88}%`
let frame = 0
let lastTime = 0
let startTime = 0
let nextRoundAt = 0
let impactId = 0

function animate(now) {
  if (now < startTime || now < nextRoundAt) {
    frame = requestAnimationFrame(animate)
    return
  }

  const dt = Math.min((now - lastTime) / 1000, 0.05) * 1.25
  lastTime = now
  const before = ants.value
  const moved = before.map(ant => ({
    ...ant,
    x: ant.fallen ? ant.x : ant.x + ant.dir * dt,
  }))

  for (let i = 0; i < moved.length - 1; i++) {
    const leftBefore = before[i]
    const rightBefore = before[i + 1]
    const left = moved[i]
    const right = moved[i + 1]
    const wereApproaching = !leftBefore.fallen && !rightBefore.fallen
      && leftBefore.dir === 1 && rightBefore.dir === -1
    if (wereApproaching && leftBefore.x < rightBefore.x && left.x >= right.x) {
      const point = (left.x + right.x) / 2
      left.x = point - CONTACT / 2
      right.x = point + CONTACT / 2
      left.dir = -1
      right.dir = 1
      impacts.value.push({ id: impactId++, x: point, at: now })
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
    ants.value = initialAnts()
    impacts.value = []
    nextRoundAt = now + 1100
    lastTime = nextRoundAt
    startTime = nextRoundAt
  }

  frame = requestAnimationFrame(animate)
}

onMounted(() => {
  const now = performance.now()
  startTime = now + 1000
  lastTime = startTime
  frame = requestAnimationFrame(animate)
})

onBeforeUnmount(() => cancelAnimationFrame(frame))
</script>

<template>
  <section class="ants-question" aria-label="棒の上の5匹のアリが動く図">
    <div class="ants-stage">
      <div class="length-marker" aria-hidden="true">
        <span class="measure left-end"></span><span class="measure-line"></span><span class="measure right-end"></span>
        <b>棒の長さ 10</b>
      </div>
      <div class="fall-label left-label">落下 ←</div>
      <div class="fall-label right-label">→ 落下</div>

      <div class="rod" aria-hidden="true"></div>
      <div class="ruler" aria-hidden="true">
        <span class="end-tick left-tick"></span><span class="end-tick right-tick"></span>
        <span class="end-number left-number">0</span><span class="end-number right-number">10</span>
      </div>

      <div
        v-for="ant in ants"
        :key="ant.id"
        class="runner"
        :class="{ fallen: ant.fallen }"
        :style="{ left: contact(ant.x) }"
        :aria-label="`アリ${ant.id}、${ant.dir === 1 ? '右' : '左'}向き`"
      >
        <span class="direction-arrow" aria-hidden="true">{{ ant.dir === 1 ? '→' : '←' }}</span>
        <CuteAnt :size="52" :facing="ant.dir === 1 ? 'right' : 'left'" />
      </div>

      <span
        v-for="hit in impacts"
        :key="hit.id"
        class="impact"
        :style="{ left: contact(hit.x) }"
        aria-hidden="true"
      >✦</span>
    </div>
  </section>
</template>

<style scoped>
.ants-question { height: 348px; color: #17375f; }
.ants-stage { position: relative; height: 100%; overflow: hidden; border: 1px solid #d5e3f2; border-radius: 18px; background: radial-gradient(ellipse at 50% 52%, #fff 0, #f7faff 68%, #eef5fd 100%); }
.length-marker { position: absolute; top: 23px; left: 6%; width: 88%; height: 38px; color: #7187a2; }
.measure-line { position: absolute; top: 11px; left: 0; width: 100%; border-top: 1px solid #a8bfd9; }
.measure { position: absolute; top: 6px; height: 11px; border-left: 1px solid #a8bfd9; }
.left-end { left: 0; }
.right-end { right: 0; }
.length-marker b { position: absolute; top: 17px; left: 50%; transform: translateX(-50%); padding: 0 9px; background: #f8fbff; color: #6f86a2; font-size: 11px; font-weight: 600; white-space: nowrap; }
.fall-label { position: absolute; top: 125px; z-index: 1; color: #8a9db4; font-size: 11px; }
.left-label { left: 1.8%; }
.right-label { right: 1.8%; }
.rod { position: absolute; top: 202px; left: 6%; width: 88%; height: 20px; border: 1px solid #87a7cd; border-radius: 13px; background: linear-gradient(180deg, #deecfb, #c4dcf5); box-shadow: 0 8px 18px #b9d1eb38; }
.ruler { position: absolute; top: 223px; left: 6%; width: 88%; height: 38px; }
.end-tick { position: absolute; top: 0; height: 9px; border-left: 1px solid #7494b9; }
.left-tick { left: 0; }
.right-tick { right: 0; }
.end-number { position: absolute; top: 11px; transform: translateX(-50%); color: #7389a4; font: 600 11px Arial,sans-serif; }
.left-number { left: 0; }
.right-number { left: 100%; }
.runner { position: absolute; top: 163px; z-index: 2; width: 60px; height: 59px; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; transition: top .25s ease, opacity .22s ease; }
.runner.fallen { top: 198px; opacity: 0; }
.direction-arrow { height: 20px; color: #4c86cd; font: 700 14px/20px Arial,sans-serif; }
.impact { position: absolute; top: 173px; z-index: 3; transform: translateX(-50%); color: #f3a449; font-size: 25px; line-height: 1; animation: pop .42s ease-out forwards; pointer-events: none; }
@keyframes pop { 0% { opacity: 0; transform: translateX(-50%) scale(.5); } 25% { opacity: 1; transform: translateX(-50%) scale(1.25); } 100% { opacity: 0; transform: translateX(-50%) scale(.8); } }
@media (prefers-reduced-motion: reduce) { .runner, .impact { transition: none; animation-duration: .01ms; } }
</style>

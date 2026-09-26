<script setup>
const points = [[40, 75], [105, 23], [203, 32], [250, 103], [208, 192], [105, 211], [30, 161]]
const before = [0, 3, 1, 5, 2, 6, 4, 0]
const after = [0, 1, 2, 3, 4, 5, 6, 0]
const route = order => order.map(i => points[i].join(',')).join(' ')
const distance = order => Math.round(order.slice(1).reduce((sum, index, i) => sum + Math.hypot(points[index][0] - points[order[i]][0], points[index][1] - points[order[i]][1]), 0))
const improvement = Math.round((1 - distance(after) / distance(before)) * 100)
</script>
<template>
  <svg class="heuristic-svg" viewBox="0 0 900 365" role="img" aria-label="交差の多い配送ルートを短いルートに改善し、候補の作成と評価を繰り返す図">
    <g v-for="(order, panel) in [before, after]" :key="panel" :transform="`translate(${panel ? 517 : 18}, 0)`">
      <rect width="360" height="255" rx="15" :fill="panel ? '#edf4ff' : '#ffffff'" stroke="#cfddf1" />
      <text x="20" y="29" fill="#234369" style="font-size:17px" font-weight="700">{{ panel ? '訪問順を変えた候補' : '現在のルート' }}</text>
      <g transform="translate(18, 44) scale(.78)">
        <polyline :points="route(order)" fill="none" :stroke="panel ? '#2f6fed' : '#a6b6ca'" :stroke-width="panel ? 4 : 3" />
        <g v-for="([x, y], i) in points" :key="i">
          <circle :cx="x" :cy="y" r="10" :fill="i === 0 ? '#3478ef' : '#ffffff'" :stroke="i === 0 ? '#285eb8' : '#2f6fed'" stroke-width="2" />
          <text :x="x" :y="y + 4" text-anchor="middle" style="font-size:11px" :fill="i === 0 ? 'white' : '#2f6fed'">{{ i === 0 ? '発' : i }}</text>
        </g>
      </g>
      <text x="295" y="127" text-anchor="middle" fill="#6b809c" style="font-size:12px">総移動距離</text>
      <text x="295" y="160" text-anchor="middle" :fill="panel ? '#2f6fed' : '#6f85a4'" style="font-size:27px" font-weight="700">{{ distance(order) }}</text>
      <text x="180" y="238" text-anchor="middle" fill="#6b809c" style="font-size:12px">{{ panel ? '同じ地点を、同じ回数だけ訪問' : 'すべての地点を1回ずつ訪れ、出発地に戻る' }}</text>
    </g>
    <path d="M394 116 H497 L484 108 M497 116 L484 124" fill="none" stroke="#759ede" stroke-width="3" />
    <text x="445" y="85" text-anchor="middle" fill="#346bc5" style="font-size:15px" font-weight="700">約{{ improvement }}%短縮</text>
    <text x="445" y="150" text-anchor="middle" fill="#6b809c" style="font-size:12px">距離は模式図上の値</text>
    <g v-for="(label, i) in ['候補をつくる', '制約・距離を評価', 'よい解を保存']" :key="label">
      <rect :x="54 + i * 292" y="281" width="210" height="42" rx="21" fill="#193d6e" />
      <text :x="159 + i * 292" y="307" text-anchor="middle" fill="#ffffff" style="font-size:15px">{{ label }}</text>
      <path v-if="i < 2" :d="`M${276 + i * 292} 302 h55 l-8 -6 m8 6 l-8 6`" fill="none" stroke="#8ea5c5" stroke-width="2" />
    </g>
    <path d="M745 327 V349 H159 V329 L153 337 M159 329 L165 337" fill="none" stroke="#8ea5c5" stroke-width="2" />
    <rect x="324" y="338" width="246" height="24" rx="12" fill="#f3f7fd" />
    <text x="447" y="354" text-anchor="middle" fill="#2f6fed" style="font-size:14px">時間内で何度も繰り返す</text>
  </svg>
</template>
<style scoped>
.heuristic-svg { display:block; width:100%; height:338px; font-family:sans-serif; }
</style>

<script setup>
import { ref } from 'vue'

const revealed = ref(false)
const heights = [3, 0, 2, 0, 4]
const water = [0, 3, 1, 3, 0]
const x = index => 73 + index * 103
const y = level => 289 - level * 43
</script>

<template>
  <div class="rain-diagram">
    <svg viewBox="0 0 900 346" role="img" aria-label="高さ3、0、2、0、4の建物の間に雨水が7マスたまる図">
      <rect x="1" y="1" width="900" height="336" rx="19" fill="#ffffff" stroke="#cfddf1" />
      <text x="30" y="38" class="panel-heading">高さが違う5つの建物</text>
      <text x="30" y="62" class="panel-hint">雨が降ったら、水はいくつのマスに残る？</text>
      <line x1="48" y1="289" x2="600" y2="289" stroke="#9fb4ce" stroke-width="2" />
      <line v-for="level in 4" :key="level" x1="48" :y1="y(level)" x2="600" :y2="y(level)" stroke="#e1eaf5" stroke-width="1" stroke-dasharray="4 5" />
      <g v-for="(height, index) in heights" :key="index">
        <rect v-for="level in water[index]" v-if="revealed" :key="`water-${level}`" :x="x(index)" :y="y(height + level)" width="75" height="43" fill="#83c5f4" stroke="#ffffff" stroke-width="2" />
        <rect v-for="level in height" :key="`bar-${level}`" :x="x(index)" :y="y(level)" width="75" height="43" fill="#1c467e" stroke="#ffffff" stroke-width="2" />
        <text :x="x(index) + 37.5" y="316" text-anchor="middle" class="height-label">{{ height }}</text>
      </g>
      <text x="566" y="280" class="height-note">高さ</text>
      <line x1="624" y1="34" x2="624" y2="304" stroke="#d4e1f0" stroke-width="2" />
      <text x="651" y="72" class="panel-heading">たまる水の量</text>
      <text x="651" y="150" class="answer">{{ revealed ? '7' : '?' }}<tspan class="answer-unit"> マス</tspan></text>
      <g v-if="revealed">
        <rect x="650" y="189" width="214" height="78" rx="13" fill="#e7f2ff" />
        <text x="669" y="220" class="calculation">3 ＋ 1 ＋ 3 ＝ 7</text>
        <text x="669" y="247" class="caption">左右の壁より高くはたまらない</text>
      </g>
      <text v-else x="651" y="211" class="caption">まず、頭の中で雨を降らせてみる。</text>
    </svg>
    <button type="button" :aria-pressed="revealed" @click="revealed = !revealed">{{ revealed ? '水を隠す' : '雨を降らせる' }}</button>
  </div>
</template>

<style scoped>
.rain-diagram { position: relative; }
svg { display: block; width: 100%; height: 330px; font-family: 'Noto Sans JP', 'Hiragino Sans', sans-serif; }
.panel-heading { fill: #234369; font-size: 18px; font-weight: 700; }
.panel-hint, .caption, .height-note { fill: #6b809c; font-size: 13px; }
.height-label { fill: #3b587d; font-size: 15px; font-weight: 700; }
.answer { fill: #2f6fed; font-size: 64px; font-weight: 700; }
.answer-unit { font-size: 20px; }
.calculation { fill: #234f89; font-size: 20px; font-weight: 700; }
button { float: right; margin-top: 4px; padding: 7px 18px; border-radius: 20px; border: 1px solid #2f6fed; background: #2f6fed; color: #fff; font-size: 12px; cursor: pointer; }
</style>

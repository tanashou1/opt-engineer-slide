<script setup>
import { computed, ref } from 'vue'
import tree from '../assets/interests.json'

const colors = ['#2f6fed', '#3584a6', '#5271bd', '#3262a8', '#7068c2', '#578be1', '#358bb2']
const positions = [[278, 72], [278, 206], [278, 344], [662, 60], [662, 158], [662, 264], [662, 363]]
const trail = ref([])
const selected = computed(() => trail.value.reduce((node, index) => node.children[index], tree))
const color = computed(() => colors[trail.value[0] ?? 0])
const breadcrumbs = computed(() => {
  let node = tree
  return trail.value.map(index => { node = node.children[index]; return node.label })
})
const overview = computed(() => tree.children.map((node, i) => {
  const [x, y] = positions[i]
  const side = i < 3 ? -1 : 1
  return { ...node, i, x, y, side, color: colors[i], leaves: node.children.map((child, j) => ({ ...child, x: x + side * 172, y: y + (j - (node.children.length - 1) / 2) * 19 })) }
}))
const groups = computed(() => {
  const count = selected.value.children.reduce((sum, child) => sum + Math.max(child.children.length, 1), 0)
  const gap = Math.min(43, 338 / Math.max(count, 1))
  let cursor = 205 - count * gap / 2
  return selected.value.children.map((child, i) => {
    const leaves = child.children.length ? child.children : []
    const height = Math.max(leaves.length, 1) * gap
    const group = { ...child, i, x: 405, y: cursor + height / 2, leaves: leaves.map((leaf, j) => ({ ...leaf, j, x: 623, y: cursor + gap * (j + .5) })) }
    cursor += height
    return group
  })
})
function open(index) { trail.value = [index] }
function drill(index) { if (selected.value.children[index]?.children.length) trail.value = [...trail.value, index] }
function openLeaf(groupIndex, leafIndex) {
  if (selected.value.children[groupIndex].children[leafIndex]?.children.length) trail.value = [...trail.value, groupIndex, leafIndex]
}
function branch(x1, y1, x2, y2) {
  const mid = (x1 + x2) / 2
  return `M${x1},${y1} C${mid},${y1} ${mid},${y2} ${x2},${y2}`
}
</script>

<template>
  <div class="mindmap" @keydown.esc.stop="trail = []">
    <div class="map-toolbar">
      <button type="button" :disabled="!trail.length" @click="trail = []">全体を見る</button>
      <template v-if="trail.length">
        <span v-for="(label, index) in breadcrumbs" :key="index"><i>/</i><button type="button" @click="trail = trail.slice(0, index + 1)">{{ label }}</button></span>
      </template>
      <small v-else>7つの枝から、気になるテーマへ</small>
    </div>
    <svg class="mindmap-canvas" viewBox="0 0 940 415" role="group" aria-label="興味をたどるマインドマップ">
      <template v-if="!trail.length">
        <g v-for="node in overview" :key="node.label" :style="{ '--branch': node.color }">
          <path :d="branch(470, 207, node.x, node.y)" :stroke="node.color" class="main-branch" />
          <path v-for="leaf in node.leaves" :key="leaf.label" :d="branch(node.x, node.y, leaf.x - node.side * 80, leaf.y)" :stroke="node.color" class="twig" />
          <g class="map-node" role="button" tabindex="0" :aria-label="`${node.label}を拡大`" @click.stop="open(node.i)" @keydown.enter.stop.prevent="open(node.i)" @keydown.space.stop.prevent="open(node.i)">
            <rect :x="node.x - 51" :y="node.y - 19" width="102" height="38" rx="19" fill="#ffffff" :stroke="node.color" stroke-width="2" />
            <text :x="node.x" :y="node.y + 5" text-anchor="middle" class="category">{{ node.label }}</text>
          </g>
          <g v-for="(leaf, i) in node.leaves" :key="leaf.label" class="map-node" role="button" tabindex="0" :aria-label="`${leaf.label}を表示`" @click.stop="trail = leaf.children.length ? [node.i, i] : [node.i]" @keydown.enter.stop.prevent="trail = leaf.children.length ? [node.i, i] : [node.i]" @keydown.space.stop.prevent="trail = leaf.children.length ? [node.i, i] : [node.i]">
            <rect :x="leaf.x - 94" :y="leaf.y - 9" width="188" height="18" rx="6" fill="transparent" />
            <circle :cx="leaf.x - node.side * 80" :cy="leaf.y" r="2.2" :fill="node.color" />
            <text :x="leaf.x - node.side * 70" :y="leaf.y + 4" :text-anchor="node.side < 0 ? 'end' : 'start'" class="leaf-label">{{ leaf.label }}</text>
          </g>
        </g>
        <circle cx="470" cy="207" r="63" fill="#dce9fc" />
        <circle cx="470" cy="207" r="54" fill="#142c53" />
        <text x="470" y="205" text-anchor="middle" fill="#ffffff" style="font-size:22px" font-weight="700">わたし</text>
        <text x="470" y="229" text-anchor="middle" fill="#8ccaff" style="font-size:9px" letter-spacing="2">INTERESTS</text>
      </template>
      <template v-else>
        <path v-for="group in groups" :key="`stem-${group.i}`" :d="branch(175, 207, 405, group.y)" :stroke="color" class="main-branch" />
        <g v-for="group in groups" :key="group.i">
          <path v-for="leaf in group.leaves" :key="leaf.label" :d="branch(490, group.y, 618, leaf.y)" :stroke="color" class="twig" />
          <g :class="{ 'map-node': group.children.length }" :role="group.children.length ? 'button' : undefined" :tabindex="group.children.length ? 0 : undefined" :aria-label="`${group.label}${group.children.length ? 'を拡大' : ''}`" @click.stop="drill(group.i)" @keydown.enter.stop.prevent="drill(group.i)" @keydown.space.stop.prevent="drill(group.i)">
            <rect x="298" :y="group.y - 16" width="212" height="32" rx="16" fill="#ffffff" :stroke="color" />
            <text x="404" :y="group.y + 5" text-anchor="middle" style="font-size:13px" font-weight="600" fill="#203856">{{ group.label }}{{ group.children.length ? ' ＋' : '' }}</text>
          </g>
          <g v-for="leaf in group.leaves" :key="leaf.label" :class="{ 'map-node': leaf.children.length }" :role="leaf.children.length ? 'button' : undefined" :tabindex="leaf.children.length ? 0 : undefined" @click.stop="openLeaf(group.i, leaf.j)" @keydown.enter.stop.prevent="openLeaf(group.i, leaf.j)" @keydown.space.stop.prevent="openLeaf(group.i, leaf.j)">
            <rect x="618" :y="leaf.y - 10" width="310" height="21" rx="5" fill="#f3f7fd" />
            <circle cx="623" :cy="leaf.y" r="3" :fill="color" />
            <text x="635" :y="leaf.y + 5" style="font-size:13px" fill="#4e6687">{{ leaf.label }}{{ leaf.children.length ? ' ＋' : '' }}</text>
          </g>
        </g>
        <rect x="26" y="76" width="190" height="202" rx="22" fill="#ffffff" :stroke="color" stroke-width="2" />
        <InterestIllustration :kind="trail[0]" x="44" y="90" width="154" height="115" />
        <text x="121" y="240" text-anchor="middle" style="font-size:18px" font-weight="700" :fill="color">{{ selected.label }}</text>
        <text x="121" y="310" text-anchor="middle" fill="#6d83a2" style="font-size:11px">＋ の枝をクリックすると拡大</text>
      </template>
    </svg>
  </div>
</template>

<style scoped>
.mindmap { width: 100%; }
.map-toolbar { height: 28px; display: flex; align-items: center; gap: 10px; color: #6d83a2; font-size: 11px; }
.map-toolbar button { border: 0; padding: 3px 9px; border-radius: 10px; color: #2f6fed; background: #dce9fc; cursor: pointer; }
.map-toolbar button:disabled { color: #6d83a2; background: transparent; cursor: default; }
.map-toolbar i { margin-right: 8px; font-style: normal; color: #a4b5cc; }
.mindmap-canvas { display: block; width: 100%; height: 340px; font-family: 'Noto Sans JP', sans-serif; }
.main-branch { fill: none; stroke-width: 3; opacity: .65; }
.twig { fill: none; stroke-width: 1.3; opacity: .6; }
.category { font-size: 16px; fill: var(--branch); font-weight: 700; }
.leaf-label { font-size: 11px; fill: #526786; }
.map-node { cursor: pointer; outline: none; }
.map-node:hover > rect, .map-node:focus-visible > rect { fill: #dce9fc; stroke-width: 3; }
</style>

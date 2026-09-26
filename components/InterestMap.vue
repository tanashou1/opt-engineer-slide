<script setup>
import { computed, ref } from 'vue'
import tree from '../assets/interests.json'
import photos from '../assets/interest-photos.json'

const photoUrls = import.meta.glob('../assets/photos/*.{jpg,webp}', { eager: true, query: '?url', import: 'default' })
const colors = ['#2f6fed', '#3584a6', '#5271bd', '#3262a8', '#7068c2', '#578be1', '#358bb2']
const trail = ref([])
const selected = computed(() => trail.value.reduce((node, index) => node.children[index], tree))
const breadcrumbs = computed(() => {
  let node = tree
  return trail.value.map(index => { node = node.children[index]; return node.label })
})
const photo = computed(() => {
  if (!trail.value.length) return null
  const labels = breadcrumbs.value
  const index = labels.includes('ドライブウェイ') ? 1 : labels.includes('数理最適化') ? 2 : trail.value[0]
  const item = photos[index]
  return { ...item, url: photoUrls[`../assets/photos/${item.file}`] }
})
const hasNestedGroups = computed(() => selected.value.children.some(child => child.children.length))

function preview(node) {
  return node.children.map(child => child.label).join(' · ')
}
function drill(index) {
  if (selected.value.children[index]?.children.length) trail.value = [...trail.value, index]
}
function drillLeaf(groupIndex, leafIndex) {
  if (selected.value.children[groupIndex].children[leafIndex]?.children.length)
    trail.value = [...trail.value, groupIndex, leafIndex]
}
</script>

<template>
  <div :class="['interest-map', { overview: !trail.length }]" @keydown.esc.stop="trail = []">
    <figure v-if="photo" class="image-panel" :class="{ cover: photo.cover }">
      <div class="image-stage" :style="{ '--image-url': `url('${photo.url}')` }">
        <img :src="photo.url" :alt="photo.alt" decoding="async" />
      </div>
      <figcaption v-if="photo">
        <span class="photo-caption">{{ photo.caption }}</span>
        <span class="photo-credit"><a :href="photo.source" target="_blank" rel="noopener noreferrer">{{ photo.author }} · 出典 ↗</a><a v-if="photo.licenseUrl" :href="photo.licenseUrl" target="_blank" rel="noopener noreferrer">{{ photo.license }}</a></span>
      </figcaption>
    </figure>

    <div class="tree-panel">
      <div v-if="!trail.length" class="overview-tree">
        <svg class="map-connections" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
          <path d="M415 500 C370 500 382 200 340 200" />
          <path d="M415 500 C370 500 382 510 340 510" />
          <path d="M415 500 C370 500 382 820 340 820" />
          <path d="M585 500 C630 500 618 110 660 110" />
          <path d="M585 500 C630 500 618 350 660 350" />
          <path d="M585 500 C630 500 618 590 660 590" />
          <path d="M585 500 C630 500 618 830 660 830" />
        </svg>
        <div class="map-root"><span class="root-node">INTEREST MAP</span></div>
        <div class="category-list" aria-label="興味の分野">
          <button v-for="(node, index) in tree.children" :key="node.label" type="button" class="category-row" :style="{ '--accent': colors[index] }" :aria-label="`${node.label}を拡大`" @click="trail = [index]">
            <span class="category-copy"><strong>{{ node.label }}</strong><small>{{ preview(node) }}</small></span>
            <span class="row-arrow" aria-hidden="true">›</span>
          </button>
        </div>
      </div>

      <template v-else>
        <nav class="tree-toolbar" aria-label="マップの階層">
          <button type="button" @click="trail = []">← 全体</button>
          <template v-for="(label, index) in breadcrumbs" :key="index">
            <span class="separator">/</span>
            <button type="button" :aria-current="index === breadcrumbs.length - 1 ? 'location' : undefined" @click="trail = trail.slice(0, index + 1)">{{ label }}</button>
          </template>
        </nav>

        <div v-if="hasNestedGroups" class="group-grid" :style="{ '--accent': colors[trail[0]] }">
          <section v-for="(group, groupIndex) in selected.children" :key="group.label" class="group-card">
            <button v-if="group.children.length" type="button" class="group-name" :aria-label="`${group.label}を拡大`" @click="drill(groupIndex)">{{ group.label }}<span aria-hidden="true">›</span></button>
            <h2 v-else class="group-name static">{{ group.label }}</h2>
            <ul v-if="group.children.length">
              <li v-for="(leaf, leafIndex) in group.children" :key="leaf.label">
                <button v-if="leaf.children.length" type="button" :aria-label="`${leaf.label}を拡大`" @click="drillLeaf(groupIndex, leafIndex)">{{ leaf.label }}<span aria-hidden="true">›</span></button>
                <span v-else>{{ leaf.label }}</span>
              </li>
            </ul>
          </section>
        </div>
        <div v-else class="leaf-grid" :style="{ '--accent': colors[trail[0]] }">
          <div v-for="leaf in selected.children" :key="leaf.label" class="leaf-card">{{ leaf.label }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.interest-map { display: grid; grid-template-columns: minmax(0, 1.06fr) minmax(0, .94fr); gap: 21px; width: 100%; height: 100%; }
.interest-map.overview { grid-template-columns: minmax(0, 1fr); }
.image-panel { position: relative; grid-column: 2; grid-row: 1; display: flex; flex-direction: column; min-width: 0; min-height: 0; margin: 0; }
.image-stage { position: relative; display: flex; flex: 1; min-height: 0; align-items: center; justify-content: center; overflow: hidden; border-radius: 15px; background: #e3edfa; }
.image-stage::before { content: ''; position: absolute; inset: -20px; background-image: var(--image-url); background-position: center; background-size: cover; filter: blur(18px); opacity: .22; }
.image-stage img { position: relative; z-index: 1; display: block; width: 100%; height: 100%; object-fit: contain; }
.cover .image-stage::before { display: none; }
.image-panel figcaption { position: absolute; z-index: 2; right: 0; bottom: 0; left: 0; padding: 30px 13px 11px; border-radius: 0 0 15px 15px; background: linear-gradient(transparent, #10274bd9); }
.photo-caption { display: block; color: #fff; font-size: 13px; font-weight: 600; line-height: 1.35; }
.photo-credit { display: flex; gap: 9px; color: #dceafd; font-size: 9px; line-height: 1.5; }
.photo-credit a { color: inherit; text-decoration: none; }
.photo-credit a:hover { color: #2f6fed; text-decoration: underline; }
.tree-panel { grid-column: 1; grid-row: 1; min-width: 0; min-height: 0; display: flex; flex-direction: column; }
.overview-tree { position: relative; height: 100%; min-height: 0; }
.map-connections { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.map-connections path { fill: none; stroke: #8eafe0; stroke-width: 3; vector-effect: non-scaling-stroke; }
.map-root { position: absolute; z-index: 1; top: 44%; left: 41.5%; display: flex; align-items: center; justify-content: center; width: 17%; height: 12%; }
.root-node { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; border-radius: 18px; background: #153b6e; color: white; box-shadow: 0 8px 23px #153b6e2b; font: 700 13px/1 Arial, sans-serif; letter-spacing: .08em; }
.category-list { position: absolute; inset: 0; }
.category-row { position: absolute; display: flex; align-items: center; gap: 10px; width: 34%; height: 18%; min-width: 0; padding: 12px 14px; border: 1px solid #ceddf0; border-left: 5px solid var(--accent); border-radius: 12px; background: #fff; color: #213e64; box-shadow: 0 7px 18px #1b49701a; text-align: left; cursor: pointer; }
.category-row:nth-child(1) { top: 11%; left: 0; }
.category-row:nth-child(2) { top: 42%; left: 0; }
.category-row:nth-child(3) { top: 73%; left: 0; }
.category-row:nth-child(4) { top: 2%; right: 0; }
.category-row:nth-child(5) { top: 26%; right: 0; }
.category-row:nth-child(6) { top: 50%; right: 0; }
.category-row:nth-child(7) { top: 74%; right: 0; }
.category-row:hover, .category-row:focus-visible { background: #eaf2ff; border-color: var(--accent); outline: none; }
.category-copy { min-width: 0; display: flex; flex: 1; flex-direction: column; gap: 2px; }
.category-copy strong { font-size: 18px; line-height: 1.2; }
.category-copy small { display: -webkit-box; overflow: hidden; color: #6f84a0; font-size: 10px; line-height: 1.45; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
.row-arrow { color: var(--accent); font: 700 26px/1 Arial, sans-serif; }
.tree-toolbar { flex: none; display: flex; align-items: center; flex-wrap: wrap; gap: 2px; min-height: 35px; margin-bottom: 10px; }
.tree-toolbar button { padding: 5px 7px; border: 0; border-radius: 7px; background: transparent; color: #2f6fed; font-size: 11px; cursor: pointer; }
.tree-toolbar button:hover, .tree-toolbar button:focus-visible { background: #dceaff; }
.tree-toolbar button[aria-current] { color: #203856; font-weight: 700; }
.separator { color: #a6b8ce; font-size: 11px; }
.group-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-content: start; gap: 9px; min-height: 0; overflow-y: auto; padding-right: 2px; }
.group-card { min-width: 0; padding: 11px 12px; border: 1px solid #d0dfef; border-left: 4px solid var(--accent); border-radius: 10px; background: #fff; }
.group-name { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 0; border: 0; background: none; color: #24466e; font-size: 14px; font-weight: 700; line-height: 1.35; text-align: left; cursor: pointer; }
.group-name span, .group-card li button span { color: var(--accent); font: 700 17px/1 Arial, sans-serif; }
.group-name.static { margin: 0; cursor: default; }
.group-card ul { margin: 7px 0 0; padding: 0; list-style: none; }
.group-card li { position: relative; margin: 0; padding: 2px 0 2px 10px; color: #526b8a; font-size: 11px; line-height: 1.45; }
.group-card li::before { content: ''; position: absolute; top: .78em; left: 0; width: 5px; height: 5px; border-radius: 50%; background: #a5bfdf; }
.group-card li button { display: flex; align-items: center; justify-content: space-between; gap: 4px; width: 100%; padding: 0; border: 0; background: none; color: inherit; font: inherit; text-align: left; cursor: pointer; }
.group-card button:hover, .group-card button:focus-visible { color: var(--accent); text-decoration: underline; }
.leaf-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-content: start; gap: 10px; overflow-y: auto; }
.leaf-card { min-height: 55px; display: flex; align-items: center; padding: 9px 13px; border: 1px solid #d0dfef; border-left: 4px solid var(--accent); border-radius: 10px; background: #fff; color: #24466e; font-size: 15px; font-weight: 600; line-height: 1.35; }
</style>

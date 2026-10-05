<script setup>
import { computed, nextTick, ref } from 'vue'
import mapSvg from '../assets/diagrams/tech-map.svg?raw'
import techMapSource from '../tech_map.md?raw'

const selected = ref(null)
// 課題の解決に使える代表的な技術。すべてを同時に使うとは限らない。
const tasks = [
  { id: 'game', name: 'ゲームAI', detail: '対戦を繰り返して作戦を学ぶ', icon: 'M12 12h16c4 0 6 4 7 10l1 7c0 4-4 5-6 2l-5-5H15l-5 5c-2 3-6 2-6-2l1-7c1-6 3-10 7-10z M10 18v8 M6 22h8 M27 18h1 M31 23h1', skills: ['アルゴリズム', 'データ構造', '動的計画法', '確率論', 'ベイズ推定', '統計学', 'モンテカルロ法', '機械学習', '強化学習', 'データ分析', 'ヒューリスティクス'] },
  { id: 'scheduling', name: 'スケジューリング問題', detail: '制約を守って作業を割り当てる', icon: 'M7 9h26v25H7z M7 16h26 M13 5v8 M27 5v8 M13 22l4 4 9-7 M13 30h13', skills: ['アルゴリズム', '計算量・計算複雑性', 'グラフ理論', '離散最適化', '数理計画', '制約プログラミング', 'ヒューリスティクス'] },
  { id: 'delivery', name: '配送計画', detail: '時間と積載量を守ってルートを組む', icon: 'M5 7h17v15H5z M22 12h8l5 7v3H22 M10 22a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M29 22a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M9 11h8 M9 15h5', skills: ['アルゴリズム', 'データ構造', '計算量・計算複雑性', 'グラフ理論', '離散最適化', '数理計画', '制約プログラミング', 'ヒューリスティクス', '緩和・双対問題'] },
  { id: 'forecast', name: '需要予測', detail: '売上と在庫を見通す', icon: 'M7 6v28h28 M12 28v-7 M20 28V15 M28 28V9 M10 15l8-5 7 2 9-7', skills: ['統計学', '確率論', 'ベイズ推定', 'モンテカルロ法', '機械学習', 'データ分析', 'DB'] },
  { id: 'assistant', name: 'AIチャットボット', detail: '社内情報から回答する', icon: 'M6 8h28v20H19l-8 7v-7H6z M13 15h14 M13 21h9 M29 3v7 M26 6h6', skills: ['生成AI', 'データ構造', 'DB', '通信・ネットワーク', 'ソフトウェア設計', 'テスト', 'CI/CD', '保守・運用', 'クラウド', '性能改善'] },
  { id: 'development', name: 'ソフトウェア開発', detail: '設計から実装・運用まで', icon: 'M4 7h32v25H4z M4 13h32 M15 18l-5 5 5 5 M25 18l5 5-5 5 M22 17l-4 12', skills: ['アルゴリズム', 'データ構造', '計算量・計算複雑性', 'OS', 'コンパイラ', 'DB', '通信・ネットワーク', '性能改善', 'ソフトウェア設計', 'テスト', 'CI/CD', '保守・運用', 'クラウド'] },
]
// 表の列順に所属を読み取り、表示と強調対象のずれを防ぐ。
const memberships = techMapSource.split('```')[0].split('\n')
  .filter(line => line.startsWith('| **'))
  .map(line => line.split('|').slice(1, -1).map(cell => cell.trim()))
const regions = [
  ['cs', '計算機科学'], ['opt', '数理最適化'], ['se', 'ソフトウェア工学'],
  ['cp', '競技プログラミング'], ['ds', 'データサイエンス'],
].map(([id, name], column) => ({
  id: `region-${id}`, key: id, name,
  skills: memberships.filter(row => row[column + 1] === '●').map(row => row[0].replaceAll('**', '')),
}))
const activeChoice = computed(() => [...tasks, ...regions].find(choice => choice.id === selected.value))
const activeRegion = computed(() => regions.find(region => region.id === selected.value))
const highlightColor = computed(() => {
  if (!activeRegion.value) return '#fef08a'
  return mapSvg.match(new RegExp(`\\.label-${activeRegion.value.key}\\s*\\{[^}]*fill:\\s*(#[0-9a-fA-F]+)`))?.[1] ?? '#fef08a'
})
const relevantRegions = computed(() => new Set(activeRegion.value
  ? [activeRegion.value.key]
  : regions.filter(region => region.skills.some(skill => highlighted.value.has(skill))).map(region => region.key)))
const highlighted = computed(() => new Set(activeChoice.value?.skills ?? []))
const svg = computed(() => mapSvg.replace('role="img"', 'role="group"')
  .replace(/<text class="tech"([^>]*)>([^<]+)<\/text>/g,
    (_, attrs, name) => `<text class="tech${highlighted.value.has(name) ? ' is-lit' : ''}"${attrs}>${name}</text>`)
  .replace(/<text class="area-label label-(\w+)"([^>]*)>([^<]+)<\/text>/g,
    (_, key, attrs, name) => `<text class="area-label label-${key}${relevantRegions.value.has(key) ? ' is-relevant' : ''}"${attrs} data-region="region-${key}" role="button" tabindex="0" aria-pressed="${selected.value === `region-${key}`}">${name}</text>`))
function toggle(id) { selected.value = selected.value === id ? null : id }
async function selectRegion(event) {
  const target = event.target.closest('[data-region]')
  if (!target) return
  const container = event.currentTarget
  const id = target.dataset.region
  const hadFocus = target === document.activeElement
  toggle(id)
  // v-html の更新後も領域名のキーボードフォーカスを保つ。
  if (hadFocus) {
    await nextTick()
    container?.querySelector(`[data-region="${id}"]`)?.focus()
  }
}
function onKeydown(event) {
  // Slidev はボタンのフォーカス中に移動キーを無効にする。
  // 矢印操作ではフォーカスを外して、通常のスライド操作へ渡す。
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
    event.target.closest('button')?.blur()
    return
  }
  if (!['Enter', ' '].includes(event.key)) return
  if (!event.target.closest('button, [data-region]')) return
  event.stopPropagation()
  if (event.target.closest('[data-region]')) {
    event.preventDefault()
    if (!event.repeat) selectRegion(event)
  }
}
function onKeyup(event) {
  if (['Enter', ' '].includes(event.key) && event.target.closest('button, [data-region]')) event.stopPropagation()
}
</script>

<template>
  <div class="tech-map-interactive" @click.stop @keydown="onKeydown" @keyup="onKeyup">
    <div class="map-figure" :class="{ 'has-selection': selected }" :style="{ '--highlight-color': highlightColor }" @click="selectRegion" v-html="svg" />
    <aside class="task-panel" aria-label="解きたい課題">
      <div class="task-heading"><h2>解きたい課題</h2><button v-if="selected" class="reset" @click="selected = null">解除</button></div>
      <button v-for="task in tasks" :key="task.id" class="task-button" :class="{ selected: selected === task.id }" :aria-pressed="selected === task.id" @click="toggle(task.id)">
        <svg viewBox="0 0 40 40" aria-hidden="true"><path :d="task.icon" /></svg>
        <span><strong>{{ task.name }}</strong><small>{{ task.detail }}</small></span>
      </button>
    </aside>
  </div>
</template>

<style scoped>
.tech-map-interactive { display: flex; align-items: center; gap: 14px; width: 100%; height: 100%; }
.map-figure { flex: 1; min-width: 0; }
.map-figure :deep(svg) { display: block; width: 100%; height: auto; overflow: visible; }
.map-figure :deep(.tech) { transition: opacity .2s, fill .2s, filter .2s; }
.map-figure.has-selection :deep(.tech) { opacity: .24; }
.map-figure.has-selection :deep(.tech.is-lit) { opacity: 1; fill: var(--highlight-color); filter: drop-shadow(0 0 5px color-mix(in srgb, var(--highlight-color) 50%, transparent)); font-weight: 700; }
.map-figure :deep(.area-label) { cursor: pointer; transition: opacity .2s; }
.map-figure.has-selection :deep(.area-label) { opacity: .24; }
.map-figure.has-selection :deep(.area-label.is-relevant) { opacity: 1; }
.map-figure :deep(.area-label:hover), .map-figure :deep(.area-label[aria-pressed="true"]) { text-decoration: underline; text-underline-offset: 5px; }
.map-figure :deep(.area-label:focus-visible) { outline: 2px solid #facc15; outline-offset: 5px; border-radius: 3px; }
.task-panel { flex: 0 0 186px; display: flex; flex-direction: column; gap: 10px; }
.task-heading { display: flex; align-items: center; justify-content: space-between; min-height: 28px; margin-bottom: 2px; }
.task-heading h2 { margin: 0; font-size: 17px; font-weight: 700; color: #f8fafc; }
.task-button { display: flex; align-items: center; gap: 9px; width: 100%; padding: 10px 9px; text-align: left; border: 1px solid #334155; border-radius: 12px; background: #182337; color: #cbd5e1; cursor: pointer; transition: border-color .2s, background .2s; }
.task-button:hover { border-color: #94a3b8; background: #243147; }
.task-button.selected { border-color: #facc15; background: #facc1514; color: #fef08a; }
.task-button:focus-visible, .reset:focus-visible { outline: 2px solid #facc15; outline-offset: 3px; }
.task-button svg { width: 31px; height: 31px; flex-shrink: 0; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.task-button strong { display: block; font-size: 12px; font-weight: 700; }
.task-button small { display: block; margin-top: 4px; font-size: 9px; color: #94a3b8; }
.reset { font-size: 11px; color: #cbd5e1; cursor: pointer; background: transparent; border: 0; }
</style>

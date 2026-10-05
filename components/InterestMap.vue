<script setup>
import tree from '../assets/interests.json'
import photos from '../assets/interest-photos.json'
import appleMl from '../assets/photos/apple-ml.png?url'

const tileNames = ['car', 'tech', 'music', 'game', 'manga']
const photoUrls = import.meta.glob('../assets/photos/*.{jpg,webp,svg,png}', { eager: true, query: '?url', import: 'default' })
const tilePhotos = {
  car: [{ ...photos[0], kind: 'car' }],
  music: [{ ...photos[4], kind: 'music' }],
  game: [{ ...photos[5], kind: 'game' }],
  manga: [{ ...photos[6], kind: 'manga' }],
}
const topicPhotos = {
  数値計算: [{ ...photos[2], kind: 'openfoam' }],
  数理最適化: [{ ...photos[8], kind: 'optimization' }],
  '発電・エネルギー': [{ ...photos[7], kind: 'energy' }],
  機械学習: [{ file: 'apple-ml.png', url: appleMl, alt: '画像認識の対象となる9種類のリンゴ', kind: 'ml' }],
  プログラミング: [{ ...photos[3], kind: 'rust' }],
}
</script>

<template>
  <div class="interest-atlas">
    <div class="atlas-grid">
      <section v-for="(category, index) in tree.children" :key="category.label" class="atlas-tile" :class="`tile-${tileNames[index]}`" :aria-label="category.label">
        <figure v-for="photo in (tilePhotos[tileNames[index]] || [])" :key="photo.file" class="tile-photo" :class="`photo-${photo.kind}`">
          <img :src="photo.url || photoUrls[`../assets/photos/${photo.file}`]" :alt="photo.alt" decoding="async" />
          <figcaption v-if="photo.source"><a :href="photo.source" target="_blank" rel="noopener noreferrer">{{ photo.author }} ↗</a></figcaption>
        </figure>
        <div class="tile-title"><h2>{{ category.label }}</h2><i aria-hidden="true"></i></div>
        <div class="tile-body">
          <section v-for="group in category.children" :key="group.label" class="topic" :class="{ 'topic-with-children': group.children.length }">
            <figure v-for="photo in (tileNames[index] === 'tech' ? (topicPhotos[group.label] || []) : [])" :key="photo.file" class="tile-photo topic-photo" :class="`photo-${photo.kind}`">
              <img :src="photo.url || photoUrls[`../assets/photos/${photo.file}`]" :alt="photo.alt" decoding="async" />
              <figcaption v-if="photo.source"><a :href="photo.source" target="_blank" rel="noopener noreferrer">{{ photo.author }} ↗</a></figcaption>
            </figure>
            <h3 v-if="group.children.length">{{ group.label }}</h3>
            <div v-if="group.children.length" class="topic-content">
              <div v-for="child in group.children" :key="child.label" class="subtopic" :class="{ 'subtopic-with-children': child.children.length }">
                <strong v-if="child.children.length">{{ child.label }}</strong>
                <span v-else class="leaf">{{ child.label }}</span>
                <div v-if="child.children.length" class="leaf-list">
                  <span v-for="leaf in child.children" :key="leaf.label" class="leaf">
                    {{ leaf.label }}
                    <small v-if="leaf.children.length">{{ leaf.children.map(item => item.label).join(' · ') }}</small>
                  </span>
                </div>
              </div>
            </div>
            <p v-else class="top-leaf">{{ group.label }}</p>
          </section>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.interest-atlas { display: grid; grid-template-rows: minmax(0, 1fr); width: 100%; height: 100%; color: #1c3b63; font-family: 'Noto Sans JP', sans-serif; }
.atlas-grid { position: relative; top: -6px; display: grid; grid-template-columns: 1.1fr .5fr .5fr; grid-template-rows: 166px 110px minmax(0, 1fr); gap: 12px; min-height: 0; }
.atlas-tile { --accent: #2f6fed; --tint: #eaf2ff; position: relative; min-width: 0; min-height: 0; overflow: hidden; padding: 11px 13px; border: 1px solid #d2e0f1; border-top: 4px solid var(--accent); border-radius: 13px; background: #fff; box-shadow: 0 7px 18px #183f7214; }
.tile-photo { position: absolute; z-index: 1; overflow: hidden; margin: 0; border-radius: 7px; background: #dce8f8; }
.tile-photo img { display: block; width: 100%; height: 100%; object-fit: cover; }
.photo-openfoam img, .photo-game img { object-fit: contain; }
.tile-photo figcaption { position: absolute; right: 0; bottom: 0; left: 0; overflow: hidden; padding: 5px 3px 2px; background: linear-gradient(transparent, #10274bd9); color: white; font: 6px/1.1 Arial, sans-serif; text-align: right; text-overflow: ellipsis; white-space: nowrap; }
.tile-photo a { color: inherit; text-decoration: none; }
.tile-title, .tile-body { position: relative; z-index: 2; }
.tile-title { display: flex; align-items: center; justify-content: space-between; margin-bottom: 9px; }
.tile-title h2 { margin: 0; color: #183f72; font-size: 19px; font-weight: 800; line-height: 1.15; }
.tile-title i { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 5px var(--tint); }
.tile-tech .tile-title i, .tile-car .tile-title i { display: none; }
.tile-body { min-height: 0; }
.topic { min-width: 0; }
.topic h3 { margin: 0 0 5px; color: #204c7a; font-size: 11px; font-weight: 800; line-height: 1.35; }
.topic-content { display: flex; flex-wrap: wrap; align-content: start; gap: 5px; }
.subtopic { min-width: 0; }
.subtopic > strong { display: block; margin-bottom: 2px; color: #2b5790; font-size: 10px; line-height: 1.25; }
.leaf-list { display: flex; flex-wrap: wrap; gap: 3px; }
.leaf { display: inline-flex; align-items: center; gap: 3px; max-width: 100%; min-height: 18px; padding: 2px 6px; border-radius: 5px; background: var(--tint); color: #31557b; font-size: 9.5px; line-height: 1.2; white-space: nowrap; }
.leaf small { display: block; color: #5b7190; font-size: 8px; white-space: normal; }
.top-leaf { margin: 0; color: #31557b; font-size: 10px; line-height: 1.35; }

.tile-tech { --accent: #174986; --tint: #e9f1fb; grid-column: 1; grid-row: 1 / 4; }
.tile-tech .tile-title h2 { font-size: 25px; }
.tile-tech .tile-body { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: 204px 104px 68px; gap: 8px; }
.tile-tech .topic { overflow: hidden; padding: 9px 10px; border-radius: 9px; background: #f4f8fe; }
.tile-tech .topic:nth-child(1) { grid-column: 1; grid-row: 1; }
.tile-tech .topic:nth-child(2) { grid-column: 1; grid-row: 2; }
.tile-tech .topic:nth-child(3) { grid-column: 2; grid-row: 1; }
.tile-tech .topic:nth-child(4) { grid-column: 2; grid-row: 2; }
.tile-tech .topic:nth-child(5) { grid-column: 1 / 3; grid-row: 3; }
.tile-tech .topic h3 { font-size: 13px; }
.tile-tech .topic:nth-child(1) .topic-content { display: grid; gap: 7px; max-width: calc(100% - 92px); }
.tile-tech .topic:nth-child(3) .topic-content { display: grid; align-content: start; gap: 7px; }
.tile-tech .topic:nth-child(4) .topic-content { max-width: calc(100% - 105px); }
.tile-tech .topic:nth-child(5) .topic-content { gap: 5px; max-width: calc(100% - 90px); }
.tile-tech .topic:nth-child(5) .leaf { font-size: 10px; }
.tile-tech .topic:nth-child(2) .topic-content { max-width: calc(100% - 84px); }
.tile-tech .topic:nth-child(2) .leaf { min-height: 0; white-space: normal; }
.tile-tech .topic:nth-child(3) .topic-content { max-width: calc(100% - 96px); gap: 3px; }
.tile-tech .topic:nth-child(3) .leaf { min-height: 0; white-space: normal; }
.tile-tech .leaf { background: transparent; }
.tile-tech .topic { position: relative; }
.topic-photo { z-index: 1; }
.photo-openfoam { top: 88px; right: 9px; width: 82px; height: 75px; }
.photo-energy { top: 30px; right: 9px; width: 94px; height: 120px; }
.photo-optimization { top: 15px; right: 9px; width: 79px; height: 64px; }
.photo-rust { top: 9px; right: 9px; width: 61px; height: 46px; }
.photo-ml { top: 8px; right: 9px; width: 80px; height: 80px; }

.tile-car { --accent: #2f6fed; --tint: #e9f2ff; grid-column: 2 / 4; grid-row: 2; }
.tile-car .tile-body { display: grid; grid-template-columns: .9fr 1fr 1.1fr; gap: 6px; width: calc(100% - 107px); }
.tile-car .topic { min-width: 0; padding-right: 5px; border-right: 1px solid #dce7f5; }
.tile-car .topic:last-child { border-right: 0; }
.tile-car .topic-content { display: grid; grid-auto-rows: 16px; gap: 2px; }
.tile-car .subtopic { display: flex; align-items: center; height: 16px; }
.tile-car .leaf { justify-content: flex-start; width: fit-content; height: 16px; min-height: 0; padding: 0 2px; background: transparent; font-size: 8px; line-height: 1.1; white-space: nowrap; }
.photo-car { top: 35px; right: 12px; width: 96px; height: 47px; }

.tile-music { --accent: #7167c8; --tint: #f0edff; grid-column: 2 / 4; grid-row: 1; }
.tile-music .tile-body { display: grid; grid-template-columns: 100px minmax(0, 1fr); gap: 8px; width: calc(100% - 108px); }
.tile-music .topic:first-child { padding-right: 9px; border-right: 1px solid #dedcf1; }
.tile-music .topic-content { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); grid-auto-rows: 16px; gap: 2px 5px; }
.tile-music .topic:first-child .topic-content { grid-template-columns: 1fr; }
.tile-music .leaf { height: 16px; min-height: 0; padding: 0 3px; background: transparent; font-size: 9.3px; }
.tile-music .tile-title i { display: none; }
.photo-music { top: 9px; right: 9px; width: 86px; height: 148px; }

.tile-game { --accent: #4f8de2; --tint: #eaf3ff; grid-column: 2; grid-row: 3; }
.tile-manga { --accent: #3389b4; --tint: #e9f7fd; grid-column: 3; grid-row: 3; }
.tile-game .tile-body, .tile-manga .tile-body { display: grid; gap: 5px; width: calc(100% - 88px); }
.tile-game .tile-body { width: calc(100% - 103px); }
.tile-manga .tile-body { width: calc(100% - 120px); }
.tile-game .top-leaf, .tile-manga .top-leaf { padding-left: 8px; border-left: 2px solid var(--accent); font-size: 9.6px; }
.tile-game .top-leaf { font-size: 8px; overflow-wrap: anywhere; }
.tile-game .tile-title i, .tile-manga .tile-title i { display: none; }
.photo-game { top: 7px; right: 9px; width: 81px; height: 140px; }
.photo-manga { top: 34px; right: 9px; width: 110px; height: 70px; }
.photo-manga img { object-fit: contain; }
</style>

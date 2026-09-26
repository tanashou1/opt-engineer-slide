<script setup>
import mapUrl from '../assets/diagrams/tech-map.svg?url'
</script>
<template>
  <img class="original-tech-map" :src="mapUrl" alt="技術領域マップ。outline.mdに記載されたSVGで、5つの技術領域の重なりを示す。" />
</template>
<style scoped>
.original-tech-map { display: block; width: 100%; height: 100%; object-fit: contain; margin: 0 auto; }
</style>

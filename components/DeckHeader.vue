<script setup>
defineProps({
  chapter: { type: String, required: true },
  subtitle: { type: String, default: '' },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
})
</script>

<template>
  <header class="section-head compact deck-header">
    <p class="eyebrow"><span>{{ chapter }}</span><template v-if="subtitle"><span class="deck-header-separator">·</span><span>{{ subtitle }}</span></template></p>
    <h1 v-if="title">{{ title }}</h1>
    <p v-if="description" class="deck-header-description">{{ description }}</p>
  </header>
</template>

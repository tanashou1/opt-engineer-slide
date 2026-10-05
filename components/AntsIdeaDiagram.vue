<script setup>
import AntsDiagram from './AntsDiagram.vue'
</script>

<template>
  <section class="ants-idea">
    <AntsDiagram :points-only="true" />
    <div class="answer-formula" aria-label="最大値は9秒">
      <span>max</span><b>(9, 3, 5, 7, 9) = 9秒</b>
    </div>
  </section>
</template>

<style scoped>
.ants-idea { display: grid; grid-template-columns: minmax(0, 1fr); grid-template-rows: 348px auto; justify-items: stretch; gap: 10px; width: 100%; height: 410px; color: #17375f; }
.answer-formula { display: flex; justify-self: center; align-items: baseline; gap: 9px; padding: 8px 24px; border: 1px solid #cbdff7; border-radius: 13px; background: #eef5ff; box-shadow: 0 8px 20px #315b8b0d; }
.answer-formula span { color: #6282aa; font: italic 700 19px Georgia,serif; }
.answer-formula b { color: #245b9e; font: 700 23px Arial,sans-serif; letter-spacing: .01em; white-space: nowrap; }
</style>

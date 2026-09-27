<script setup>
import CuteAnt from './CuteAnt.vue'
</script>

<template>
  <section class="ants-idea" aria-label="衝突するアリをすれ違うアリとして考える図解">
    <div class="model-grid">
      <article class="model-card real">
        <header><span>現実の動き</span><b>ぶつかる → 反転</b></header>
        <div class="state-row">
          <div class="ant-state"><span class="identity">A</span><CuteAnt :size="62" facing="right" /><span class="direction">→</span></div>
          <i class="meet">↔</i>
          <div class="ant-state"><span class="identity">B</span><CuteAnt :size="62" facing="left" /><span class="direction">←</span></div>
        </div>
        <div class="motion-label"><span>衝突</span><b>反転！</b></div>
        <div class="state-row after">
          <div class="ant-state"><span class="identity">A</span><CuteAnt :size="62" facing="left" /><span class="direction">←</span></div>
          <i class="space-arrow">移動後</i>
          <div class="ant-state"><span class="identity">B</span><CuteAnt :size="62" facing="right" /><span class="direction">→</span></div>
        </div>
      </article>

      <article class="model-card pass">
        <header><span>考え方</span><b>そのまま進む → 素通り</b></header>
        <div class="state-row">
          <div class="ant-state"><span class="identity">A</span><CuteAnt :size="62" facing="right" /><span class="direction">→</span></div>
          <i class="meet">↔</i>
          <div class="ant-state"><span class="identity">B</span><CuteAnt :size="62" facing="left" /><span class="direction">←</span></div>
        </div>
        <div class="motion-label"><span>すれ違う</span><b>名前だけ交換</b></div>
        <div class="state-row after">
          <div class="ant-state"><span class="identity swapped">B</span><CuteAnt :size="62" facing="left" /><span class="direction">←</span></div>
          <i class="space-arrow">移動後</i>
          <div class="ant-state"><span class="identity swapped">A</span><CuteAnt :size="62" facing="right" /><span class="direction">→</span></div>
        </div>
      </article>
    </div>

    <div class="insight"><span>アリ同士を見分けないなら</span><b>「反転」も「素通り」も、棒の上の状態は同じ</b><strong>衝突を考えず、各アリが端まで進む時間を調べればよい</strong></div>

    <div class="calculation">
      <div class="times">
        <span>衝突を無視して、図の向きへ進むと</span>
        <div class="time-pills"><b><i>→</i> 9秒</b><b><i>←</i> 3秒</b><b><i>→</i> 5秒</b><b><i>←</i> 7秒</b><b><i>→</i> 1秒</b></div>
        <small>左から順に、各アリが落ちる時刻</small>
      </div>
      <div class="result final"><span>全員が落ちるのは、一番遅い時刻</span><b>max(9, 3, 5, 7, 1) = 9秒</b></div>
    </div>
  </section>
</template>

<style scoped>
.ants-idea { display: grid; grid-template-rows: 208px 61px 99px; gap: 10px; height: 398px; color: #17375f; }
.model-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; min-height: 0; }
.model-card { position: relative; overflow: hidden; padding: 12px 16px 8px; border: 1px solid #d7e4f3; border-radius: 15px; background: #fff; }
.model-card.pass { border-color: #bdd8fa; background: linear-gradient(140deg,#fff,#f2f7ff); }
.model-card header { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.model-card header span { color: #8395aa; font-size: 10px; }
.model-card header b { color: #3976c4; font-size: 12px; }
.state-row { display: flex; align-items: center; justify-content: space-between; height: 61px; margin-top: 2px; padding: 0 9px; border-radius: 10px; background: #f6f9fd; }
.state-row.after { margin-top: 0; background: #edf5ff; }
.ant-state { display: flex; align-items: center; gap: 3px; }
.identity { display: grid; place-items: center; width: 21px; height: 21px; border-radius: 50%; background: #dcecff; color: #2f6fed; font: 700 10px Arial,sans-serif; }
.identity.swapped { background: #fff0d9; color: #d28722; }
.direction { color: #4884d1; font: 700 16px Arial,sans-serif; }
.meet { color: #f0a64e; font: 700 20px Arial,sans-serif; font-style: normal; }
.motion-label { display: flex; align-items: center; justify-content: center; gap: 10px; height: 28px; color: #8b9bb0; font-size: 10px; }
.motion-label b { color: #e59637; font-size: 11px; }
.space-arrow { color: #97a8bd; font-size: 9px; font-style: normal; }
.insight { display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 2px; border: 1px solid #cbdff7; border-radius: 12px; background: #eaf3ff; text-align: center; }
.insight span { color: #6a83a2; font-size: 10px; }
.insight b { color: #244d7c; font-size: 15px; }
.insight strong { color: #2f6fed; font-size: 11px; }
.calculation { display: grid; grid-template-columns: 1.15fr 1fr; gap: 9px; }
.times, .result { display: flex; flex-direction: column; justify-content: center; gap: 6px; padding: 9px 12px; border-radius: 11px; background: #fff; border: 1px solid #dae6f3; }
.times > span, .result span { color: #8194aa; font-size: 9px; }
.time-pills { display: flex; gap: 5px; }
.time-pills b { padding: 4px 7px; border: 1px solid #dce8f6; border-radius: 6px; background: #f5f9ff; color: #3c5f88; font: 700 12px Arial,sans-serif; white-space: nowrap; }
.time-pills i { color: #2f6fed; font-style: normal; }
.times small { color: #8598af; font-size: 9px; }
.result b { color: #2f6fed; font: 700 18px Arial,sans-serif; white-space: nowrap; }
.result.final { border-color: #cbdff7; background: #f1f7ff; }
</style>

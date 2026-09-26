<script setup>
defineProps({ phase: { type: String, required: true } })
</script>

<template>
  <svg v-if="phase === 'model'" class="value-graphic" viewBox="0 0 900 338" role="img" aria-labelledby="model-title model-desc">
    <title id="model-title">現実の情報を数理モデルへ変える工程</title>
    <desc id="model-desc">現場の運用、データと例外、ルールと制約、関係者の目的を整理し、目的関数と制約条件を設計して、解ける問題にする。</desc>
    <defs>
      <linearGradient id="model-panel" x2="1" y2="1"><stop stop-color="#1e4e95"/><stop offset="1" stop-color="#102d58"/></linearGradient>
      <marker id="model-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1L9 5L1 9" fill="none" stroke="#6a9bd9" stroke-width="1.8"/></marker>
    </defs>
    <rect x="2" y="2" width="896" height="334" rx="24" fill="#eaf1fb"/>
    <text x="34" y="35" class="value-kicker">膨大な現実世界の情報</text>
    <g class="input-cards">
      <rect x="34" y="59" width="231" height="48" rx="11"/><text x="55" y="90">現場の運用</text>
      <rect x="34" y="119" width="231" height="48" rx="11"/><text x="55" y="150">データと例外</text>
      <rect x="34" y="179" width="231" height="48" rx="11"/><text x="55" y="210">ルール・制約</text>
      <rect x="34" y="239" width="231" height="48" rx="11"/><text x="55" y="270">関係者の目的</text>
    </g>
    <path d="M265 83H295M265 143H295M265 203H295M265 263H295M295 83V263M295 173H340" fill="none" stroke="#89a9d1" stroke-width="2.5" marker-end="url(#model-arrow)"/>
    <rect x="342" y="75" width="272" height="196" rx="19" fill="url(#model-panel)"/>
    <text x="366" y="111" class="panel-kicker">ENGINEERING</text>
    <text x="366" y="154" class="panel-title">モデリング</text>
    <text x="366" y="189" class="panel-title">・定式化</text>
    <line x1="366" y1="210" x2="588" y2="210" stroke="#8ab6ee" stroke-opacity=".45"/>
    <text x="366" y="239" class="panel-detail">目的関数 ＋ 制約条件</text>
    <path d="M614 173H652" fill="none" stroke="#6a9bd9" stroke-width="3" marker-end="url(#model-arrow)"/>
    <rect x="660" y="113" width="206" height="120" rx="16" fill="white" stroke="#a6c5e8" stroke-width="2"/>
    <text x="683" y="150" class="output-kicker">SOLVABLE PROBLEM</text>
    <text x="683" y="186" class="output-title">解ける問題</text>
    <text x="683" y="212" class="output-subtitle">計算できる形へ</text>
    <text x="34" y="317" class="footnote">何を残し、何を捨て、何を優先するか。その設計が解の意味を決める。</text>
  </svg>

  <svg v-else class="value-graphic" viewBox="0 0 900 338" role="img" aria-labelledby="decision-title decision-desc">
    <title id="decision-title">計算結果から意思決定と実行へ</title>
    <desc id="decision-desc">計算結果を比較し、人が何を優先するか決め、関係者と実行し、結果を見て改善する。</desc>
    <defs>
      <marker id="decision-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M1 1L9 5L1 9" fill="none" stroke="#6a9bd9" stroke-width="1.8"/></marker>
    </defs>
    <rect x="2" y="2" width="896" height="334" rx="24" fill="#eaf1fb"/>
    <path d="M278 148H317M581 148H620" fill="none" stroke="#6a9bd9" stroke-width="3" marker-end="url(#decision-arrow)"/>
    <g class="decision-card">
      <rect x="33" y="57" width="245" height="182" rx="17"/>
      <text x="56" y="88" class="card-index">01 / CALCULATE</text>
      <text x="56" y="137" class="card-title">計算結果</text>
      <line x1="56" y1="157" x2="252" y2="157"/>
      <text x="56" y="187" class="card-detail">候補・評価値・トレードオフ</text>
      <text x="56" y="213" class="card-detail">を可視化する</text>
    </g>
    <g class="decision-card choice">
      <rect x="322" y="57" width="258" height="182" rx="17"/>
      <text x="345" y="88" class="card-index">02 / DECIDE</text>
      <text x="345" y="137" class="card-title">意思決定</text>
      <line x1="345" y1="157" x2="554" y2="157"/>
      <text x="345" y="187" class="card-detail">何を優先するかを選び、</text>
      <text x="345" y="213" class="card-detail">関係者と合意する</text>
    </g>
    <g class="decision-card">
      <rect x="625" y="57" width="242" height="182" rx="17"/>
      <text x="648" y="88" class="card-index">03 / ACT</text>
      <text x="648" y="137" class="card-title">実行・改善</text>
      <line x1="648" y1="157" x2="841" y2="157"/>
      <text x="648" y="187" class="card-detail">意志をもって進め、</text>
      <text x="648" y="213" class="card-detail">結果を見て更新する</text>
    </g>
    <path d="M760 250V281H151V250" fill="none" stroke="#a2bddd" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#decision-arrow)"/>
    <text x="385" y="306" class="feedback-label">現実から学び、モデルを更新する</text>
  </svg>
</template>

<style scoped>
.value-graphic { display: block; width: 100%; height: auto; max-height: 345px; font-family: 'Noto Sans JP', 'Hiragino Sans', sans-serif; }
.value-kicker, .output-kicker, .panel-kicker, .card-index { font: 700 12px Arial, sans-serif; letter-spacing: .09em; fill: #5175a5; }
.input-cards rect { fill: #fff; stroke: #b8cbe4; stroke-width: 1.5; }
.input-cards text { font-size: 16px; font-weight: 600; fill: #25466f; }
.panel-kicker { fill: #98c4f4; }
.panel-title { fill: #fff; font-size: 27px; font-weight: 700; }
.panel-detail { fill: #dcecff; font-size: 16px; font-weight: 600; }
.output-title { fill: #234b7e; font-size: 24px; font-weight: 700; }
.output-subtitle { fill: #6c85a6; font-size: 13px; }
.footnote { fill: #537097; font-size: 14px; }
.decision-card rect { fill: #fff; stroke: #b8cbe4; stroke-width: 1.5; }
.decision-card.choice rect { fill: #193b6c; stroke: #193b6c; }
.decision-card .card-title { fill: #244972; font-size: 25px; font-weight: 700; }
.decision-card .card-detail { fill: #587394; font-size: 14px; }
.decision-card line { stroke: #d5e3f3; }
.decision-card.choice .card-index { fill: #a6cef8; }
.decision-card.choice .card-title { fill: #fff; }
.decision-card.choice .card-detail { fill: #d8eafd; }
.decision-card.choice line { stroke: #658bb8; }
.feedback-label { fill: #537097; font-size: 13px; }
</style>

---
theme: seriph
class: hero-slide
layout: default
title: 自己紹介と競技プログラミング
info: 自己紹介と、競技プログラミングから見るアルゴリズム・最適化の話
transition: fade
mdc: true
---

<div class="hero-wrap">
  <h1 class="hero-title">自己紹介と<br><span>競技プログラミング</span></h1>
  <div class="hero-orbit orbit-one"></div><div class="hero-orbit orbit-two"></div>
  <div class="hero-dot dot-one"></div><div class="hero-dot dot-two"></div>
</div>

<!--
自己紹介のあと、仕事で扱ってきた「計算」と趣味の「競プロ」がどうつながるかを話します。
-->

---
class: profile-only-slide
title: 自己紹介
---

<div class="profile-intro">
  <div class="profile-history">
    <h1>田中翔一</h1>
    <ol class="career-timeline" aria-label="経歴">
      <li><time>1989</time><span>生まれ</span></li>
      <li><time>2008～2014年</time><span>筑波大学・筑波大学院</span></li>
      <li><time>2014～2017年</time><span>東芝</span></li>
      <li><time>2018～2020年</time><span>みずほ情報総研</span></li>
      <li><time>2021～2023年</time><span>クロネコヤマト</span></li>
      <li><time>2024年3月</time><span>アルゴリズムGr</span></li>
    </ol>
  </div>
  <img src="https://recruit.toyota/img/interview/main/134@2x.jpg" alt="プロフィール写真" />
</div>

---
class: interest-slide
title: Interest Map
---

<InterestMap />

---
class: section-divider
---

<div class="chapter-number">02</div>
<div class="chapter-content">
  <h1>競技プログラミング</h1>
</div>

---
class: problem-slide
---

<script setup>
import AntsDiagram from './components/AntsDiagram.vue'
</script>

<div class="section-head compact ants-problem-head">
  <p class="eyebrow">PROBLEM 01 · ANTS</p>
  <h1>アリが全員落ちるのは、何秒後？</h1>
  <p>長さ10の棒に5匹。速さは1。衝突すると反転し、端から落ちる。向きは図のとおり。</p>
</div>

<AntsDiagram />

---
class: ants-explanation-slide
---

<script setup>
import AntsIdeaDiagram from './components/AntsIdeaDiagram.vue'
</script>

<div class="section-head compact ants-explanation-head">
  <p class="eyebrow">ANTS · THE KEY IDEA</p>
  <h1>衝突は「素通り」と考えてOK。</h1>
</div>

<AntsIdeaDiagram />

---
class: demo-intro
---

<div class="demo-intro-copy">
  <p class="eyebrow">PROBLEM 02 · INTERACTIVE OPTIMIZATION</p>
  <h1>駐車枠を、<br><span>できるだけ多く。</span></h1>
  <p>障害物のあるマス目に、横か縦の2マス枠を敷き詰める。</p>
  <div class="demo-rules">
    <div><span>01</span><b>マスをクリック</b><small>障害物を置く・消す</small></div>
    <div><span>02</span><b>最適化を実行</b><small>置ける枠を計算</small></div>
    <div><span>03</span><b>結果を観察</b><small>どこまで埋まる？</small></div>
  </div>
</div>
<div class="demo-preview" aria-hidden="true">
  <div class="preview-grid">
    <i></i><i></i><i class="p-tile"></i><i class="p-tile"></i><i></i><i></i>
    <i></i><i class="p-tile"></i><i class="p-tile"></i><i></i><i class="p-wall"></i><i></i>
    <i class="p-tile"></i><i class="p-tile"></i><i></i><i></i><i></i><i></i>
    <i></i><i></i><i class="p-wall"></i><i></i><i class="p-tile"></i><i class="p-tile"></i>
    <i></i><i></i><i></i><i></i><i class="p-tile"></i><i class="p-tile"></i>
    <i class="p-wall"></i><i></i><i></i><i></i><i></i><i></i>
  </div>
</div>

---
class: parking-slide
---

<div class="parking-head">
  <div><p class="eyebrow">TRY IT</p><h1>障害物を置いて、解いてみる。</h1></div>
  <div class="parking-legend"><span class="legend-obstacle"></span>障害物 <svg class="legend-car" viewBox="0 0 24 14" aria-hidden="true"><rect x="2" y="3" width="20" height="8" rx="4" fill="#2f6fed" /><rect x="9" y="4" width="6" height="6" rx="2" fill="#b8d9ff" /></svg>駐車した車</div>
</div>
<ParkingDemo />

---
class: explain-slide
---

<div class="section-head compact">
  <p class="eyebrow">HOW IT WORKS</p>
  <h1>市松模様に分けると、ペア探しになる。</h1>
</div>

<MatchingDiagram />

---
class: ahc-slide
---

<div class="section-head compact">
  <p class="eyebrow">PROBLEM 03 · LONG-TERM AHC</p>
  <h1>注文が増えるたび、配送計画を組み直す。</h1>
  <p>複数車両・時間帯・積載量・勤務時間。道路と注文も途中で変わる。（架空の設定）</p>
</div>

<DispatchChallenge />

---
class: ahc-slide
---

<div class="section-head compact">
  <p class="eyebrow">PROBLEM 03 · SEARCH AND TRADE-OFFS</p>
  <h1>短いルートが、よい計画とは限らない。</h1>
  <p>遅配や残業も評価しながら、限られた時間で候補を改善する。（数値は模式例）</p>
</div>

<DispatchStrategy />

---
class: tech-slide
---

<TechMap />

---
class: section-divider
---

<div class="chapter-number">03</div>
<div class="chapter-content">
  <h1>AI時代の<br><span>数理最適化エンジニア。</span></h1>
</div>

---
class: ai-progress-slide
---

<div class="section-head compact">
  <p class="eyebrow">AI CAPABILITY · ALE-BENCH</p>
  <h1>最適化領域における生成AIの実力</h1>
</div>

<AiProgress />

---
class: value-slide
---

<div class="section-head compact">
  <p class="eyebrow">VALUE 01 · MODEL THE REAL WORLD</p>
  <h1>現実を、解ける形にする。</h1>
  <p>情報をただ集めるだけではなく、目的と制約を設計する。</p>
</div>

<OptimizationValue phase="model" />

---
class: value-slide
---

<div class="section-head compact">
  <p class="eyebrow">VALUE 02 · DECIDE AND ACT</p>
  <h1>解が出た後に、意思決定がある。</h1>
  <p>計算結果を使って選び、意志をもって進めていく。</p>
</div>

<OptimizationValue phase="decision" />

---
class: closing-slide
---

<h1>まとめ</h1>
<div class="closing-points"><span>モデリング</span><i></i><span>最適化</span><i></i><span>意思決定</span></div>
<p class="closing-thanks">ご清聴ありがとうございました</p>

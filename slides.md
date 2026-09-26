---
theme: seriph
class: hero-slide
layout: default
title: 好きから仕事まで、最適化でつなぐ
info: 自己紹介と、競技プログラミングから見るアルゴリズム・最適化の話
transition: fade
mdc: true
---

<div class="hero-wrap">
  <div class="hero-kicker">自己紹介 · 競技プログラミング · 最適化</div>
  <h1 class="hero-title">好きから仕事まで、<br><span>最適化でつなぐ。</span></h1>
  <p class="hero-subtitle">計算して、つくって、よりよい答えを探す。</p>
  <div class="hero-meta"><span>01</span><i></i><span>INTRODUCTION</span></div>
  <div class="hero-orbit orbit-one"></div><div class="hero-orbit orbit-two"></div>
  <div class="hero-dot dot-one"></div><div class="hero-dot dot-two"></div>
</div>

<!--
自己紹介のあと、仕事で扱ってきた「計算」と趣味の「競プロ」がどうつながるかを話します。
-->

---
layout: two-cols
class: profile-slide
---

<div class="profile-copy">
  <p class="eyebrow">ABOUT ME</p>
  <h1>自己紹介</h1>
  <p class="profile-lead">現実の課題を、<br><strong>数式とコード</strong>で解いてきました。</p>
  <div class="career-line">
    <div><span>01</span><b>東芝</b></div><i></i>
    <div><span>02</span><b>みずほ情報総研</b></div><i></i>
    <div><span>03</span><b>クロネコヤマト</b></div>
  </div>
  <p class="profile-foot">計算・最適化・ソフトウェアを行き来する仕事。</p>
</div>

::right::

<div class="portrait-frame">
  <img src="https://recruit.toyota/img/interview/main/134@2x.jpg" alt="プロフィール写真" />
  <div class="portrait-caption"><span>PROFILE</span><b>仕事も、遊びも、解く。</b></div>
  <div class="portrait-index">02 / 12</div>
</div>

---
class: interest-slide
---

<div class="section-head">
  <p class="eyebrow">INTEREST MAP</p>
  <h1>興味の地図を、ひらく。</h1>
  <p>枝をクリックして拡大。さらに小さな枝へ、興味をたどれます。</p>
</div>

<InterestMap />

---
class: section-divider
---

<div class="chapter-number">02</div>
<div class="chapter-content">
  <p class="eyebrow">FROM PROBLEM TO ALGORITHM</p>
  <h1>競技プログラミングで<br><span>「解き方」を考える。</span></h1>
  <p>小さな問題から、答えのない最適化まで。</p>
</div>
<div class="chapter-stamp">THINK<br>·<br>BUILD<br>·<br>IMPROVE</div>

---
class: problem-slide
---

<div class="section-head compact">
  <p class="eyebrow">PROBLEM 01 · コーディング試験のような問題</p>
  <h1>合計が300になる、2つの数字は？</h1>
</div>

<TwoSumDiagram />

---
layout: two-cols
class: code-slide
layoutClass: code-columns
---

<p class="eyebrow">ONE PASS · HASH SET</p>

# 相方を探しながら進む。

```python
def find_pair(numbers, target):
    seen = set()
    for x in numbers:
        need = target - x
        if need in seen:
            return (need, x)
        seen.add(x)
    return None
```

<div class="code-example">find_pair([420, 130, 250, 170], 300)<br><strong>→ (130, 170)</strong></div>

::right::

<div class="trace-panel">
  <p class="eyebrow">処理の流れ</p>
  <div class="trace-row"><b>420</b><span>−120 はない</span><small>420 を記憶</small></div>
  <div class="trace-row"><b>130</b><span>170 はない</span><small>130 を記憶</small></div>
  <div class="trace-row"><b>250</b><span>50 はない</span><small>250 を記憶</small></div>
  <div class="trace-row found"><b>170</b><span>130 がある！</span><small>ペアが見つかる</small></div>
  <div class="trace-complexity"><b>平均 O(n)</b><span>集合で「見たか？」を確認<br>追加メモリは O(n)</span></div>
</div>

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
  <div class="preview-caption"><span class="pulse-dot"></span> PLACE · SOLVE · REPEAT</div>
</div>

---
class: parking-slide
---

<div class="parking-head">
  <div><p class="eyebrow">TRY IT</p><h1>障害物を置いて、解いてみる。</h1></div>
  <div class="parking-legend"><span class="legend-obstacle"></span>障害物 <span class="legend-tile"></span>駐車枠</div>
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
  <h1>正解がひとつではない問題。</h1>
  <p>配送ルートを例に、候補をつくり、評価して、更新する。（説明用の模式図）</p>
</div>

<HeuristicDiagram />

---
class: tech-slide
---

<TechMap />

---
class: closing-slide
---

<div class="closing-mark">FIN</div>
<p class="eyebrow">TAKEAWAY</p>
<h1>解き方を考える。<br><span>つくって、測って、よくする。</span></h1>
<div class="closing-points"><span>アルゴリズム</span><i></i><span>最適化</span><i></i><span>実験</span></div>
<p class="closing-thanks">ご清聴ありがとうございました</p>



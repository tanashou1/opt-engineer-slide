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
class: ai-optimization-slide
title: ナンバーリンクを解く
---

<div class="section-head compact">
  <p class="eyebrow">生成AI vs 数理最適化 · NUMBERLINK</p>
  <h1>ナンバーリンクを解く</h1>
</div>

<NumberlinkChallenge />

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
  <p>長さ10 cmの棒の上を5匹のアリが速さ1 cm/秒で歩きます。ぶつかると向きを変え、端から落ちるまで歩き続けます。<br>すべてのアリが落ちるのは何秒後でしょうか？ ※アリの大きさは無視します。</p>
</div>

<AntsDiagram />

---
class: ants-explanation-slide
---

<script setup>
import AntsIdeaDiagram from './components/AntsIdeaDiagram.vue'
</script>

<div class="section-head compact ants-explanation-head">
  <p class="eyebrow">PROBLEM 01 · ANSWER</p>
  <h1>衝突は素通りと考えてOK</h1>
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
  <h1>2色に塗り分け、マッチング問題として解く。</h1>
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
title: AIで解くコストが下がる
---

<div class="section-head compact">
  <p class="eyebrow">AI時代の価値 · 全体像</p>
  <h1>AIで「解くコスト」が下がる。</h1>
  <p>専門家は、何を解き、どう評価し、どこを変えるかを設計する。</p>
</div>

<OptimizationValue view="overview" />

<!--
原稿：contents_text/03_AI時代の数理最適化エンジニア.md
生成AIにより、数理モデルのコード化、ソルバーAPIの実装、アルゴリズム・ヒューリスティクスの実装、実験・可視化、調査、改善案の生成が速くなる。
実装が速くなっても、業務価値につながる問題と評価を選び、改善先を判断する必要がある。
ここから、問題設計、評価設計、ボトルネック診断、現実側の変更、専門性による検証・誘導の5つを説明する。
-->

---
class: value-slide
title: 1 解くべき問題を設計する
---

<div class="section-head compact">
  <p class="eyebrow">1 / 5 · 問題を設計する</p>
  <h1>何を最適化するか、決める。</h1>
  <p>変数・目標・制約・粒度を選ぶと、解く問題が変わる。</p>
</div>

<OptimizationValue view="problem" />

<!--
定式化は自然言語を数式に翻訳するだけではない。どの意思決定を最適化するか、何を変数・目的・制約とし、何を捨て、どの粒度で扱うかを決める。
配送ルートという要望でも、担当区域、車両割当、出勤計画、配送順序、サービスレベル、区域設計が対象になり得る。提示された問題が、そのまま解くべき問題とは限らない。
OPT-Engineは10種類の典型的なOR問題の複雑度を変えてLLMを評価した研究。外部ツールは局所的な計算を助けるが、全体の制約を維持する難しさが残り、ソルバー併用でも制約の自動定式化が主要なボトルネックと報告している。
出典：https://proceedings.mlr.press/v306/chen26o.html
この研究は定義済みの問題の定式化を評価している。現実の業務で何を解くか選ぶ能力を直接測ったものではない。「問題設計の価値が高まる」は本発表の解釈として述べる。
-->

---
class: value-slide
title: 2 AIが改善できる評価系を設計する
---

<div class="section-head compact">
  <p class="eyebrow">2 / 5 · 評価を設計する</p>
  <h1>「良くなった」を、自動で確かめる。</h1>
  <p>評価指標とテスト問題を用意して、AIの変更を採用できるか判断する。</p>
</div>

<OptimizationValue view="evaluation" />

<!--
AIがコードを高速に変更しても、変更後の方が本当に良いか判定できなければ、自律的な改善ループは成立しない。
通常のソフトウェアテストに加え、実行可能性、目的関数値、最適性ギャップ、計算時間と最悪時の時間、乱数seed間のばらつき、再現性、小規模問題の厳密解比較、性能デグレ、重要な業務ケースの解品質を評価する。
最適値が不明な大規模問題では、妥当な下界・上界や既存手法との比較を使う。厳密解の分かる小規模問題も評価セットに含める。
表は原稿の模式例。平均目的関数値1000→950でも、繁忙期1500→2100、時間30秒→180秒、違反率0%→0.5%、再現性の悪化があれば運用上の改悪になり得る。
通常、最大負荷、境界条件、過去の失敗、小規模の既知最適問題を揃える。平均が改善することは、他の評価条件を満たす代わりにはならない。
-->

---
class: value-slide
title: 3 本当のボトルネックを診断する
---

<div class="section-head compact">
  <p class="eyebrow">3 / 5 · 改善先を見極める</p>
  <h1>どこを変えると、成果が出るか。</h1>
  <p>計算の速さだけでなく、計画が現場で使われるまでを見る。</p>
</div>

<OptimizationValue view="diagnosis" />

<!--
性能を決めるのは実装・アルゴリズムだけではない。データ、数理モデル、問題設定・要件、業務プロセス・運用も確認する。
生産計画で10分の計算を5分にしても、入力準備2時間と人手修正3時間があるなら、全体310分のうち5分しか減らない。
AIで高速なヒューリスティクス、MIP高速化、並列化、warm startなどは試しやすくなる。その前に、入力データ生成、モデルに入っていない制約、人手修正が発生する理由を調べる。
ただし計算時間が運用上の締切を破っているなら、10分→5分が重要な場合もある。時間だけで価値を断定せず、運用と合わせて診断する。
-->

---
class: value-slide
title: 4 現実側を変えて問題を簡単にする
---

<div class="section-head compact">
  <p class="eyebrow">4 / 5 · 現実のルールを変える</p>
  <h1>問題そのものを、解きやすくする。</h1>
  <p>業務に必要な自由度と、計算を難しくしている自由度を見分ける。</p>
</div>

<OptimizationValue view="reshape" />

<!--
現行業務をそのままモデル化すると、巨大な組合せ空間、多数の例外制約、複雑な実装になることがある。その複雑さがすべて必要とは限らない。
物流なら、担当区域を数パターンに限定、時間指定を標準化、営業所ルールを統一、利用実績のない例外を廃止する方法がある。業務側と調整し、必要なサービスを保って変える。
計画が15分刻みでも実際の指示が30分単位なら、30分刻みにすることで問題規模を減らせる可能性がある。時間枠の数は半分になるが、全ての変数や計算時間が半分になるとは限らない。納期や設備制約を表現できるか確認する。
モデルと現実の両方を設計し、解きやすく、運用しやすく、価値の高いシステムにする。
-->

---
class: value-slide
title: 5 数理最適化の専門性でAIを検証・誘導する
---

<div class="section-head compact">
  <p class="eyebrow">5 / 5 · 専門性で検証・誘導する</p>
  <h1>AIの提案を、数学で確かめる。</h1>
  <p>コードが動いた先で、制約・下界・探索方法が妥当かを判断する。</p>
</div>

<OptimizationValue view="expertise" />

<!--
AIはMIPの定式化、Benders分解、ラグランジュ緩和、局所探索、高速化案を生成できる。もっともらしい出力の数学的・アルゴリズム的な妥当性を判断する必要がある。
Big-Mの例では0≤x≤100、y∈{0,1}が前提。y=0ならx=0、y=1ならx≤100なので、M=100でもM=1000000でも整数実行可能集合は同じ。
LP緩和で0≤y≤1とすると、x=100に対してM=1000000ではy≥0.0001、M=100ではy≥1。適切な上界は緩和を強くする。一般に大きすぎるMは緩和や数値安定性に問題を生み得るが、この例だけで実測の高速化を保証するものではない。
ラグランジュ緩和では最小化/最大化、制約の向き、乗数の符号、双対関数の定義を確認し、下界・上界がvalidか判断する。
ヒューリスティクス改善では、100ケース中80ケース改善だけでなく、20ケースの悪化量、特定の問題群への偏り、同じ計算時間での比較、ベンチマークへの過適合、探索の多様性を見る。
専門知識の使い方は、自分で実装することに加え、AIが試す範囲を設計し、提案を検証し、次の探索方向を決めることへ広がる。
-->

---
class: value-slide
title: 5つの能力を数理最適化の専門性が支える
---

<div class="section-head compact">
  <p class="eyebrow">AI時代の価値 · 5つの能力の関係</p>
  <h1>専門知識で、AIの改善を導く。</h1>
  <p>問題と評価を設計し、結果を診断して、次に変える場所を決める。</p>
</div>

<OptimizationValue view="relationship" />

<!--
5つの能力は独立した作業ではない。1で何を解くか決め、2で良さを定義し、AIが高速に実装・探索する。3で結果とボトルネックを診断し、アルゴリズムを改善するか、4で現実のルールを変えるかを選ぶ。
変更した問題・ルールに合わせて、モデルと評価を見直し、次の改善を繰り返す。
5の数理最適化の専門性は全体を支える。変数・制約・粒度、実行可能性・最適性ギャップ、問題規模と緩和、分解法と探索方法を判断する知識が、各段階の意思決定に効く。
-->

---
class: closing-slide
title: AI時代の数理最適化エンジニアの価値
---

<p class="eyebrow">AI時代の数理最適化エンジニア</p>
<h1>「解くコスト」が下がるほど、<br><span>何を解くかを決める価値が上がる。</span></h1>
<div class="closing-points"><span>何を解くか</span><i></i><span>何を良しとするか</span><i></i><span>どこを変えるか</span></div>
<p class="closing-message">AIを使って、現実の意思決定を最適化する仕組みを設計する。</p>
<p class="closing-thanks">ご清聴ありがとうございました</p>

<!--
原稿のKey Message：AIによって解くコストが下がるほど、何を解くか、何を良しとするか、どこを変えるかを決める価値が上がる。
数理最適化エンジニアは、専門性を使ってAIの探索と検証を導き、現実の意思決定を最適化する仕組みを設計する。
-->

---
theme: seriph
class: hero-slide
layout: default
title: AI時代における数理最適化エンジニアの役割
info: 競技プログラミングと生成AIから考える、数理最適化エンジニアの役割
transition: fade
mdc: true
---

<div class="hero-wrap">
  <p class="eyebrow hero-kicker">競技プログラミングと生成AIから考える</p>
  <h1 class="hero-title">AI時代における<br><span>数理最適化エンジニアの役割</span></h1>
  <div class="hero-orbit orbit-one"></div><div class="hero-orbit orbit-two"></div>
  <div class="hero-dot dot-one"></div><div class="hero-dot dot-two"></div>
</div>

<!--
自己紹介のあと、仕事で扱ってきた「計算」と趣味の「競プロ」がどうつながるかを話します。
-->

---
class: section-divider-slide
title: 自己紹介
---

<SectionDivider
  number="00"
  title="自己紹介"
/>

---
class: profile-only-slide
title: 自己紹介・経歴
---

<DeckHeader chapter="0 自己紹介" subtitle="経歴" title="田中翔一" class="profile-heading" />

<div class="profile-intro">
  <div class="profile-history">
    <ol class="career-timeline" aria-label="経歴">
      <li><time>1989年</time><span>長野生まれ、千葉育ち</span></li>
      <li><time>2008～2014年</time><span>筑波大学・筑波大学院</span></li>
      <li><time>2014～2017年</time><span>東芝 電力研究所</span></li>
      <li><time>2018～2020年</time><span>みずほ情報総研 シンクタンク部門</span></li>
      <li><time>2021～2023年</time><span>クロネコヤマト 数理最適化チーム</span></li>
      <li><time>2024年3月</time><span>トヨタ自動車 アルゴリズムGr</span></li>
    </ol>
  </div>
  <img src="https://recruit.toyota/img/interview/main/134@2x.jpg" alt="プロフィール写真" />
</div>

---
class: interest-slide
title: 経験・趣味
---

<DeckHeader chapter="0 自己紹介" subtitle="経験・趣味" />
<div class="interest-slide-body"><InterestMap /></div>

---
class: agenda-slide
title: 目次
---

<DeckHeader chapter="目次・今日の目的" />
<div class="talk-scope">
  <section class="talk-scope-card talk-scope-agenda">
    <h2>目次</h2>
    <ol start="0">
      <li>自己紹介</li>
      <li>数理最適化とは</li>
      <li>数理最適化（競技プログラミング）<br>の問題紹介</li>
      <li>AI時代における<br>数理最適化エンジニアの役割</li>
    </ol>
  </section>
  <div class="talk-scope-stack">
    <section class="talk-scope-card talk-scope-included">
      <h2>今日の目的</h2>
      <ul>
        <li>数理最適化と競技プログラミングのイメージを持ってもらう</li>
        <li>AI時代における数理最適化エンジニアの役割を知ってもらう</li>
      </ul>
    </section>
    <section class="talk-scope-card talk-scope-excluded">
      <h2>今日話さないこと</h2>
      <ul>
        <li>個別のプロジェクトの紹介</li>
        <li>技術の詳細</li>
      </ul>
    </section>
  </div>
</div>

---
class: section-divider-slide
title: 数理最適化と競技プログラミング
---

<SectionDivider number="01" title="数理最適化とは" />

---
class: tech-slide
title: 技術領域マップ
---

<DeckHeader chapter="1 数理最適化とは" subtitle="技術マップ" title="技術領域マップ" />
<div class="tech-map-stage"><TechMap /></div>

---
class: role-question-slide
title: 数理最適化の役割
---

<DeckHeader chapter="1 数理最適化とは" subtitle="数理最適化の役割" title="生成AI時代の素朴な疑問" />
<div class="role-question"><p>生成AIは、いろいろな問題が解けるようになっている</p><p>数理最適化の問題も、全て生成AIに任せられるのでは？</p></div>

---
class: ai-optimization-slide
title: ナンバーリンクを解く
---

<DeckHeader chapter="1 数理最適化とは" subtitle="AI vs 数理最適化" title="同じ盤面を、2つの方法で解く" />

<NumberlinkChallenge />
<div v-click class="numberlink-role-statement">制約を厳密に守り、最適な答えを出すのは、<br>数理最適化の役割</div>

---
class: approaches-slide
title: AIが数理最適化領域を解くアプローチは二つある
---

<DeckHeader chapter="1 数理最適化とは" subtitle="AIの二つのアプローチ" title="AIが数理最適化領域を解くアプローチは二つある" />
<div class="approach-cards">
  <section class="approach-card"><h2>1. 問題から答えを直接導く</h2><p>盤面や条件を読み、生成AIがそのまま答えを作る。</p><div class="approach-flow"><span>問題</span><b>→</b><span>生成AI</span><b>→</b><span>答え</span></div></section>
  <section class="approach-card"><h2>2. 最適化プログラムを書く</h2><p>生成AIがモデルやコードを作り、ソルバーが条件を守る解を探す。</p><div class="approach-flow"><span>問題</span><b>→</b><span>AIがコードを書く</span><b>→</b><span>ソルバー</span><b>→</b><span>答え</span></div></section>
</div>

---
class: section-divider-slide
title: 数理最適化（競技プログラミング）の問題紹介
---

<SectionDivider number="02" title="数理最適化（競技プログラミング）の問題紹介" />

---
class: problem-slide
title: アリが全員落ちるのは何秒後？
---

<DeckHeader chapter="2 数理最適化（競技プログラミング）の問題紹介" subtitle="アリの問題 · 考え方" title="アリが全員落ちるのは、何秒後？" description="1 cm/秒で進み、衝突で反転。端から落ちます（大きさは無視）。" class="ants-problem-head" />

<AntsDiagram />

---
class: ants-explanation-slide
title: 衝突は素通りと考える
---

<DeckHeader chapter="2 数理最適化（競技プログラミング）の問題紹介" subtitle="アリの問題 · 解き方" title="衝突は素通りと考えてOK" class="ants-explanation-head" />

<AntsIdeaDiagram />

---
class: parking-slide
title: 駐車枠の配置問題
---

<div class="parking-head">
  <DeckHeader chapter="2 数理最適化（競技プログラミング）の問題紹介" title="駐車枠の配置問題" description="2×1マスの駐車枠を、どのように配置すると効率的か？" />
  <div class="parking-legend"><span class="legend-obstacle"></span>障害物 <svg class="legend-car" viewBox="0 0 24 14" aria-hidden="true"><rect x="2" y="3" width="20" height="8" rx="4" fill="#2f6fed" /><rect x="9" y="4" width="6" height="6" rx="2" fill="#b8d9ff" /></svg>駐車した車</div>
</div>
<ParkingDemo />

---
class: explain-slide
title: 2色に塗り分け、最大マッチング問題として解く
---

<DeckHeader chapter="2 数理最適化（競技プログラミング）の問題紹介" subtitle="駐車配置 · 解法" title="2色に塗り分けて解く" />

<MatchingDiagram />

---
class: ahc-slide
title: 厳密な最適解が出せない問題
---

<script setup>
import ContainerLoading from './components/ContainerLoading.vue'
</script>

<DeckHeader chapter="2 数理最適化（競技プログラミング）の問題紹介" subtitle="Toyota HC 2023 Spring · Container Loading" title="厳密な最適解が出せない問題" description="現実の課題の多くは、効率的な解法が見つかっておらず、厳密な最適解を求めるのは困難。" />

<ContainerLoading />

---
class: section-divider-slide
title: AI時代における数理最適化エンジニアの役割
---

<SectionDivider number="03" title="AI時代における数理最適化エンジニアの役割">
  <template #title>AI時代における<br />数理最適化エンジニアの役割</template>
</SectionDivider>

---
class: ai-progress-slide
title: 最適化問題における生成AIの実力
---

<DeckHeader chapter="3 AI時代における数理最適化エンジニアの役割" subtitle="生成AIの能力 · ALE-Bench" title="最適化問題における生成AIの実力" />

<AiProgress />

---
class: value-slide
title: AIによって「解くコスト」は下がる
---

<DeckHeader chapter="3 AI時代における数理最適化エンジニアの役割" subtitle="AIで変わる仕事" title="AIによって「解くコスト」は下がる" description="実装や調査が速くなるほど、何を解き、何を良しとし、どこを変えるかの判断が重要になる。" />

<OptimizationValue view="overview" />

<!--
生成AIで高速化される作業：数理モデルのコード化、Solver APIを使った実装、アルゴリズム・ヒューリスティクスの実装、実験コード・可視化、既存手法の調査、改善案の生成。
それでも残る判断は、何を解くか／何を良しとするか／どこをどう変えるか。
-->

---
class: value-slide
title: 1 問題を設計する力
---

<DeckHeader chapter="3 AI時代における数理最適化エンジニアの役割" subtitle="1 / 3 · 何を解くか" title="問題を設計する力" description="定式化は、自然言語を数式へ置き換えるだけではない。" />

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
title: 2 正しさ・良さを設計する力
---

<DeckHeader chapter="3 AI時代における数理最適化エンジニアの役割" subtitle="2 / 3 · 何を良しとするか" title="正しさ・良さを設計する力" description="コードが動くことと、数学的に正しく、業務上良いことは別。" />

<OptimizationValue view="evaluation" />

<!--
AIがコードを高速に変更しても、変更後の方が本当に良いか判定できなければ、自律的な改善ループは成立しない。
通常のソフトウェアテストに加え、実行可能性、目的関数値、最適性ギャップ、計算時間と最悪時の時間、乱数seed間のばらつき、再現性、小規模問題の厳密解比較、性能デグレ、重要な業務ケースの解品質を評価する。
最適値が不明な大規模問題では、妥当な下界・上界や既存手法との比較を使う。厳密解の分かる小規模問題も評価セットに含める。
表は原稿の模式例。平均目的関数値1000→950でも、繁忙期1500→2100、時間30秒→180秒、違反率0%→0.5%、再現性の悪化があれば運用上の改悪になり得る。
通常、最大負荷、境界条件、過去の失敗、小規模の既知最適問題を揃える。平均が改善することは、他の評価条件を満たす代わりにはならない。Big-Mの係数、boundの妥当性、分解後の等価性も専門知識で確かめる。
-->

---
class: value-slide
title: 3 ボトルネックを見極め、解消する力
---

<DeckHeader chapter="3 AI時代における数理最適化エンジニアの役割" subtitle="3 / 3 · どこをどう変えるか" title="ボトルネックを見極め、解消する力" description="最適化の成果は、アルゴリズムだけでなく業務全体の設計で決まる。" />

<OptimizationValue view="diagnosis" />

<!--
性能を決めるのは実装・アルゴリズムだけではない。業務価値、業務プロセス・運用、問題設定・要件、数理モデル、データ、アルゴリズム、実装のどこが律速かを確認する。
生産計画で10分の計算を5分にしても、入力準備2時間と人手修正3時間があるなら、全体310分のうち5分しか減らない。
AIで高速なヒューリスティクス、MIP高速化、並列化、warm startなどは試しやすくなる。その前に、入力データ生成、モデルに入っていない制約、人手修正が発生する理由を調べる。
必要なら担当区域を数パターンに限定、時間指定を標準化、拠点ルールを統一し、不要な例外を廃止する。15分刻みの計画を30分刻みにする案も、現場の指示粒度や必要条件を確認して検討する。
ただし計算時間が運用上の締切を破っているなら、10分→5分が重要な場合もある。時間だけで価値を断定せず、運用と合わせて診断する。
-->

---
class: closing-slide
title: AI時代における数理最適化エンジニアの役割
---

<p class="eyebrow closing-meta"><span>まとめ</span><span class="deck-header-separator">·</span><span>AI時代における数理最適化エンジニアの役割</span></p>
<h1>数理最適化の専門性を軸に、<br><span>成果をAIで最大化する</span></h1>
<div class="closing-points"><span>何を解くか</span><i></i><span>何を良しとするか</span><i></i><span>どこをどう変えるか</span></div>
<p class="closing-thanks">ご清聴ありがとうございました</p>

<!--
数理最適化の専門性を軸に、何を解くか、何を良しとするか、どこをどう変えるかを設計し、AIで成果を最大化する。
-->

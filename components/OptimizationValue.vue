<script setup lang="ts">
withDefaults(defineProps<{
  view?: 'overview' | 'problem' | 'evaluation' | 'diagnosis'
}>(), { view: 'overview' })
</script>

<template>
  <section class="optimization-value" :class="`value-${view}`">
    <template v-if="view === 'overview'">
      <div class="work-panel">
        <h2>AIで速くなる作業</h2>
        <div class="work-tags">
          <span>数理モデルのコード化</span><span>Solver APIの実装</span>
          <span>アルゴリズム実装</span><span>実験・可視化コード</span>
          <span>既存手法の調査</span><span>改善案の生成</span>
        </div>
      </div>
      <p class="overview-prompt">最適化を業務価値につなげるために、残る3つの判断</p>
      <div class="three-pillars">
        <article><b>01</b><strong>問題を設計する</strong><span>何を解くか</span></article>
        <article><b>02</b><strong>正しさ・良さを設計する</strong><span>何を良しとするか</span></article>
        <article><b>03</b><strong>ボトルネックを見極める</strong><span>どこをどう変えるか</span></article>
      </div>
    </template>

    <template v-else-if="view === 'problem'">
      <div class="decision-grid">
        <article><b>意思決定変数</b><span>何を決める？</span></article>
        <article><b>目的関数</b><span>何を良くする？</span></article>
        <article><b>制約</b><span>何を守る？</span></article>
        <article><b>モデルと粒度</b><span>何を含め、何を捨てる？</span></article>
      </div>
      <div class="example-panel">
        <p class="panel-kicker">配送最適化の例</p>
        <div class="problem-question">「配送ルートを最適化したい」</div>
        <div class="decision-options">
          <span>配送順序</span><span>担当区域</span><span>車両割当</span>
          <span>出勤計画</span><span>サービスレベル</span><span>区域設計</span>
        </div>
        <p class="example-takeaway">提示された問題と、解くべき問題は同じとは限らない。</p>
      </div>
      <p class="research-note"><b>AIによる自動定式化にも課題</b>　OPT-Engineは、複雑な問題で制約の自動定式化が主要なボトルネックと報告。<a href="https://proceedings.mlr.press/v306/chen26o.html" target="_blank" rel="noopener noreferrer">研究を見る ↗</a></p>
    </template>

    <template v-else-if="view === 'evaluation'">
      <div class="evaluation-layout">
        <article class="content-panel">
          <h2>評価系・テスト問題を設計する</h2>
          <div class="evaluation-tags">
            <span>実行可能性</span><span>目的値・最適性ギャップ</span>
            <span>計算時間・最悪時</span><span>seed間のばらつき</span>
            <span>再現性・性能デグレ</span><span>厳密解との比較</span>
          </div>
          <p class="small-note">通常・最大負荷・境界・過去の失敗・既知最適値のある小規模問題を含める。</p>
        </article>
        <article class="content-panel schedule-panel">
          <h2>平均だけでは判断できない</h2>
          <p class="panel-kicker">生産スケジューリング・模式例</p>
          <div class="comparison-row"><b>平均評価値</b><span>1000 → <strong class="good">950 改善</strong></span></div>
          <div class="comparison-row"><b>繁忙期</b><span>1500 → <strong class="bad">2100 悪化</strong></span></div>
          <div class="comparison-row"><b>計算時間</b><span>30秒 → <strong class="bad">180秒</strong></span></div>
          <div class="comparison-row"><b>制約違反</b><span>0% → <strong class="bad">0.5%</strong></span></div>
        </article>
      </div>
      <div class="math-check"><b>数学的な正しさも検証</b><span>Big-Mの妥当性 · boundのvalidity · 分解後の等価性 · 特定ケースへの過適合</span></div>
    </template>

    <template v-else-if="view === 'diagnosis'">
      <div class="bottleneck-chain" aria-label="業務価値、業務運用、要件、モデル、データ、アルゴリズム、実装の各層">
        <span>業務価値</span><i>›</i><span>業務・運用</span><i>›</i><span>要件</span><i>›</i><span>モデル</span><i>›</i><span>データ</span><i>›</i><span>アルゴリズム</span><i>›</i><span>実装</span>
      </div>
      <div class="diagnosis-layout">
        <article class="content-panel time-panel">
          <h2>生産計画の所要時間（例）</h2>
          <div class="time-row"><b>入力データ準備</b><div><i style="width: 67%" /></div><strong>2時間</strong></div>
          <div class="time-row"><b>最適化計算</b><div><i class="solver" style="width: 6%" /></div><strong>10分</strong></div>
          <div class="time-row"><b>人手で修正</b><div><i style="width: 100%" /></div><strong>3時間</strong></div>
          <p class="small-note">計算を10分から5分にしても、全体の律速は残るかもしれない。</p>
        </article>
        <article class="content-panel rules-panel">
          <h2>業務ルールも見直す</h2>
          <p><b>現状:</b> 自由な区域・個別の時間指定・拠点ごとの例外</p>
          <p><b>見直し例:</b> 区域を限定・指定を標準化・不要な例外を廃止</p>
          <p><b>計画粒度:</b> 実作業が30分単位なら、15分刻みを見直す</p>
        </article>
      </div>
      <p class="diagnosis-takeaway">難しい問題を速く解くだけでなく、業務とモデルを変えて問題を解きやすくする。</p>
    </template>
  </section>
</template>

<style scoped>
.optimization-value { display: grid; gap: 14px; width: 100%; color: #203b5e; font-family: 'Noto Sans JP', 'Hiragino Sans', sans-serif; }
.optimization-value h2 { margin: 0 0 10px; color: #1d426f; font-size: 20px; line-height: 1.35; }
.work-panel,.content-panel,.example-panel { padding: 16px 18px; border: 1px solid #d0dced; border-radius: 12px; background: #fff; }
.work-tags,.evaluation-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.work-tags span,.evaluation-tags span { padding: 8px 11px; border-radius: 7px; color: #315e99; background: #eaf2fc; font-size: 15px; font-weight: 600; }
.overview-prompt { margin: 0; color: #526e8d; font-size: 17px; font-weight: 700; text-align: center; }
.three-pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.three-pillars article { display: grid; gap: 5px; min-height: 92px; align-content: center; padding: 12px 14px; border: 1px solid #cbdcf0; border-top: 4px solid #4d83c4; border-radius: 10px; background: #fff; text-align: center; }
.three-pillars b { color: #4d83c4; font: 800 12px Arial,sans-serif; }
.three-pillars strong { color: #1d426f; font-size: 18px; }
.three-pillars span { color: #617795; font-size: 14px; }
.decision-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 9px; }
.decision-grid article { display: grid; gap: 4px; padding: 11px 10px; border-radius: 8px; background: #eaf2fc; text-align: center; }
.decision-grid b { color: #285895; font-size: 15px; }
.decision-grid span { color: #617795; font-size: 13px; }
.panel-kicker { margin: 0 0 5px; color: #547193; font-size: 14px; font-weight: 700; }
.problem-question { color: #203b5e; font-size: 23px; font-weight: 700; text-align: center; }
.decision-options { display: flex; flex-wrap: wrap; justify-content: center; gap: 7px; margin-top: 10px; }
.decision-options span { padding: 6px 12px; border: 1px solid #d0dced; border-radius: 20px; color: #315e99; font-size: 14px; }
.example-takeaway { margin: 12px 0 0; color: #285895; font-size: 16px; font-weight: 700; text-align: center; }
.research-note { margin: 0; color: #617795; font-size: 13px; line-height: 1.5; }
.research-note b { color: #315e99; }
.research-note a { color: #3568aa; }
.evaluation-layout,.diagnosis-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.evaluation-layout .content-panel,.diagnosis-layout .content-panel { min-width: 0; }
.evaluation-tags span { padding: 7px 9px; font-size: 13px; }
.small-note { margin: 10px 0 0; color: #617795; font-size: 13px; line-height: 1.45; }
.comparison-row { display: flex; justify-content: space-between; gap: 10px; padding: 7px 0; border-bottom: 1px solid #e2eaf3; font-size: 14px; }
.comparison-row:last-child { border: 0; }
.comparison-row b { color: #526e8d; }
.good { color: #177b65; }
.bad { color: #b95736; }
.math-check { display: grid; gap: 4px; padding: 12px 16px; border-left: 4px solid #4d83c4; border-radius: 0 8px 8px 0; background: #eaf2fc; }
.math-check b { color: #285895; font-size: 15px; }
.math-check span { color: #526e8d; font-size: 13px; }
.bottleneck-chain { display: flex; align-items: center; justify-content: space-between; gap: 4px; padding: 12px 10px; border-radius: 9px; background: #eaf2fc; white-space: nowrap; }
.bottleneck-chain span { color: #315e99; font-size: 13px; font-weight: 700; }
.bottleneck-chain i { color: #8aa5c6; font-style: normal; }
.time-panel h2,.rules-panel h2 { font-size: 18px; }
.time-row { display: grid; grid-template-columns: 125px minmax(0,1fr) 48px; align-items: center; gap: 8px; margin: 12px 0; }
.time-row b { color: #526e8d; font-size: 13px; font-weight: 600; }
.time-row > div { height: 16px; border-radius: 3px; background: #edf2f8; }
.time-row i { display: block; height: 100%; border-radius: inherit; background: #809ec2; }
.time-row i.solver { background: #2f6fed; }
.time-row strong { color: #315e99; font-size: 13px; white-space: nowrap; }
.rules-panel p { margin: 10px 0; color: #526e8d; font-size: 14px; line-height: 1.45; }
.rules-panel b { color: #285895; }
.diagnosis-takeaway { margin: 0; padding: 11px 15px; border-left: 4px solid #2f6fed; border-radius: 0 8px 8px 0; color: #244b80; background: #e6effb; font-size: 16px; font-weight: 700; }
</style>

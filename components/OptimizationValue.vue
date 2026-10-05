<script setup lang="ts">
withDefaults(defineProps<{
  view?: 'overview' | 'problem' | 'evaluation' | 'diagnosis' | 'reshape' | 'expertise'
}>(), { view: 'overview' })

</script>

<template>
  <section class="optimization-value" :class="`value-${view}`">
    <template v-if="view === 'overview'">
      <div class="overview-panels">
        <article class="panel implementation-panel">
          <p class="panel-label">AIで速くなる作業</p>
          <h2>調べる・書く・試す</h2>
          <ul class="plain-list">
            <li>モデルのコード化</li>
            <li>アルゴリズムの実装</li>
            <li>実験・可視化・調査</li>
          </ul>
        </article>
        <article class="panel decision-panel">
          <p class="panel-label">専門家が設計する判断</p>
          <h2>何を解き、どう良くするか</h2>
          <ul class="plain-list">
            <li><b>何を解くか</b><span>問題・モデルを選ぶ</span></li>
            <li><b>何を良しとするか</b><span>評価を作る</span></li>
            <li><b>どこを変えるか</b><span>改善の方向を決める</span></li>
          </ul>
        </article>
      </div>
      <p class="takeaway">専門知識で、AIが試す範囲と採用基準を設計する。</p>
    </template>

    <template v-else-if="view === 'problem'">
      <div class="model-choices" aria-label="数理モデルを設計する四つの判断">
        <div><span>変数</span><b>何を動かせる？</b></div>
        <div><span>目的</span><b>何を良くする？</b></div>
        <div><span>制約</span><b>何を必ず守る？</b></div>
        <div><span>粒度</span><b>どこまで細かく？</b></div>
      </div>
      <article class="panel problem-example">
        <p class="panel-label">例 · 配送最適化</p>
        <div class="problem-request">「配送ルートを最適化したい」</div>
        <div class="decision-options">
          <div><b>担当区域</b><span>誰が、どの地域を担当？</span></div>
          <div><b>車両への割当</b><span>どの荷物を、どの車に？</span></div>
          <div><b>配送順序</b><span>どの順番で回る？</span></div>
        </div>
        <p class="example-insight">遅配の原因が区域の偏りなら、担当区域から見直す。</p>
      </article>
      <p class="research-source"><a href="https://proceedings.mlr.press/v306/chen26o.html" target="_blank" rel="noopener noreferrer">OPT-Engine（ICML 2026）</a>でも、制約の自動定式化が課題。</p>
    </template>

    <template v-else-if="view === 'evaluation'">
      <div class="evaluation-checks" aria-label="最適化の評価に必要な観点">
        <span>制約を守る</span><span>最適値からの差</span><span>制限時間</span><span>結果の安定性</span>
      </div>
      <article class="panel evaluation-example">
        <div class="example-heading"><p class="panel-label">例 · 生産スケジューリング</p><small>模式例。評価値は小さいほど良い。</small></div>
        <table aria-label="AIによる変更前後の評価結果">
          <thead><tr><th scope="col">評価項目</th><th scope="col">変更前</th><th scope="col">変更後</th></tr></thead>
          <tbody>
            <tr class="improved"><th scope="row">平均の評価値</th><td>1,000</td><td>950 <span>改善</span></td></tr>
            <tr class="regressed"><th scope="row">繁忙期の評価値</th><td>1,500</td><td>2,100 <span>悪化</span></td></tr>
            <tr class="regressed"><th scope="row">計算時間</th><td>30秒</td><td>180秒</td></tr>
            <tr class="regressed"><th scope="row">制約違反率</th><td>0%</td><td>0.5%</td></tr>
          </tbody>
        </table>
      </article>
      <p class="evaluation-data">通常・繁忙期・過去の失敗を、同じ条件で比較する。</p>
      <p class="takeaway">平均の改善に加え、制約・時間・安定性を確かめる。</p>
    </template>

    <template v-else-if="view === 'diagnosis'">
      <article class="panel diagnosis-example">
        <div class="example-heading"><p class="panel-label">例 · 生産計画</p><small>模式例。棒の長さは所要時間。</small></div>
        <p class="request-label">「10分の計算を速くしてほしい」</p>
        <div class="time-chart" aria-label="入力準備120分、計算10分、人手修正180分">
          <div><b>入力データ準備</b><div class="time-track"><i style="width: 66.67%" /></div><strong>2時間</strong></div>
          <div class="solver-time"><b>最適化の計算</b><div class="time-track"><i style="width: 5.56%" /></div><strong>10分</strong></div>
          <div><b>計画後の人手修正</b><div class="time-track"><i style="width: 100%" /></div><strong>3時間</strong></div>
        </div>
      </article>
      <div class="diagnosis-actions">
        <div><b>入力は正しい？</b><span>必要な項目・単位・欠損を確認</span></div>
        <div><b>なぜ修正する？</b><span>モデルにない条件・目標のずれを確認</span></div>
      </div>
      <p class="takeaway">計算・データ・モデル・運用のどこが問題かを診断する。</p>
    </template>

    <template v-else-if="view === 'reshape'">
      <div class="rule-comparison">
        <article class="panel">
          <p class="panel-label">例 · 現在の物流ルール</p>
          <div class="rule-row"><b>担当区域</b><span>毎日自由に変更</span></div>
          <div class="rule-row"><b>時間指定</b><span>顧客ごとに個別指定</span></div>
          <div class="rule-row"><b>例外ルール</b><span>営業所ごとに異なる</span></div>
          <p class="rule-outcome">組合せと例外制約が増える</p>
        </article>
        <span class="comparison-arrow" aria-hidden="true">→</span>
        <article class="panel simplified-rules">
          <p class="panel-label">業務側と調整して変える</p>
          <div class="rule-row"><b>担当区域</b><span>数パターンから選ぶ</span></div>
          <div class="rule-row"><b>時間指定</b><span>数種類に標準化する</span></div>
          <div class="rule-row"><b>例外ルール</b><span>統一・不要な例外を廃止</span></div>
          <p class="rule-outcome">解きやすく、運用しやすく</p>
        </article>
      </div>
      <p class="granularity-example"><span>粒度の例</span>作業指示が30分単位なら、計画も <b>15分 → 30分刻み</b> を検討。</p>
      <p class="takeaway">必要な条件を保ちながら、組合せと例外を減らす。</p>
    </template>

    <template v-else-if="view === 'expertise'">
      <article class="panel big-m-example">
        <p class="panel-label">例 · AIが生成したBig-M制約</p>
        <div class="big-m-context">
          <p>稼働時だけ生産できる。生産量の上限は100。</p>
          <div class="variable-definitions"><span><i>x</i>：生産量（0〜100）</span><span><i>y</i>：稼働時1、停止時0</span></div>
        </div>
        <div class="big-m-comparison">
          <div class="big-m-proposal">
            <span>AIの提案</span>
            <math display="block" aria-label="xは100万かけるy以下"><mi>x</mi><mo>≤</mo><mn>1,000,000</mn><mi>y</mi></math>
            <p>上限より大きすぎる係数</p>
          </div>
          <span class="comparison-arrow" aria-hidden="true">→</span>
          <div class="big-m-tight">
            <span>上限から導いた制約</span>
            <math display="block" aria-label="xは100かけるy以下"><mi>x</mi><mo>≤</mo><mn>100</mn><mi>y</mi></math>
            <p>同じ整数解を保ち、制約を強める</p>
          </div>
        </div>
        <p class="relaxation-note">0/1を連続値に緩めると、生産量100で必要な稼働の下限は <b>0.0001 → 1</b> になる。</p>
      </article>
      <div class="expert-checks"><span><b>緩和・下界</b> 数学的に正しい？</span><span><b>探索の改善</b> 同じ時間で比較した？</span></div>
      <p class="takeaway">数学的な正しさと解きやすさを見て、AIの改善を導く。</p>
    </template>

  </section>
</template>

<style scoped>
.optimization-value { display: flex; flex-direction: column; gap: 14px; width: 100%; color: #203b5e; font-family: 'Noto Sans JP', 'Hiragino Sans', sans-serif; }
.optimization-value h2 { margin: 0; font-size: 26px; font-weight: 700; line-height: 1.45; }
.optimization-value p { margin: 0; line-height: 1.6; }
.panel { padding: 20px 22px; border: 1px solid #d0dced; border-radius: 12px; background: #fff; }
.optimization-value .panel-label { margin: 0 0 12px; color: #547193; font-size: 16px; font-weight: 700; }
.overview-panels { display: grid; grid-template-columns: 1fr 1.1fr; gap: 16px; }
.overview-panels .panel { min-height: 257px; padding: 25px 24px; }
.implementation-panel h2 { color: #527195; }
.decision-panel { border-color: #a9c7ef; background: #eaf2ff; }
.decision-panel h2 { color: #245ab1; }
.plain-list { display: flex; flex-direction: column; gap: 18px; margin: 24px 0 0; padding: 0; list-style: none; font-size: 18px; }
.plain-list li { margin: 0; padding: 0; }
.decision-panel li { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
.decision-panel li span { color: #5d7697; font-size: 16px; }
.optimization-value .takeaway { padding: 12px 18px; border-left: 4px solid #2f6fed; border-radius: 0 8px 8px 0; color: #244b80; background: #e6effb; font-size: 20px; font-weight: 700; line-height: 1.5; }
.model-choices { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.model-choices > div { padding: 13px 14px; border-top: 3px solid #5689d2; background: #e7effb; }
.model-choices span { display: block; margin-bottom: 5px; color: #5375a0; font-size: 16px; }
.model-choices b { font-size: 18px; }
.problem-example { padding: 16px 22px; }
.problem-example .panel-label { margin-bottom: 6px; }
.problem-request { font-size: 26px; font-weight: 700; text-align: center; }
.decision-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 16px; }
.decision-options > div { padding: 12px 10px; border: 1px solid #d0dced; border-radius: 7px; text-align: center; }
.decision-options b { display: block; color: #285895; font-size: 22px; }
.decision-options span { display: block; margin-top: 4px; color: #607796; font-size: 16px; }
.optimization-value .example-insight { margin-top: 14px; color: #345c91; font-size: 18px; font-weight: 700; text-align: center; }
.optimization-value .research-source { color: #607795; font-size: 14px; }
.research-source a { color: #3568aa; text-decoration: underline; }
.evaluation-checks { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.evaluation-checks span { padding: 11px; border-radius: 6px; color: #315e99; background: #e3edfb; font-size: 18px; font-weight: 700; text-align: center; }
.evaluation-example { padding: 15px 22px; }
.example-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 15px; }
.example-heading small { color: #788ba3; font-size: 10px; }
.optimization-value table { width: 100%; border-collapse: collapse; font-size: 18px; }
.optimization-value th, .optimization-value td { padding: 8px 13px; border-bottom: 1px solid #dde5f0; line-height: 1.2; text-align: left; }
.optimization-value thead th { padding-top: 0; color: #6e829d; font-size: 16px; font-weight: 500; }
.optimization-value tbody th { font-weight: 500; }
.optimization-value tbody td { font-variant-numeric: tabular-nums; }
.optimization-value tbody tr:last-child th, .optimization-value tbody tr:last-child td { border-bottom: 0; }
.optimization-value td span { margin-left: 14px; font-size: 14px; }
.improved td:last-child { color: #177b65; font-weight: 700; }
.regressed td:last-child { color: #b95736; font-weight: 700; }
.optimization-value .evaluation-data { color: #617795; font-size: 16px; }
.value-evaluation { gap: 10px; }
.value-evaluation .takeaway { font-size: 18px; }
.diagnosis-example { padding: 18px 22px; }
.optimization-value .request-label { margin-bottom: 17px; font-size: 21px; font-weight: 700; }
.time-chart { display: flex; flex-direction: column; gap: 15px; }
.time-chart > div { display: grid; grid-template-columns: 180px 1fr 76px; align-items: center; gap: 16px; }
.time-chart b { font-size: 18px; font-weight: 500; }
.time-chart strong { font-size: 22px; }
.time-track { height: 25px; border-radius: 3px; background: #f0f4fa; }
.time-track i { display: block; height: 100%; border-radius: 3px; background: #809ec2; }
.solver-time .time-track i { background: #2f6fed; }
.solver-time strong { color: #2f6fed; }
.diagnosis-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 0 4px; }
.diagnosis-actions b { display: block; color: #2e598e; font-size: 20px; }
.diagnosis-actions span { display: block; margin-top: 4px; color: #617795; font-size: 16px; }
.rule-comparison { display: grid; grid-template-columns: 1fr 32px 1fr; align-items: center; gap: 10px; }
.rule-comparison .panel { padding: 21px 20px; }
.rule-row { display: grid; grid-template-columns: 90px 1fr; align-items: baseline; gap: 12px; margin-bottom: 22px; }
.rule-row b { font-size: 18px; }
.rule-row span { color: #617795; font-size: 17px; }
.simplified-rules { border-color: #afc9ed; background: #edf4ff; }
.simplified-rules .rule-row b { color: #285895; }
.optimization-value .rule-outcome { padding-top: 10px; border-top: 1px solid #d7e3f2; color: #315c96; font-size: 18px; font-weight: 700; }
.comparison-arrow { color: #7d9ac0; font-size: 28px; text-align: center; }
.optimization-value .granularity-example { color: #617795; font-size: 16px; }
.granularity-example > span { margin-right: 12px; color: #315c96; font-weight: 700; }
.granularity-example b { color: #315c96; }
.value-reshape { gap: 12px; }
.value-reshape .takeaway { font-size: 18px; }
.big-m-example { padding: 16px 22px; }
.big-m-example .panel-label { margin-bottom: 6px; }
.big-m-context > p { font-size: 20px; font-weight: 700; }
.variable-definitions { display: flex; gap: 28px; margin-top: 4px; color: #617795; font-size: 16px; }
.variable-definitions i { color: #315c96; font-family: 'Times New Roman', serif; font-size: 20px; }
.big-m-comparison { display: grid; grid-template-columns: 1fr 32px 1fr; align-items: center; gap: 10px; margin-top: 14px; }
.big-m-comparison > div { padding: 10px 14px; border-radius: 7px; background: #f1f4f9; text-align: center; }
.big-m-comparison .big-m-tight { background: #e6f0ff; }
.big-m-comparison > div > span { color: #647d9e; font-size: 16px; }
.big-m-comparison math { margin: 8px 0; color: #203b5e; font-size: 34px; }
.big-m-comparison p { color: #547193; font-size: 16px; }
.optimization-value .relaxation-note { margin-top: 12px; color: #617795; font-size: 16px; }
.relaxation-note b { color: #285895; font-size: 18px; }
.expert-checks { display: flex; gap: 28px; padding: 0 4px; color: #617795; font-size: 17px; }
.expert-checks b { margin-right: 8px; color: #315c96; }
.value-expertise .takeaway { font-size: 18px; }
</style>

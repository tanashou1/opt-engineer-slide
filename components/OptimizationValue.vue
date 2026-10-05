<script setup lang="ts">
withDefaults(defineProps<{
  view?: 'overview' | 'problem' | 'evaluation' | 'diagnosis' | 'reshape' | 'expertise' | 'relationship'
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
            <li>モデル・ソルバーのコード化</li>
            <li>アルゴリズムの実装・改善</li>
            <li>実験・可視化・既存手法の調査</li>
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
      <p class="takeaway">数理最適化の知識で、AIの提案を検証し、次の探索を導く。</p>
    </template>

    <template v-else-if="view === 'problem'">
      <div class="model-choices" aria-label="数理モデルを設計する四つの判断">
        <div><span>変数</span><b>何を動かせる？</b></div>
        <div><span>目的</span><b>何を良くする？</b></div>
        <div><span>制約</span><b>何を必ず守る？</b></div>
        <div><span>粒度</span><b>どこまで細かく扱う？</b></div>
      </div>
      <article class="panel problem-example">
        <p class="panel-label">例 · 配送最適化</p>
        <div class="problem-request">「配送ルートを最適化したい」</div>
        <div class="decision-options">
          <div><b>担当区域</b><span>誰が、どの地域を担当？</span></div>
          <div><b>車両への割当</b><span>どの荷物を、どの車に？</span></div>
          <div><b>配送順序</b><span>どの順番で回る？</span></div>
        </div>
        <p class="example-insight">遅配の原因が区域の偏りなら、担当区域の設計から見直す。</p>
      </article>
      <p class="research-source"><a href="https://proceedings.mlr.press/v306/chen26o.html" target="_blank" rel="noopener noreferrer">OPT-Engine（ICML 2026）</a>：10種類のOR問題で、制約の自動定式化を主なボトルネックと報告。</p>
    </template>

    <template v-else-if="view === 'evaluation'">
      <div class="evaluation-checks" aria-label="最適化の評価に必要な観点">
        <span>制約を守る</span><span>最適値からの差</span><span>制限時間</span><span>結果の安定性</span>
      </div>
      <article class="panel evaluation-example">
        <div class="example-heading"><p class="panel-label">例 · 生産スケジューリング</p><small>数値は模式例。目的関数値は小さいほど良い。</small></div>
        <table aria-label="AIによる変更前後の評価結果">
          <thead><tr><th scope="col">評価項目</th><th scope="col">変更前</th><th scope="col">AIによる変更後</th></tr></thead>
          <tbody>
            <tr class="improved"><th scope="row">平均目的関数値</th><td>1,000</td><td>950 <span>改善</span></td></tr>
            <tr class="regressed"><th scope="row">繁忙期の目的関数値</th><td>1,500</td><td>2,100 <span>悪化</span></td></tr>
            <tr class="regressed"><th scope="row">計算時間</th><td>30秒</td><td>180秒</td></tr>
            <tr class="regressed"><th scope="row">制約違反率</th><td>0%</td><td>0.5%</td></tr>
          </tbody>
        </table>
      </article>
      <p class="evaluation-data">通常・繁忙期・境界条件・過去の失敗・最適値が分かる小規模問題で、自動評価する。</p>
      <p class="takeaway">AIが試行錯誤できる実験場を作る。平均の改善だけでは採用しない。</p>
    </template>

    <template v-else-if="view === 'diagnosis'">
      <article class="panel diagnosis-example">
        <div class="example-heading"><p class="panel-label">例 · 生産計画</p><small>時間は模式例。棒の長さは所要時間に比例。</small></div>
        <p class="request-label">「計算に10分かかるので、高速化してほしい」</p>
        <div class="time-chart" aria-label="入力準備120分、計算10分、人手修正180分">
          <div><b>入力データ準備</b><div class="time-track"><i style="width: 66.67%" /></div><strong>2時間</strong></div>
          <div class="solver-time"><b>最適化の計算</b><div class="time-track"><i style="width: 5.56%" /></div><strong>10分</strong></div>
          <div><b>計画後の人手修正</b><div class="time-track"><i style="width: 100%" /></div><strong>3時間</strong></div>
        </div>
      </article>
      <div class="diagnosis-actions">
        <div><b>入力は正しい？</b><span>必要なデータ・単位・欠損を確かめる</span></div>
        <div><b>なぜ修正する？</b><span>モデルにない制約や、目的のずれを探す</span></div>
      </div>
      <p class="takeaway">データ・モデル・探索・運用を見て、改善の効果が大きい場所を選ぶ。</p>
    </template>

    <template v-else-if="view === 'reshape'">
      <div class="rule-comparison">
        <article class="panel">
          <p class="panel-label">例 · 現在の物流ルール</p>
          <div class="rule-row"><b>担当区域</b><span>毎日、自由に組み替える</span></div>
          <div class="rule-row"><b>時間指定</b><span>顧客ごとに異なる</span></div>
          <div class="rule-row"><b>例外ルール</b><span>営業所ごとに多数ある</span></div>
          <p class="rule-outcome">組合せと例外制約が増える</p>
        </article>
        <span class="comparison-arrow" aria-hidden="true">→</span>
        <article class="panel simplified-rules">
          <p class="panel-label">業務側と調整して変える</p>
          <div class="rule-row"><b>担当区域</b><span>数パターンから選ぶ</span></div>
          <div class="rule-row"><b>時間指定</b><span>数種類に標準化する</span></div>
          <div class="rule-row"><b>例外ルール</b><span>統一し、不要なものを減らす</span></div>
          <p class="rule-outcome">解きやすく、運用しやすくする</p>
        </article>
      </div>
      <p class="granularity-example"><span>粒度の例</span>現場の作業指示が30分単位なら、計画も <b>15分刻み → 30分刻み</b> を検討。</p>
      <p class="takeaway">ルールが計算の難しさにどう効くかを見て、必要な条件を残して簡単にする。</p>
    </template>

    <template v-else-if="view === 'expertise'">
      <article class="panel big-m-example">
        <p class="panel-label">例 · AIが生成したBig-M制約</p>
        <div class="big-m-context">
          <p>稼働時だけ生産できる。生産量の上限は100。</p>
          <div class="variable-definitions"><span><i>x</i>：生産量（0〜100）</span><span><i>y</i>：稼働するなら1、しなければ0</span></div>
        </div>
        <div class="big-m-comparison">
          <div class="big-m-proposal">
            <span>AIの提案</span>
            <math display="block" aria-label="xは100万かけるy以下"><mi>x</mi><mo>≤</mo><mn>1,000,000</mn><mi>y</mi></math>
            <p>上限に対して、大きすぎる係数</p>
          </div>
          <span class="comparison-arrow" aria-hidden="true">→</span>
          <div class="big-m-tight">
            <span>上限から導いた制約</span>
            <math display="block" aria-label="xは100かけるy以下"><mi>x</mi><mo>≤</mo><mn>100</mn><mi>y</mi></math>
            <p>同じ整数解を、より強い制約で表す</p>
          </div>
        </div>
        <p class="relaxation-note">0/1を連続値に緩めた計算では、生産量100に対する稼働の下限が <b>0.0001 → 1</b> になる。</p>
      </article>
      <div class="expert-checks"><span><b>緩和・下界</b> 数学的に正しい？</span><span><b>探索の改善</b> 同じ時間で比較した？</span></div>
      <p class="takeaway">専門知識で、提案の正しさ・解きやすさを判断し、次の改善を指示する。</p>
    </template>

    <template v-else-if="view === 'relationship'">
      <svg class="ability-flow" viewBox="0 0 872 212" role="img" aria-label="1問題設計、2評価設計、AIの実装と実験、3改善先の診断と進み、探索方法の改善または4現実のルール変更を選ぶ。変更後は問題と評価を見直して繰り返す。">
        <defs><marker id="value-flow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#83a1c7" /></marker></defs>
        <g class="flow-lines" marker-end="url(#value-flow-arrow)">
          <path d="M 187 45 H 221" /><path d="M 405 45 H 439" /><path d="M 623 45 H 657" />
          <path d="M 753 81 V 100 H 535 V 122" /><path d="M 753 100 V 122" />
        </g>
        <g class="flow-node">
          <rect x="1" y="8" width="184" height="73" rx="9" />
          <text x="93" y="38" class="flow-title">1 問題を設計</text><text x="93" y="61" class="flow-detail">何を解くか</text>
          <rect x="221" y="8" width="184" height="73" rx="9" />
          <text x="313" y="38" class="flow-title">2 評価を設計</text><text x="313" y="61" class="flow-detail">何を良しとするか</text>
          <rect x="439" y="8" width="184" height="73" rx="9" class="flow-ai" />
          <text x="531" y="38" class="flow-title">AIの実装・実験</text><text x="531" y="61" class="flow-detail">候補を高速に試す</text>
          <rect x="657" y="8" width="214" height="73" rx="9" />
          <text x="764" y="38" class="flow-title">3 改善先を診断</text><text x="764" y="61" class="flow-detail">どこを変えるか</text>
          <rect x="439" y="126" width="192" height="61" rx="9" />
          <text x="535" y="152" class="flow-title">探索方法を改善</text><text x="535" y="173" class="flow-detail">アルゴリズムを変える</text>
          <rect x="657" y="126" width="214" height="61" rx="9" />
          <text x="764" y="152" class="flow-title">4 現実を変える</text><text x="764" y="173" class="flow-detail">業務ルールを見直す</text>
        </g>
        <text x="5" y="145" class="flow-return">変更後は、問題と評価を見直す。</text>
        <text x="5" y="169" class="flow-return">この改善を繰り返す。</text>
      </svg>
      <div class="expertise-foundation"><span class="ability-number">5</span><div><b>数理最適化の専門性で、全体を検証・誘導する</b><p>モデル・制約・下界・探索方法の妥当性を判断する</p></div></div>
      <p class="takeaway">専門知識の価値は、AIが試す範囲と、採用する答えを設計することへ。</p>
    </template>
  </section>
</template>

<style scoped>
.optimization-value { display: flex; flex-direction: column; gap: 14px; width: 100%; color: #203b5e; font-family: 'Noto Sans JP', 'Hiragino Sans', sans-serif; }
.optimization-value h2 { margin: 0; font-size: 23px; font-weight: 700; line-height: 1.45; }
.optimization-value p { margin: 0; line-height: 1.6; }
.panel { padding: 20px 22px; border: 1px solid #d0dced; border-radius: 12px; background: #fff; }
.optimization-value .panel-label { margin: 0 0 12px; color: #547193; font-size: 12px; font-weight: 700; }
.overview-panels { display: grid; grid-template-columns: 1fr 1.1fr; gap: 16px; }
.overview-panels .panel { min-height: 257px; padding: 25px 24px; }
.implementation-panel h2 { color: #527195; }
.decision-panel { border-color: #a9c7ef; background: #eaf2ff; }
.decision-panel h2 { color: #245ab1; }
.plain-list { display: flex; flex-direction: column; gap: 18px; margin: 24px 0 0; padding: 0; list-style: none; font-size: 16px; }
.plain-list li { margin: 0; padding: 0; }
.decision-panel li { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
.decision-panel li span { color: #5d7697; font-size: 13px; }
.optimization-value .takeaway { padding: 14px 18px; border-left: 4px solid #2f6fed; border-radius: 0 8px 8px 0; color: #244b80; background: #e6effb; font-size: 17px; font-weight: 700; line-height: 1.5; }
.model-choices { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.model-choices > div { padding: 13px 14px; border-top: 3px solid #5689d2; background: #e7effb; }
.model-choices span { display: block; margin-bottom: 5px; color: #5375a0; font-size: 12px; }
.model-choices b { font-size: 16px; }
.problem-example { padding: 16px 22px; }
.problem-example .panel-label { margin-bottom: 6px; }
.problem-request { font-size: 23px; font-weight: 700; text-align: center; }
.decision-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 16px; }
.decision-options > div { padding: 12px 10px; border: 1px solid #d0dced; border-radius: 7px; text-align: center; }
.decision-options b { display: block; color: #285895; font-size: 19px; }
.decision-options span { display: block; margin-top: 4px; color: #607796; font-size: 12px; }
.optimization-value .example-insight { margin-top: 14px; color: #345c91; font-size: 15px; font-weight: 700; text-align: center; }
.optimization-value .research-source { color: #667c98; font-size: 11px; }
.research-source a { color: #3568aa; text-decoration: underline; }
.evaluation-checks { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.evaluation-checks span { padding: 11px; border-radius: 6px; color: #315e99; background: #e3edfb; font-size: 15px; font-weight: 700; text-align: center; }
.evaluation-example { padding: 15px 22px; }
.example-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 15px; }
.example-heading small { color: #788ba3; font-size: 10px; }
.optimization-value table { width: 100%; border-collapse: collapse; font-size: 15px; }
.optimization-value th, .optimization-value td { padding: 9px 13px; border-bottom: 1px solid #dde5f0; line-height: 1.2; text-align: left; }
.optimization-value thead th { padding-top: 0; color: #6e829d; font-size: 12px; font-weight: 500; }
.optimization-value tbody th { font-weight: 500; }
.optimization-value tbody td { font-variant-numeric: tabular-nums; }
.optimization-value tbody tr:last-child th, .optimization-value tbody tr:last-child td { border-bottom: 0; }
.optimization-value td span { margin-left: 14px; font-size: 11px; }
.improved td:last-child { color: #177b65; font-weight: 700; }
.regressed td:last-child { color: #b95736; font-weight: 700; }
.optimization-value .evaluation-data { color: #617795; font-size: 12px; }
.value-evaluation { gap: 10px; }
.value-evaluation .takeaway { font-size: 16px; }
.diagnosis-example { padding: 18px 22px; }
.optimization-value .request-label { margin-bottom: 17px; font-size: 21px; font-weight: 700; }
.time-chart { display: flex; flex-direction: column; gap: 15px; }
.time-chart > div { display: grid; grid-template-columns: 155px 1fr 68px; align-items: center; gap: 16px; }
.time-chart b { font-size: 15px; font-weight: 500; }
.time-chart strong { font-size: 19px; }
.time-track { height: 25px; border-radius: 3px; background: #f0f4fa; }
.time-track i { display: block; height: 100%; border-radius: 3px; background: #809ec2; }
.solver-time .time-track i { background: #2f6fed; }
.solver-time strong { color: #2f6fed; }
.diagnosis-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 0 4px; }
.diagnosis-actions b { display: block; color: #2e598e; font-size: 17px; }
.diagnosis-actions span { display: block; margin-top: 4px; color: #617795; font-size: 13px; }
.rule-comparison { display: grid; grid-template-columns: 1fr 32px 1fr; align-items: center; gap: 10px; }
.rule-comparison .panel { padding: 21px 20px; }
.rule-row { display: flex; flex-direction: column; gap: 3px; margin-bottom: 15px; }
.rule-row b { font-size: 16px; }
.rule-row span { color: #617795; font-size: 14px; }
.simplified-rules { border-color: #afc9ed; background: #edf4ff; }
.simplified-rules .rule-row b { color: #285895; }
.optimization-value .rule-outcome { padding-top: 10px; border-top: 1px solid #d7e3f2; color: #315c96; font-size: 16px; font-weight: 700; }
.comparison-arrow { color: #7d9ac0; font-size: 28px; text-align: center; }
.optimization-value .granularity-example { color: #617795; font-size: 12px; }
.granularity-example > span { margin-right: 12px; color: #315c96; font-weight: 700; }
.granularity-example b { color: #315c96; }
.value-reshape { gap: 12px; }
.value-reshape .takeaway { font-size: 16px; }
.big-m-example { padding: 16px 22px; }
.big-m-example .panel-label { margin-bottom: 6px; }
.big-m-context > p { font-size: 17px; font-weight: 700; }
.variable-definitions { display: flex; gap: 28px; margin-top: 4px; color: #617795; font-size: 12px; }
.variable-definitions i { color: #315c96; font-family: 'Times New Roman', serif; font-size: 17px; }
.big-m-comparison { display: grid; grid-template-columns: 1fr 32px 1fr; align-items: center; gap: 10px; margin-top: 14px; }
.big-m-comparison > div { padding: 10px 14px; border-radius: 7px; background: #f1f4f9; text-align: center; }
.big-m-comparison .big-m-tight { background: #e6f0ff; }
.big-m-comparison > div > span { color: #647d9e; font-size: 12px; }
.big-m-comparison math { margin: 8px 0; color: #203b5e; font-size: 27px; }
.big-m-comparison p { color: #547193; font-size: 12px; }
.optimization-value .relaxation-note { margin-top: 12px; color: #617795; font-size: 12px; }
.relaxation-note b { color: #285895; font-size: 16px; }
.expert-checks { display: flex; gap: 28px; padding: 0 4px; color: #617795; font-size: 14px; }
.expert-checks b { margin-right: 8px; color: #315c96; }
.value-expertise .takeaway { font-size: 16px; }
.ability-flow { display: block; width: 100%; height: auto; }
.flow-lines { fill: none; stroke: #83a1c7; stroke-width: 2; stroke-linejoin: round; }
.flow-node rect { fill: #fff; stroke: #c4d5eb; }
.flow-node .flow-ai { fill: #e4edfb; stroke: #adc7ed; }
.flow-title { fill: #315c96; font-size: 16px; font-weight: 700; text-anchor: middle; }
.flow-detail { fill: #677e9b; font-size: 12px; text-anchor: middle; }
.flow-return { fill: #637b9b; font-size: 14px; }
.ability-number { display: flex; align-items: center; justify-content: center; flex: none; width: 34px; height: 34px; border-radius: 50%; color: #2b64bc; background: #e1ecfc; font: 700 18px Arial, sans-serif; }
.expertise-foundation { display: flex; align-items: center; gap: 15px; padding: 16px 20px; border-radius: 10px; color: #fff; background: #234d85; }
.expertise-foundation .ability-number { color: #234d85; background: #dceaff; }
.expertise-foundation b { color: #fff; font-size: 19px; }
.expertise-foundation p { margin-top: 4px; color: #cbdff7; font-size: 12px; }
.value-relationship .takeaway { font-size: 16px; }
</style>

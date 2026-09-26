<template>
  <svg class="strategy-svg" viewBox="0 0 900 340" role="img" aria-labelledby="strategy-title strategy-desc">
    <title id="strategy-title">配送計画を複数の指標で比べながら改善する</title>
    <desc id="strategy-desc">短いルートでも遅配が多い候補Aと、少し長いが遅配のない候補Bを比べる。計画を変更し、制約を確認し、評価して採用する探索を繰り返す。</desc>
    <rect x="1" y="1" width="898" height="331" rx="18" fill="#fff" stroke="#d1dff1"/>
    <text x="25" y="37" class="heading">候補を比べると、距離だけでは決められない</text>
    <rect x="25" y="55" width="849" height="42" rx="9" fill="#e7effa"/>
    <text x="53" y="82" class="table-head">候補</text><text x="300" y="82" class="table-head">走行距離</text><text x="500" y="82" class="table-head">遅配</text><text x="682" y="82" class="table-head">判断</text>
    <g class="row"><rect x="25" y="104" width="849" height="62" rx="8"/><text x="53" y="143">A  最短ルート</text><text x="306" y="143">38 km</text><text x="505" y="143" class="late">3 件</text><text x="683" y="143">採用しない</text></g>
    <g class="row chosen"><rect x="25" y="174" width="849" height="62" rx="8"/><text x="53" y="213">B  時間帯を守る</text><text x="306" y="213">46 km</text><text x="505" y="213">0 件</text><text x="683" y="213">採用する</text></g>
    <path d="M92 280H293M368 280H563M638 280H840" stroke="#8baedc" stroke-width="2.5"/>
    <g class="step"><circle cx="75" cy="280" r="16"/><text x="75" y="285">1</text><circle cx="350" cy="280" r="16"/><text x="350" y="285">2</text><circle cx="620" cy="280" r="16"/><text x="620" y="285">3</text></g>
    <text x="53" y="317" class="step-label">訪問順・担当を変更</text><text x="325" y="317" class="step-label">制約を検査</text><text x="596" y="317" class="step-label">評価して更新</text>
  </svg>
</template>

<style scoped>
.strategy-svg { display: block; width: 100%; height: 334px; font-family: 'Noto Sans JP', 'Hiragino Sans', sans-serif; }
.heading { fill: #234369; font-size: 17px; font-weight: 700; }
.table-head { fill: #55749b; font-size: 13px; font-weight: 700; }
.row rect { fill: #f5f8fc; }
.row text { fill: #29486d; font-size: 17px; font-weight: 600; }
.row .late { fill: #b66b23; }
.chosen rect { fill: #e0eeff; stroke: #6ba1e8; stroke-width: 1.5; }
.chosen text:last-child { fill: #2f6fed; font-weight: 700; }
.step circle { fill: #1b477f; }
.step text { fill: white; font-size: 13px; font-weight: 700; text-anchor: middle; }
.step-label { fill: #527096; font-size: 14px; font-weight: 600; }
</style>

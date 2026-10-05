<template>
  <svg class="container-loading" viewBox="0 0 1000 330" role="img" aria-labelledby="loading-title loading-desc">
    <title id="loading-title">複雑な条件のもとで荷物を積み込むContainer Loading</title>
    <desc id="loading-desc">四隅に置けない領域があるコンテナへ、サイズや回転条件の異なる箱を積み込む。積載順、支持面積、高さも考慮する。</desc>
    <defs>
      <linearGradient id="container-wall" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f8fbff" />
        <stop offset="1" stop-color="#e6eef9" />
      </linearGradient>
      <linearGradient id="box-blue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#76a8e8" />
        <stop offset="1" stop-color="#4479bd" />
      </linearGradient>
      <linearGradient id="box-light" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#b5d3f2" />
        <stop offset="1" stop-color="#83addd" />
      </linearGradient>
      <marker id="load-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 0L10 5L0 10Z" fill="#5f86b6" />
      </marker>
    </defs>

    <rect x="1" y="1" width="998" height="328" rx="20" fill="#fff" stroke="#d8e3f1" />
    <text x="36" y="35" class="panel-title">制約の中で荷物を積み込む</text>

    <g class="container">
      <polygon points="83,93 303,54 506,101 282,143" fill="#f4f8fd" stroke="#9db4d0" stroke-width="2" />
      <polygon points="83,93 282,143 282,270 83,218" fill="url(#container-wall)" stroke="#9db4d0" stroke-width="2" />
      <polygon points="282,143 506,101 506,228 282,270" fill="#eef4fb" stroke="#9db4d0" stroke-width="2" />

      <!-- Four full-height corner keep-out pillars -->
      <g class="obstacle">
        <polygon points="83,93 104,89 126,94 105,100" />
        <polygon points="83,93 105,100 105,225 83,218" />
        <polygon points="105,100 126,94 126,219 105,225" />
        <polygon points="282,59 303,55 325,60 303,65" />
        <polygon points="282,59 303,65 303,192 282,186" />
        <polygon points="303,65 325,60 325,187 303,192" />
        <polygon points="461,109 483,104 506,110 484,116" />
        <polygon points="461,109 484,116 484,243 461,236" />
        <polygon points="484,116 506,110 506,228 484,243" />
        <polygon points="259,148 282,143 305,149 282,155" />
        <polygon points="259,148 282,155 282,270 259,264" />
        <polygon points="282,155 305,149 305,264 282,270" />
      </g>

      <!-- Stacked boxes; visible faces show the different box dimensions -->
      <g class="cargo-box">
        <polygon points="151,190 205,179 247,190 192,202" fill="#a9c8eb" />
        <polygon points="151,190 192,202 192,241 151,230" fill="url(#box-blue)" />
        <polygon points="192,202 247,190 247,229 192,241" fill="#376ba9" />
        <path d="M171 186L212 198V236" />
      </g>
      <g class="cargo-box">
        <polygon points="201,166 260,155 307,166 248,178" fill="#c7dcf3" />
        <polygon points="201,166 248,178 248,208 201,196" fill="url(#box-light)" />
        <polygon points="248,178 307,166 307,196 248,208" fill="#719bd0" />
        <path d="M224 162L270 174V204" />
      </g>
      <g class="cargo-box">
        <polygon points="259,210 331,196 383,208 311,222" fill="#a9c8eb" />
        <polygon points="259,210 311,222 311,257 259,244" fill="url(#box-blue)" />
        <polygon points="311,222 383,208 383,244 311,257" fill="#376ba9" />
        <path d="M286 205L338 217V251" />
      </g>
      <g class="cargo-box">
        <polygon points="300,149 353,139 391,148 337,159" fill="#c7dcf3" />
        <polygon points="300,149 337,159 337,192 300,182" fill="url(#box-light)" />
        <polygon points="337,159 391,148 391,181 337,192" fill="#719bd0" />
        <path d="M319 145L357 155V188" />
      </g>

      <path d="M184 62V89" class="load-arrow" marker-end="url(#load-arrow)" />
      <path d="M390 66V88" class="load-arrow" marker-end="url(#load-arrow)" />
    </g>
    <rect x="43" y="291" width="12" height="12" rx="2" class="obstacle-key" />
    <text x="63" y="302" class="obstacle-caption">四隅は積載不可</text>
    <text x="244" y="302" class="floor-caption">荷物ごとにサイズ・回転条件が異なる</text>

    <path d="M548 34V296" stroke="#e1e9f3" stroke-width="2" />
    <text x="580" y="38" class="panel-title">積み方を決める条件</text>

    <g class="condition">
      <rect x="580" y="58" width="380" height="48" rx="12" />
      <circle cx="607" cy="82" r="12" /><text x="607" y="87" class="number">1</text>
      <text x="632" y="88">荷物ごとの向き・回転制限</text>
    </g>
    <g class="condition">
      <rect x="580" y="118" width="380" height="48" rx="12" />
      <circle cx="607" cy="142" r="12" /><text x="607" y="147" class="number">2</text>
      <text x="632" y="148">指定された順番をなるべく守る</text>
    </g>
    <g class="condition">
      <rect x="580" y="178" width="380" height="48" rx="12" />
      <circle cx="607" cy="202" r="12" /><text x="607" y="207" class="number">3</text>
      <text x="632" y="208">底面の60%以上を支える</text>
    </g>
    <g class="score-card">
      <rect x="580" y="240" width="380" height="55" rx="12" />
      <text x="601" y="263" class="score-label">評価</text>
      <text x="656" y="263">低く積み、積載順の乱れを減らす</text>
      <text x="601" y="283" class="score-note">高さ超過には大きなペナルティ</text>
    </g>
    <a href="https://atcoder.jp/contests/toyota-hc-2023spring/tasks/toyota_hc_2023spring_a" target="_blank" rel="noopener noreferrer">
      <text x="580" y="317" class="source">出典: AtCoder A · Container Loading ↗</text>
    </a>
  </svg>
</template>

<style scoped>
.container-loading { display: block; width: 100%; height: auto; font-family: 'Noto Sans JP', 'Hiragino Sans', sans-serif; }
.panel-title { fill: #1f3c60; font-size: 19px; font-weight: 700; }
.obstacle polygon, .obstacle-key { fill: #111820; stroke: #fff; stroke-width: 1.3; }
.obstacle-caption, .floor-caption { fill: #536d8b; font-size: 15px; font-weight: 600; }
.load-arrow { fill: none; stroke: #5f86b6; stroke-width: 2; stroke-dasharray: 4 4; }
.cargo-box path { fill: none; stroke: #e8f1fc; stroke-width: 2; opacity: .85; }
.condition rect { fill: #f3f7fc; stroke: #d9e5f2; }
.condition circle { fill: #386da9; }
.number { fill: #fff; text-anchor: middle; font-size: 14px; font-weight: 700; }
.condition > text:last-child { fill: #294765; font-size: 17px; font-weight: 600; }
.score-card rect { fill: #eaf2fb; stroke: #cbdcf0; }
.score-card text { fill: #294765; font-size: 15px; font-weight: 600; }
.score-card .score-label { fill: #386da9; font-weight: 700; }
.score-card .score-note { fill: #617a98; font-size: 13px; }
.source { fill: #7d91a9; font-size: 12px; }
</style>

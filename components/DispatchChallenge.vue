<template>
  <svg class="dispatch-svg" viewBox="0 0 900 344" role="img" aria-labelledby="dispatch-title dispatch-desc">
    <title id="dispatch-title">変化する注文に対応する複数車両の配送計画</title>
    <desc id="dispatch-desc">三台の車で複数の配達先を巡る。途中で新しい注文と渋滞が発生する。荷物容量、配達時間帯、勤務時間も守る。</desc>
    <defs>
      <pattern id="street-grid" width="39" height="39" patternUnits="userSpaceOnUse"><path d="M39 0H0V39" fill="none" stroke="#d8e6f5" stroke-width="1"/></pattern>
      <marker id="route-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M1 1L9 5L1 9" fill="none" stroke="#4c82cc" stroke-width="2"/></marker>
    </defs>
    <rect x="1" y="1" width="898" height="337" rx="18" fill="#fff" stroke="#d1dff1"/>
    <rect x="18" y="16" width="518" height="250" rx="13" fill="#edf4fc"/>
    <rect x="18" y="16" width="518" height="250" rx="13" fill="url(#street-grid)"/>
    <text x="35" y="42" class="map-label">3台で配送</text>
    <path d="M84 212L165 171L233 94L331 93" class="route route-a"/>
    <path d="M84 212L174 219L260 190L414 151" class="route route-b"/>
    <path d="M84 212L124 107L294 58L438 81" class="route route-c"/>
    <path d="M337 205L431 216" stroke="#e8a04b" stroke-width="5" stroke-linecap="round" stroke-dasharray="7 8"/>
    <g class="destination"><circle cx="165" cy="171" r="10"/><circle cx="233" cy="94" r="10"/><circle cx="331" cy="93" r="10"/><circle cx="174" cy="219" r="10"/><circle cx="260" cy="190" r="10"/><circle cx="414" cy="151" r="10"/><circle cx="124" cy="107" r="10"/><circle cx="294" cy="58" r="10"/><circle cx="438" cy="81" r="10"/></g>
    <rect x="50" y="183" width="69" height="56" rx="10" fill="#153965"/>
    <text x="85" y="208" text-anchor="middle" fill="white" style="font-size:20px">拠点</text>

    <g class="vehicle"><circle cx="234" cy="94" r="16" fill="#2f6fed"/><text x="234" y="99">1</text><circle cx="260" cy="190" r="16" fill="#49a1bd"/><text x="260" y="195">2</text><circle cx="294" cy="58" r="16" fill="#7a75d4"/><text x="294" y="63">3</text></g>
    <circle cx="465" cy="215" r="15" fill="#fff0dc" stroke="#e6a251" stroke-width="2"/>
    <text x="465" y="220" text-anchor="middle" fill="#b36a13" style="font-size:16px;font-weight:700">＋</text>
    <text x="320" y="249" class="map-note">途中で新規注文・渋滞</text>
    <text x="561" y="44" class="map-label">同時に守る条件</text>
    <g class="constraint"><rect x="557" y="60" width="313" height="43" rx="10"/><text x="578" y="87">配達時間帯</text><text x="842" y="87" text-anchor="end">9–12時 など</text></g>
    <g class="constraint"><rect x="557" y="112" width="313" height="43" rx="10"/><text x="578" y="139">車両の積載量</text><text x="842" y="139" text-anchor="end">上限あり</text></g>
    <g class="constraint"><rect x="557" y="164" width="313" height="43" rx="10"/><text x="578" y="191">勤務時間</text></g>
    <g class="constraint"><rect x="557" y="216" width="313" height="43" rx="10"/><text x="578" y="243">変わる道路・注文情報</text></g>
    <path d="M51 295H835" stroke="#c9d8eb" stroke-width="3"/>
    <circle cx="65" cy="295" r="7" fill="#2f6fed"/><circle cx="442" cy="295" r="7" fill="#2f6fed"/><circle cx="824" cy="295" r="7" fill="#2f6fed"/>
    <text x="47" y="323" class="timeline">朝に計画</text><text x="395" y="323" class="timeline">注文・道路が変わる</text><text x="752" y="323" class="timeline">すぐ再計画</text>
  </svg>
</template>

<style scoped>
.dispatch-svg { display: block; width: 100%; height: 338px; font-family: 'Noto Sans JP', 'Hiragino Sans', sans-serif; }
.map-label { fill: #234369; font-size: 20px; font-weight: 700; }
.route { fill: none; stroke-width: 3.5; stroke-linecap: round; stroke-linejoin: round; }
.route-a { stroke: #4e86d4; }.route-b { stroke: #49a1bd; }.route-c { stroke: #847dd2; }
.destination circle { fill: white; stroke: #7898be; stroke-width: 2; }
.vehicle text { fill: white; font-size: 13px; font-weight: 700; text-anchor: middle; }
.map-note { fill: #b36a13; font-size: 17px; font-weight: 700; }
.constraint rect { fill: #edf4fc; stroke: #d1dff1; }
.constraint text { fill: #24466e; font-size: 18px; font-weight: 600; }
.constraint text:nth-of-type(2) { fill: #5b789c; font-size: 16px; }
.timeline { fill: #567294; font-size: 17px; font-weight: 600; }
</style>

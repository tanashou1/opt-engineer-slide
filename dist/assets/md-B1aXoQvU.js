import{B as e,E as t,M as n,R as r,S as i,Z as a,_ as o,_t as s,bt as c,ct as l,f as u,g as d,gt as f,h as p,p as m,v as h,vt as g,y as _,yt as v}from"./modules/shiki-B4NFgu0j.js";import{et as y,gt as b,tt as x}from"./index-B6GZ7iho.js";import{t as S}from"./slidev/default-EH-T0c_E.js";import{t as C}from"./DeckHeader-CJPKFSAd.js";var w=`<svg class="tech-map-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1030 710" role="img" aria-labelledby="title desc">
  <title id="title">技術領域マップ</title>
  <desc id="desc">代表的な技術分野への所属を四角形の重なりで示す。</desc>
  <style>
    .tech-map-svg text { font-family: Inter, "Noto Sans JP", "Hiragino Sans", sans-serif; }
    .tech-map-svg .bg { fill: #0f172a; }
    .tech-map-svg .title { fill: #f8fafc; font-size: 34px; font-weight: 700; }
    .tech-map-svg .area { stroke-width: 3; }
    .tech-map-svg .cs { fill: #3b82f6; fill-opacity: .07; stroke: #60a5fa; stroke-opacity: .82; }
    .tech-map-svg .opt { fill: #22c55e; fill-opacity: .07; stroke: #4ade80; stroke-opacity: .82; }
    .tech-map-svg .cp { fill: #f97316; fill-opacity: .07; stroke: #fb923c; stroke-opacity: .82; }
    .tech-map-svg .se { fill: #a855f7; fill-opacity: .07; stroke: #c084fc; stroke-opacity: .82; }
    .tech-map-svg .ds { fill: #06b6d4; fill-opacity: .075; stroke: #22d3ee; stroke-opacity: .9; stroke-width: 3; }
    .tech-map-svg .area-label { font-size: 23px; font-weight: 700; letter-spacing: .02em; paint-order: stroke; stroke: #0f172a; stroke-width: 4px; stroke-linejoin: round; }
    .tech-map-svg .label-cs { fill: #93c5fd; }
    .tech-map-svg .label-opt { font-size: 20px; fill: #86efac; }
    .tech-map-svg .label-cp { font-size: 21px; fill: #fdba74; }
    .tech-map-svg .label-se { fill: #d8b4fe; }
    .tech-map-svg .label-ds { fill: #67e8f9; }
    .tech-map-svg .major { fill: #f8fafc; font-size: 18px; font-weight: 650; }
    .tech-map-svg .tech { fill: #dbe4f0; font-size: 18px; font-weight: 500; }
  </style>

  <rect class="bg" width="1030" height="710" />

  <rect class="area cs" x="20" y="180" width="630" height="400" rx="16" />
  <rect class="area cp" x="200" y="265" width="650" height="315" rx="16" />
  <rect class="area opt" x="230" y="360" width="780" height="145" rx="16" />
  <rect class="area se" x="30" y="520" width="820" height="170" rx="16" />
  <rect class="area ds" x="440" y="80" width="380" height="350" rx="16" />

  <text class="area-label label-cs" x="45" y="215">計算機科学</text>
  <text class="area-label label-cp" x="215" y="292">競技プログラミング</text>
  <text class="area-label label-opt" x="870" y="395">数理最適化</text>
  <text class="area-label label-se" x="55" y="613">ソフトウェア工学</text>
  <text class="area-label label-ds" x="465" y="118">データサイエンス</text>

  <text class="tech" x="465" y="155">生成AI</text>
  <text class="tech" x="580" y="155">データ分析</text>
  <text class="tech" x="720" y="155">統計学</text>
  <text class="tech" x="460" y="235">機械学習</text>
  <text class="tech" x="50" y="248">OS</text>
  <text class="tech" x="50" y="280">コンパイラ</text>
  <text class="tech" x="220" y="320">アルゴリズム</text>
  <text class="tech" x="220" y="343">データ構造</text>
  <text class="tech" x="490" y="320">強化学習</text>
  <text class="tech" x="675" y="308">確率論</text>
  <text class="tech" x="675" y="338">ベイズ推定</text>
  <text class="tech" x="245" y="385">計算量・計算複雑性</text>
  <text class="tech" x="245" y="410">グラフ理論</text>
  <text class="tech" x="245" y="435">動的計画法</text>
  <text class="tech" x="245" y="460">離散最適化</text>
  <text class="tech" x="245" y="485">制約プログラミング</text>
  <text class="tech" x="460" y="397">モンテカルロ法</text>
  <text class="tech" x="670" y="475">ヒューリスティクス</text>
  <text class="tech" x="872" y="443">数理計画</text>
  <text class="tech" x="872" y="481">緩和・双対問題</text>
  <text class="tech" x="50" y="544">DB</text>
  <text class="tech" x="280" y="558">性能改善</text>
  <text class="tech" x="55" y="655">ソフトウェア設計</text>
  <text class="tech" x="255" y="655">テスト</text>
  <text class="tech" x="375" y="655">CI/CD</text>
  <text class="tech" x="495" y="655">保守・運用</text>
  <text class="tech" x="655" y="655">クラウド</text>
  <text class="tech" style="font-size:16px" x="45" y="569">通信・ネットワーク</text>
</svg>
`,T=`| 要素 | 計算機科学 | 数理最適化 | ソフトウェア工学 | 競技プログラミング | データサイエンス |
|---|:---:|:---:|:---:|:---:|:---:|
| **アルゴリズム** | ● |  |  | ● |  |
| **データ構造** | ● |  |  | ● |  |
| **計算量・計算複雑性** | ● | ● |  | ● |  |
| **グラフ理論** | ● | ● |  | ● |  |
| **動的計画法** | ● | ● |  | ● |  |
| **離散最適化** | ● | ● |  | ● |  |
| **数理計画** |  | ● |  |  |  |
| **制約プログラミング** | ● | ● |  | ● |  |
| **ヒューリスティクス** |  | ● |  | ● |  |
| **緩和・双対問題** |  | ● |  |  |  |
| **確率論** |  |  |  | ● | ● |
| **統計学** |  |  |  |  | ● |
| **ベイズ推定** |  |  |  | ● | ● |
| **モンテカルロ法** | ● | ● |  | ● | ● |
| **強化学習** | ● |  |  | ● | ● |
| **機械学習** | ● |  |  |  | ● |
| **生成AI** |  |  |  |  | ● |
| **データ分析** |  |  |  |  | ● |
| **ソフトウェア設計** |  |  | ● |  |  |
| **テスト** |  |  | ● |  |  |
| **CI/CD** |  |  | ● |  |  |
| **保守・運用** |  |  | ● |  |  |
| **性能改善** | ● |  | ● | ● |  |
| **クラウド** |  |  | ● |  |  |
| **DB** | ● |  | ● |  |  |
| **通信・ネットワーク** | ● |  | ● |  |  |
| **OS** | ● |  |  |  |  |
| **コンパイラ** | ● |  |  |  |  |

\`\`\`xml
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 1400 920"
     width="1400"
     height="920"
     role="img"
     aria-labelledby="title desc">

  <title id="title">技術領域マップ</title>
  <desc id="desc">
    計算機科学、数理最適化、ソフトウェアエンジニアリング、
    競技プログラミング、データサイエンスなどの技術分野の関係を表す図。
  </desc>

  <style>
    text {
      font-family: Inter, "Noto Sans JP", "Hiragino Sans", sans-serif;
    }

    .bg { fill: #0f172a; }

    .title {
      fill: #f8fafc;
      font-size: 34px;
      font-weight: 700;
    }

    .area {
      stroke-width: 3;
    }

    .cs {
      fill: #3b82f6;
      fill-opacity: .07;
      stroke: #60a5fa;
      stroke-opacity: .82;
    }

    .opt {
      fill: #22c55e;
      fill-opacity: .07;
      stroke: #4ade80;
      stroke-opacity: .82;
    }

    .cp {
      fill: #f97316;
      fill-opacity: .07;
      stroke: #fb923c;
      stroke-opacity: .82;
    }

    .se {
      fill: #a855f7;
      fill-opacity: .07;
      stroke: #c084fc;
      stroke-opacity: .82;
    }

    .ds {
      fill: #06b6d4;
      fill-opacity: .075;
      stroke: #22d3ee;
      stroke-opacity: .90;
      stroke-width: 3;
      stroke-linejoin: round;
      stroke-linecap: round;
    }

    .area-label {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: .02em;
    }

    .label-cs  { fill: #93c5fd; }
    .label-opt { fill: #86efac; }
    .label-cp  { fill: #fdba74; }
    .label-se  { fill: #d8b4fe; }
    .label-ds  { fill: #67e8f9; }

    .major {
      fill: #f8fafc;
      font-size: 19px;
      font-weight: 650;
    }

    .tech {
      fill: #dbe4f0;
      font-size: 15px;
      font-weight: 500;
    }
  </style>

  <rect class="bg" x="0" y="0" width="1400" height="920"/>

  <!-- Main regions -->
  <rect class="area cs"
        x="70" y="210" width="830" height="480" rx="18" ry="18"/>

  <rect class="area opt"
        x="560" y="230" width="750" height="430" rx="18" ry="18"/>

  <rect class="area cp"
        x="250" y="360" width="700" height="360" rx="18" ry="18"/>

  <rect class="area se"
        x="90" y="590" width="930" height="210" rx="18" ry="18"/>

  <!-- Data Science:
       large upper body + narrow right connector + MLOps bay -->
  <path class="ds" d="
    M 438 80
    H 1022
    Q 1040 80 1040 98
    V 412
    Q 1040 430 1022 430
    H 995
    V 675
    H 1002
    Q 1020 675 1020 693
    V 752
    Q 1020 770 1002 770
    H 922
    Q 904 770 904 752
    V 693
    Q 904 675 922 675
    H 955
    V 430
    H 438
    Q 420 430 420 412
    V 98
    Q 420 80 438 80
    Z
  "/>

  <!-- Region labels -->
  <text class="area-label label-cs"  x="105" y="250">計算機科学</text>
  <text class="area-label label-opt" x="1080" y="270">数理最適化</text>
  <text class="area-label label-cp"  x="280" y="400">競技プログラミング</text>
  <text class="area-label label-se"  x="125" y="778">ソフトウェアエンジニアリング</text>
  <text class="area-label label-ds"  x="790" y="120">データサイエンス</text>

  <!-- Data Science only -->
  <text class="major" x="470" y="150">生成AI</text>
  <text class="major" x="600" y="150">データ分析</text>
  <text class="major" x="745" y="150">可視化</text>

  <!-- CS × Data Science -->
  <text class="major" x="470" y="210">機械学習</text>
  <text class="tech"  x="610" y="210">深層学習</text>

  <!-- CP × Data Science -->
  <text class="major" x="430" y="390">統計学</text>
  <text class="tech"  x="520" y="390">ベイズ推定</text>

  <!-- CS × CP × Data Science -->
  <text class="major" x="430" y="430">確率論</text>

  <!-- CS × Optimization × CP × Data Science -->
  <text class="major" x="705" y="430">モンテカルロ法</text>

  <!-- CS × Competitive Programming -->
  <text class="major" x="300" y="490">アルゴリズム</text>
  <text class="tech"  x="300" y="530">データ構造</text>

  <!-- CS × Optimization × Competitive Programming -->
  <text class="tech"  x="575" y="485">計算量・計算複雑性</text>
  <text class="major" x="575" y="525">グラフ理論</text>
  <text class="major" x="700" y="525">動的計画法</text>
  <text class="major" x="820" y="525">探索</text>

  <text class="tech" x="575" y="565">近似アルゴリズム</text>
  <text class="tech" x="725" y="565">離散最適化</text>
  <text class="tech" x="830" y="565">制約プログラミング</text>

  <!-- Optimization × Competitive Programming -->
  <text class="major" x="700" y="565">ヒューリスティクス</text>

  <!-- Optimization only -->
  <text class="major" x="1080" y="345">数理計画</text>
  <text class="tech"  x="1080" y="390">分解・緩和法</text>

  <!-- CS × Software Engineering -->
  <text class="major" x="145" y="640">DB</text>

  <!-- CS × Software Engineering × Competitive Programming -->
  <text class="major" x="390" y="640">性能改善</text>

  <!-- Software Engineering only -->
  <text class="major" x="145" y="690">ソフトウェア設計</text>
  <text class="major" x="145" y="735">Agentic Coding</text>

  <text class="tech" x="340" y="735">テスト</text>
  <text class="tech" x="415" y="735">CI/CD</text>
  <text class="tech" x="500" y="735">保守・運用</text>
  <text class="tech" x="610" y="735">クラウド</text>

  <!-- Software Engineering × Data Science -->
  <text class="major" x="930" y="720">MLOps</text>

</svg>

\`\`\`
`,E=[`innerHTML`],D={class:`task-panel`,"aria-label":`解きたい課題`},O={class:`task-heading`},k=[`aria-pressed`,`onClick`],A={viewBox:`0 0 40 40`,"aria-hidden":`true`},j=[`d`],M=b({__name:`TechMap`,setup(t){let{$slidev:i,$nav:a,$clicksContext:o,$clicks:f,$page:g,$renderContext:y,$frontmatter:b}=x(),S=l(null),C=[{id:`game`,name:`ゲームAI`,detail:`対戦を繰り返して作戦を学ぶ`,icon:`M12 12h16c4 0 6 4 7 10l1 7c0 4-4 5-6 2l-5-5H15l-5 5c-2 3-6 2-6-2l1-7c1-6 3-10 7-10z M10 18v8 M6 22h8 M27 18h1 M31 23h1`,skills:[`アルゴリズム`,`データ構造`,`動的計画法`,`確率論`,`ベイズ推定`,`統計学`,`モンテカルロ法`,`機械学習`,`強化学習`,`データ分析`,`ヒューリスティクス`]},{id:`scheduling`,name:`スケジューリング問題`,detail:`制約を守って作業を割り当てる`,icon:`M7 9h26v25H7z M7 16h26 M13 5v8 M27 5v8 M13 22l4 4 9-7 M13 30h13`,skills:[`アルゴリズム`,`計算量・計算複雑性`,`グラフ理論`,`離散最適化`,`数理計画`,`制約プログラミング`,`ヒューリスティクス`]},{id:`delivery`,name:`配送計画`,detail:`時間と積載量を守ってルートを組む`,icon:`M5 7h17v15H5z M22 12h8l5 7v3H22 M10 22a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M29 22a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M9 11h8 M9 15h5`,skills:[`アルゴリズム`,`データ構造`,`計算量・計算複雑性`,`グラフ理論`,`離散最適化`,`数理計画`,`制約プログラミング`,`ヒューリスティクス`,`緩和・双対問題`]},{id:`forecast`,name:`需要予測`,detail:`売上と在庫を見通す`,icon:`M7 6v28h28 M12 28v-7 M20 28V15 M28 28V9 M10 15l8-5 7 2 9-7`,skills:[`統計学`,`確率論`,`ベイズ推定`,`モンテカルロ法`,`機械学習`,`データ分析`,`DB`]},{id:`assistant`,name:`AIチャットボット`,detail:`社内情報から回答する`,icon:`M6 8h28v20H19l-8 7v-7H6z M13 15h14 M13 21h9 M29 3v7 M26 6h6`,skills:[`生成AI`,`データ構造`,`DB`,`通信・ネットワーク`,`ソフトウェア設計`,`テスト`,`CI/CD`,`保守・運用`,`クラウド`,`性能改善`]},{id:`development`,name:`ソフトウェア開発`,detail:`設計から実装・運用まで`,icon:`M4 7h32v25H4z M4 13h32 M15 18l-5 5 5 5 M25 18l5 5-5 5 M22 17l-4 12`,skills:[`アルゴリズム`,`データ構造`,`計算量・計算複雑性`,`OS`,`コンパイラ`,`DB`,`通信・ネットワーク`,`性能改善`,`ソフトウェア設計`,`テスト`,`CI/CD`,`保守・運用`,`クラウド`]}],M=T.split("```")[0].split(`
`).filter(e=>e.startsWith(`| **`)).map(e=>e.split(`|`).slice(1,-1).map(e=>e.trim())),N=[[`cs`,`計算機科学`],[`opt`,`数理最適化`],[`se`,`ソフトウェア工学`],[`cp`,`競技プログラミング`],[`ds`,`データサイエンス`]].map(([e,t],n)=>({id:`region-${e}`,key:e,name:t,skills:M.filter(e=>e[n+1]===`●`).map(e=>e[0].replaceAll(`**`,``))})),P=p(()=>[...C,...N].find(e=>e.id===S.value)),F=p(()=>N.find(e=>e.id===S.value)),I=p(()=>F.value?`<svg class="tech-map-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1030 710" role="img" aria-labelledby="title desc">
  <title id="title">技術領域マップ</title>
  <desc id="desc">代表的な技術分野への所属を四角形の重なりで示す。</desc>
  <style>
    .tech-map-svg text { font-family: Inter, "Noto Sans JP", "Hiragino Sans", sans-serif; }
    .tech-map-svg .bg { fill: #0f172a; }
    .tech-map-svg .title { fill: #f8fafc; font-size: 34px; font-weight: 700; }
    .tech-map-svg .area { stroke-width: 3; }
    .tech-map-svg .cs { fill: #3b82f6; fill-opacity: .07; stroke: #60a5fa; stroke-opacity: .82; }
    .tech-map-svg .opt { fill: #22c55e; fill-opacity: .07; stroke: #4ade80; stroke-opacity: .82; }
    .tech-map-svg .cp { fill: #f97316; fill-opacity: .07; stroke: #fb923c; stroke-opacity: .82; }
    .tech-map-svg .se { fill: #a855f7; fill-opacity: .07; stroke: #c084fc; stroke-opacity: .82; }
    .tech-map-svg .ds { fill: #06b6d4; fill-opacity: .075; stroke: #22d3ee; stroke-opacity: .9; stroke-width: 3; }
    .tech-map-svg .area-label { font-size: 23px; font-weight: 700; letter-spacing: .02em; paint-order: stroke; stroke: #0f172a; stroke-width: 4px; stroke-linejoin: round; }
    .tech-map-svg .label-cs { fill: #93c5fd; }
    .tech-map-svg .label-opt { font-size: 20px; fill: #86efac; }
    .tech-map-svg .label-cp { font-size: 21px; fill: #fdba74; }
    .tech-map-svg .label-se { fill: #d8b4fe; }
    .tech-map-svg .label-ds { fill: #67e8f9; }
    .tech-map-svg .major { fill: #f8fafc; font-size: 18px; font-weight: 650; }
    .tech-map-svg .tech { fill: #dbe4f0; font-size: 18px; font-weight: 500; }
  </style>

  <rect class="bg" width="1030" height="710" />

  <rect class="area cs" x="20" y="180" width="630" height="400" rx="16" />
  <rect class="area cp" x="200" y="265" width="650" height="315" rx="16" />
  <rect class="area opt" x="230" y="360" width="780" height="145" rx="16" />
  <rect class="area se" x="30" y="520" width="820" height="170" rx="16" />
  <rect class="area ds" x="440" y="80" width="380" height="350" rx="16" />

  <text class="area-label label-cs" x="45" y="215">計算機科学</text>
  <text class="area-label label-cp" x="215" y="292">競技プログラミング</text>
  <text class="area-label label-opt" x="870" y="395">数理最適化</text>
  <text class="area-label label-se" x="55" y="613">ソフトウェア工学</text>
  <text class="area-label label-ds" x="465" y="118">データサイエンス</text>

  <text class="tech" x="465" y="155">生成AI</text>
  <text class="tech" x="580" y="155">データ分析</text>
  <text class="tech" x="720" y="155">統計学</text>
  <text class="tech" x="460" y="235">機械学習</text>
  <text class="tech" x="50" y="248">OS</text>
  <text class="tech" x="50" y="280">コンパイラ</text>
  <text class="tech" x="220" y="320">アルゴリズム</text>
  <text class="tech" x="220" y="343">データ構造</text>
  <text class="tech" x="490" y="320">強化学習</text>
  <text class="tech" x="675" y="308">確率論</text>
  <text class="tech" x="675" y="338">ベイズ推定</text>
  <text class="tech" x="245" y="385">計算量・計算複雑性</text>
  <text class="tech" x="245" y="410">グラフ理論</text>
  <text class="tech" x="245" y="435">動的計画法</text>
  <text class="tech" x="245" y="460">離散最適化</text>
  <text class="tech" x="245" y="485">制約プログラミング</text>
  <text class="tech" x="460" y="397">モンテカルロ法</text>
  <text class="tech" x="670" y="475">ヒューリスティクス</text>
  <text class="tech" x="872" y="443">数理計画</text>
  <text class="tech" x="872" y="481">緩和・双対問題</text>
  <text class="tech" x="50" y="544">DB</text>
  <text class="tech" x="280" y="558">性能改善</text>
  <text class="tech" x="55" y="655">ソフトウェア設計</text>
  <text class="tech" x="255" y="655">テスト</text>
  <text class="tech" x="375" y="655">CI/CD</text>
  <text class="tech" x="495" y="655">保守・運用</text>
  <text class="tech" x="655" y="655">クラウド</text>
  <text class="tech" style="font-size:16px" x="45" y="569">通信・ネットワーク</text>
</svg>
`.match(RegExp(`\\.label-${F.value.key}\\s*\\{[^}]*fill:\\s*(#[0-9a-fA-F]+)`))?.[1]??`#fef08a`:`#fef08a`),L=p(()=>new Set(F.value?[F.value.key]:N.filter(e=>e.skills.some(e=>R.value.has(e))).map(e=>e.key))),R=p(()=>new Set(P.value?.skills??[])),z=p(()=>w.replace(`role="img"`,`role="group"`).replace(/<text class="tech"([^>]*)>([^<]+)<\/text>/g,(e,t,n)=>`<text class="tech${R.value.has(n)?` is-lit`:``}"${t}>${n}</text>`).replace(/<text class="area-label label-(\w+)"([^>]*)>([^<]+)<\/text>/g,(e,t,n,r)=>`<text class="area-label label-${t}${L.value.has(t)?` is-relevant`:``}"${n} data-region="region-${t}" role="button" tabindex="0" aria-pressed="${S.value===`region-${t}`}">${r}</text>`));function B(e){S.value=S.value===e?null:e}async function V(e){let t=e.target.closest(`[data-region]`);if(!t)return;let r=e.currentTarget,i=t.dataset.region,a=t===document.activeElement;B(i),a&&(await n(),r?.querySelector(`[data-region="${i}"]`)?.focus())}function H(e){if([`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`].includes(e.key)){e.target.closest(`button`)?.blur();return}[`Enter`,` `].includes(e.key)&&e.target.closest(`button, [data-region]`)&&(e.stopPropagation(),e.target.closest(`[data-region]`)&&(e.preventDefault(),e.repeat||V(e)))}function U(e){[`Enter`,` `].includes(e.key)&&e.target.closest(`button, [data-region]`)&&e.stopPropagation()}return(t,n)=>(r(),_(`div`,{class:`tech-map-interactive`,onClick:n[1]||=u(()=>{},[`stop`]),onKeydown:H,onKeyup:U},[d(`div`,{class:s([`map-figure`,{"has-selection":S.value}]),style:v({"--highlight-color":I.value}),onClick:V,innerHTML:z.value},null,14,E),d(`aside`,D,[d(`div`,O,[n[2]||=d(`h2`,null,`解きたい課題`,-1),S.value?(r(),_(`button`,{key:0,class:`reset`,onClick:n[0]||=e=>S.value=null},`解除`)):h(`v-if`,!0)]),(r(),_(m,null,e(C,e=>d(`button`,{key:e.id,class:s([`task-button`,{selected:S.value===e.id}]),"aria-pressed":S.value===e.id,onClick:t=>B(e.id)},[(r(),_(`svg`,A,[d(`path`,{d:e.icon},null,8,j)])),d(`span`,null,[d(`strong`,null,c(e.name),1),d(`small`,null,c(e.detail),1)])],10,k)),64))])],32))}},[[`__scopeId`,`data-v-4ee59ec5`]]),N={class:`tech-map-stage`},P={__name:`slides.md__slidev_7`,setup(e){let{$slidev:n,$nav:s,$clicksContext:c,$clicks:l,$page:u,$renderContext:p,$frontmatter:m}=x();return c.setup(),(e,n)=>{let s=C,c=M;return r(),o(S,g(t(f(y)(f(m),6))),{default:a(()=>[i(s,{chapter:`1 数理最適化とは`,subtitle:`技術マップ`,title:`技術領域マップ`}),d(`div`,N,[i(c)])]),_:1},16)}}};export{P as default};
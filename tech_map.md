| 要素 | 計算機科学 | 数理最適化 | ソフトウェア工学 | 競技プログラミング | データサイエンス |
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

```xml
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

```

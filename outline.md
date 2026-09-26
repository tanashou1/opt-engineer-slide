# タイトル
数理最適化エンジニアの価値
# 自己紹介
## 顔
https://recruit.toyota/img/interview/main/134@2x.jpg

### 年表
1989 生まれ
2008～2014年 筑波大学・筑波大学院
2014～2017年 東芝
2018～2020年 みずほ情報総研
2021～2023年 クロネコヤマト
2024年3月 アルゴリズムGr

## Interest Map
領域を拡大すると画像など出てくるようなインタラクティブなものにする
- 車
  - 愛車
    - 218d グランツアラー
    - ライズ
  - ジャンクション
    - 大黒ジャンクション
    - 箱崎ジャンクション
  - ドライブウェイ
    - 伊豆スカイライン
    - 箱根ターンパイク
    - ビーナスライン
- 土地
  - 長野
  - 千葉
  - 筑波
  - 川崎
- 職歴
  - 東芝
  - みずほ情報総研
  - クロネコヤマト
- 経験
  - 数値計算
    - 数値流体
      - 計算力学技術者1級
      - OpenFOAM
      - 混相流
    - 電気化学計算
      - FCスタック
    - マルチフィジックス
      - COMSOL
  - 数理最適化
    - 宅急便ドライバーの配送計画
    - 発電機設計の最適化
  - 発電・エネルギー
    - 水力
    - 風力
    - 火力
    - 波力
    - 水素
      - NEDO 水素ロードマップ策定
  - 機械学習
    - 画像認識
    - 需要予測
  - プログラミング
    - Rust
    - TypeScript
    - Python
    - FORTRAN
- 音楽
  - 楽器
    - ギター
    - ベース
    - ドラム
    - ピアノ（息子と練習中）
  - アーティスト
    - Vulfpeck
    - ZTMY
    - 相対性理論
    - カラスは真っ白
    - 神前暁
    - 沖井礼二
    - TEMPLIME
    - Fourplay
    - カシオペア
    - Larry Carlton
    - Lee Ritenour
- ゲーム
  - 将棋（アマ二段）
  - ぷよぷよ（Switchレート2800）
  - マイクラ（子供と）
- 漫画
  - 刃牙
  - JOJO
  - BLUE GIANT

# 目次・話すこと話さないこと

# 競技プログラミングとは
## 具体的な問題1
コーディング試験で出るような、比較的単純な問題
## 具体的な問題2
インタラクティブな最適化のデモ
- 障害物のあるグリッドのフィールドに、2x1の駐車枠を敷き詰める問題
- クリックして障害物を配置
- その場で計算して最適な駐車枠を計算し、表示する。
  - 障害物クリア、最適化計算 のボタンを配置
- ロジックは、市松模様に2領域に分けて、二部マッチングのアルゴリズムで解く
## 具体的な問題3
長期AHCの難しい問題

## 技術マップ
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 1400 900"
  width="100%"
  role="img"
  aria-labelledby="title desc"
>
  <title id="title">技術領域マップ</title>
  <desc id="desc">
    計算機科学、数理最適化、機械学習、ソフトウェアエンジニアリング、
    競技プログラミングの重なりを示す技術マップ
  </desc>

  <style>
    text {
      font-family:
        Inter,
        "Noto Sans JP",
        "Hiragino Sans",
        sans-serif;
    }

    .background {
      fill: #0f172a;
    }

    .map-title {
      fill: #f8fafc;
      font-size: 34px;
      font-weight: 700;
      letter-spacing: .02em;
    }

    .map-subtitle {
      fill: #94a3b8;
      font-size: 15px;
      font-weight: 400;
    }

    .area {
      stroke-width: 3;
    }

    .cs {
      fill: #3b82f6;
      fill-opacity: .075;
      stroke: #60a5fa;
      stroke-opacity: .84;
    }

    .optimization {
      fill: #22c55e;
      fill-opacity: .075;
      stroke: #4ade80;
      stroke-opacity: .84;
    }

    .ml {
      fill: #06b6d4;
      fill-opacity: .08;
      stroke: #22d3ee;
      stroke-opacity: .9;
    }

    .software {
      fill: #a855f7;
      fill-opacity: .075;
      stroke: #c084fc;
      stroke-opacity: .84;
    }

    .competitive {
      fill: #f97316;
      fill-opacity: .075;
      stroke: #fb923c;
      stroke-opacity: .84;
    }

    .area-label {
      fill: #f8fafc;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: .02em;
    }

    .tech-major {
      fill: #f8fafc;
      font-size: 20px;
      font-weight: 650;
      letter-spacing: .01em;
    }

    .tech {
      fill: #dbe4f0;
      font-size: 16px;
      font-weight: 500;
    }

    .tech-small {
      fill: #cbd5e1;
      font-size: 14px;
      font-weight: 500;
    }

    .tech-minor {
      fill: #94a3b8;
      font-size: 13px;
      font-weight: 450;
    }
  </style>

  <!-- Background -->
  <rect class="background" x="0" y="0" width="1400" height="900" />

  <!-- Title -->
  <text class="map-title" x="60" y="58">技術領域マップ</text>
  <text class="map-subtitle" x="60" y="86">
    機械学習を独立領域として上側に置き、他領域との重なりを整理
  </text>

  <!-- Areas -->
  <rect class="area cs" x="90" y="210" width="760" height="400" rx="42" />
  <rect class="area optimization" x="730" y="220" width="570" height="400" rx="42" />
  <rect class="area ml" x="410" y="80" width="620" height="360" rx="42" />
  <rect class="area software" x="110" y="500" width="780" height="290" rx="42" />
  <rect class="area competitive" x="350" y="405" width="530" height="235" rx="42" />

  <!-- Area labels -->
  <text class="area-label" x="125" y="250">計算機科学</text>
  <text class="area-label" x="1085" y="255">数理最適化</text>
  <text class="area-label" x="845" y="120">機械学習</text>
  <text class="area-label" x="145" y="770">ソフトウェアエンジニアリング</text>
  <text class="area-label" x="620" y="620">競技プログラミング</text>

  <!-- Machine Learning: core -->
  <text class="tech-major" x="640" y="155">深層学習</text>
  <text class="tech" x="515" y="195">統計的学習</text>
  <text class="tech" x="705" y="195">表現学習</text>
  <text class="tech" x="875" y="195">汎化</text>

  <text class="tech" x="555" y="255">生成モデル</text>
  <text class="tech" x="735" y="255">自己教師あり学習</text>
  <text class="tech" x="900" y="255">強化学習</text>

  <!-- ML × CS -->
  <text class="tech-small" x="455" y="325">学習アルゴリズム</text>
  <text class="tech-small" x="455" y="355">データ処理</text>
  <text class="tech-minor" x="500" y="388">計算効率</text>

  <!-- ML × Optimization -->
  <text class="tech-major" x="765" y="325">勾配法</text>
  <text class="tech" x="835" y="360">損失最小化</text>
  <text class="tech-small" x="835" y="395">ハイパーパラメータ最適化</text>

  <!-- ML × Software Engineering -->
  <text class="tech" x="575" y="438">MLOps</text>
  <text class="tech-small" x="655" y="438">実験管理</text>
  <text class="tech-small" x="740" y="438">モデル管理</text>

  <!-- Computer Science -->
  <text class="tech" x="155" y="325">データ構造</text>
  <text class="tech-major" x="190" y="385">アルゴリズム</text>
  <text class="tech" x="155" y="445">計算量</text>
  <text class="tech-minor" x="280" y="430">OS / ネットワーク</text>

  <!-- CS × Optimization -->
  <text class="tech-major" x="600" y="470">離散最適化</text>
  <text class="tech" x="575" y="510">近似アルゴリズム</text>
  <text class="tech" x="520" y="545">グラフ理論</text>

  <!-- Mathematical Optimization -->
  <text class="tech-major" x="1080" y="330">線形計画</text>
  <text class="tech-major" x="1110" y="390">整数計画</text>
  <text class="tech" x="1065" y="450">制約最適化</text>
  <text class="tech-small" x="1135" y="500">列生成</text>
  <text class="tech-small" x="1025" y="550">Benders分解</text>
  <text class="tech-small" x="1085" y="590">ラグランジュ緩和</text>

  <!-- CS × Software Engineering -->
  <text class="tech" x="170" y="560">設計</text>
  <text class="tech" x="275" y="560">テスト</text>
  <text class="tech-small" x="175" y="605">抽象化</text>
  <text class="tech-small" x="285" y="605">API設計</text>

  <!-- Competitive Programming -->
  <text class="tech" x="390" y="450">DP</text>
  <text class="tech" x="400" y="495">全探索</text>
  <text class="tech-major" x="445" y="540">探索</text>
  <text class="tech-minor" x="385" y="585">実装高速化</text>

  <!-- Competitive Programming × Optimization -->
  <text class="tech-major" x="640" y="545">局所探索</text>
  <text class="tech" x="665" y="585">メタヒューリスティクス</text>
  <text class="tech" x="600" y="620">ヒューリスティック</text>
  <text class="tech" x="805" y="620">AHC</text>

  <!-- Software Engineering -->
  <text class="tech" x="170" y="675">CI/CD</text>
  <text class="tech" x="290" y="715">保守</text>
  <text class="tech" x="410" y="745">運用</text>
  <text class="tech-minor" x="520" y="760">コード品質</text>

  <!-- Practical overlaps -->
  <text class="tech-small" x="560" y="690">再現性</text>
  <text class="tech-small" x="645" y="705">可視化</text>
  <text class="tech-minor" x="750" y="755">性能改善</text>
</svg>

# AI時代における数理最適化エンジニアの価値
## 生成AIの実力
https://sakanaai.github.io/ALE-Bench-Leaderboard/
のBenchmark Results by Release Date のx16で。できればLongのみのレートにして。
全てのAIモデルを入れる必要はない。Claude Code, Grok, GPTの主要なモデルのみで。
2000,2400,3200にメンバーを一人ずつ置いて。時系列でモデルの実力をインタラクティブに見せられるようにして、人間を抜く様子を紹介する
## 人間の価値
- モデリング・定式化
- 膨大な現実世界の情報のエンジニアリング
- 意思決定
- 意志をもって進めていく

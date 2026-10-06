<template>
  <div class="container-loading" role="group" aria-label="Container Loadingの荷物積載例と条件">
    <figure class="loading-example">
      <img :src="loadingImage" alt="緑や黄緑の箱をコンテナ内に積み上げた立体図" />
      <figcaption>Container Loading の積載例</figcaption>
    </figure>

    <section class="loading-conditions" aria-labelledby="loading-conditions-title">
      <h2 id="loading-conditions-title">積み方を決める条件</h2>
      <ol>
        <li>荷物ごとの向き・回転制限</li>
        <li>指定された順番をなるべく守る</li>
        <li>底面の60%以上を支える</li>
      </ol>
      <div class="score-card">
        <strong>評価</strong>
        <span>低く積み、積載順の乱れを減らす</span>
        <small>高さ超過には大きなペナルティ</small>
      </div>
      <a href="https://atcoder.jp/contests/toyota-hc-2023spring/tasks/toyota_hc_2023spring_a" target="_blank" rel="noopener noreferrer">出典: AtCoder A · Container Loading ↗</a>
    </section>
  </div>
</template>

<script setup>
import loadingImage from '../assets/container-loading-reference.png?url'
</script>

<style scoped>
.container-loading { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); gap: 32px; align-items: center; width: 100%; }
.loading-example { margin: 0; text-align: center; }
.loading-example img { display: block; width: 100%; height: 350px; object-fit: contain; }
.loading-example figcaption { margin-top: 5px; color: #536d8b; font-size: 14px; font-weight: 600; }
.loading-conditions h2 { margin: 0 0 14px; color: #1f3c60; font-size: 21px; }
.loading-conditions ol { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; counter-reset: condition; }
.loading-conditions li { counter-increment: condition; display: flex; align-items: center; min-height: 46px; padding: 0 14px; border: 1px solid #d9e5f2; border-radius: 12px; background: #f3f7fc; color: #294765; font-size: 16px; font-weight: 600; }
.loading-conditions li::before { content: counter(condition); display: grid; place-items: center; flex: 0 0 24px; width: 24px; height: 24px; margin-right: 12px; border-radius: 50%; background: #386da9; color: white; font-size: 13px; }
.score-card { display: grid; grid-template-columns: auto 1fr; gap: 4px 12px; margin-top: 12px; padding: 12px 16px; border: 1px solid #cbdcf0; border-radius: 12px; background: #eaf2fb; color: #294765; font-size: 14px; }
.score-card strong { color: #386da9; }
.score-card small { grid-column: 1 / -1; color: #617a98; font-size: 12px; }
.loading-conditions a { display: inline-block; margin-top: 12px; color: #7d91a9; font-size: 12px; text-decoration: none; }
</style>

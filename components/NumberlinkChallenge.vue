<script setup>
import { ref } from 'vue'
import geminiAnswerImage from '../assets/gemini-numberlink-answer.png'

const answerMode = ref(null)

const rows = [
  '1.4....',
  '2....3.',
  '...2...',
  '.......',
  '.......',
  '..5.4..',
  '1.3...5',
]

const colorNames = {
  '1': 'blue',
  '2': 'orange',
  '3': 'green',
  '4': 'purple',
  '5': 'coral',
}

const cells = rows.flatMap((row, rowIndex) => [...row].map((value, colIndex) => ({
  id: `${rowIndex}-${colIndex}`,
  value: value === '.' ? '' : value,
  color: colorNames[value],
})))

const mainRoutes = [
  { number: '1', cells: [0, 1, 8, 9, 10, 11, 18, 25, 24, 23, 22, 21, 28, 35, 42] },
  { number: '2', cells: [7, 14, 15, 16, 17] },
  { number: '3', cells: [12, 19, 26, 33, 32, 31, 30, 29, 36, 43, 44] },
  { number: '4', cells: [2, 3, 4, 5, 6, 13, 20, 27, 34, 41, 40, 39] },
  { number: '5', cells: [37, 38, 45, 46, 47, 48] },
]

const makePaths = (routes, size, extent, padding, gap) => {
  const cellSize = (extent - padding * 2 - gap * (size - 1)) / size
  return routes.map(route => ({
    id: route.id || route.number,
    number: route.number,
    color: colorNames[route.number],
    d: route.cells.map((index, i) => {
      const row = Math.floor(index / size)
      const col = index % size
      const x = padding + col * (cellSize + gap) + cellSize / 2
      const y = padding + row * (cellSize + gap) + cellSize / 2
      return `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`
    }).join(' '),
  }))
}

const mainPaths = makePaths(mainRoutes, 7, 300, 8, 4)

const geminiAnswerRows = [
  '1 ── 4 ──── ┐ ┌ ┐',
  '2 ── ┐   3  │ │ │',
  '┌ ── ┘ 2 ── ┘ │ │',
  '│ ┌ ───────── ┘ │',
  '│ │ ┌ ───────── ┘',
  '│ │ 5 ── 4 ── ┐',
  '1 │ 3 ─────── 5',
]
const geminiLineSegments = (() => {
  const segments = []
  const first = 8 + (300 - 16 - 4 * 6) / 14
  const stepX = (300 - 2 * first) / 16
  const stepY = (300 - 2 * first) / 6
  const cellPitch = (300 - 16 - 4 * 6) / 7 + 4
  const columnOverrides = {
    0: { 0: 0, 5: 2, 12: 4, 14: 5, 16: 6 },
    1: { 0: 0, 9: 5 },
    2: { 7: 3, 12: 4 },
    5: { 4: 2, 9: 4, 14: 6 },
    6: { 0: 0, 4: 2, 14: 6 },
  }
  const getColumn = (row, col) => columnOverrides[row]?.[col] ?? Math.max(0, Math.min(6, Math.round(col * stepX / cellPitch)))
  const getX = (row, col) => first + getColumn(row, col) * cellPitch
  const hasEndpointAt = (row, boardColumn) => row >= 0 && row < geminiAnswerRows.length
    && [...geminiAnswerRows[row]].some((symbol, col) => /\d/.test(symbol) && getColumn(row, col) === boardColumn)
  const add = (row, col, dx1, dy1, dx2, dy2) => {
    const x = getX(row, col)
    const y = first + row * stepY
    segments.push({
      id: `gemini-${row}-${col}-${segments.length}`,
      x1: x + dx1,
      y1: y + dy1,
      x2: x + dx2,
      y2: y + dy2,
    })
  }
  const addHorizontal = (row, left, right) => {
    const y = first + row * stepY
    segments.push({
      id: `gemini-${row}-${left}-${segments.length}`,
      x1: getX(row, left),
      y1: y,
      x2: getX(row, right),
      y2: y,
    })
  }

  geminiAnswerRows.forEach((line, row) => {
    const symbols = [...line]
    for (let col = 0; col < symbols.length; col++) {
      const symbol = symbols[col]
      if (symbol === '─') {
        const runStart = col
        while (symbols[col + 1] === '─') col++
        const runEnd = col
        let left = runStart - 1
        let right = runEnd + 1
        while (left >= 0 && symbols[left] === ' ') left--
        while (right < symbols.length && symbols[right] === ' ') right++
        const isAnchor = index => index >= 0 && /[0-9┌┐└┘]/.test(symbols[index])
        if (isAnchor(left) && isAnchor(right)) addHorizontal(row, left, right)
        else add(row, runStart, -stepX / 2, 0, (runEnd - runStart + 0.5) * stepX, 0)
        continue
      }
    if (symbol === '│') add(row, col, 0, -stepY / 2, 0, stepY / 2)
    if (symbol === '┌') {
      add(row, col, 0, 0, cellPitch / 2, 0)
      add(row, col, 0, 0, 0, hasEndpointAt(row + 1, getColumn(row, col)) ? stepY : stepY / 2)
    }
    if (symbol === '┐') {
      add(row, col, -cellPitch / 2, 0, 0, 0)
      const continuesToLowerTwo = row === 0 && col === 12
      const verticalLength = continuesToLowerTwo
        ? stepY * 2
        : hasEndpointAt(row + 1, getColumn(row, col)) ? stepY : stepY / 2
      add(row, col, 0, 0, 0, verticalLength)
    }
    if (symbol === '└') {
      add(row, col, 0, 0, cellPitch / 2, 0)
      add(row, col, 0, hasEndpointAt(row - 1, getColumn(row, col)) ? -stepY : -stepY / 2, 0, 0)
    }
    if (symbol === '┘') {
      add(row, col, -cellPitch / 2, 0, 0, 0)
      add(row, col, 0, hasEndpointAt(row - 1, getColumn(row, col)) ? -stepY : -stepY / 2, 0, 0)
    }
    }
  })

  return segments
})()

const toggleAnswer = mode => { answerMode.value = answerMode.value === mode ? null : mode }

const exampleEndpointRows = [
  '2..3',
  '1.2.',
  '3.1.',
  '....',
]
const exampleRoutes = [
  { number: '1', cells: [4, 5, 9, 10] },
  { number: '2', cells: [0, 1, 2, 6] },
  { number: '3', cells: [3, 7, 11, 15, 14, 13, 12, 8] },
]
const exampleCells = exampleEndpointRows.flatMap((row, rowIndex) => [...row].map((value, colIndex) => ({
  id: `example-${rowIndex}-${colIndex}`,
  value: value === '.' ? '' : value,
  color: colorNames[value],
})))
const examplePaths = makePaths(exampleRoutes, 4, 132, 6, 3)
</script>

<template>
  <div class="numberlink-layout" role="group" aria-label="7行7列、5組の数字をつなぐナンバーリンク問題">
    <div class="numberlink-board-panel">
      <div class="board-caption">
        <b>{{ answerMode === 'gemini' ? 'Geminiの回答' : answerMode === 'optimization' ? '求解結果' : '問題の盤面' }}</b>
        <div class="answer-buttons">
          <button class="answer-button gemini-button" type="button" :aria-pressed="answerMode === 'gemini'" @click.stop="toggleAnswer('gemini')">Geminiの回答</button>
          <button class="answer-button optimization-button" type="button" :aria-pressed="answerMode === 'optimization'" @click.stop="toggleAnswer('optimization')">数理最適化で求解</button>
        </div>
      </div>
      <div class="numberlink-stage">
        <div class="numberlink-grid" role="img" :aria-label="answerMode === 'gemini' ? '7行7列の数字盤面。Geminiの回答図は右側に原文のまま表示' : answerMode === 'optimization' ? '7行7列の盤面に数理最適化による5組の解を表示' : '7行7列の盤面。1は左上と左下、2は2行1列と3行4列、3は2行6列と7行3列、4は1行3列と6行5列、5は6行3列と7行7列'">
          <div v-for="cell in cells" :key="cell.id" class="numberlink-cell">
            <span v-if="cell.value" :class="['number-endpoint', `endpoint-${cell.color}`]">{{ cell.value }}</span>
          </div>
          <svg v-if="answerMode === 'gemini'" class="path-overlay gemini-path-overlay" viewBox="0 0 300 300" aria-hidden="true">
            <line v-for="segment in geminiLineSegments" :key="segment.id" class="gemini-answer-line" :x1="segment.x1" :y1="segment.y1" :x2="segment.x2" :y2="segment.y2" />
          </svg>
          <svg v-else-if="answerMode === 'optimization'" class="path-overlay" viewBox="0 0 300 300" aria-hidden="true">
            <path v-for="path in mainPaths" :key="path.number" :class="['path-line', `route-${path.color}`]" :d="path.d" />
          </svg>
        </div>
      </div>
      <div class="board-stats"><b>7 × 7</b><span>49マス</span><i></i><b>5組</b><span>数字ペア</span></div>
      <p v-if="answerMode === 'gemini'" class="gemini-coordinate-note">Geminiの回答図にある線を、形のまま盤面に重ねています。</p>
    </div>

    <figure v-if="answerMode === 'gemini'" class="gemini-capture">
      <figcaption>Geminiの回答画面</figcaption>
      <img :src="geminiAnswerImage" alt="Geminiが返したナンバーリンクの回答。数字と罫線で経路を表した図" />
    </figure>

    <section v-else-if="answerMode === 'optimization'" class="optimization-formulation" aria-label="ナンバーリンクの整数計画定式化">
      <h2>ナンバーリンクの定式化</h2>

      <div class="formulation-section">
        <h3>変数</h3>
        <p><i>G</i> = (<i>V</i>, <i>E</i>)、数字ペア <i>k</i> の端点 <i>s</i><sub>k</sub>, <i>t</i><sub>k</sub>。</p>
        <p><i>y</i><sub>v,k</sub>, <i>x</i><sub>e,k</sub> ∈ {0,1} は割当・使用辺、<i>f</i><sub>uv,k</sub> ≥ 0 は隣接マス u→v の有向フロー。</p>
      </div>

      <div class="formulation-section">
        <h3>制約</h3>
        <ol class="formulation-constraints">
          <li>
            <b>全マスをちょうど1組に割り当てる</b>
            <math class="math-formula" display="block">
              <mrow><msub><mo>∑</mo><mi>k</mi></msub><msub><mi>y</mi><mrow><mi>v</mi><mo>,</mo><mi>k</mi></mrow></msub><mo>=</mo><mn>1</mn><mspace width="1em"/><mo stretchy="false">(</mo><mo>∀</mo><mi>v</mi><mo stretchy="false">)</mo></mrow>
            </math>
            <math class="math-formula compact-formula" display="block">
              <mrow><msub><mi>y</mi><mrow><msub><mi>s</mi><mi>k</mi></msub><mo>,</mo><mi>k</mi></mrow></msub><mo>=</mo><msub><mi>y</mi><mrow><msub><mi>t</mi><mi>k</mi></msub><mo>,</mo><mi>k</mi></mrow></msub><mo>=</mo><mn>1</mn><mspace width=".5em"/><mtext>(端点)</mtext></mrow>
            </math>
          </li>
          <li>
            <b>辺は同じペアのマスだけを結び、端点と中間マスの次数を守る</b>
            <math class="math-formula" display="block">
              <mrow><msub><mi>x</mi><mrow><mo stretchy="false">{</mo><mi>u</mi><mo>,</mo><mi>v</mi><mo stretchy="false">}</mo><mo>,</mo><mi>k</mi></mrow></msub><mo>≤</mo><msub><mi>y</mi><mrow><mi>u</mi><mo>,</mo><mi>k</mi></mrow></msub><mo>,</mo><mspace width=".7em"/><msub><mi>x</mi><mrow><mo stretchy="false">{</mo><mi>u</mi><mo>,</mo><mi>v</mi><mo stretchy="false">}</mo><mo>,</mo><mi>k</mi></mrow></msub><mo>≤</mo><msub><mi>y</mi><mrow><mi>v</mi><mo>,</mo><mi>k</mi></mrow></msub></mrow>
            </math>
            <math class="math-formula" display="block">
              <mrow><msub><mo>∑</mo><mrow><mi>e</mi><mo>∈</mo><mi>δ</mi><mo stretchy="false">(</mo><mi>v</mi><mo stretchy="false">)</mo></mrow></msub><msub><mi>x</mi><mrow><mi>e</mi><mo>,</mo><mi>k</mi></mrow></msub><mo>=</mo><mn>1</mn><mspace width=".5em"/><mo stretchy="false">(</mo><mi>v</mi><mo>=</mo><msub><mi>s</mi><mi>k</mi></msub><mtext> または </mtext><mi>v</mi><mo>=</mo><msub><mi>t</mi><mi>k</mi></msub><mo stretchy="false">)</mo></mrow>
            </math>
            <math class="math-formula" display="block">
              <mrow><msub><mo>∑</mo><mrow><mi>e</mi><mo>∈</mo><mi>δ</mi><mo stretchy="false">(</mo><mi>v</mi><mo stretchy="false">)</mo></mrow></msub><msub><mi>x</mi><mrow><mi>e</mi><mo>,</mo><mi>k</mi></mrow></msub><mo>=</mo><mn>2</mn><msub><mi>y</mi><mrow><mi>v</mi><mo>,</mo><mi>k</mi></mrow></msub><mspace width=".5em"/><mtext>(それ以外)</mtext></mrow>
            </math>
          </li>
          <li>
            <b>フローで端点から全マスへの連結を保証</b>
            <small><i>s</i><sub>k</sub>を供給源にし、<i>s</i><sub>k</sub>以外の割当マスは各1単位を消費する。</small>
            <math class="math-formula" display="block">
              <mrow><msub><mo>∑</mo><mrow><mi>v</mi><mo>∈</mo><mi>N</mi><mo stretchy="false">(</mo><msub><mi>s</mi><mi>k</mi></msub><mo stretchy="false">)</mo></mrow></msub><msub><mi>f</mi><mrow><msub><mi>s</mi><mi>k</mi></msub><mi>v</mi><mo>,</mo><mi>k</mi></mrow></msub><mo>−</mo><msub><mo>∑</mo><mrow><mi>u</mi><mo>∈</mo><mi>N</mi><mo stretchy="false">(</mo><msub><mi>s</mi><mi>k</mi></msub><mo stretchy="false">)</mo></mrow></msub><msub><mi>f</mi><mrow><mi>u</mi><msub><mi>s</mi><mi>k</mi></msub><mo>,</mo><mi>k</mi></mrow></msub><mo>=</mo><msub><mo>∑</mo><mrow><mi>v</mi><mo>≠</mo><msub><mi>s</mi><mi>k</mi></msub></mrow></msub><msub><mi>y</mi><mrow><mi>v</mi><mo>,</mo><mi>k</mi></mrow></msub></mrow>
            </math>
            <math class="math-formula" display="block">
              <mrow><msub><mo>∑</mo><mrow><mi>u</mi><mo>∈</mo><mi>N</mi><mo stretchy="false">(</mo><mi>v</mi><mo stretchy="false">)</mo></mrow></msub><msub><mi>f</mi><mrow><mi>u</mi><mi>v</mi><mo>,</mo><mi>k</mi></mrow></msub><mo>−</mo><msub><mo>∑</mo><mrow><mi>w</mi><mo>∈</mo><mi>N</mi><mo stretchy="false">(</mo><mi>v</mi><mo stretchy="false">)</mo></mrow></msub><msub><mi>f</mi><mrow><mi>v</mi><mi>w</mi><mo>,</mo><mi>k</mi></mrow></msub><mo>=</mo><msub><mi>y</mi><mrow><mi>v</mi><mo>,</mo><mi>k</mi></mrow></msub><mspace width=".5em"/><mo stretchy="false">(</mo><mi>v</mi><mo>≠</mo><msub><mi>s</mi><mi>k</mi></msub><mo stretchy="false">)</mo></mrow>
            </math>
            <math class="math-formula" display="block">
              <mrow><mn>0</mn><mo>≤</mo><msub><mi>f</mi><mrow><mi>u</mi><mi>v</mi><mo>,</mo><mi>k</mi></mrow></msub><mo>≤</mo><mn>48</mn><msub><mi>x</mi><mrow><mo stretchy="false">{</mo><mi>u</mi><mo>,</mo><mi>v</mi><mo stretchy="false">}</mo><mo>,</mo><mi>k</mi></mrow></msub></mrow>
            </math>
            <small>選んだ辺だけに流せるため、始点から切れたマス群は需要を満たせない。48は始点以外の最大マス数。</small>
          </li>
        </ol>
      </div>

      <p class="formulation-footer">49マス全てを使い、5組それぞれの端点を結ぶ。</p>
    </section>

    <div v-else class="numberlink-explanation">
      <div class="rules-example">
        <section class="rules-panel">
          <h2>ルール</h2>
          <div class="numberlink-rules">
            <div><b>01</b><span>同じ数字を1本の経路で結ぶ</span></div>
            <div><b>02</b><span>上下左右のみ。交差・分岐は不可</span></div>
            <div><b>03</b><span>全49マスをちょうど1回使う</span></div>
          </div>
        </section>

        <section class="example-panel">
          <h2>例</h2>
          <div class="example-grid" role="img" aria-label="4行4列の例題の正解。経路1、2、3を線でつなぎ、全16マスを埋めた図">
            <div v-for="cell in exampleCells" :key="cell.id" class="example-cell">
              <span v-if="cell.value" :class="['example-endpoint', `endpoint-${cell.color}`]">{{ cell.value }}</span>
            </div>
            <svg class="path-overlay" viewBox="0 0 132 132" aria-hidden="true">
              <path v-for="path in examplePaths" :key="path.number" :class="['path-line', `route-${path.color}`]" :d="path.d" />
            </svg>
          </div>
        </section>
      </div>

      <div class="numberlink-methods">
        <article class="direct-method">
          <header><span class="method-dot"></span><b>生成AIの直接回答</b></header>
          <p>線の候補は描けても、全49マス・5組を満たす保証はない。</p>
        </article>
        <article class="solver-method">
          <header><span class="method-dot"></span><b>数理最適化で解く</b></header>
          <p>セルと辺を変数にし、接続・非交差・全マス使用を制約化。</p>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.numberlink-layout { display: grid; grid-template-columns: minmax(285px, .86fr) minmax(0, 1.14fr); align-items: center; gap: 24px; color: #24466e; }
.numberlink-board-panel { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.board-caption { display: flex; width: min(100%, 320px); align-items: center; justify-content: space-between; gap: 8px; }
.board-caption b { color: #365981; font-size: 11px; }
.answer-buttons { display: flex; align-items: center; gap: 5px; }
.answer-button { padding: 6px 9px; border: 1px solid #c7d7eb; border-radius: 6px; color: #466487; background: #fff; font: 700 9px 'Noto Sans JP', sans-serif; cursor: pointer; white-space: nowrap; }
.answer-button:hover { background: #edf4ff; }.answer-button[aria-pressed="true"] { color: #fff; }
.gemini-button[aria-pressed="true"] { border-color: #d86c57; background: #d86c57; }.optimization-button[aria-pressed="true"] { border-color: #2f6fed; background: #2f6fed; }
.answer-button:focus-visible { outline: 2px solid #8cb8f1; outline-offset: 2px; }
.numberlink-stage { display: grid; box-sizing: border-box; width: min(100%, 300px); aspect-ratio: 1; place-items: center; }
.numberlink-grid { position: relative; box-sizing: border-box; display: grid; width: 100%; aspect-ratio: 1; grid-template-columns: repeat(7, minmax(0, 1fr)); grid-template-rows: repeat(7, minmax(0, 1fr)); gap: 4px; padding: 8px; border-radius: 9px; background: #dce7f7; box-shadow: 5px 6px 0 #c3d4eb; }
.path-overlay { position: absolute; z-index: 2; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
.path-line { fill: none; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; opacity: .92; }
.gemini-path-overlay { z-index: 2; }
.gemini-answer-line { stroke: #34465f; stroke-width: 4.5; stroke-linecap: round; stroke-linejoin: round; }
.route-blue { stroke: #2f6fed; }.route-orange { stroke: #e99835; }.route-green { stroke: #249d7d; }.route-purple { stroke: #8867c7; }.route-coral { stroke: #dd665d; }
.numberlink-cell { display: grid; place-items: center; border: 1px solid #d3dfef; border-radius: 4px; background: #fff; }
.number-endpoint { position: relative; z-index: 3; display: grid; width: 25px; height: 25px; place-items: center; border-radius: 50%; color: #fff; font: 700 12px Arial, sans-serif; box-shadow: 0 2px 4px #10274b22; }
.endpoint-blue { background: #2f6fed; }.endpoint-orange { background: #e99835; }.endpoint-green { background: #249d7d; }.endpoint-purple { background: #8867c7; }.endpoint-coral { background: #dd665d; }
.board-stats { display: flex; align-items: baseline; gap: 6px; color: #8192a8; font-size: 9px; }.board-stats b { color: #42658f; font-size: 10px; }.board-stats i { width: 1px; height: 10px; margin: 0 3px; background: #cbd8e8; }

.numberlink-explanation { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
.gemini-capture { display: flex; flex-direction: column; gap: 8px; min-width: 0; margin: 0; }
.gemini-capture figcaption { display: flex; align-items: center; gap: 7px; color: #365981; font-size: 11px; font-weight: 700; }
.gemini-capture figcaption small { padding: 2px 6px; border-radius: 8px; color: #b14939; background: #fff0ec; font-size: 8px; }
.gemini-capture img { display: block; width: 100%; max-height: 330px; object-fit: contain; border-radius: 10px; background: #151515; box-shadow: 4px 5px 0 #c3d4eb; }
.optimization-formulation { display: flex; flex-direction: column; gap: 2px; min-width: 0; padding: 9px 12px; border: 1px solid #d0d0d0; border-radius: 4px; color: #111 !important; background: #fff !important; box-shadow: none; }
.optimization-formulation * { color: #111 !important; background-color: #fff !important; box-shadow: none !important; }
.optimization-formulation h2 { margin: 0 0 2px !important; color: #111; font-size: 14px !important; font-weight: 700; line-height: 1.15 !important; }
.formulation-section h3 { margin: 2px 0 !important; color: #111; font-size: 10px !important; font-weight: 700; line-height: 1.15 !important; }
.formulation-section p { margin: 1px 0 !important; color: #111; font-size: 8px !important; line-height: 1.15 !important; }
.formulation-constraints { display: flex; flex-direction: column; gap: 2px; margin: 0 !important; padding-left: 16px; }
.formulation-constraints li { padding-left: 1px; color: #111; font-size: 8px !important; line-height: 1.1 !important; }
.formulation-constraints li::marker { font-size: 8px; }
.formulation-constraints li b { display: block; color: #111; font-size: 8px !important; line-height: 1.1 !important; }
.math-formula { display: block; margin: 0 auto !important; color: #111 !important; background: #fff !important; font-size: 11px !important; line-height: 1 !important; }
.compact-formula { font-size: 10px !important; }
.formulation-constraints small { display: block; color: #111; font-size: 7px !important; line-height: 1.1 !important; }
.formulation-footer { margin: 0 !important; padding-top: 2px; color: #111; font-size: 8px !important; line-height: 1.1 !important; text-align: center; }
.gemini-coordinate-note { max-width: 300px; margin: 0; color: #6e7f93; font-size: 8px; line-height: 1.4; text-align: center; }
.rules-example { display: grid; grid-template-columns: minmax(0, 1fr) minmax(105px, .65fr); align-items: center; gap: 12px; }
.rules-panel h2, .example-panel h2 { margin: 0 0 7px; color: #365981; font-size: 11px; }
.example-grid { position: relative; box-sizing: border-box; display: grid; width: min(100%, 132px); aspect-ratio: 1; grid-template-columns: repeat(4, minmax(0, 1fr)); grid-template-rows: repeat(4, minmax(0, 1fr)); gap: 3px; padding: 6px; border-radius: 8px; background: #dce7f7; }
.example-panel h2 { display: flex; align-items: center; gap: 6px; }.example-panel h2 small { padding: 2px 5px; border-radius: 8px; color: #577392; background: #eaf1fb; font-size: 8px; font-weight: 600; }
.example-cell { display: grid; place-items: center; border: 1px solid #d3dfef; border-radius: 3px; background: #fff; }
.example-endpoint { position: relative; z-index: 3; display: grid; width: 19px; height: 19px; place-items: center; border-radius: 50%; color: #fff; font: 700 9px Arial, sans-serif; }

.numberlink-rules { display: flex; flex-direction: column; gap: 5px; }
.numberlink-rules > div { display: grid; grid-template-columns: 27px 1fr; align-items: center; min-height: 27px; padding: 3px 8px; border-radius: 6px; background: #eaf1fb; }
.numberlink-rules b { color: #2f6fed; font: 700 9px Arial, sans-serif; }.numberlink-rules span { color: #4f6c90; font-size: 9px; }
.numberlink-methods { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.numberlink-methods article { padding: 8px 9px; border: 1px solid #d9e4f2; border-radius: 7px; background: #fff; }
.numberlink-methods .solver-method { border-color: #aac6e8; background: #f7fbff; }
.numberlink-methods header { display: flex; align-items: center; gap: 6px; }.numberlink-methods header b { color: #31547e; font-size: 8px; }
.method-dot { width: 6px; height: 6px; border-radius: 50%; background: #df8e48; }.solver-method .method-dot { background: #2f6fed; }
.numberlink-methods p { margin: 5px 0 0; color: #6f839e; font-size: 7px; line-height: 1.5; }

@media (max-width: 800px) { .numberlink-layout { grid-template-columns: 1fr; }.rules-example { grid-template-columns: 1fr 132px; }.numberlink-methods { grid-template-columns: 1fr; } }
</style>

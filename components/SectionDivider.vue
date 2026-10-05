<script setup>
defineProps({
  number: { type: String, required: true },
  title: { type: String, required: true },
})
</script>

<template>
  <div class="section-divider" :class="`section-divider-${number}`">
    <svg class="section-divider-pattern" viewBox="0 0 560 520" aria-hidden="true">
      <defs>
        <linearGradient id="optimization-surface-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#8cb8ff" stop-opacity=".26" />
          <stop offset="1" stop-color="#8cb8ff" stop-opacity=".015" />
        </linearGradient>
      </defs>
      <g v-if="number === '00'" class="pattern-intro">
        <g transform="rotate(-5 280 260)">
          <rect class="profile-card-outline" x="85" y="83" width="390" height="344" rx="22" />
          <rect class="profile-card-inset" x="102" y="100" width="356" height="310" rx="15" />
          <circle class="profile-card-avatar" cx="174" cy="190" r="45" />
          <circle class="profile-card-person" cx="174" cy="177" r="13" />
          <path class="profile-card-person" d="M148 218c3-17 13-25 26-25s23 8 26 25" />
          <rect class="profile-card-line" x="244" y="150" width="148" height="11" rx="5.5" />
          <rect class="profile-card-line profile-card-line-secondary" x="244" y="174" width="112" height="7" rx="3.5" />
          <rect class="profile-card-line profile-card-line-secondary" x="244" y="194" width="174" height="7" rx="3.5" />
          <path class="profile-card-rule" d="M124 252H435" />
          <rect class="profile-card-chip" x="126" y="273" width="91" height="34" rx="17" />
          <rect class="profile-card-chip" x="230" y="273" width="91" height="34" rx="17" />
          <rect class="profile-card-chip" x="334" y="273" width="91" height="34" rx="17" />
          <circle class="profile-card-dot" cx="151" cy="290" r="4" />
          <circle class="profile-card-dot" cx="255" cy="290" r="4" />
          <circle class="profile-card-dot" cx="359" cy="290" r="4" />
          <path class="profile-card-rule" d="M126 332H420 M126 353H365 M126 374H393" />
        </g>
      </g>

      <g v-else-if="number === '01'" class="pattern-surface">
        <path class="surface-fill" d="M48 344C91 329 126 292 158 235C190 178 225 171 252 210C278 248 275 292 315 301C355 310 378 249 406 204C433 165 470 181 488 222C505 263 482 309 520 344L520 402H48Z" />
        <path class="surface-mesh" d="M48 344C91 329 126 292 158 235C190 178 225 171 252 210C278 248 275 292 315 301C355 310 378 249 406 204C433 165 470 181 488 222C505 263 482 309 520 344" />
        <path class="surface-mesh" d="M48 360C93 345 130 312 163 258C196 207 230 202 257 238C283 272 282 306 319 315C360 324 384 270 411 231C437 194 469 208 485 244C501 280 483 324 520 360" />
        <path class="surface-mesh" d="M48 378C94 363 133 332 168 283C201 236 234 230 261 264C286 294 289 322 323 332C365 343 390 291 416 255C441 221 468 234 482 267C497 299 483 342 520 378" />
        <path class="surface-mesh" d="M93 330C121 309 149 273 177 226C205 181 232 183 256 220C278 255 279 294 315 303C351 312 380 257 406 214C430 176 456 181 477 217" />
        <path class="surface-mesh" d="M148 308C171 283 191 248 213 211C231 181 247 194 263 228C280 265 285 296 317 304C351 312 380 271 402 235C422 203 441 196 462 221" />
        <path class="surface-contour" d="M112 300C149 280 161 228 195 204C221 185 244 203 248 231C253 262 223 289 191 305C159 321 128 320 112 300Z" />
        <path class="surface-contour" d="M143 287C171 270 178 236 199 220C217 206 231 216 233 235C235 255 215 273 190 286C169 297 151 299 143 287Z" />
        <path class="surface-contour" d="M366 278C397 252 408 204 438 195C461 188 478 208 474 233C469 261 438 286 407 296C385 303 369 295 366 278Z" />
        <path class="surface-route" d="M103 354C147 345 164 302 189 277C218 248 246 275 267 294C285 311 296 311 316 303" />
        <circle class="surface-start" cx="103" cy="354" r="6" />
        <circle class="surface-optimum" cx="316" cy="303" r="8" />
      </g>

      <g v-else-if="number === '02'" class="pattern-contest" transform="rotate(-10 280 260)">
        <rect class="pattern-grid" x="100" y="80" width="360" height="360" rx="4" />
        <path class="pattern-grid" d="M172 80V440 M244 80V440 M316 80V440 M388 80V440 M100 152H460 M100 224H460 M100 296H460 M100 368H460" />
        <rect class="pattern-cell" x="172" y="80" width="72" height="72" />
        <rect class="pattern-cell" x="316" y="224" width="72" height="72" />
        <rect class="pattern-cell" x="100" y="368" width="72" height="72" />
        <path class="pattern-route" d="M136 116H208V188H352V260H424V332H136V404H208" />
        <circle class="pattern-node-active" cx="136" cy="116" r="7" />
        <circle class="pattern-node-active" cx="208" cy="404" r="7" />
      </g>

      <g v-else-if="number === '03'" class="pattern-ai">
        <path class="pattern-grid" d="M100 100L280 145 M100 100L280 260 M100 100L280 375 M100 220L280 145 M100 220L280 260 M100 220L280 375 M100 340L280 145 M100 340L280 260 M100 340L280 375 M280 145L460 190 M280 145L460 310 M280 145L460 430 M280 260L460 190 M280 260L460 310 M280 260L460 430 M280 375L460 190 M280 375L460 310 M280 375L460 430" />
        <path class="pattern-route" d="M100 220L280 260L460 310" />
        <circle class="pattern-node" cx="100" cy="100" r="10" />
        <circle class="pattern-node-active" cx="100" cy="220" r="11" />
        <circle class="pattern-node" cx="100" cy="340" r="10" />
        <circle class="pattern-node" cx="280" cy="145" r="10" />
        <circle class="pattern-node-active" cx="280" cy="260" r="13" />
        <circle class="pattern-node" cx="280" cy="375" r="10" />
        <circle class="pattern-node" cx="460" cy="190" r="10" />
        <circle class="pattern-node-active" cx="460" cy="310" r="11" />
        <circle class="pattern-node" cx="460" cy="430" r="10" />
      </g>
    </svg>
    <div class="section-divider-main">
      <span class="section-divider-number" aria-hidden="true">{{ number }}</span>
      <h1><slot name="title">{{ title }}</slot></h1>
    </div>
  </div>
</template>

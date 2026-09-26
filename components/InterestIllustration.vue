<script setup>
defineProps({ kind: Number })
</script>
<template>
  <svg viewBox="0 0 200 145" aria-hidden="true" fill="none" stroke="#2f6fed" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="100" cy="70" r="62" fill="#e8f0fc" stroke="none" />
    <g v-if="kind === 0">
      <path d="M24 87 L34 65 L64 60 L82 38 H132 L155 62 L175 73 V106 H24Z" fill="#bad3f6" />
      <path d="M75 60 L88 44 H125 L140 60Z" fill="#ffffff" /><path d="M106 45 V60 M28 82 H46 M157 81 H174 M32 113 H174" />
      <circle cx="59" cy="105" r="14" fill="#193d6e" /><circle cx="148" cy="105" r="14" fill="#193d6e" /><circle cx="59" cy="105" r="5" fill="#ffffff" /><circle cx="148" cy="105" r="5" fill="#ffffff" />
    </g>
    <g v-else-if="kind === 1">
      <path d="M29 51 L70 31 L127 51 L171 31 V110 L127 130 L70 110 L29 130Z" fill="#d2e3fa" /><path d="M70 31 V110 M127 51 V130" />
      <path d="M126 54 C126 73 101 93 101 93 S76 73 76 54 A25 25 0 0 1 126 54Z" fill="#3478ef" stroke="#255cc0" /><circle cx="101" cy="54" r="8" fill="#ffffff" stroke="none" />
    </g>
    <g v-else-if="kind === 2">
      <path d="M24 123 H178 M38 122 V61 H82 V122 M88 122 V28 H136 V122 M145 122 V77 H168 V122" fill="#c1d8f7" />
      <path d="M48 73 H71 M48 86 H71 M48 100 H71 M99 42 H126 M99 57 H126 M99 72 H126 M99 87 H126 M107 121 V104 H119 V121" />
    </g>
    <g v-else-if="kind === 3">
      <path d="M18 96 C37 36 61 135 85 73 S128 37 177 64 M18 108 C49 49 72 132 105 95 S150 54 182 86" stroke="#63addc" />
      <circle cx="112" cy="57" r="8" fill="#a1cfff" /><path d="M112 65 V131 M112 49 L110 10 L120 10Z M119 62 L155 81 L150 90Z M105 60 L72 83 L66 75Z" fill="#bedaff" />
    </g>
    <g v-else-if="kind === 4">
      <path d="M120 17 L134 24 L106 75 Q122 99 101 120 Q77 140 55 119 Q35 97 59 79 Q78 70 86 77Z" fill="#adc9f1" stroke="#4b72a6" /><circle cx="80" cy="99" r="13" fill="#193d6e" /><path d="M73 113 L128 23 M63 117 L77 125 M154 38 V77 M154 38 L180 31 V70" stroke="#4b72a6" /><ellipse cx="147" cy="80" rx="8" ry="5" fill="#4b72a6" /><ellipse cx="173" cy="73" rx="8" ry="5" fill="#4b72a6" />
    </g>
    <g v-else-if="kind === 5">
      <rect x="37" y="25" width="125" height="104" rx="7" fill="#d6e6fc" stroke="#5379ad" /><path d="M62 25 V129 M87 25 V129 M112 25 V129 M137 25 V129 M37 51 H162 M37 77 H162 M37 103 H162" stroke="#a7c3e9" stroke-width="1" /><path d="M78 94 L80 65 L91 56 L103 65 L105 94Z" fill="#f3f8ff" stroke="#5379ad" /><text x="91" y="84" text-anchor="middle" fill="#274873" stroke="none" style="font-size:19px">王</text>
    </g>
    <g v-else>
      <path d="M26 32 Q63 20 100 36 Q137 20 174 32 V117 Q137 105 100 122 Q63 105 26 117Z" fill="#b4d1f4" /><path d="M100 36 V122 M40 47 L82 49 M40 62 L82 65 M40 78 L82 81 M118 49 L159 47 M118 65 L159 62 M118 81 L159 78" />
    </g>
  </svg>
</template>

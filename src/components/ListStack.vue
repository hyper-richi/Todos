<script setup lang="ts">
import VSCodeIcon from '@/assets/svg/badges/visualstudiocode.svg';
import TypescriptIcon from '@/assets/svg/badges/typescript.svg';
import VercelIcon from '@/assets/svg/badges/vercel.svg';
import CSSIcon from '@/assets/svg/badges/css3.svg';
import PrettierIcon from '@/assets/svg/badges/prettier.svg';
import VuedotjsIcon from '@/assets/svg/badges/vuedotjs.svg';

import ESLintIcon from '@/assets/svg/badges/eslint.svg';
</script>

<template>
  <ul class="stack__list">
    <li class="item">
      <div class="flex">
        <span> Framework - Vue 3 </span>
        <VuedotjsIcon width="24" height="24" color="#4FC08D" />
      </div>
    </li>
    <li class="item">
      <div class="flex">
        <span> Language - TypeScript </span>
        <TypescriptIcon width="24" height="24" />
      </div>
    </li>
    <li class="item">
      <div class="flex">
        <span> Deployment - Vercel </span>
        <VercelIcon width="24" height="24" color="#000000" />
      </div>
    </li>
    <li class="item">
      <div class="flex">
        <span> Styling - CSS </span>
        <CSSIcon width="24" height="24" color="#1572B6" />
      </div>
    </li>

    <li class="item">
      <div class="flex">
        <span> Linting - ESLint</span>
        <ESLintIcon width="24" height="24" color="#4B32C3" />
      </div>
    </li>
    <li class="item">
      <div class="flex">
        <span> Formatting - Prettier</span>
        <PrettierIcon width="24" height="24" />
      </div>
    </li>
    <li class="item">
      <div class="flex">
        <span> Editor - VSCode</span>
        <VSCodeIcon width="24" height="24" />
      </div>
    </li>
  </ul>
</template>

<style scoped>
.stack__list {
  padding: 0;
  margin-left: 20px;
}

.item {
  whitespace: nowrap;
  margin-top: 12px;
}
.flex {
  display: flex;
  gap: 12px;
}
</style>

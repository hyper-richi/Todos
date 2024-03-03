/* declare module '*.svg' {
  import type { definecomponent } from 'vue';
  const component: definecomponent;
  export default component;
} */
declare module '*.svg?inline' {
  const content: any;
  export default content;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

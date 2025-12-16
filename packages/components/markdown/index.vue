<template>
  <div :class="[ns.b(), props.theme === 'dark' ? ns.m('dark') : '']">
    <template v-for="(part, index) in parts" :key="index">
      <slot
        v-if="part.type === 'code' && part.language === 'mermaid'"
        name="mermaid"
        :content="part.content"
        :language="part.language"
      >
        <CodeMermaid
          :content="part.content"
          :theme="CodeMermaidThemeMap[theme] || 'default'"
          v-bind="codeMermaidProps"
        ></CodeMermaid>
      </slot>
      <slot
        v-else-if="part.type === 'code'"
        name="code"
        :content="part.content"
        :language="part.language"
      >
        <CodeHighlight
          :content="part.content"
          :language="part.language"
          :theme="CodeHighlightThemeMap[theme] || 'github-light'"
          v-bind="codeHighlightProps"
        ></CodeHighlight>
      </slot>
      <div
        class="markdown-body"
        data-theme="dark"
        v-else
        v-html="part.content"
      ></div>
    </template>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ElAMarkdown',
})
import {
  processMarkdownToParts,
  MarkdownPart,
  defaultCustomPlugins,
  createBaseProcessor,
} from '@element-ai-vue/utils'
import {
  CodeHighlightThemeMap,
  CodeMermaidThemeMap,
} from '@element-ai-vue/constants'
import { mergeWith } from 'lodash-es'
import { watch, ref, computed } from 'vue'
import CodeHighlight from '../code-highlight/index.vue'
import CodeMermaid from '../code-mermaid/index.vue'
import { markdownProps } from './props'
import { useNamespace } from '@element-ai-vue/hooks'

const ns = useNamespace('markdown')
const props = defineProps({
  ...markdownProps,
})
const parts = ref<MarkdownPart[]>([])

const processor = computed(() => {
  const plugins = mergeWith([], defaultCustomPlugins, props.remarkPlugins)
  return createBaseProcessor(plugins)
})

watch(
  [() => props.content, () => processor.value],
  async () => {
    if (!props.content) {
      parts.value = []
      return
    }
    parts.value = await processMarkdownToParts(props.content, processor.value)
  },
  { immediate: true }
)
</script>

<style scoped></style>

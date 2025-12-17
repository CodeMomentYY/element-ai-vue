<template>
  <div>
    <InputTagPrefix
      v-if="showInputTagPrefix && iputTagPrefixValue"
      :value="iputTagPrefixValue"
      @remove="closeInputTagPrefix"
    ></InputTagPrefix>
    <editor-content :editor="editor" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ElASender',
})
import { watch } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import HardBreak from '@tiptap/extension-hard-break'
import History from '@tiptap/extension-history'
import Placeholder from '@tiptap/extension-placeholder'
import InputTagPrefix from './input-tag-prefix.vue'
import { senderProps } from './props'

const props = defineProps({
  ...senderProps,
})

const emits = defineEmits(['update:value', 'update:showInputTagPrefix'])

const editor = useEditor({
  content: props.value,
  editable: !props.disabled,
  extensions: [
    Document,
    Paragraph,
    Text,
    HardBreak,
    History,
    Placeholder.configure({
      placeholder: () => props.placeholder,
      showOnlyWhenEditable: false,
      includeChildren: true,
      showOnlyCurrent: false,
    }),
    ...props.extensions,
  ],
})

const closeInputTagPrefix = () => {
  emits('update:showInputTagPrefix', false)
}

watch(
  () => props.disabled,
  () => {
    editor.value?.setEditable(!props.disabled)
  }
)

watch(
  () => props.placeholder,
  () => {
    editor.value?.view.dispatch(editor.value.state.tr)
  }
)

watch(
  () => props.value,
  (newContent) => {
    const isSame = editor.value?.getHTML() === newContent
    if (isSame) return
    editor.value?.commands.setContent(newContent)
  }
)

defineExpose({
  editor,
})
</script>

<!-- <template>
  <div class="editor-wapper">
    <Skill
      v-if="showSkill && skillValue"
      :value="skillValue"
      @remove-skill="handleRemoveSkill"
    ></Skill>
    <editor-content :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { UndoRedo } from "@tiptap/extensions";
import HardBreak from "@tiptap/extension-hard-break";
import { Editor, EditorContent } from "@tiptap/vue-3";
import { EditorView } from "@tiptap/pm/view";
import { ref, watch } from "vue";
import { Transaction } from "@tiptap/pm/state";
import InputSlot from "./extension/inputSlot";
import SelectSlot from "./extension/selectSlot";
import SkillSlot from "./extension/skillSlot";
import Skill from "./components/Skill.vue";
import {
  handlePasteLogic,
  handleZeroWidthCharLogic,
} from "./extension/plugins";
import { useDisposeComposing } from "./hooks/composing";
import { commonProps } from "./props";
import { Placeholder } from "./extension/customPlaceholder";

const props = defineProps({
  ...commonProps,
});
const showSkill = ref(false);
const skillValue = ref("");
const emits = defineEmits(["updateContent", "enterPressed", "removeSkill"]);
const { handleTextInput, handleCompositionStart, handleCompositionEnd } =
  useDisposeComposing();

const showOnlySkill = ({ value }: { value: string }) => {
  showSkill.value = true;
  skillValue.value = value;
};
const hiddenOnlySkill = () => {
  showSkill.value = false;
  skillValue.value = "";
};

const handleRemoveSkill = (action: string) => {
  hiddenOnlySkill();
  emits("removeSkill", action);
};

const handleKeyDown = (view: EditorView, event: KeyboardEvent) => {
  // 如果是退格键，判断内容是否为空
  if (event.key === "Backspace") {
    // 如果内容为空或仅包含空白字符，阻止删除操作
    if (editor.isEmpty && showSkill.value) {
      handleRemoveSkill("delete");
    }
  }
  if (props.onHandleKeyDown) {
    return props.onHandleKeyDown(view, event);
  }
  // 如果是回车键
  if (event.key === "Enter") {
    // 如果按下了 Shift 键，允许换行
    if (event.shiftKey) {
      return false; // 让默认行为处理（换行）
    }
    emits("enterPressed");
    // 单独按回车键，阻止换行
    event.preventDefault();
    return true;
  }
  return false;
};

const handlePaste = (e: ClipboardEvent) => {
  // To support file paste
  const items = e.clipboardData?.items;
  const files: File[] = [];
  if (items) {
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const file = it.getAsFile();
      if (file) {
        files.push(file);
      }
    }
  }
  if (files.length) {
    props.onPaste?.(files);
  }
};

const editor = new Editor({
  extensions: [
    Document,
    Paragraph,
    Text,
    UndoRedo,
    HardBreak,
    InputSlot,
    SelectSlot,
    SkillSlot,
    Placeholder.configure({
      placeholder: props.placeholder,
      showOnlyWhenEditable: false,
      includeChildren: true,
      showOnlyCurrent: false,
    }),
  ],
  editable: !props.disabled,
  editorProps: {
    handleKeyDown,
    handlePaste: handlePasteLogic,
    handleTextInput,
    handleDOMEvents: {
      compositionstart: handleCompositionStart,
      compositionend: handleCompositionEnd,
    },
  },
  onCreate: () => {
    const { state, view } = editor;
    const tr = handleZeroWidthCharLogic(state);
    if (tr) {
      // 一次性触发，避免多次触发导致 appendTransaction 被多次调用
      view.dispatch(tr);
    }
    props.onCreate?.(editor, {
      showOnlySkill,
      hiddenOnlySkill,
    });
  },
  onUpdate: () => {
    // The content has changed.
    const content = editor.getText();
    props.onChange?.(content);
    emits("updateContent", content);
  },
  onPaste: handlePaste,
  onFocus: props.onFocus,
  onBlur: props.onBlur,
});

watch(
  () => props.disabled,
  () => {
    if (editor) {
      editor.setEditable(!props.disabled);
    }
  }
);

watch(
  () => props.placeholder,
  (newPlaceholder) => {
    console.log(newPlaceholder, "newPlaceholder");
    if (editor && !editor.isDestroyed) {
      editor.commands.updatePlaceholder(newPlaceholder);
    }
  }, { immediate: true }
);
</script>

<style lang="scss" scoped>
.editor-wapper {
  position: relative;
}
</style> -->

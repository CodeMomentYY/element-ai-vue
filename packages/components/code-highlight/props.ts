import { BundledLanguage, BundledTheme } from 'shiki'
import { PropType } from 'vue'

export const codeHighlightProps = {
  extendLanguages: {
    type: Array as PropType<BundledLanguage[]>,
    default: () => [],
  },
  extendThemes: {
    type: Array as PropType<BundledTheme[]>,
    default: () => [],
  },
  theme: {
    type: String,
    default: 'github-light',
  },
}

import { createTypewriter, TypewriterProps } from '@element-ai-vue/utils'
import { onBeforeUnmount, ref } from 'vue'

export const useTyperwriter = (initProps?: Partial<TypewriterProps>) => {
  const content = ref('')
  const typewriter = createTypewriter(initProps)

  typewriter.setText('Hello, Element AI Vue!')

  const start = () => {
    typewriter.start((text: string) => {
      content.value = text
    })
  }

  onBeforeUnmount(() => {
    typewriter.destory()
  })
  return {
    ...typewriter,
    start,
    content,
  }
}

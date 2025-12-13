// Don't remove this file, because it registers the demo components.
import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'
import { App } from 'vue'

export function useComponents(app: App<any>) {
  app.component('Demo', Demo)
  app.component('DemoBlock', DemoBlock)
}

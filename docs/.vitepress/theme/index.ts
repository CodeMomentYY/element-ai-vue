// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import 'virtual:group-icons.css'
import './style.css'
import '@element-ai/theme-chalk/src/index.scss'
import DemoComponent from '../../components/DemoComponent.vue'
import Layout from './Layout.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('DemoComponent', DemoComponent)
  },
} satisfies Theme

# Markdown

Markdown 组件的核心基于 `unified` 和 `remark` 生态构建。它通过将 Markdown 文本解析为 AST（抽象语法树），并利用 Vue 的渲染机制将其转换为 DOM 节点。这种架构设计赋予了组件极高的灵活性，支持插槽（Slots）和自定义组件渲染，能够满足复杂的业务需求。

**功能特性：**

- **核心驱动**：基于 `unified` 和 `remark`，解析精准且生态丰富。
- **Vue 渲染**：利用 Vue 渲染 AST，支持 Vue 组件和插槽的无缝嵌入。
- **内置支持**：默认支持数学公式（KaTeX）、代码高亮、Mermaid 流程图/时序图等。
- **可扩展性**：支持自定义扩展，可轻松集成 ECharts 等第三方图表库。
- **组件拆解**：markdown把基本的[代码高亮](/zh/base/code-highlight.html)、[Mermaid](/zh/base/code-mermaid.html)，拆解成两个组件

## 基础用法

:::demo markdownBaseExampls

```vue
<!-- @include: ../../examples/DemoComponent.vue -->
```

:::

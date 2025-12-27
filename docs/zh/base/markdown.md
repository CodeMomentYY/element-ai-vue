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
<template>
  <ElAMarkdown :content></ElAMarkdown>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ElAMarkdown } from 'element-ai-vue'
const content = ref(`
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

**这是粗体文本**    *这是斜体文本*  
__这也是粗体文本__   _这也是斜体文本_

***这是粗斜体文本***  ~~这是带删除线的文本~~

- 无序列表项1
- 无序列表项2
  - 子列表项2.1
  - 子列表项2.2

[element-ai-vue](/ "element-ai-vue")

![示例图片](/logo.svg "一张示例图")

>这是一段引用文本
>
>> 这是嵌套的引用文本
---
| 姓名 | 年龄 | 职业 |
| ---- | ---- | ---- |
| 张三 | 25   | 工程师 |
| 李四 | 30   | 设计师 |
`)
</script>
```

:::

## 插槽-自定义工具栏

:::demo markdownCodeSlotExampls

```vue
<!-- @include: ../../examples/markdown/code-slot-exampls.vue -->
```

:::

## 插槽-自定义代码块使用echarts

:::demo markdownCustomCodeArea

```vue
<!-- @include: ../../examples/markdown/custom-code-area.vue -->
```

:::

:::details 自定义echart文件示例 ./echarts-test.vue
<<< @/examples/markdown/echarts-test.vue
:::

## 打字机输出

:::demo markdownTypewriter

```vue
<template>
  <div class="btns">
    <button class="switch-btn" @click="start">开始</button>
    <button class="switch-btn" @click="paused">暂停</button>
    <button class="switch-btn" @click="stop">停止</button>
  </div>
  <ElAMarkdown :content="content"></ElAMarkdown>
</template>
<script setup lang="ts">
import { useTyperwriter, ElAMarkdown } from 'element-ai-vue'
const { start, paused, stop, setText, content } = useTyperwriter({
  interval: 50,
})

const allText = `
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

**这是粗体文本**    *这是斜体文本*  
__这也是粗体文本__   _这也是斜体文本_

***这是粗斜体文本***  ~~这是带删除线的文本~~

- 无序列表项1
- 无序列表项2
  - 子列表项2.1
  - 子列表项2.2

[element-ai-vue](/ "element-ai-vue")

![示例图片](/logo.svg "一张示例图")

>这是一段引用文本
>
>> 这是嵌套的引用文本
---
| 姓名 | 年龄 | 职业 |
| ---- | ---- | ---- |
| 张三 | 25   | 工程师 |
| 李四 | 30   | 设计师 |

# js代码块
\`\`\`javascript
console.log(123); 
\`\`\`

# js代码块
\`\`\`mermaid
flowchart TD
    A[用户访问注册页面] --> B{输入注册信息}
    B -->|信息完整| C[后端验证信息合法性]
    B -->|信息缺失| D[提示用户补充必填项]
    D --> B
    C -->|验证通过| E[发送验证邮件/短信]
    C -->|验证失败| F[提示错误原因（如手机号已注册）]
    F --> B
    E --> G{用户完成验证}
    G -->|24小时内验证| H[创建用户账号，注册成功]
    G -->|超时未验证| I[验证链接失效，重新发送]
    I --> E
    E --> G{用户完成验证}
    G -->|24小时内验证| H[创建用户账号，注册成功]
    G -->|超时未验证| I[验证链接失效，重新发送]
    I --> E
    E --> G{用户完成验证}
    G -->|24小时内验证| H[创建用户账号，注册成功]
    G -->|超时未验证| I[验证链接失效，重新发送]
    I --> E
    E --> G{用户完成验证}
    G -->|24小时内验证| H[创建用户账号，注册成功]
    G -->|超时未验证| I[验证链接失效，重新发送]
    I --> E
\`\`\`
`
setText(allText)
</script>
```

:::

## props

| 属性名             | 说明                                                                    | 类型                     | 默认值    |
| ------------------ | ----------------------------------------------------------------------- | ------------------------ | --------- |
| theme              | 主题模式                                                                | `'dark' \| 'light'`      | `'light'` |
| content            | Markdown 内容                                                           | `string`                 | `''`      |
| remarkPlugins      | 自定义 remark 插件                                                      | `MiddlewarePluginItem[]` | `[]`      |
| codeHighlightProps | 传递给 [`CodeHighlight`](/zh/base/code-highlight.html#props) 组件的属性 | `CodeHighlightPropsType` | `{}`      |
| codeMermaidProps   | 传递给 [`CodeMermaid`](/zh/base/code-mermaid.html#props) 组件的属性     | `CodeMermaidPropsType`   | `{}`      |

## slot

| 插槽名                          | 说明                      | 参数                                                               |
| ------------------------------- | ------------------------- | ------------------------------------------------------------------ |
| mermaid                         | 自定义 Mermaid 代码块渲染 | `{ content, language, theme, ...codeMermaidProps }`                |
| code-mermaid-toolbar            | 自定义 Mermaid 工具栏     | 参见 [`CodeMermaid`](/zh/base/code-mermaid.html#slot) 组件文档     |
| code-mermaid-fullscreen-toolbar | 自定义 Mermaid 全屏工具栏 | 参见 [`CodeMermaid`](/zh/base/code-mermaid.html#slot) 组件文档     |
| code                            | 自定义代码块渲染          | `{ content, language, theme, ...codeHighlightProps }`              |
| code-highlight-header           | 自定义代码块头部          | 参见 [`CodeHighlight`](/zh/base/code-highlight.html#slot) 组件文档 |

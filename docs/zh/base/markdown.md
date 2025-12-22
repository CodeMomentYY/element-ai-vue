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
import { ElAMarkdown } from '@element-ai-vue/components'
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
<template>
  <ElAMarkdown :content="content">
    <template #code-highlight-header="{ content, language, isCopied, onCopy }">
      <div class="header">
        <div>{{ language }}</div>
        <button @click="onCopy">{{ isCopied ? '已复制' : '复制' }}</button>
      </div>
    </template>
    <template
      #code-mermaid-toolbar="{
        zoomIn,
        zoomOut,
        resetZoom,
        toggleFullscreen,
        downloadPng,
        isCodeView,
        toggleView,
        onCopy,
        isCopied,
      }"
    >
      <div class="tool">
        <template v-if="isCodeView">
          <button @click="onCopy">{{ isCopied ? '已复制' : '复制' }}</button>
          <button @click="toggleView">预览</button>
        </template>
        <template v-else>
          <button @click="zoomIn">放大</button>
          <button @click="zoomOut">缩小</button>
          <button @click="resetZoom">重置</button>
          <button @click="downloadPng">下载PNG</button>
          <button @click="toggleFullscreen">全屏切换</button>
          <button @click="toggleView">查看代码</button>
        </template>
      </div>
    </template>
    <template
      #code-mermaid-fullscreen-toolbar="{
        zoomIn,
        zoomOut,
        resetZoom,
        toggleFullscreen,
        downloadPng,
      }"
    >
      <div class="tool-fullscreen">
        <button @click="zoomIn">放大</button>
        <button @click="zoomOut">缩小</button>
        <button @click="resetZoom">重置</button>
        <button @click="downloadPng">下载PNG</button>
        <button @click="toggleFullscreen">退出全屏</button>
      </div>
    </template>
  </ElAMarkdown>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ElAMarkdown } from '@element-ai-vue/components'

const content = ref(`
# js代码块
\`\`\`javascript
/**
 * 生成指定区间 [min, max] 的随机整数（包含 min 和 max）
 * @param {number} min - 最小值（整数）
 * @param {number} max - 最大值（整数）
 * @returns {number} 随机整数
 */
function getRandomInt(min, max) {
  // 先取整避免非整数参数问题，再计算区间
  min = Math.ceil(min);
  max = Math.floor(max);
  // Math.random() 生成 [0,1)，计算后得到 [min, max]
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 示例：生成 1 到 10 之间的随机整数（包含1和10）
console.log(getRandomInt(1, 10)); // 输出：1~10 之间的随机数
\`\`\`
# mermaid 流程图示例
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
`)
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #000;
  padding: 8px;
  color: #fff;
}
.tool {
  background-color: #000;
  display: flex;
  gap: 8px;
  color: #fff;
}
.tool-fullscreen {
  background-color: #000;
  display: flex;
  gap: 8px;
  color: #fff;
}
</style>
```

:::

## 插槽-自定义代码块使用echarts

:::demo markdownCustomCodeArea

```vue
<template>
  <ElAMarkdown :content="content">
    <template #code="props">
      <div v-if="props.language === 'echarts'">
        <echartsTest
          :content="props.content"
          :theme="props.theme"
        ></echartsTest>
      </div>
      <ElACodeHighlight v-else v-bind="props"></ElACodeHighlight>
    </template>
  </ElAMarkdown>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ElAMarkdown, ElACodeHighlight } from '@element-ai-vue/components'
import echartsTest from './echarts-test.vue'

const content = ref(`
# echarts 自定义
\`\`\`echarts
option = {
  title: {
    text: 'Stacked Line'
  },
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};
\`\`\`


# js代码块
\`\`\`javascript
/**
 * 生成指定区间 [min, max] 的随机整数（包含 min 和 max）
 * @param {number} min - 最小值（整数）
 * @param {number} max - 最大值（整数）
 * @returns {number} 随机整数
 */
function getRandomInt(min, max) {
  // 先取整避免非整数参数问题，再计算区间
  min = Math.ceil(min);
  max = Math.floor(max);
  // Math.random() 生成 [0,1)，计算后得到 [min, max]
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 示例：生成 1 到 10 之间的随机整数（包含1和10）
console.log(getRandomInt(1, 10)); // 输出：1~10 之间的随机数
\`\`\`

`)
</script>
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

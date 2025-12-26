# Markdown

The Markdown component's core is built on the `unified` and `remark` ecosystem. It parses Markdown text into an AST (Abstract Syntax Tree) and leverages Vue's rendering mechanism to convert it into DOM nodes. This architecture design gives the component extremely high flexibility, supporting Slots and custom component rendering to meet complex business requirements.

**Features:**

- **Core Engine**: Based on `unified` and `remark`, providing precise parsing and a rich ecosystem.
- **Vue Rendering**: Uses Vue to render AST, supporting seamless embedding of Vue components and slots.
- **Built-in Support**: Default support for math formulas (KaTeX), code highlighting, Mermaid flowcharts/sequence diagrams, etc.
- **Extensibility**: Supports custom extensions, easily integrating third-party chart libraries like ECharts.
- **Component Decomposition**: Markdown breaks down basic [Code Highlighting](/en/base/code-highlight.html) and [Mermaid](/en/base/code-mermaid.html) into two separate components.

## Basic Usage

:::demo markdownBaseExampls

```vue
<template>
  <ElAMarkdown :content></ElAMarkdown>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ElAMarkdown } from '@element-ai-vue/components'
const content = ref(`
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

**This is bold text**    *This is italic text*  
__This is also bold__   _This is also italic_

***This is bold italic***  ~~This is strikethrough text~~

- Unordered list item 1
- Unordered list item 2
  - Sub-item 2.1
  - Sub-item 2.2

[element-ai-vue](/ "element-ai-vue")

![Example image](/logo.svg "An example image")

>This is a blockquote
>
>> This is a nested blockquote
---
| Name | Age | Occupation |
| ---- | ---- | ---- |
| John | 25   | Engineer |
| Jane | 30   | Designer |
`)
</script>
```

:::

## Slot - Custom Toolbar

:::demo markdownCodeSlotExampls

```vue
<!-- @include: ../../examples/markdown/code-slot-exampls.vue -->
```

:::

## Slot - Custom Code Block Using ECharts

:::demo markdownCustomCodeArea

```vue
<!-- @include: ../../examples/markdown/custom-code-area.vue -->
```

:::

:::details Custom ECharts File Example ./echarts-test.vue
<<< @/examples/markdown/echarts-test.vue
:::

## Typewriter Output

:::demo markdownTypewriter

```vue
<template>
  <div class="btns">
    <button class="switch-btn" @click="start">Start</button>
    <button class="switch-btn" @click="paused">Pause</button>
    <button class="switch-btn" @click="stop">Stop</button>
  </div>
  <ElAMarkdown :content="content"></ElAMarkdown>
</template>
<script setup lang="ts">
import { useTyperwriter, ElAMarkdown } from 'element-ai-vue'
const { start, paused, stop, setText, content } = useTyperwriter({
  interval: 50,
})

const allText = `
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

**This is bold text**    *This is italic text*  
__This is also bold__   _This is also italic_

***This is bold italic***  ~~This is strikethrough text~~

- Unordered list item 1
- Unordered list item 2
  - Sub-item 2.1
  - Sub-item 2.2

[element-ai-vue](/ "element-ai-vue")

![Example image](/logo.svg "An example image")

>This is a blockquote
>
>> This is a nested blockquote
---
| Name | Age | Occupation |
| ---- | ---- | ---- |
| John | 25   | Engineer |
| Jane | 30   | Designer |

# JavaScript Code Block
\`\`\`javascript
console.log(123); 
\`\`\`

# Mermaid Code Block
\`\`\`mermaid
flowchart TD
    A[User visits registration page] --> B{Enter registration info}
    B -->|Info complete| C[Backend validates info]
    B -->|Info missing| D[Prompt user to fill required fields]
    D --> B
    C -->|Validation passed| E[Send verification email/SMS]
    C -->|Validation failed| F[Show error message (e.g., phone already registered)]
    F --> B
    E --> G{User completes verification}
    G -->|Verified within 24h| H[Create user account, registration successful]
    G -->|Timeout| I[Verification link expired, resend]
    I --> E
    E --> G{User completes verification}
    G -->|Verified within 24h| H[Create user account, registration successful]
    G -->|Timeout| I[Verification link expired, resend]
    I --> E
    E --> G{User completes verification}
    G -->|Verified within 24h| H[Create user account, registration successful]
    G -->|Timeout| I[Verification link expired, resend]
    I --> E
    E --> G{User completes verification}
    G -->|Verified within 24h| H[Create user account, registration successful]
    G -->|Timeout| I[Verification link expired, resend]
    I --> E
\`\`\`
`
setText(allText)
</script>
```

:::

## Props

| Property           | Description                                                                     | Type                     | Default   |
| ------------------ | ------------------------------------------------------------------------------- | ------------------------ | --------- |
| theme              | Theme mode                                                                      | `'dark' \| 'light'`      | `'light'` |
| content            | Markdown content                                                                | `string`                 | `''`      |
| remarkPlugins      | Custom remark plugins                                                           | `MiddlewarePluginItem[]` | `[]`      |
| codeHighlightProps | Props passed to [`CodeHighlight`](/en/base/code-highlight.html#props) component | `CodeHighlightPropsType` | `{}`      |
| codeMermaidProps   | Props passed to [`CodeMermaid`](/en/base/code-mermaid.html#props) component     | `CodeMermaidPropsType`   | `{}`      |

## Slots

| Slot Name                       | Description                       | Parameters                                                               |
| ------------------------------- | --------------------------------- | ------------------------------------------------------------------------ |
| mermaid                         | Custom Mermaid code block render  | `{ content, language, theme, ...codeMermaidProps }`                      |
| code-mermaid-toolbar            | Custom Mermaid toolbar            | See [`CodeMermaid`](/en/base/code-mermaid.html#slots) component docs     |
| code-mermaid-fullscreen-toolbar | Custom Mermaid fullscreen toolbar | See [`CodeMermaid`](/en/base/code-mermaid.html#slots) component docs     |
| code                            | Custom code block render          | `{ content, language, theme, ...codeHighlightProps }`                    |
| code-highlight-header           | Custom code block header          | See [`CodeHighlight`](/en/base/code-highlight.html#slots) component docs |

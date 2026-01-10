import { h, type VNode, type VNodeArrayChildren } from 'vue'
import type { Root, RootContent } from 'hast'
import { toHtml } from 'hast-util-to-html'
import DOMPurify from 'dompurify'

export type Context = {
  listDepth: number
  listOrdered: boolean
  listItemIndex: number
  svg: boolean
  currentContext?: string
}

const DEFAULT_CONTEXT: Context = {
  listDepth: -1,
  listOrdered: false,
  listItemIndex: -1,
  svg: false,
}

export function transformToVNode(
  node: Root | RootContent,
  ctx: Context = { ...DEFAULT_CONTEXT }
): VNode | string | null {
  if (node.type === 'root') {
    return h('div', renderChildren(node.children, ctx))
  }

  if (node.type === 'text') {
    return node.value
  }

  if (node.type === 'comment' || node.type === 'doctype') {
    return null
  }

  if (node.type === 'element') {
    const tagName = node.tagName
    const properties = node.properties || {}

    // Handle switch cases for specific VNode transformation
    switch (tagName) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return h(tagName, properties, renderChildren(node.children, ctx))

      case 'ul':
      case 'ol': {
        const newCtx = {
          ...ctx,
          listDepth: ctx.listDepth + 1,
          listOrdered: tagName === 'ol',
          listItemIndex: -1,
        }
        return h(tagName, properties, renderChildren(node.children, newCtx))
      }

      case 'li': {
        const liCtx = { ...ctx, listItemIndex: ctx.listItemIndex + 1 }
        return h(tagName, properties, renderChildren(node.children, liCtx))
      }

      case 'table':
      case 'thead':
      case 'tbody':
      case 'tfoot':
      case 'tr':
      case 'th':
      case 'td': {
        return h(tagName, properties, renderChildren(node.children, ctx))
      }

      case 'code': {
        // Inline code usually (block code is handled by index.ts separation usually)
        return h(tagName, properties, renderChildren(node.children, ctx))
      }

      case 'b':
      case 'strong':
      case 'i':
      case 'em':
      case 'u':
      case 's':
      case 'strike':
      case 'del':
      case 'br':
      case 'hr':
      case 'p':
      case 'blockquote':
      case 'a':
      case 'img':
        // Common phrasing elements - keeping them as VNodes is usually better for hydration/perf vs v-html spam
        // But user said: "if not in parsing specified tag. Return as string is fine"
        // And "if not in switch branch, we default to use v-html render to fallback"
        // If I include them here, I am "parsing" them into VNodes.
        // If I omit them, they become v-html strings.
        // I'll include the most common structural ones in the switch to prevent excessive v-html blocks
        // but maybe strict interpretation means strictly what was in the test file?
        // The test file had h1-h6, code, ul, ol, li. And table elements. AND slot.
        // I will stick to the list in the user prompt implication: "parsing specified tags".
        // I'll keep the ones I wrote above (headings, lists, table, code).
        // I should add `p` and `div` and `span` as passthrough?
        // No, let's follow strict fallback logic for anything else to demonstrate the feature.
        return h(tagName, properties, renderChildren(node.children, ctx))

      case 'slot':
      // Handling slots if needed, similar to test file?
      // But in strict fallback mode, maybe not. I'll omit slot specific logic for now unless requested.
      // It falls to default.

      default: {
        // Fallback: render as HTML string
        // We stop recursion here.
        const html = toHtml(node as any)
        const sanitized = DOMPurify.sanitize(html, { ADD_ATTR: ['target'] })

        // For inline elements like <span>, <a>, <b>, we should use 'span' or the tag itself?
        // Using `h(tagName, { innerHTML: ... })` works.
        // But if tagName is 'script' (sanitized away) or something weird...
        // Using the original tagName is usually correct.
        return h(tagName, { ...properties, innerHTML: sanitized })
      }
    }
  }

  return null
}

function renderChildren(
  nodes: RootContent[],
  ctx: Context
): VNodeArrayChildren {
  return nodes
    .map((node) => transformToVNode(node, ctx))
    .filter((n) => n !== null) as VNodeArrayChildren
}

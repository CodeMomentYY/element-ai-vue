import { ExtractPropTypes, PropType, VNode } from 'vue'
import { baseInputProps } from './base-input/props'

export interface MentionConfigItem {
  prefix: string
  component: any
  options: { label: string; value: string; [key: string]: any }[]
  [key: string]: any
}

export const senderProps = {
  ...baseInputProps,
  mentionConfig: {
    type: Object as PropType<MentionConfigItem[]>,
    default: () => ({}),
  },
  variant: {
    type: String as PropType<'default' | 'updown'>,
    default: 'default',
  },
}

export interface SenderSelectOption {
  label: string
  value: string
}

export type SenderSlotsType = {
  prefix?: () => VNode[]
  'input-tag-prefix'?: () => VNode[]
  'action-list'?: () => VNode[]
  'send-btn'?: (props: { disabled?: boolean }) => VNode[]
  'select-slot-content'?: (props: { options: SenderSelectOption[] }) => VNode[]
}

export type SenderEmitsType = {
  (e: 'send', content: string): void
}

export type SenderPropsType = PropType<
  Partial<ExtractPropTypes<typeof senderProps>>
>

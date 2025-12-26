import { ExtractPropTypes, PropType } from 'vue'

export const bubbleListProps = {
  backButtonThreshold: {
    type: Number,
    default: 80,
  },
  bottomThreshold: {
    type: Number,
    default: 20,
  },
}

export type BubbleListPropsType = PropType<
  Partial<ExtractPropTypes<typeof bubbleListProps>>
>

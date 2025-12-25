import { useScroll, useEventListener, useMutationObserver } from '@vueuse/core'
import { nextTick, ref, Ref, watch } from 'vue'

interface IChatScrollParams {
  scrollContentRef: Ref<HTMLElement | null>
  resizeContentRef: Ref<HTMLElement | null>
}

export const useChatScroll = (params: IChatScrollParams) => {
  const { scrollContentRef, resizeContentRef } = params
  const scrollInfo = useScroll(scrollContentRef, {
    behavior: 'smooth',
    offset: {
      bottom: 20,
    },
  })
  const { arrivedState, y } = scrollInfo
  const stopScroll = ref(false) // 是否停止自动滚动
  const isScrollToBottom = ref(true) // 是否滚动到底部

  // 更新isScrollToBottom状态的函数
  const updateIsScrollToBottom = () => {
    if (scrollContentRef.value) {
      const { scrollHeight, clientHeight, scrollTop } = scrollContentRef.value
      // 当滚动位置接近底部时（考虑50px误差），认为已滚动到底部
      isScrollToBottom.value =
        Math.abs(scrollHeight - clientHeight - scrollTop) <= 50
    }
  }

  // 监听滚动位置，更新isScrollToBottom状态
  watch(() => y.value, updateIsScrollToBottom)

  const scrollToBottom = async (behavior: 'smooth' | 'instant' = 'instant') => {
    if (stopScroll.value) return
    await nextTick()
    scrollContentRef.value?.scrollTo({
      top: scrollContentRef.value?.scrollHeight,
      behavior,
    })
  }

  let touchStartY = 0
  let touchStartTime = 0

  function onUserInteraction() {
    if (!arrivedState.bottom) {
      stopScroll.value = true
    }
  }

  function onTouchStart(e: TouchEvent) {
    touchStartY = e.touches[0].clientY
    touchStartTime = Date.now()
  }

  function onTouchMove(e: TouchEvent) {
    const currentY = e.touches[0].clientY
    const deltaY = touchStartY - currentY
    const deltaTime = Date.now() - touchStartTime

    // 如果向上滑动（deltaY > 0）且滑动距离超过阈值，并且不在底部，则停止自动滚动
    if (deltaY > 10 && deltaTime > 100 && !arrivedState.bottom) {
      stopScroll.value = true
    }
  }

  function onScroll() {
    // 如果用户主动滚动且不在底部，停止自动滚动
    if (!arrivedState.bottom) {
      stopScroll.value = true
    }
  }

  useEventListener(scrollContentRef, 'wheel', onUserInteraction)
  useEventListener(scrollContentRef, 'touchstart', onTouchStart)
  useEventListener(scrollContentRef, 'touchmove', onTouchMove)
  useEventListener(scrollContentRef, 'scroll', onScroll)
  watch(
    () => arrivedState.bottom,
    () => {
      if (arrivedState.bottom) {
        // 到底部了
        stopScroll.value = false
      }
    }
  )
  useMutationObserver(
    resizeContentRef,
    async () => {
      await nextTick(() => {
        // 内容变化时，重新计算isScrollToBottom状态
        updateIsScrollToBottom()
      })
      if (stopScroll.value) return
      await scrollToBottom()
    },
    {
      attributes: true,
      childList: true, // 监听子节点变化
      subtree: true, // 监听整个子树
    }
  )
  return {
    scrollInfo,
    stopScroll,
    scrollToBottom,
    isScrollToBottom,
  }
}

import { defineComponent, renderSlot } from 'vue'
import { configProviderProps } from './props'
import { provideGlobalConfig } from './provideGlobalConfig'

export const ElAConfigProvider = defineComponent({
  name: 'ElAConfigProvider',
  props: configProviderProps,
  setup(props, { slots }) {
    const config = provideGlobalConfig(props)
    return () => renderSlot(slots, 'default', { config })
  },
})
export type ElAConfigProviderInstance = InstanceType<typeof ElAConfigProvider> &
  unknown

export default ElAConfigProvider

import { renderHook } from '@testing-library/react-native'

import { ProvidersMock } from '../mocks/providers'
import { ProvidersProps } from '../mocks/providers/types/ProvidersMockProps'

function customRenderHook<Result, Props>(
  hook: (props: unknown) => Result,
  providersMockProps?: ProvidersProps
) {
  return renderHook<Result, Props>(hook, {
    wrapper: ({ children }) => (
      <ProvidersMock providersProps={providersMockProps}>
        {children}
      </ProvidersMock>
    ),
  })
}

export { customRenderHook as renderHook }

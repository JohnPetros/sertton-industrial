import { ReactNode } from 'react'
import { render as renderComponent } from '@testing-library/react-native'

import { ProvidersMock } from '../mocks/providers'
import { ProvidersProps } from '../mocks/providers/types/ProvidersMockProps'

function customRender(component: ReactNode, providersProps?: ProvidersProps) {
  return renderComponent(
    <ProvidersMock providersProps={providersProps}>{component}</ProvidersMock>
  )
}

export { customRender as render }

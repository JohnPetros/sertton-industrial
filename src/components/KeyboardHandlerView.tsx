import { ReactNode } from 'react'
import { KeyboardAvoidingView } from 'react-native'

interface KeyboardHandlerViewProps {
  children: ReactNode
}

export function KeyboardHandlerView({ children }: KeyboardHandlerViewProps) {
  return (
    <KeyboardAvoidingView
      behavior="position"
      enabled
      style={{ position: 'relative' }}
    >
      {children}
    </KeyboardAvoidingView>
  )
}

import { useState } from 'react'

export function useDialog(onOpenChange: ((isOpen: boolean) => void) | null) {
  const [isOpen, setIsOpen] = useState(false)

  function handleOpenChange(isOpen: boolean) {
    setIsOpen(isOpen)

    if (onOpenChange) onOpenChange(isOpen)
  }

  function close() {
    setIsOpen(false)
  }

  return {
    isOpen,
    handleOpenChange,
    close,
  }
}

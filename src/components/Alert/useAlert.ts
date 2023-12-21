import { useState } from 'react'

export function useAlert(onClose: (() => void) | undefined) {
  const [isOpen, setIsOpen] = useState(false)

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen && onClose) onClose()
    setIsOpen(isOpen)
  }

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return {
    isOpen,
    open,
    close,
    handleOpenChange,
  }
}

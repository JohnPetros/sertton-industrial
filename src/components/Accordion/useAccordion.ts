import { useState } from 'react'

export function useAccordion() {
  const [isOpen, setIsOpen] = useState(false)

  function handleOpen() {
    setIsOpen(!isOpen)
  }

  return {
    isOpen,
    handleOpen,
  }
}

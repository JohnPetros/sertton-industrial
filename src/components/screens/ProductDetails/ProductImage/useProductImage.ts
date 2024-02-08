import { useRef } from 'react'

import { FullImageRef } from './FullImage'

export function useProductImage() {
  const fullImageRef = useRef<FullImageRef | null>(null)

  function handleFullImage() {
    fullImageRef.current?.open()
  }

  return {
    fullImageRef,
    handleFullImage,
  }
}

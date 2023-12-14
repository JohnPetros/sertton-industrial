import { useRef } from 'react'

import { FullImageRef } from '@/components/ProductPage/Image/FullImage'

export function useImage() {
  const fullImageRef = useRef<FullImageRef | null>(null)

  function handleFullImage() {
    fullImageRef.current?.open()
  }

  return {
    fullImageRef,
    handleFullImage,
  }
}

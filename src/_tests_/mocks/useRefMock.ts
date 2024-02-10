import { MutableRefObject } from 'react'

export function useRefMock<RefData>(refData: RefData) {
  const refMock = {
    current: refData,
  } as unknown as MutableRefObject<RefData | null>

  return refMock
}

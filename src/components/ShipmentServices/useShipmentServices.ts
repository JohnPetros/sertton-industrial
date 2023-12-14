import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import type { ComputedSku } from '@/@types/ComputedSku'
import { useApi } from '@/services/api'

export function useShipmentServices(product: ComputedSku) {
  const [zipcode, setZipcode] = useState('')
  const [shouldCalculate, setShouldCalculate] = useState(false)
  const api = useApi()

  const { data: shipmentServices } = useQuery(
    ['shipment-services-costs', product],
    () => api.getShipmentServices(zipcode, [product]),
    {
      enabled: shouldCalculate,
    }
  )

  function handleZipcodeChange(zipcode: string) {
    setZipcode(zipcode)
  }

  function handleCalculateShipmentServices() {
    setShouldCalculate(true)
  }

  function handleShipmentServicesDialogOpenChange(isOpen: boolean) {
    setShouldCalculate(isOpen)
  }

  useEffect(() => {
    if (shouldCalculate && shipmentServices) setShouldCalculate(false)
  }, [shouldCalculate, shipmentServices])

  return {
    shipmentServices: shipmentServices ?? [],
    zipcode,
    handleCalculateShipmentServices,
    handleShipmentServicesDialogOpenChange,
    handleZipcodeChange,
  }
}

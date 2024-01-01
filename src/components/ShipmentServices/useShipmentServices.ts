import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import type { ComputedSku } from '@/@types/computedSku'
import { useAppError } from '@/components/AppError/useAppError'
import { useApi } from '@/services/api'

export function useShipmentServices(product: ComputedSku) {
  const [zipcode, setZipcode] = useState('')
  const [shouldCalculate, setShouldCalculate] = useState(false)
  const api = useApi()
  const { throwAppError } = useAppError()

  async function getShipmentServices() {
    if (!shouldCalculate || !zipcode) return

    try {
      return await api.getShipmentServices(zipcode, [product])
    } catch (error) {
      throwAppError('Não foi possível calcular frete para esse CEP ' + zipcode)
    }
  }

  const { data: shipmentServices } = useQuery(
    ['shipment-services-costs', product],
    getShipmentServices,
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
    if (shouldCalculate && shipmentServices) {
      setShouldCalculate(false)
    }
  }, [shouldCalculate, shipmentServices])

  return {
    shipmentServices: shipmentServices ?? [],
    zipcode,
    handleCalculateShipmentServices,
    handleShipmentServicesDialogOpenChange,
    handleZipcodeChange,
  }
}
